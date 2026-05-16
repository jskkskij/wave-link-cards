/**
 * Shared mobile/desktop routing rules for Cloudflare Pages and local verification.
 * Policy: never auto-bounce mobile visitors away from `/` (shared links must work).
 * `/m` is opt-in via ?view=mobile or wl_view=mobile cookie only.
 */

export const MOBILE_UA_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

/** Crawlers + in-app link preview fetchers — must receive HTML without view redirects. */
export const BOT_UA_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|WhatsApp|TelegramBot|Google-InspectionTool|LinkedInBot|Twitterbot|Slackbot|Discordbot|Embedly|Pinterest|Snapchat|vkShare|W3C_Validator/i;

export const STATIC_PATH_RE =
  /^\/(assets\/|favicon|apple-touch-icon|site\.webmanifest|robots\.txt|sitemap\.xml)/i;

/** @param {string} pathname */
export function isMobileEntryPath(pathname) {
  return pathname === "/m" || pathname === "/m/";
}

/** @param {string} pathname */
export function isHomePath(pathname) {
  return pathname === "/" || pathname === "";
}

/**
 * @param {string | null} cookieHeader
 * @returns {"mobile" | "desktop" | null}
 */
export function readViewCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("wl_view="));
  if (!token) return null;
  const value = token.split("=")[1];
  return value === "mobile" || value === "desktop" ? value : null;
}

/**
 * @param {object} input
 * @param {string} input.pathname
 * @param {string | null} input.searchView - ?view= query value
 * @param {string} input.userAgent
 * @param {string | null} input.cookieHeader
 * @param {string} input.origin - e.g. https://getwaved.ai
 * @returns {{ action: "next" } | { action: "redirect"; url: string; setViewCookie?: "mobile" | "desktop" }}
 */
export function decideViewRoute(input) {
  const { pathname, searchView, userAgent, cookieHeader, origin } = input;

  if (STATIC_PATH_RE.test(pathname)) {
    return { action: "next" };
  }

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
  if (BOT_UA_RE.test(ua)) {
    return { action: "next" };
  }

  const cookieOverride = readViewCookie(cookieHeader);
  const forceMobile = cookieOverride === "mobile";
  const forceDesktop = cookieOverride === "desktop";

  // Explicit opt-in only: cookie set via ?view=mobile — not raw mobile UA.
  if (forceMobile && !forceDesktop && isHomePath(pathname)) {
    return { action: "redirect", url: `${origin}/m` };
  }

  if (forceDesktop && isMobileEntryPath(pathname)) {
    return { action: "redirect", url: `${origin}/` };
  }

  // Desktop visitors hitting /m without opting into mobile view.
  const isMobileUA = MOBILE_UA_RE.test(ua);
  if (!isMobileUA && !forceMobile && isMobileEntryPath(pathname)) {
    return { action: "redirect", url: `${origin}/` };
  }

  return { action: "next" };
}

/**
 * Whether /m should be served as the lightweight mobile shell (not redirect to /).
 * @param {string} pathname
 * @param {string} userAgent
 * @param {string | null} cookieHeader
 */
export function shouldServeMobileShell(pathname, userAgent, cookieHeader) {
  if (!isMobileEntryPath(pathname)) return false;
  if (readViewCookie(cookieHeader) === "mobile") return true;
  if (readViewCookie(cookieHeader) === "desktop") return false;
  return MOBILE_UA_RE.test(userAgent || "");
}

/**
 * Simulates server redirect hops for unit tests (no real HTTP).
 * @param {object} input
 * @param {string} input.pathname
 * @param {string | null} [input.searchView]
 * @param {string} input.userAgent
 * @param {string | null} [input.cookieHeader]
 * @param {string} input.origin
 * @param {number} [maxHops]
 */
export function simulateRedirectChain(input, maxHops = 8) {
  let pathname = input.pathname;
  let searchView = input.searchView ?? null;
  let cookieHeader = input.cookieHeader ?? null;
  const hops = [];

  for (let i = 0; i < maxHops; i++) {
    const decision = decideViewRoute({
      pathname,
      searchView,
      userAgent: input.userAgent,
      cookieHeader,
      origin: input.origin,
    });
    hops.push({ pathname, searchView, cookieHeader, decision });

    if (decision.action === "next") {
      return { hops, finalPathname: pathname, loop: false };
    }

    const next = new URL(decision.url);
    pathname = next.pathname;
    searchView = null;
    if (decision.setViewCookie) {
      cookieHeader = `wl_view=${decision.setViewCookie}`;
    }
  }

  const last = hops[hops.length - 1]?.decision;
  return {
    hops,
    finalPathname: pathname,
    loop: last?.action === "redirect",
  };
}
