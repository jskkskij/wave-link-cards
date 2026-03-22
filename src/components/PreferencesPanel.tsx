/**
 * PreferencesPanel.tsx — Wavelink User Self-Segmentation Panel
 * =============================================================
 * PURPOSE: A minimal, non-intrusive slide-in panel that asks the user to
 *          identify their role (Individual Professional / SME / Enterprise).
 *          Persists selection to localStorage so the personalization engine
 *          can tailor content on this and all future sessions.
 *
 * HOW TO USE:
 *   <PreferencesPanel onSelect={handleSegmentSet} />
 *   Render this in Index.tsx. It auto-hides itself after a segment is chosen
 *   or dismissed, and only re-appears on fresh first visits.
 *
 * HOW TO CONFIGURE:
 *   Edit the SEGMENT_OPTIONS array below to change labels, descriptions, or icons.
 *
 * STATISTICS:
 *   - Personalized experiences → up to +200% CVR
 *   - User self-segmentation improves content relevance and reduces bounce
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Building2, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  type Segment,
  setSegment,
  dismissPreferencesPanel,
  shouldShowPreferencesPanel,
} from '@/lib/personalization';

interface PreferencesPanelProps {
  /** Called after the user selects a segment */
  onSelect?: (segment: Segment) => void;
  /** Called when user dismisses without selecting */
  onDismiss?: () => void;
}

const SEGMENT_OPTIONS: Array<{
  value: Segment;
  label: string;
  description: string;
  Icon: React.ElementType;
}> = [
  {
    value: 'professional',
    label: 'Individual Professional',
    description: 'I need a smart card for my personal networking',
    Icon: Briefcase,
  },
  {
    value: 'sme',
    label: 'SME / Small Team',
    description: 'I\'m equipping a team of 2–50 people',
    Icon: Building2,
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'I need bulk deployment, custom branding, or API access',
    Icon: Building,
  },
];

export function PreferencesPanel({ onSelect, onDismiss }: PreferencesPanelProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Segment | null>(null);

  useEffect(() => {
    // Delay to avoid distracting from initial page load
    const timer = setTimeout(() => {
      if (shouldShowPreferencesPanel()) {
        setVisible(true);
      }
    }, 15000); // Show after 15 seconds of browsing

    // Also trigger at 50% scroll depth
    const handleScroll = () => {
      if (visible) return;
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrolled >= 50 && shouldShowPreferencesPanel()) {
        setVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  const handleSelect = (segment: Segment) => {
    setSelected(segment);
    setSegment(segment);

    // Brief confirmation before closing
    setTimeout(() => {
      setVisible(false);
      onSelect?.(segment);
    }, 600);
  };

  const handleDismiss = () => {
    setVisible(false);
    dismissPreferencesPanel();
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/10 backdrop-blur-[2px] md:hidden"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-[75] w-[calc(100vw-2rem)] max-w-sm bg-white border border-muted rounded-2xl shadow-luxury-intense overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prefs-title"
            aria-describedby="prefs-desc"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-3 border-b border-muted">
              <div>
                <p className="fluid-label text-blue mb-1">Personalize Your Experience</p>
                <h2 id="prefs-title" className="text-base font-serif font-bold text-foreground leading-tight">
                  I'm here as a...
                </h2>
                <p id="prefs-desc" className="text-[12px] text-muted-foreground mt-1 font-medium">
                  We'll tailor what you see. No account needed.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="tap-target flex items-center justify-center w-[36px] h-[36px] rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-luxury -mt-1 -mr-1 shrink-0"
                aria-label="Dismiss preferences panel"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
              {SEGMENT_OPTIONS.map(({ value, label, description, Icon }) => (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-luxury text-left group
                    ${selected === value
                      ? 'border-blue/30 bg-blue/5'
                      : 'border-muted hover:border-blue/20 hover:bg-warm-gray/60'
                    }`}
                  aria-pressed={selected === value}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-luxury
                    ${selected === value
                      ? 'bg-blue text-white'
                      : 'bg-muted/60 text-muted-foreground group-hover:bg-blue/10 group-hover:text-blue'
                    }`}>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground tracking-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground font-medium leading-snug mt-0.5 truncate">{description}</p>
                  </div>
                  {selected === value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto shrink-0 w-5 h-5 rounded-full bg-blue flex items-center justify-center"
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 pt-1">
              <p className="text-[10px] text-muted-foreground text-center font-medium">
                🔒 Stored only on your device. Never shared.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default PreferencesPanel;
