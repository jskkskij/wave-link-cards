/**
 * feature-pulse.ts — Wavelink Feature Priority Scoring Engine
 * ============================================================
 * PURPOSE: Calculates priority scores for tracked features using a weighted
 *          formula combining behavioral analytics, user votes, and recency.
 *          Powers the FeaturePulse widget.
 *
 * HOW TO CONFIGURE:
 *   - Edit FEATURES array to add/rename/remove features.
 *   - Adjust WEIGHTS to tune the scoring formula balance.
 *   - Set RECENCY_WINDOW_DAYS to change the "recent activity" lookback period.
 *
 * HOW TO EXTEND:
 *   - Add a serverSyncURL field to FEATURES to push votes to a backend.
 *   - Import getSectionEngagementScores() from analytics.ts for live scoring.
 *
 * SCORING FORMULA:
 *   Score = (engagement_rate × 0.5) + (user_votes × 0.3) + (recency_weight × 0.2)
 *   - engagement_rate: Normalized 0–10 score from analytics section data
 *   - user_votes:      Raw upvote count from localStorage, normalized
 *   - recency_weight:  0–10 based on interactions within RECENCY_WINDOW_DAYS
 *
 * EXPORT:
 *   window.__wlPulse.export() — downloads all scores + votes as JSON.
 *
 * STATISTICS:
 *   - AI-assisted test ideation: +23% win rate
 *   - Layout redesign tests: 18–40% conversion lifts
 *   - 10+ tests/month: 2.1× faster growth
 */

import { getSectionEngagementScores, type SectionScore } from '@/lib/analytics';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

const WEIGHTS = {
  engagement: 0.5,
  votes:      0.3,
  recency:    0.2,
};

const RECENCY_WINDOW_DAYS = 7;

const LS_VOTES_KEY = 'wl_feature_votes';

// ─── FEATURES REGISTRY ────────────────────────────────────────────────────────

export interface FeatureDefinition {
  id:          string;
  name:        string;
  description: string;
  sectionId:   string;   // DOM id of the section this feature lives in
  learnMore?:  string;   // href for "learn more" link
  icon:        string;   // Emoji or short label
  tooltip?:    string;   // Contextual tooltip for underused features
}

export const FEATURES: FeatureDefinition[] = [
  {
    id:          'nfc-card',
    name:        'NFC Smart Card',
    description: 'One-tap digital profile sharing via NFC',
    sectionId:   'features',
    icon:        '💳',
    learnMore:   '#features',
    tooltip:     'Tap your card on any phone — no app needed. Works on 95% of modern devices.',
  },
  {
    id:          'review-stand',
    name:        'NFC Review Stand',
    description: 'Turn every customer into a 5-star reviewer',
    sectionId:   'phase-2',
    icon:        '⭐',
    learnMore:   '#features',
    tooltip:     'Place on your counter — customers tap to leave a Google Review instantly.',
  },
  {
    id:          'affiliate',
    name:        'Affiliate Programme',
    description: 'Earn by referring professionals to Wavelink',
    sectionId:   'affiliate',
    icon:        '🤝',
    learnMore:   '#affiliate',
    tooltip:     'Earn a commission for every successful referral. Join in under 2 minutes.',
  },
  {
    id:          'growth-funnel',
    name:        'AI Trust Funnel',
    description: 'The 3-phase methodology to build online trust',
    sectionId:   'phase-1',
    icon:        '🚀',
    learnMore:   '#funnel',
    tooltip:     'See how Spark → Power → Leap transforms your digital presence.',
  },
  {
    id:          'pricing',
    name:        'Pricing & Order',
    description: 'Transparent pricing with 3-day delivery',
    sectionId:   'order',
    icon:        '🏷️',
    learnMore:   '#order',
    tooltip:     'Volume discounts available for teams. No hidden fees — ever.',
  },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface FeatureScore {
  feature:         FeatureDefinition;
  score:           number;            // 0–10 total
  engagementScore: number;
  voteScore:       number;
  recencyScore:    number;
  votes:           number;
  badge:           'most-used' | 'trending' | 'underused' | null;
  isUnderused:     boolean;
}

export interface VoteStore {
  [featureId: string]: { count: number; lastVoted: number; };
}

// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────────────────────

function loadVotes(): VoteStore {
  try { return JSON.parse(localStorage.getItem(LS_VOTES_KEY) || '{}'); }
  catch { return {}; }
}

function saveVotes(votes: VoteStore): void {
  try { localStorage.setItem(LS_VOTES_KEY, JSON.stringify(votes)); }
  catch { /* no-op */ }
}

export function upvoteFeature(featureId: string): void {
  const votes = loadVotes();
  if (!votes[featureId]) votes[featureId] = { count: 0, lastVoted: 0 };
  votes[featureId].count++;
  votes[featureId].lastVoted = Date.now();
  saveVotes(votes);
}

export function getVotes(): VoteStore {
  return loadVotes();
}

// ─── SCORING ─────────────────────────────────────────────────────────────────

function normalize(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.min((value / max) * 10, 10);
}

function getRecencyScore(featureId: string, sectionScores: SectionScore[]): number {
  try {
    const events = JSON.parse(localStorage.getItem('wl_events') || '[]') as Array<{
      type: string; section?: string; ts: number;
    }>;
    const cutoff  = Date.now() - RECENCY_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const feature = FEATURES.find((f) => f.id === featureId);
    if (!feature) return 0;

    const recentEvents = events.filter(
      (e) => e.section === feature.sectionId && e.ts >= cutoff
    );
    // Score: how many recent events, capped at 10
    const maxExpected = 20;
    return normalize(Math.min(recentEvents.length, maxExpected), maxExpected);
  } catch {
    return 0;
  }
}

export function calculateScores(): FeatureScore[] {
  const sectionScores = getSectionEngagementScores();
  const votes         = loadVotes();

  const maxEngagement = Math.max(...sectionScores.map((s) => s.score), 1);
  const maxVotes      = Math.max(...Object.values(votes).map((v) => v.count), 1);

  const scores: FeatureScore[] = FEATURES.map((feature) => {
    const sectionScore  = sectionScores.find((s) => s.id === feature.sectionId);
    const rawEngagement = sectionScore?.score || 0;
    const rawVotes      = votes[feature.id]?.count || 0;

    const engagementScore = normalize(rawEngagement, maxEngagement);
    const voteScore       = normalize(rawVotes, maxVotes);
    const recencyScore    = getRecencyScore(feature.id, sectionScores);

    const score =
      engagementScore * WEIGHTS.engagement +
      voteScore       * WEIGHTS.votes +
      recencyScore    * WEIGHTS.recency;

    return {
      feature,
      score,
      engagementScore,
      voteScore,
      recencyScore,
      votes: rawVotes,
      badge:       null, // assigned below
      isUnderused: false,
    };
  });

  // Sort descending
  scores.sort((a, b) => b.score - a.score);

  // Assign badges
  const maxScore = scores[0]?.score || 1;
  scores.forEach((s, i) => {
    if (i === 0 && s.score > 0)     s.badge = 'most-used';
    else if (i === 1 && s.score > 0) s.badge = 'trending';
    else if (s.score < maxScore * 0.2) {
      s.badge      = 'underused';
      s.isUnderused = true;
    }
  });

  return scores;
}

// ─── GITHUB CHANGELOG FETCHER ─────────────────────────────────────────────────

export interface Release {
  tag_name:    string;
  name:        string;
  body:        string;
  html_url:    string;
  published_at: string;
}

const CHANGELOG_CACHE_KEY = 'wl_changelog_cache';
const CHANGELOG_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

export async function fetchGitHubReleases(owner: string, repo: string): Promise<Release[]> {
  // Use cached version if fresh enough
  try {
    const cached = localStorage.getItem(CHANGELOG_CACHE_KEY);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < CHANGELOG_CACHE_TTL) return data;
    }
  } catch { /* ignore */ }

  try {
    const res  = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`);
    if (!res.ok) throw new Error('GitHub API error');
    const data: Release[] = await res.json();

    localStorage.setItem(CHANGELOG_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
    return data;
  } catch {
    // Graceful degradation — return empty
    return [];
  }
}

// ─── EXPORT API ───────────────────────────────────────────────────────────────

export function exportFeaturePulseJSON(): void {
  const data  = { scores: calculateScores(), votes: loadVotes(), exported: new Date().toISOString() };
  const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement('a');
  a.href      = url;
  a.download  = `wavelink-feature-pulse-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
