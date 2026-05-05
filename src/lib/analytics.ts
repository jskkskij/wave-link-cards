import { initPerformanceClarity } from "@/lib/performance-clarity";

/**
 * analytics.ts — Wavelink Behavioral Analytics Engine
 * =====================================================
 * PURPOSE: Zero-dependency event tracker that records user behavior into
 *          localStorage, powers the hidden developer dashboard, detects exit
 *          intent, and feeds engagement scores to the Feature Pulse widget.
 *
 * HOW TO CONFIGURE:
 *   - Edit TRACKED_SECTIONS to list which section IDs to track time-on-section.
 *   - Set HEATMAP_ENABLED = false to disable coordinate collection.
 *   - Edit EXIT_INTENT_THRESHOLD to tune rapid-scroll velocity detection.
 *
 * HOW TO EXTEND:
 *   - Call trackEvent() directly from any component to fire a custom event.
 *   - Add new event types to the AnalyticsEvent union type.
 *
 * DEVELOPER DASHBOARD:
 *   Press Shift+Alt+D to open. Or navigate to /analytics.
 *
 * EXPORT:
 *   window.__wlAnalytics.export() → downloads events as JSON.
 *
 * STATISTICS:
 *   - Heatmap-optimized pages convert 14% higher (2025 benchmarks)
 *   - Companies running 10+ tests/month grow 2.1× faster
 */

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const HEATMAP_ENABLED = true;

const TRACKED_SECTIONS = [
  'hero', 'about', 'features', 'funnel', 'order',
  'reviews', 'affiliate', 'faq', 'phase-1', 'phase-2', 'phase-3',
];

const EXIT_INTENT_THRESHOLD = {
  desktop:        50,   // px from top of viewport to trigger
  mobileVelocity: 300,  // px/100ms upward scroll to trigger
};

const LS_KEY   = 'wl_events';
const MAX_EVENTS = 500; // Rolling cap to avoid storage bloat

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type AnalyticsEventType =
  | 'page_view'
  | 'scroll_depth'
  | 'click'
  | 'cta_click'
  | 'sponsored_hint'
  | 'sponsored_expand'
  | 'sponsored_dismiss'
  | 'sponsored_cta_click'
  | 'perf_metric'
  | 'form_start'
  | 'form_abandon'
  | 'time_on_section'
  | 'exit_intent'
  | 'session_start';

export interface AnalyticsEvent {
  type:      AnalyticsEventType;
  ts:        number;          // Unix timestamp ms
  session:   string;          // Session ID (tab-scoped)
  path:      string;          // Current pathname
  // Optional payload fields
  depth?:    number;          // Scroll 0–100
  section?:  string;          // Section ID
  duration?: number;          // ms
  x?:        number;          // Click x coordinate (px)
  y?:        number;          // Click y coordinate (px)
  target?:   string;          // Element selector / text
  value?:    string;          // Generic payload
}

// ─── SESSION ──────────────────────────────────────────────────────────────────

let SESSION_ID = sessionStorage.getItem('wl_session') || '';
if (!SESSION_ID) {
  SESSION_ID = Math.random().toString(36).slice(2, 10);
  sessionStorage.setItem('wl_session', SESSION_ID);
}

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────

function loadEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveEvents(events: AnalyticsEvent[]): void {
  try {
    // Keep only the most recent MAX_EVENTS
    const trimmed = events.slice(-MAX_EVENTS);
    localStorage.setItem(LS_KEY, JSON.stringify(trimmed));
  } catch { /* storage full — graceful no-op */ }
}

// ─── CORE EVENT TRACKER ───────────────────────────────────────────────────────

export function trackEvent(type: AnalyticsEventType, payload: Partial<AnalyticsEvent> = {}): void {
  const events = loadEvents();
  events.push({
    type,
    ts:      Date.now(),
    session: SESSION_ID,
    path:    window.location.pathname,
    ...payload,
  });
  saveEvents(events);
}

export type SponsoredEventType =
  | 'sponsored_hint'
  | 'sponsored_expand'
  | 'sponsored_dismiss'
  | 'sponsored_cta_click';

export function trackSponsoredEvent(
  type: SponsoredEventType,
  payload: Partial<AnalyticsEvent> = {},
): void {
  trackEvent(type, payload);
}

// ─── SCROLL DEPTH ─────────────────────────────────────────────────────────────

const SCROLL_MILESTONES = [25, 50, 75, 100];
const firedMilestones = new Set<number>();

function setupScrollDepth(): void {
  const handler = () => {
    const pct = Math.round(
      (window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100
    );
    SCROLL_MILESTONES.forEach((m) => {
      if (pct >= m && !firedMilestones.has(m)) {
        firedMilestones.add(m);
        trackEvent('scroll_depth', { depth: m });
        // Also persist to personalization
        import('@/lib/personalization').then(({ persistScrollDepth }) => {
          persistScrollDepth(m);
        });
      }
    });
  };
  window.addEventListener('scroll', handler, { passive: true });
}

// ─── TIME ON SECTION (IntersectionObserver) ───────────────────────────────────

const sectionTimers: Map<string, number> = new Map();

function setupSectionTimer(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        if (entry.isIntersecting) {
          sectionTimers.set(id, performance.now());
          // Persist last-viewed section to personalization
          import('@/lib/personalization').then(({ persistLastViewedSection }) => {
            persistLastViewedSection(id);
          });
        } else {
          const start = sectionTimers.get(id);
          if (start) {
            const duration = Math.round(performance.now() - start);
            if (duration > 500) { // Ignore instant flicker
              trackEvent('time_on_section', { section: id, duration });
            }
            sectionTimers.delete(id);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  TRACKED_SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ─── CLICK HEATMAP ────────────────────────────────────────────────────────────

function setupClickTracking(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const text    = target.closest('button, a')?.textContent?.trim().slice(0, 40) || target.tagName;
    const isCTA   = target.closest('[data-track-cta]') !== null;

    if (HEATMAP_ENABLED) {
      trackEvent('click', {
        x:      e.clientX,
        y:      e.clientY,
        target: text,
        value:  isCTA ? 'cta' : undefined,
      });
    }

    if (isCTA) {
      trackEvent('cta_click', { target: text });
    }
  }, { passive: true, capture: true });
}

// ─── FORM TRACKING ────────────────────────────────────────────────────────────

function setupFormTracking(): void {
  let formStarted = false;

  document.addEventListener('focusin', (e) => {
    const el = e.target as HTMLElement;
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')
        && el.closest('form')) {
      if (!formStarted) {
        formStarted = true;
        trackEvent('form_start', { target: el.closest('form')?.id || 'unknown' });
      }
    }
  }, { passive: true });

  // Detect form abandon: user leaves the page or navigates away mid-form
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && formStarted) {
      trackEvent('form_abandon', { value: 'page_hidden' });
    }
  });
}

// ─── EXIT INTENT ─────────────────────────────────────────────────────────────

let exitIntentFired = false;

function setupExitIntent(): void {
  // Desktop: cursor leaves viewport from the top
  if (window.innerWidth >= 1024) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= EXIT_INTENT_THRESHOLD.desktop && !exitIntentFired) {
        exitIntentFired = true;
        trackEvent('exit_intent', { value: 'desktop_cursor_top' });
        showExitIntentStrip();
        setTimeout(() => { exitIntentFired = false; }, 30000); // Cooldown 30s
      }
    });
    return;
  }

  // Mobile: rapid upward scroll
  let lastY = window.scrollY;
  let lastT = Date.now();

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const currentT = Date.now();
    const dy = lastY - currentY;   // Positive = scrolling up
    const dt = currentT - lastT;

    if (dy > 0 && dt > 0) {
      const velocity = (dy / dt) * 100; // px per 100ms
      if (velocity > EXIT_INTENT_THRESHOLD.mobileVelocity && !exitIntentFired && window.scrollY > 300) {
        exitIntentFired = true;
        trackEvent('exit_intent', { value: 'mobile_rapid_scroll_up' });
        showExitIntentStrip();
        setTimeout(() => { exitIntentFired = false; }, 30000);
      }
    }

    lastY = currentY;
    lastT = currentT;
  }, { passive: true });
}

// ─── EXIT INTENT STRIP UI ─────────────────────────────────────────────────────

function showExitIntentStrip(): void {
  const existing = document.getElementById('wl-exit-intent');
  if (existing) {
    existing.classList.add('visible');
    setTimeout(() => existing.classList.remove('visible'), 8000);
    return;
  }

  const strip = document.createElement('div');
  strip.id = 'wl-exit-intent';
  strip.className = 'exit-intent-strip';
  strip.setAttribute('role', 'alert');
  strip.setAttribute('aria-live', 'polite');
  strip.innerHTML = `
    <span>Still deciding? <strong>500+ professionals</strong> trust Wavelink NFC cards →</span>
    <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
      <a href="#reviews"
         style="font-weight:700;color:white;text-decoration:underline;font-size:0.8rem;white-space:nowrap"
         onclick="document.getElementById('wl-exit-intent')?.classList.remove('visible')"
      >See Reviews</a>
      <button onclick="document.getElementById('wl-exit-intent')?.classList.remove('visible')"
              aria-label="Dismiss"
              style="background:none;border:none;color:white;cursor:pointer;padding:4px;min-height:44px;min-width:44px;display:flex;align-items:center;justify-content:center">
        ✕
      </button>
    </div>
  `;

  document.body.appendChild(strip);

  requestAnimationFrame(() => {
    strip.classList.add('visible');
    setTimeout(() => strip.classList.remove('visible'), 8000);
  });
}

// ─── HOT SECTION HIGHLIGHTER (Return Visits) ─────────────────────────────────

export function applyHotSectionHighlights(): void {
  const scores = getSectionEngagementScores();
  if (!scores.length) return;

  // Top 30% of sections get highlighted
  const sorted  = [...scores].sort((a, b) => b.score - a.score);
  const topN    = Math.max(1, Math.ceil(sorted.length * 0.3));
  const topIds  = new Set(sorted.slice(0, topN).map((s) => s.id));

  TRACKED_SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (topIds.has(id)) {
      el.classList.add('section-hot');
    }
  });
}

// ─── ENGAGEMENT SCORING ───────────────────────────────────────────────────────

export interface SectionScore { id: string; score: number; }

export function getSectionEngagementScores(): SectionScore[] {
  const events  = loadEvents();
  const scores: Record<string, number> = {};

  events.forEach((e) => {
    const id = e.section;
    if (!id) return;
    if (!scores[id]) scores[id] = 0;

    switch (e.type) {
      case 'scroll_depth':  scores[id] += 1; break;
      case 'time_on_section':
        scores[id] += Math.min(e.duration! / 1000, 10); // Cap at 10pts per visit
        break;
      case 'click':         scores[id] += 2; break;
      case 'cta_click':     scores[id] += 5; break;
    }
  });

  return Object.entries(scores).map(([id, score]) => ({ id, score }));
}

// ─── CLICK HEATMAP DATA ───────────────────────────────────────────────────────

export interface HeatmapPoint { x: number; y: number; count: number; label: string; }

export function getHeatmapPoints(): HeatmapPoint[] {
  const events = loadEvents().filter((e) => e.type === 'click' && e.x !== undefined);
  const grid: Map<string, HeatmapPoint> = new Map();

  events.forEach((e) => {
    // Bucket into 40px grid cells
    const gx    = Math.round((e.x || 0) / 40) * 40;
    const gy    = Math.round((e.y || 0) / 40) * 40;
    const key   = `${gx},${gy}`;
    const existing = grid.get(key);
    if (existing) {
      existing.count++;
    } else {
      grid.set(key, { x: gx, y: gy, count: 1, label: e.target || '' });
    }
  });

  return Array.from(grid.values()).sort((a, b) => b.count - a.count);
}

// ─── SCROLL FUNNEL DATA ───────────────────────────────────────────────────────

export interface FunnelStep { depth: number; sessions: number; pct: number; }

export function getScrollFunnel(): FunnelStep[] {
  const events  = loadEvents().filter((e) => e.type === 'scroll_depth');
  const totals: Map<number, Set<string>> = new Map();

  events.forEach((e) => {
    if (!totals.has(e.depth!)) totals.set(e.depth!, new Set());
    totals.get(e.depth!)!.add(e.session);
  });

  const allSessions = new Set(loadEvents().map((e) => e.session)).size || 1;

  return SCROLL_MILESTONES.map((m) => ({
    depth:    m,
    sessions: totals.get(m)?.size || 0,
    pct:      Math.round(((totals.get(m)?.size || 0) / allSessions) * 100),
  }));
}

// ─── CTA PERFORMANCE TABLE ────────────────────────────────────────────────────

export interface CTAPerformance { target: string; clicks: number; }

export function getCTAPerformance(): CTAPerformance[] {
  const events = loadEvents().filter((e) => e.type === 'cta_click');
  const map: Map<string, number> = new Map();

  events.forEach((e) => {
    const key = e.target || 'Unknown';
    map.set(key, (map.get(key) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([target, clicks]) => ({ target, clicks }))
    .sort((a, b) => b.clicks - a.clicks);
}

// ─── SESSION STATS ────────────────────────────────────────────────────────────

export interface SessionStats {
  totalSessions:    number;
  avgDurationMs:    number;
  totalEvents:      number;
}

export function getSessionStats(): SessionStats {
  const events = loadEvents();
  const sessionMap: Map<string, number[]> = new Map();

  events.forEach((e) => {
    if (!sessionMap.has(e.session)) sessionMap.set(e.session, []);
    sessionMap.get(e.session)!.push(e.ts);
  });

  let totalDuration = 0;
  sessionMap.forEach((timestamps) => {
    if (timestamps.length > 1) {
      totalDuration += Math.max(...timestamps) - Math.min(...timestamps);
    }
  });

  const totalSessions = sessionMap.size;
  return {
    totalSessions,
    avgDurationMs: totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0,
    totalEvents:   events.length,
  };
}

// ─── DATA EXPORT ─────────────────────────────────────────────────────────────

export function exportAnalyticsJSON(): void {
  const data    = loadEvents();
  const blob    = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const anchor  = document.createElement('a');
  anchor.href   = url;
  anchor.download = `wavelink-analytics-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

// ─── INITIALIZER ─────────────────────────────────────────────────────────────

let initialized = false;

export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  trackEvent('page_view', { value: document.referrer || 'direct' });
  trackEvent('session_start', { value: navigator.userAgent.slice(0, 60) });

  // Defer non-critical setup for LCP
  requestIdleCallback(() => {
    setupScrollDepth();
    setupClickTracking();
    setupFormTracking();
    setupSectionTimer();
    setupExitIntent();
    initPerformanceClarity((metricName, metricValue) => {
      trackEvent('perf_metric', {
        target: metricName,
        duration: metricValue,
      });
    });
  }, { timeout: 3000 });

  // Apply hot section highlights for returning visitors
  const visitCount = parseInt(localStorage.getItem('wl_visit_count') || '0', 10);
  if (visitCount > 1) {
    setTimeout(applyHotSectionHighlights, 2000);
  }

  // Expose global debug API
  (window as any).__wlAnalytics = {
    getEvents:     loadEvents,
    getScores:     getSectionEngagementScores,
    getHeatmap:    getHeatmapPoints,
    getFunnel:     getScrollFunnel,
    getCTAs:       getCTAPerformance,
    getStats:      getSessionStats,
    export:        exportAnalyticsJSON,
    clear:         () => localStorage.removeItem(LS_KEY),
  };
}
