/**
 * AnalyticsDashboard.tsx — Wavelink Developer Analytics Dashboard
 * ===============================================================
 * PURPOSE: Hidden developer dashboard displaying behavioral analytics
 *          collected by analytics.ts. Zero impact on production UX.
 *
 * HOW TO OPEN:
 *   Press Shift+Alt+D on any page, OR navigate to /analytics.
 *
 * HOW TO EXTEND:
 *   - Add new panels by importing more functions from analytics.ts.
 *   - Use the exportAnalyticsJSON() function to download data for A/B testing.
 *
 * STATISTICS:
 *   - Heatmap-optimized pages convert 14% higher
 *   - Data-driven decisions produce 2.1× faster growth
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, BarChart3, MousePointer, TrendingUp, Clock, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getHeatmapPoints,
  getScrollFunnel,
  getCTAPerformance,
  getSectionEngagementScores,
  getSessionStats,
  exportAnalyticsJSON,
  type HeatmapPoint,
  type FunnelStep,
  type CTAPerformance,
  type SectionScore,
  type SessionStats,
} from '@/lib/analytics';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface DashboardData {
  heatmap:  HeatmapPoint[];
  funnel:   FunnelStep[];
  ctas:     CTAPerformance[];
  sections: SectionScore[];
  stats:    SessionStats;
}

// ─── TABS ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',  label: 'Overview',    Icon: BarChart3 },
  { id: 'heatmap',   label: 'Click Map',   Icon: MousePointer },
  { id: 'funnel',    label: 'Scroll Funnel', Icon: TrendingUp },
  { id: 'ctas',      label: 'CTAs',        Icon: Zap },
  { id: 'sections',  label: 'Sections',    Icon: Clock },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmt(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function heatColor(count: number, max: number): string {
  const t = count / (max || 1);
  if (t > 0.7) return '#ef4444'; // hot
  if (t > 0.4) return '#f97316'; // warm
  if (t > 0.2) return '#eab308'; // mild
  return '#3b82f6';              // cold
}

// ─── SUBPANELS ────────────────────────────────────────────────────────────────

function OverviewPanel({ stats, sections }: { stats: SessionStats; sections: SectionScore[] }) {
  const topSection = sections.sort((a, b) => b.score - a.score)[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Sessions',    value: stats.totalSessions },
          { label: 'Events',      value: stats.totalEvents },
          { label: 'Avg Duration', value: fmt(stats.avgDurationMs) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-muted/40 rounded-xl p-4 text-center">
            <p className="text-2xl font-serif font-bold text-foreground">{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {topSection && (
        <div className="bg-blue/5 border border-blue/15 rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue mb-1">Top Section</p>
          <p className="font-bold text-foreground">#{topSection.id}</p>
          <p className="text-sm text-muted-foreground">Engagement score: {topSection.score.toFixed(1)}</p>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground text-center">
        Data stored locally · <button onClick={exportAnalyticsJSON} className="underline font-bold text-blue inline-link">Export JSON</button>
      </p>
    </div>
  );
}

function HeatmapPanel({ points }: { points: HeatmapPoint[] }) {
  const max = points[0]?.count || 1;

  if (!points.length) return <EmptyState label="No clicks recorded yet. Interact with the page first." />;

  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Top {Math.min(points.length, 20)} click areas (40px grid cells)</p>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {points.slice(0, 20).map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              style={{ backgroundColor: heatColor(p.count, max), width: `${Math.max(8, (p.count / max) * 80)}%` }}
              className="h-6 rounded-md flex items-center px-2 shrink-0 min-w-[40px] transition-all"
            >
              <span className="text-white text-[10px] font-bold truncate">{p.count}×</span>
            </div>
            <span className="text-[11px] text-muted-foreground truncate flex-1">{p.label || `(${p.x}, ${p.y})`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FunnelPanel({ funnel }: { funnel: FunnelStep[] }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">% of sessions reaching each scroll milestone</p>
      {funnel.map((step) => (
        <div key={step.depth}>
          <div className="flex justify-between mb-1">
            <span className="text-[12px] font-bold text-foreground">{step.depth}% depth</span>
            <span className="text-[12px] font-bold text-blue">{step.pct}% ({step.sessions} sessions)</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-blue rounded-full transition-all duration-700"
              style={{ width: `${step.pct}%` }}
            />
          </div>
        </div>
      ))}
      {funnel.every((s) => !s.sessions) && <EmptyState label="No scroll data yet. Scroll down on the page first." />}
    </div>
  );
}

function CTAPanel({ ctas }: { ctas: CTAPerformance[] }) {
  if (!ctas.length) return <EmptyState label="No CTA clicks recorded yet. Add data-track-cta to your CTA elements." />;
  const max = ctas[0]?.clicks || 1;

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
      {ctas.map((cta, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
          <span className="text-[11px] font-bold text-muted-foreground w-4">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-foreground truncate">{cta.target}</p>
            <div className="h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-blue rounded-full"
                style={{ width: `${(cta.clicks / max) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-[12px] font-bold text-blue shrink-0">{cta.clicks}×</span>
        </div>
      ))}
    </div>
  );
}

function SectionsPanel({ sections }: { sections: SectionScore[] }) {
  if (!sections.length) return <EmptyState label="No section data yet. Scroll through the page to generate data." />;
  const sorted = [...sections].sort((a, b) => b.score - a.score);
  const max    = sorted[0]?.score || 1;

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
      {sorted.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <a
            href={`#${s.id}`}
            className="text-[11px] font-mono font-bold text-blue w-24 shrink-0 truncate inline-link"
          >
            #{s.id}
          </a>
          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(s.score / max) * 100}%`,
                backgroundColor: heatColor(s.score, max),
              }}
            />
          </div>
          <span className="text-[11px] font-bold text-muted-foreground w-12 text-right shrink-0">{s.score.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="py-8 text-center">
      <p className="text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export function AnalyticsDashboard() {
  const [open, setOpen]       = useState(false);
  const [activeTab, setTab]   = useState<TabId>('overview');
  const [data, setData]       = useState<DashboardData | null>(null);

  const refresh = useCallback(() => {
    setData({
      heatmap:  getHeatmapPoints(),
      funnel:   getScrollFunnel(),
      ctas:     getCTAPerformance(),
      sections: getSectionEngagementScores(),
      stats:    getSessionStats(),
    });
  }, []);

  // Keyboard shortcut: Shift+Alt+D
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'D') {
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Load data when opened
  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-sm bg-white border-l border-muted shadow-luxury-intense flex flex-col"
            role="dialog"
            aria-label="Analytics Dashboard"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-muted shrink-0">
              <div>
                <p className="fluid-label text-blue">Developer Dashboard</p>
                <h2 className="font-serif font-bold text-foreground text-lg">Wavelink Analytics</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refresh}
                  className="tap-target w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted/60 transition-luxury text-muted-foreground hover:text-foreground"
                  aria-label="Refresh data"
                  title="Refresh"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  onClick={exportAnalyticsJSON}
                  className="tap-target w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted/60 transition-luxury text-muted-foreground hover:text-foreground"
                  aria-label="Export data as JSON"
                  title="Export JSON"
                >
                  <Download size={15} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="tap-target w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted/60 transition-luxury text-muted-foreground hover:text-foreground"
                  aria-label="Close dashboard"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Shortcut reminder */}
            <div className="px-4 py-2 bg-muted/30 shrink-0">
              <p className="text-[10px] text-muted-foreground">
                Toggle with <kbd className="px-1 py-0.5 bg-white border border-muted rounded text-[9px] font-mono">Shift+Alt+D</kbd>
              </p>
            </div>

            {/* Tab nav */}
            <div className="flex border-b border-muted overflow-x-auto shrink-0">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-luxury border-b-2 -mb-px
                    ${activeTab === id
                      ? 'border-blue text-blue'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  aria-selected={activeTab === id}
                >
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {data ? (
                <>
                  {activeTab === 'overview'  && <OverviewPanel stats={data.stats} sections={data.sections} />}
                  {activeTab === 'heatmap'   && <HeatmapPanel points={data.heatmap} />}
                  {activeTab === 'funnel'    && <FunnelPanel funnel={data.funnel} />}
                  {activeTab === 'ctas'      && <CTAPanel ctas={data.ctas} />}
                  {activeTab === 'sections'  && <SectionsPanel sections={data.sections} />}
                </>
              ) : (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton skeleton-card h-20" />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-muted shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  if (confirm('Clear all analytics data?')) {
                    (window as any).__wlAnalytics?.clear();
                    refresh();
                  }
                }}
              >
                Clear All Data
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default AnalyticsDashboard;
