type ViewOverride = "mobile" | "desktop" | null;

const MOBILE_UA_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
const BOT_UA_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|WhatsApp|TelegramBot|Google-InspectionTool/i;

const STATIC_PATH_RE =
  /^\/(assets\/|favicon|apple-touch-icon|site\.webmanifest|robots\.txt|sitemap\.xml)/i;

function readViewCookie(cookieHeader: string | null): ViewOverride {
  if (!cookieHeader) return null;
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("wl_view="));
  if (!token) return null;
  const value = token.split("=")[1];
  return value === "mobile" || value === "desktop" ? value : null;
}

function redirectWithCookie(url: URL, view: Exclude<ViewOverride, null>) {
  const clean = new URL(url.toString());
  clean.searchParams.delete("view");

  const response = Response.redirect(clean.toString(), 302);
  response.headers.append(
    "Set-Cookie",
    `wl_view=${view}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
  );
  response.headers.append("Cache-Control", "no-store");
  return response;
}

export const onRequest: PagesFunction = async (context) => {
  const request = context.request;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (STATIC_PATH_RE.test(pathname)) return context.next();

  const queryView = url.searchParams.get("view");
  if (queryView === "mobile" || queryView === "desktop") {
    return redirectWithCookie(url, queryView);
  }

  const ua = request.headers.get("user-agent") || "";
  const isBot = BOT_UA_RE.test(ua);
  if (isBot) return context.next();

  const cookieOverride = readViewCookie(request.headers.get("cookie"));
  const isMobileUA = MOBILE_UA_RE.test(ua);
  const forceMobile = cookieOverride === "mobile";
  const forceDesktop = cookieOverride === "desktop";

  if ((isMobileUA || forceMobile) && !forceDesktop && pathname === "/") {
    return Response.redirect(`${url.origin}/m`, 302);
  }

  if ((!isMobileUA || forceDesktop) && pathname === "/m" && !forceMobile) {
    return Response.redirect(`${url.origin}/`, 302);
  }

  return context.next();
};
