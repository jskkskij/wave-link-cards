/**
 * personalization.ts — Wavelink AI Personalization Engine
 * =========================================================
 * PURPOSE: Client-side context inference and content swapping engine.
 *          Reads device, time, visit history, referral source, and user
 *          segment to dynamically personalize headline copy, CTAs, and
 *          onboarding prompts — all without any external tracking.
 *
 * HOW TO CONFIGURE:
 *   - Edit SEGMENTS to adjust the self-segmentation labels.
 *   - Edit CONTENT_MAP to customize hero/CTA/greeting copy per scenario.
 *   - Edit THRESHOLDS to tune what counts as "returning" or "power user".
 *
 * HOW TO EXTEND:
 *   - Add new signals in readContext() and handle them in getPersonalizedContent().
 *   - Supply new content variants in CONTENT_MAP.
 *
 * PRIVACY: 100% client-side. Zero external calls. No cookies.
 *          All data stored under localStorage key prefix "wl_".
 *          GDPR-safe by design.
 *
 * STATISTICS:
 *   - Personalization → up to +200% CVR (2025 benchmarks)
 *   - AI recommendations → +19% revenue per session
 *   - Time-aware messaging improves open/engagement rates by ~14%
 */

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

export const SEGMENTS = ['professional', 'sme', 'enterprise'] as const;
export type Segment = typeof SEGMENTS[number];

const THRESHOLDS = {
  returningVisitCount: 2,   // # of visits before "returning visitor" mode
  powerUserVisitCount: 5,   // # of visits for "power user" mode
  morningStart: 5,          // 5am
  afternoonStart: 12,       // 12pm
  eveningStart: 17,         // 5pm
  nightStart: 21,           // 9pm
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type VisitFrequency = 'first' | 'returning' | 'power';

export interface PersonalizationContext {
  device: DeviceType;
  timeOfDay: TimeOfDay;
  visitFrequency: VisitFrequency;
  visitCount: number;
  referralSource: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  segment: Segment | null;
  lastScrollDepth: number;     // 0-100 from previous session
  lastViewedSection: string | null;
}

export interface PersonalizedContent {
  greeting: string;           // Smart greeting text
  heroHeadline: string;       // Above-fold headline
  heroSubheadline: string;    // Supporting line
  ctaPrimary: string;         // Primary CTA button copy
  ctaSecondary: string;       // Secondary CTA copy
  onboardingPrompt: string;   // Onboarding / tooltip text
  socialProofVariant: 'reviews' | 'stats' | 'case-study';
}

// ─── LOCALSTORAGE KEYS ────────────────────────────────────────────────────────

const LS_KEYS = {
  visitCount:        'wl_visit_count',
  lastVisit:         'wl_last_visit',
  segment:           'wl_segment',
  lastScrollDepth:   'wl_last_scroll_depth',
  lastViewedSection: 'wl_last_viewed_section',
  prefsDismissed:    'wl_prefs_dismissed',
} as const;

// ─── CONTENT MAP ─────────────────────────────────────────────────────────────

const CONTENT_MAP: Record<string, Partial<PersonalizedContent>> = {
  // First-time visitor — educate and inspire
  first: {
    greeting: "Welcome — you're about to change how you connect.",
    heroHeadline: 'One Tap.\nEndless Connections.',
    heroSubheadline: 'We are building the AI Trust Infrastructure with NFC Business cards and Review stands for feedbacks.',
    ctaPrimary: 'Discover How It Works',
    ctaSecondary: 'See Pricing',
    onboardingPrompt: "New to NFC cards? Start here — it takes 30 seconds to understand.",
    socialProofVariant: 'stats',
  },
  // Returning visitor — pick up where they left off
  returning: {
    greeting: 'Welcome back — your card is one step away.',
    heroHeadline: 'One Tap.\nEndless Connections.',
    heroSubheadline: 'Join 500+ professionals who made the switch to intelligent NFC networking.',
    ctaPrimary: 'Get My Card Now',
    ctaSecondary: 'View Features',
    onboardingPrompt: "Still deciding? See what 500+ professionals say →",
    socialProofVariant: 'reviews',
  },
  // Power user / loyal visitor
  power: {
    greeting: 'Good to see you again. Ready to scale your network?',
    heroHeadline: 'Build the\nFuture of Trust.',
    heroSubheadline: 'NFC infrastructure for teams, SMEs, and enterprises serious about intelligent connections.',
    ctaPrimary: 'Order for My Team',
    ctaSecondary: 'Explore Enterprise',
    onboardingPrompt: "Ordering for a team? We offer volume pricing and custom branding.",
    socialProofVariant: 'case-study',
  },
  // Segment overrides
  professional: {
    ctaPrimary: 'Get My Professional Card',
    heroSubheadline: 'The smartest business card a professional can carry — NFC-powered, AI-connected.',
    socialProofVariant: 'reviews',
  },
  sme: {
    ctaPrimary: 'Equip My Team',
    heroSubheadline: 'NFC cards and review stands that help your SME build trust and collect feedback at scale.',
    socialProofVariant: 'case-study',
  },
  enterprise: {
    ctaPrimary: 'Talk to Our Team',
    heroSubheadline: 'Enterprise-grade AI Trust Infrastructure: custom NFC hardware, bulk deployment, and analytics.',
    onboardingPrompt: "Need 20+ cards or custom branding? Our enterprise team responds within 2 hours.",
    socialProofVariant: 'case-study',
  },
  // Time-of-day prefixes (merged into greeting)
  morning:   { greeting: 'Good morning! Here\'s where most professionals start →' },
  afternoon: { greeting: 'Good afternoon — see what\'s connecting the world right now.' },
  evening:   { greeting: 'Good evening — ready to make tomorrow\'s first impression count?' },
  night:     { greeting: 'Working late? Your NFC card order will be waiting for you tomorrow.' },
  // Device-specific adjustments
  mobile: {
    ctaPrimary: 'Get My Card →',
    onboardingPrompt: 'Tap below to begin. Ships in 3 business days.',
  },
  // Referral source overrides
  instagram: {
    greeting: 'You saw us on Instagram — now see it in real life.',
    ctaPrimary: 'Shop the Card',
  },
  linkedin: {
    greeting: 'Growing your professional network? You\'re in the right place.',
    ctaPrimary: 'Upgrade My Networking',
  },
  google: {
    greeting: 'Searched for NFC cards? You found the best one.',
    ctaPrimary: 'See Why We\'re #1',
  },
};

// ─── SIGNAL READERS ───────────────────────────────────────────────────────────

function getDevice(): DeviceType {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= THRESHOLDS.morningStart && h < THRESHOLDS.afternoonStart) return 'morning';
  if (h >= THRESHOLDS.afternoonStart && h < THRESHOLDS.eveningStart) return 'afternoon';
  if (h >= THRESHOLDS.eveningStart && h < THRESHOLDS.nightStart) return 'evening';
  return 'night';
}

function getVisitFrequency(count: number): VisitFrequency {
  if (count >= THRESHOLDS.powerUserVisitCount) return 'power';
  if (count >= THRESHOLDS.returningVisitCount) return 'returning';
  return 'first';
}

function getReferralSource(): string | null {
  const ref = document.referrer.toLowerCase();
  if (ref.includes('instagram')) return 'instagram';
  if (ref.includes('linkedin')) return 'linkedin';
  if (ref.includes('google') || ref.includes('bing')) return 'google';
  if (ref.includes('facebook') || ref.includes('fb.com')) return 'facebook';
  if (ref) return 'referral';
  return null;
}

function getUTMParams(): { source: string | null; medium: string | null; campaign: string | null } {
  const params = new URLSearchParams(window.location.search);
  return {
    source:   params.get('utm_source'),
    medium:   params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
  };
}

function safeLS(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function setLS(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* storage full or disabled */ }
}

// ─── VISIT COUNTER ────────────────────────────────────────────────────────────

function incrementAndGetVisitCount(): number {
  const raw = safeLS(LS_KEYS.visitCount);
  const count = raw ? parseInt(raw, 10) + 1 : 1;
  setLS(LS_KEYS.visitCount, String(count));
  setLS(LS_KEYS.lastVisit, new Date().toISOString());
  return count;
}

// ─── CONTEXT READER ──────────────────────────────────────────────────────────

export function readContext(): PersonalizationContext {
  const visitCount = incrementAndGetVisitCount();
  const utms = getUTMParams();

  return {
    device:            getDevice(),
    timeOfDay:         getTimeOfDay(),
    visitFrequency:    getVisitFrequency(visitCount),
    visitCount,
    referralSource:    getReferralSource(),
    utmSource:         utms.source,
    utmMedium:         utms.medium,
    utmCampaign:       utms.campaign,
    segment:           (safeLS(LS_KEYS.segment) as Segment) || null,
    lastScrollDepth:   Number(safeLS(LS_KEYS.lastScrollDepth) || 0),
    lastViewedSection: safeLS(LS_KEYS.lastViewedSection),
  };
}

// ─── CONTENT RESOLVER ─────────────────────────────────────────────────────────

/**
 * Merges content overrides with priority:
 *   base defaults → visit frequency → time of day → device → referral → segment
 * Later layers override earlier ones for the same key.
 */
export function getPersonalizedContent(ctx: PersonalizationContext): PersonalizedContent {
  const base: PersonalizedContent = {
    ...CONTENT_MAP.first,
  } as PersonalizedContent;

  // Merge in priority order (most specific last)
  const layers = [
    CONTENT_MAP[ctx.visitFrequency],
    CONTENT_MAP[ctx.timeOfDay],
    ctx.device === 'mobile' ? CONTENT_MAP.mobile : undefined,
    ctx.referralSource ? CONTENT_MAP[ctx.referralSource] : undefined,
    ctx.utmSource ? CONTENT_MAP[ctx.utmSource] : undefined,
    ctx.segment ? CONTENT_MAP[ctx.segment] : undefined,
  ];

  for (const layer of layers) {
    if (layer) Object.assign(base, layer);
  }

  return base;
}

// ─── SEGMENT PERSISTENCE ─────────────────────────────────────────────────────

export function setSegment(segment: Segment): void {
  setLS(LS_KEYS.segment, segment);
}

export function getSegment(): Segment | null {
  return (safeLS(LS_KEYS.segment) as Segment) || null;
}

export function shouldShowPreferencesPanel(): boolean {
  if (safeLS(LS_KEYS.prefsDismissed) === 'true') return false;
  if (safeLS(LS_KEYS.segment)) return false;  // Already segmented
  const count = parseInt(safeLS(LS_KEYS.visitCount) || '0', 10);
  return count <= 1; // Show on first visit only after dismissal check
}

export function dismissPreferencesPanel(): void {
  setLS(LS_KEYS.prefsDismissed, 'true');
}

// ─── SESSION HELPERS (used by analytics.ts) ──────────────────────────────────

export function persistScrollDepth(depth: number): void {
  if (depth > Number(safeLS(LS_KEYS.lastScrollDepth) || 0)) {
    setLS(LS_KEYS.lastScrollDepth, String(depth));
  }
}

export function persistLastViewedSection(sectionId: string): void {
  setLS(LS_KEYS.lastViewedSection, sectionId);
}
