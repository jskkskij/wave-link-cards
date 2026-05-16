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

/** Serve SPA index without context.next() (avoids some edge 308 /m → / fallthrough). */
async function serveSpaIndex(
  context: EventContext<unknown, unknown, unknown>,
  shellPath: string
): Promise<Response> {
  const indexUrl = new URL(shellPath, context.request.url);
  const assetRequest = new Request(indexUrl.toString(), {
    method: "GET",
    headers: context.request.headers,
  });

  const env = context.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } };
  if (env.ASSETS) {
    const res = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(res.headers);
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    return new Response(res.body, { status: res.status, headers });
  }

  return context.next();
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

  // Mobile (or opt-in) on /m: return 200 shell at /m — never chain to a 308 at zone level.
  if (url.pathname === "/m" || url.pathname === "/m/") {
    return serveSpaIndex(context, "/m/index.html");
  }

  return context.next();
};
