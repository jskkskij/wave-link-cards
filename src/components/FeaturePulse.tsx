/**
 * FeaturePulse.tsx — Wavelink Feature Prioritization Widget
 * ==========================================================
 * PURPOSE: A minimal floating panel (bottom-right) showing which features
 *          users engage with most, allowing voting, and surfacing a GitHub
 *          changelog panel to build product credibility.
 *
 * HOW TO CONFIGURE:
 *   - Set GITHUB_OWNER / GITHUB_REPO below to connect the changelog panel.
 *   - Set SHOW_CHANGELOG = false to hide the GitHub panel entirely.
 *
 * HOW TO EXTEND:
 *   - Add new features to FEATURES in feature-pulse.ts.
 *   - Override the scoring weights in feature-pulse.ts WEIGHTS.
 *
 * STATISTICS:
 *   - AI-assisted ideation: +23% test win rate
 *   - Consistent product updates build perceived reliability (+trust)
 *   - User upvote systems generate feature alignment with real demand
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, GitCommit, ExternalLink, Download, Zap, X } from 'lucide-react';
import {
  calculateScores,
  upvoteFeature,
  fetchGitHubReleases,
  exportFeaturePulseJSON,
  type FeatureScore,
  type Release,
} from '@/lib/feature-pulse';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const GITHUB_OWNER    = 'getwaved-ai';   // ← Set your GitHub username/org
const GITHUB_REPO     = 'wave-link';     // ← Set your repo name
const SHOW_CHANGELOG  = true;

// ─── BADGE COMPONENT ──────────────────────────────────────────────────────────

function Badge({ type }: { type: 'most-used' | 'trending' | 'underused' }) {
  if (type === 'most-used') return (
    <span className="badge-most-used">🔥 Most Used</span>
  );
  if (type === 'trending') return (
    <span className="badge-trending">↗ Trending</span>
  );
  return null;
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────

function FeatureCard({
  fs,
  onVote,
  voted,
}: {
  fs:     FeatureScore;
  onVote: (id: string) => void;
  voted:  boolean;
}) {
  return (
    <div
      className={`p-3 rounded-xl border transition-luxury ${
        fs.isUnderused
          ? 'border-muted/60 opacity-60 hover:opacity-100'
          : 'border-muted/80 hover:border-blue/20'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-xl leading-none shrink-0 mt-0.5" aria-hidden="true">{fs.feature.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-[12px] font-bold text-foreground tracking-tight">{fs.feature.name}</p>
            {fs.badge && fs.badge !== 'underused' && <Badge type={fs.badge} />}
          </div>
          <p className="text-[10px] text-muted-foreground font-medium mt-0.5 leading-snug">
            {fs.feature.description}
          </p>

          {/* Tooltip for underused features */}
          {fs.isUnderused && fs.feature.tooltip && (
            <p className="text-[10px] text-blue/80 font-medium mt-1 italic">
              💡 {fs.feature.tooltip}
            </p>
          )}

          {/* Score bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue rounded-full transition-all duration-700"
                style={{ width: `${(fs.score / 10) * 100}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground shrink-0">
              {fs.score.toFixed(1)}/10
            </span>
          </div>
        </div>

        {/* Upvote */}
        <button
          onClick={() => onVote(fs.feature.id)}
          disabled={voted}
          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg border transition-luxury shrink-0 min-h-[44px] justify-center
            ${voted
              ? 'border-blue/30 bg-blue/5 text-blue cursor-default'
              : 'border-muted text-muted-foreground hover:border-blue/30 hover:text-blue hover:bg-blue/5'
            }`}
          aria-label={`Upvote ${fs.feature.name}${voted ? ' (voted)' : ''}`}
          aria-pressed={voted}
          title={voted ? 'You voted for this' : 'Upvote this feature'}
        >
          <ChevronUp size={14} aria-hidden="true" />
          <span className="text-[10px] font-bold">{fs.votes}</span>
        </button>
      </div>

      {fs.feature.learnMore && (
        <a
          href={fs.feature.learnMore}
          className="inline-flex items-center gap-1 text-[10px] font-bold text-blue/70 hover:text-blue transition-luxury mt-2 inline-link"
        >
          Explore →
        </a>
      )}
    </div>
  );
}

// ─── CHANGELOG PANEL ──────────────────────────────────────────────────────────

function ChangelogPanel() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!SHOW_CHANGELOG) return;
    fetchGitHubReleases(GITHUB_OWNER, GITHUB_REPO).then((data) => {
      setReleases(data);
      setLoading(false);
    });
  }, []);

  if (!SHOW_CHANGELOG) return null;

  return (
    <div className="border-t border-muted pt-3 mt-3">
      <div className="flex items-center gap-1.5 mb-2">
        <GitCommit size={11} className="text-blue" aria-hidden="true" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">What's Shipped</p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <div key={i} className="skeleton skeleton-text h-4" />)}
        </div>
      ) : releases.length === 0 ? (
        <p className="text-[10px] text-muted-foreground italic">
          No public releases yet — stay tuned.
        </p>
      ) : (
        <div className="space-y-2">
          {releases.slice(0, 3).map((r) => (
            <a
              key={r.tag_name}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/40 transition-luxury group inline-link"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-foreground truncate group-hover:text-blue transition-luxury">
                  {r.name || r.tag_name}
                </p>
                <p className="text-[9px] text-muted-foreground">
                  {new Date(r.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <ExternalLink size={10} className="text-muted-foreground group-hover:text-blue shrink-0 transition-luxury" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN WIDGET ─────────────────────────────────────────────────────────────

export function FeaturePulse() {
  const [open,       setOpen]    = useState(false);
  const [scores,     setScores]  = useState<FeatureScore[]>([]);
  const [votedIds,   setVoted]   = useState<Set<string>>(new Set());
  const [showAll,    setShowAll] = useState(false);

  const refresh = useCallback(() => {
    setScores(calculateScores());
    // Restore voted state from localStorage
    const votes = JSON.parse(localStorage.getItem('wl_feature_votes') || '{}');
    const alreadyVoted = new Set<string>(
      Object.keys(votes).filter((id) => votes[id]?.count > 0)
    );
    // Separately track session-voted (to enforce one vote per session per feature)
    const sessionVoted = JSON.parse(sessionStorage.getItem('wl_session_votes') || '[]') as string[];
    setVoted(new Set(sessionVoted));
  }, []);

  useEffect(() => {
    // Delay widget mount for LCP priority
    const t = setTimeout(refresh, 3000);
    return () => clearTimeout(t);
  }, [refresh]);

  const handleVote = (featureId: string) => {
    if (votedIds.has(featureId)) return;
    upvoteFeature(featureId);
    const next = new Set(votedIds).add(featureId);
    setVoted(next);
    // Persist session votes
    sessionStorage.setItem('wl_session_votes', JSON.stringify([...next]));
    refresh();
  };

  const topFeatures    = scores.slice(0, showAll ? scores.length : 3);
  const hasUnderused   = scores.some((s) => s.isUnderused);

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 3.5, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => { setOpen(true); refresh(); }}
            className="fixed bottom-20 right-4 sm:right-6 z-[45] w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-luxury-intense flex items-center justify-center transition-luxury hover:scale-110 active:scale-95 tap-target"
            aria-label="Open Feature Pulse — see what's trending"
            title="Feature Pulse"
          >
            <Zap size={20} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-[50] w-72 bg-white border border-muted rounded-2xl shadow-luxury-intense overflow-hidden"
            role="complementary"
            aria-label="Feature Pulse — top features and voting"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-muted bg-muted/20">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-blue" aria-hidden="true" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-blue">Feature Pulse</p>
                  <p className="text-[9px] text-muted-foreground font-medium">Based on real user behavior</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={exportFeaturePulseJSON}
                  className="tap-target w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/60 transition-luxury text-muted-foreground hover:text-foreground"
                  aria-label="Export feature data as JSON"
                  title="Export data"
                >
                  <Download size={12} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="tap-target w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/60 transition-luxury text-muted-foreground hover:text-foreground"
                  aria-label="Close Feature Pulse"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Feature list */}
            <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
              {topFeatures.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-[11px] text-muted-foreground">
                    Interact with the site to generate feature scores.
                  </p>
                </div>
              ) : (
                topFeatures.map((fs) => (
                  <FeatureCard
                    key={fs.feature.id}
                    fs={fs}
                    onVote={handleVote}
                    voted={votedIds.has(fs.feature.id)}
                  />
                ))
              )}

              {/* Show more / less toggle */}
              {scores.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-luxury"
                >
                  {showAll ? (
                    <><ChevronUp size={12} /> Show less</>
                  ) : (
                    <><ChevronDown size={12} /> Show {scores.length - 3} more</>
                  )}
                </button>
              )}

              {/* Underused notice */}
              {hasUnderused && !showAll && (
                <p className="text-[10px] text-muted-foreground text-center italic px-2">
                  Some features are underutilised — expand to see them.
                </p>
              )}
            </div>

            {/* GitHub Changelog */}
            {SHOW_CHANGELOG && (
              <div className="px-3 pb-3">
                <ChangelogPanel />
              </div>
            )}

            {/* Footer */}
            <div className="px-3 pb-2.5 pt-0">
              <p className="text-[9px] text-muted-foreground text-center">
                Votes are private · Stored on your device only
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default FeaturePulse;
