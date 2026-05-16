/**
 * Client-side helpers aligned with functions/_shared/view-routing.mjs policy.
 */

export const MOBILE_VIEW_COOKIE = "wl_view=mobile";

export function hasMobileViewCookie(): boolean {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)wl_view=mobile(?:;|$)/.test(document.cookie);
}

/** Shop / commerce deep links: opt-in mobile cookie → lightweight /m, else main site. */
export function shopOrderTarget(): string {
  return hasMobileViewCookie() ? "/m#order" : "/#order";
}
