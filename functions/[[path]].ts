import {
  decideViewRoute,
  isMobileEntryPath,
  shouldServeMobileShell,
} from "./_shared/view-routing.mjs";

function applyViewCookie(
  response: Response,
  view: "mobile" | "desktop"
): Response {
  response.headers.append(
    "Set-Cookie",
    `wl_view=${view}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
  );
  response.headers.append("Cache-Control", "no-store");
  response.headers.append("Vary", "Cookie, User-Agent");
  return response;
}

function withVary(response: Response): Response {
  response.headers.append("Vary", "Cookie, User-Agent");
  return response;
}

/** Serve SPA shell for /m — minimal request to ASSETS (forwarding client headers can 500). */
async function serveSpaIndex(
  context: EventContext<unknown, unknown, unknown>,
  shellPath: string
): Promise<Response> {
  const env = context.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } };

  try {
    if (env.ASSETS) {
      const indexUrl = new URL(shellPath, context.request.url);
      const assetRequest = new Request(indexUrl.toString(), { method: "GET" });
      const res = await env.ASSETS.fetch(assetRequest);
      if (res.ok) {
        const headers = new Headers(res.headers);
        headers.set("Content-Type", "text/html; charset=utf-8");
        headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        return withVary(new Response(res.body, { status: 200, headers }));
      }
    }
  } catch {
    /* fall through */
  }

  return withVary(await context.next());
}

export const onRequest: PagesFunction = async (context) => {
  const request = context.request;
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";
  const cookieHeader = request.headers.get("cookie");

  const decision = decideViewRoute({
    pathname: url.pathname,
    searchView: url.searchParams.get("view"),
    userAgent: ua,
    cookieHeader,
    origin: url.origin,
  });

  if (decision.action === "redirect") {
    const response = Response.redirect(decision.url, 302);
    if (decision.setViewCookie) {
      return applyViewCookie(response, decision.setViewCookie);
    }
    response.headers.append("Cache-Control", "no-store");
    response.headers.append("Vary", "Cookie, User-Agent");
    return response;
  }

  if (isMobileEntryPath(url.pathname)) {
    if (shouldServeMobileShell(url.pathname, ua, cookieHeader)) {
      return serveSpaIndex(context, "/m/index.html");
    }
    // Safety net: desktop on /m must never hit a broken ASSETS path
    return Response.redirect(`${url.origin}/`, 302);
  }

  const passthrough = await context.next();
  if (url.pathname === "/" || url.pathname === "") {
    return withVary(passthrough);
  }
  return passthrough;
};
