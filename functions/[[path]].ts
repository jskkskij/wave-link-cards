import { decideViewRoute } from "./_shared/view-routing.mjs";

function applyViewCookie(
  response: Response,
  view: "mobile" | "desktop"
): Response {
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

  const decision = decideViewRoute({
    pathname: url.pathname,
    searchView: url.searchParams.get("view"),
    userAgent: request.headers.get("user-agent") || "",
    cookieHeader: request.headers.get("cookie"),
    origin: url.origin,
  });

  if (decision.action === "redirect") {
    const response = Response.redirect(decision.url, 302);
    if (decision.setViewCookie) {
      return applyViewCookie(response, decision.setViewCookie);
    }
    response.headers.append("Cache-Control", "no-store");
    return response;
  }

  return context.next();
};
