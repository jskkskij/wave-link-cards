export interface SponsoredPlacementContext {
  width: number;
  sessionImpressions: number;
  sessionDismissals: number;
}

export interface SponsoredPlacementDecision {
  shouldInsert: boolean;
  insertAfterIndex: number;
  placement: "desktop" | "tablet" | "mobile";
  cooldownActive: boolean;
  ruleVersion: string;
}

const RULE_VERSION = "elite_v2_1";
const LS_IMPRESSIONS_KEY = "wl_sponsored_impressions";
const LS_DISMISSALS_KEY = "wl_sponsored_dismissals";
const LS_COOLDOWN_UNTIL_KEY = "wl_sponsored_cooldown_until";
const SESSION_MAX_IMPRESSIONS = 2;
const SESSION_DISMISSAL_COOLDOWN_MS = 15 * 60 * 1000;

function getPlacement(width: number): SponsoredPlacementDecision["placement"] {
  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

function getInsertAfterIndex(placement: SponsoredPlacementDecision["placement"]): number {
  if (placement === "desktop") return 2;
  if (placement === "tablet") return 1;
  return 1;
}

function readNumber(key: string): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(key);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function writeNumber(key: string, value: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, String(value));
}

export function readSponsoredSessionState(): SponsoredPlacementContext {
  const width = typeof window === "undefined" ? 1280 : window.innerWidth;
  return {
    width,
    sessionImpressions: readNumber(LS_IMPRESSIONS_KEY),
    sessionDismissals: readNumber(LS_DISMISSALS_KEY),
  };
}

export function getSponsoredPlacementDecision(context: SponsoredPlacementContext): SponsoredPlacementDecision {
  const placement = getPlacement(context.width);
  const now = Date.now();
  const cooldownUntil = readNumber(LS_COOLDOWN_UNTIL_KEY);
  const cooldownActive = cooldownUntil > now;
  const tooManyImpressions = context.sessionImpressions >= SESSION_MAX_IMPRESSIONS;
  const shouldInsert = !cooldownActive && !tooManyImpressions;

  return {
    shouldInsert,
    insertAfterIndex: getInsertAfterIndex(placement),
    placement,
    cooldownActive,
    ruleVersion: RULE_VERSION,
  };
}

export function markSponsoredImpression(): void {
  const next = readNumber(LS_IMPRESSIONS_KEY) + 1;
  writeNumber(LS_IMPRESSIONS_KEY, next);
}

export function markSponsoredDismissal(): void {
  const next = readNumber(LS_DISMISSALS_KEY) + 1;
  writeNumber(LS_DISMISSALS_KEY, next);
  const cooldownUntil = Date.now() + SESSION_DISMISSAL_COOLDOWN_MS;
  writeNumber(LS_COOLDOWN_UNTIL_KEY, cooldownUntil);
}

