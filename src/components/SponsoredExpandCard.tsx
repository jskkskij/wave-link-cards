import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";
import { markSponsoredDismissal } from "@/lib/sponsored-orchestrator";
import { trackSponsoredEvent } from "@/lib/analytics";

type SponsoredState = "collapsed" | "hint" | "expanded" | "dismissed";

interface SponsoredExpandCardProps {
  partner: string;
  sourceId: string;
  placement: string;
  ruleVersion: string;
}

export const SponsoredExpandCard = ({
  partner,
  sourceId,
  placement,
  ruleVersion,
}: SponsoredExpandCardProps) => {
  const [state, setState] = useState<SponsoredState>("collapsed");
  const [expandedAt, setExpandedAt] = useState<number | null>(null);
  const hintTrackedRef = useRef(false);
  const expandTrackedRef = useRef(false);

  const isExpanded = state === "expanded";
  const panelId = useMemo(() => `sponsored-panel-${sourceId}`, [sourceId]);

  useEffect(() => {
    if (state === "hint" && !hintTrackedRef.current) {
      hintTrackedRef.current = true;
      trackSponsoredEvent("sponsored_hint", {
        target: partner,
        value: `${placement}|${ruleVersion}`,
      });
    }

    if (state === "expanded" && !expandTrackedRef.current) {
      expandTrackedRef.current = true;
      setExpandedAt(Date.now());
      trackSponsoredEvent("sponsored_expand", {
        target: partner,
        value: `${sourceId}|${placement}|${ruleVersion}`,
      });
    }
  }, [partner, placement, ruleVersion, sourceId, state]);

  const onDismiss = () => {
    const dwell = expandedAt ? Date.now() - expandedAt : 0;
    markSponsoredDismissal();
    setState("dismissed");
    trackSponsoredEvent("sponsored_dismiss", {
      target: partner,
      duration: dwell,
      value: `${sourceId}|${placement}|${ruleVersion}`,
    });
  };

  const onCtaClick = () => {
    const dwell = expandedAt ? Date.now() - expandedAt : 0;
    trackSponsoredEvent("sponsored_cta_click", {
      target: "Enable Auto-Routing",
      duration: dwell,
      value: `${partner}|${sourceId}|${placement}|${ruleVersion}`,
    });
  };

  return (
    <Card
      className="relative bg-card/80 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out shadow-sm hover:shadow-card-hover group overflow-hidden"
      role="article"
      aria-label={`Sponsored recommendation from ${partner}`}
      onMouseEnter={() => setState((prev) => (prev === "collapsed" ? "hint" : prev))}
      onFocus={() => setState((prev) => (prev === "collapsed" ? "hint" : prev))}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1">
              Sponsored
            </span>
            <h4 className="mt-3 font-semibold text-foreground">
              Transit to EU Markets
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Data-guided route support for customs-heavy lanes with a verified logistics partner.
            </p>
          </div>
          <Sparkles size={18} className="text-accent shrink-0 mt-1" aria-hidden="true" />
        </div>

        <div
          id={panelId}
          className={`transition-all duration-300 ease-out overflow-hidden ${isExpanded ? "max-h-44 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"}`}
          aria-hidden={!isExpanded}
        >
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CheckCircle2 size={16} className="text-accent" aria-hidden="true" />
              Powered by {partner}
            </div>
            <p className="text-sm text-muted-foreground">
              Save up to 14% on EU-DPP customs clearing and reduce route friction.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-track-cta
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"
                onClick={onCtaClick}
              >
                Enable Auto-Routing
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm text-muted-foreground"
                onClick={onDismiss}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {state !== "dismissed" && (
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground"
              onClick={() =>
                setState((prev) => {
                  if (prev === "expanded") return "collapsed";
                  return "expanded";
                })
              }
            >
              {isExpanded ? "Hide partner details" : "See partner route savings"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

