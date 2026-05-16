/**
 * Cloudflare Pages middleware — all view routing (inlined, no imports).
 * Runs before static assets. Never throws: falls back to context.next() on error.
 */

const MOBILE_UA_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

const BOT_UA_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|WhatsApp|TelegramBot|Google-InspectionTool|LinkedInBot|Twitterbot|Slackbot|Discordbot|Embedly|Pinterest|Snapchat|vkShare|W3C_Validator/i;

const STATIC_PATH_RE =
  /^\/(assets\/|favicon|apple-touch-icon|site\.webmanifest|robots\.txt|sitemap\.xml)/i;

function isMobileEntryPath(pathname) {
  return pathname === "/m" || pathname === "/m/";
}

function isHomePath(pathname) {
  return pathname === "/" || pathname === "";
}

function readViewCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const token = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith("wl_view="));
  if (!token) return null;
  const v = token.split("=")[1];
  return v === "mobile" || v === "desktop" ? v : null;
}

function shouldServeMobileShell(pathname, userAgent, cookieHeader) {
  if (!isMobileEntryPath(pathname)) return false;
  const c = readViewCookie(cookieHeader);
  if (c === "mobile") return true;
  if (c === "desktop") return false;
  return MOBILE_UA_RE.test(userAgent || "");
}

function decideViewRoute(input) {
  const { pathname, searchView, userAgent, cookieHeader, origin } = input;

  if (STATIC_PATH_RE.test(pathname)) return { action: "next" };

  if (searchView === "mobile" || searchView === "desktop") {
    const clean = new URL(`${origin}${pathname}`);
    clean.searchParams.delete("view");
    const target =
      searchView === "mobile" && isHomePath(pathname)
        ? `${origin}/m`
        : searchView === "desktop" && isMobileEntryPath(pathname)
          ? `${origin}/`
          : clean.toString();
    return { action: "redirect", url: target, setViewCookie: searchView };
  }

  const ua = userAgent || "";
  if (BOT_UA_RE.test(ua)) return { action: "next" };

  const forceMobile = readViewCookie(cookieHeader) === "mobile";
  const forceDesktop = readViewCookie(cookieHeader) === "desktop";

  if (forceMobile && !forceDesktop && isHomePath(pathname)) {
    return { action: "redirect", url: `${origin}/m` };
  }
  if (forceDesktop && isMobileEntryPath(pathname)) {
    return { action: "redirect", url: `${origin}/` };
  }
  if (!MOBILE_UA_RE.test(ua) && !forceMobile && isMobileEntryPath(pathname)) {
    return { action: "redirect", url: `${origin}/` };
  }
  return { action: "next" };
}

function redirectResponse(url, setViewCookie) {
  const res = Response.redirect(url, 302);
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  res.headers.set("CDN-Cache-Control", "no-store");
  res.headers.set("Vary", "Cookie, User-Agent");
  if (setViewCookie) {
    res.headers.append(
      "Set-Cookie",
      `wl_view=${setViewCookie}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
    );
  }
  return res;
}

function applyRouteHeaders(res) {
  const headers = new Headers(res.headers);
  headers.set("Cache-Control", "private, no-store, must-revalidate");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Vary", "Cookie, User-Agent");
  return new Response(res.body, { status: res.status, headers });
}

export async function onRequest(context) {
  try {
    const request = context.request;
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    const cookieHeader = request.headers.get("cookie");
    const origin = url.origin;
    const pathname = url.pathname;

    if (STATIC_PATH_RE.test(pathname)) {
      return context.next();
    }

    // Opt-in mobile cookie on homepage (before CDN cache / decideViewRoute)
    if (readViewCookie(cookieHeader) === "mobile" && isHomePath(pathname)) {
      return redirectResponse(`${origin}/m`);
    }

    // Desktop must not stay on /m (avoid static dir 308 / broken handlers)
    if (isMobileEntryPath(pathname) && !shouldServeMobileShell(pathname, ua, cookieHeader)) {
      return redirectResponse(`${origin}/`);
    }

    const decision = decideViewRoute({
      pathname,
      searchView: url.searchParams.get("view"),
      userAgent: ua,
      cookieHeader,
      origin,
    });

    if (decision.action === "redirect") {
      return redirectResponse(decision.url, decision.setViewCookie);
    }

    const res = await context.next();

    if (isHomePath(pathname) || isMobileEntryPath(pathname)) {
      return applyRouteHeaders(res);
    }
    return res;
  } catch (err) {
    console.error("[view-middleware]", err);
    return context.next();
  }
}
