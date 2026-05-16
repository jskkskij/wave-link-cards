/**
 * Cloudflare Pages routing — redirects only. Static dist/m/index.html serves /m (no ASSETS.fetch).
 */
import {
  decideViewRoute,
  isHomePath,
  isMobileEntryPath,
  readViewCookie,
  shouldServeMobileShell,
} from "./_shared/view-routing.mjs";

/** @param {string} origin */
function redirectTo(origin, path, init = {}) {
  const response = Response.redirect(`${origin}${path}`, 302);
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vary", "Cookie, User-Agent");
  if (init.setViewCookie) {
    response.headers.append(
      "Set-Cookie",
      `wl_view=${init.setViewCookie}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
    );
  }
  return response;
}

/** @param {Response} res */
function withNoStore(res) {
  const headers = new Headers(res.headers);
  headers.set("Cache-Control", "private, no-store, must-revalidate");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Vary", "Cookie, User-Agent");
  return new Response(res.body, { status: res.status, headers });
}

/** @param {import("@cloudflare/workers-types").EventContext} context */
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";
  const cookieHeader = request.headers.get("cookie");
  const origin = url.origin;

  // Fast paths (avoid any ASSETS / broken middleware)
  if (readViewCookie(cookieHeader) === "mobile" && isHomePath(url.pathname)) {
    return redirectTo(origin, "/m");
  }

  if (
    isMobileEntryPath(url.pathname) &&
    !shouldServeMobileShell(url.pathname, ua, cookieHeader)
  ) {
    return redirectTo(origin, "/");
  }

  const decision = decideViewRoute({
    pathname: url.pathname,
    searchView: url.searchParams.get("view"),
    userAgent: ua,
    cookieHeader,
    origin,
  });

  if (decision.action === "redirect") {
    const response = Response.redirect(decision.url, 302);
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Vary", "Cookie, User-Agent");
    if (decision.setViewCookie) {
      response.headers.append(
        "Set-Cookie",
        `wl_view=${decision.setViewCookie}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
      );
    }
    return response;
  }

  const passthrough = await context.next();

  if (isHomePath(url.pathname) || isMobileEntryPath(url.pathname)) {
    return withNoStore(passthrough);
  }

  return passthrough;
}
