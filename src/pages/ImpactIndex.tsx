import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Users, TrendingUp, Star, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

const ECONOMIC_KPIS = [
  { metric: "Average taps per card per month", baseline: "0", measure: "NFC tap log", cadence: "Weekly" },
  { metric: "Profile page unique visits (30-day)", baseline: "0", measure: "Analytics pixel", cadence: "Weekly" },
  { metric: "WhatsApp conversions from profile", baseline: "0", measure: "UTM click-through", cadence: "Monthly" },
  { metric: "Repeat client interactions (verified)", baseline: "0", measure: "Tap recurrence", cadence: "Monthly" },
  { metric: "Google reviews earned (Review Stand cohort)", baseline: "Pre-stand count", measure: "GBP API", cadence: "Monthly" },
  { metric: "Average Google rating delta", baseline: "Pre-stand rating", measure: "GBP API", cadence: "Monthly" },
  { metric: "New contact additions per month", baseline: "0", measure: "Profile saves", cadence: "Monthly" },
];

const SOCIAL_KPIS = [
  { metric: "Trust events recorded (cumulative taps)", baseline: "0 at onboard", measure: "NFC tap ledger", cadence: "Continuous" },
  { metric: "Businesses with ≥10 verified interactions", baseline: "0%", measure: "Cohort analysis", cadence: "90-day" },
  { metric: "Cross-border interactions (BD ↔ GCC)", baseline: "0", measure: "Geo IP on tap", cadence: "Monthly" },
  { metric: "Review Stand uplift: reviews/month", baseline: "Avg pre-install", measure: "GBP API delta", cadence: "Monthly" },
  { metric: "Profile completeness score (avg)", baseline: "Onboarding score", measure: "Profile audit", cadence: "Monthly" },
  { metric: "Referral activations from viral share", baseline: "0", measure: "Share link UTM", cadence: "Monthly" },
  { metric: "SME revenue attribution (self-reported)", baseline: "N/A", measure: "Quarterly survey", cadence: "90-day" },
];

const PHASES = [
  {
    phase: "Phase 1", label: "Baseline (Days 0–14)",
    icon: "📋",
    desc: "Onboard 100 businesses across Bangladesh (Dhaka + Chattogram) and GCC (Dubai + Abu Dhabi). 50 receive activated Wavelink kits (attested cohort). 50 receive nothing (control cohort). Capture baseline: existing review count, rating, monthly contact volume.",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    phase: "Phase 2", label: "Active Measurement (Days 15–120)",
    icon: "📡",
    desc: "Weekly tap-log snapshots. Monthly GBP API pulls for review count and rating. Profile visit analytics via pixel. UTM tracking on WhatsApp CTA conversions. Mid-point survey at day 60 for qualitative SME sentiment.",
    color: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    phase: "Phase 3", label: "Analysis & Publish (Days 121–180)",
    icon: "📊",
    desc: "Compare attested vs control cohort across all 14 KPIs. Publish open impact report to /impact and LLMs-readable llms.txt. Index becomes a living dashboard updated quarterly.",
    color: "from-purple-500/10 to-purple-600/5",
  },
];

const LIVE_STATS = [
  { label: "Cards in the Field", value: "12+", sub: "Active NFC cards", icon: <Zap size={18} /> },
  { label: "Review Stands Deployed", value: "8+", sub: "Google Review Stands", icon: <Star size={18} /> },
  { label: "Markets Active", value: "4", sub: "BD · UAE · Qatar · Bahrain", icon: <Globe size={18} /> },
  { label: "Verified Tap Events", value: "200+", sub: "Proof-of-Presence events", icon: <Activity size={18} /> },
  { label: "SMEs Onboarded", value: "20+", sub: "Across all markets", icon: <Users size={18} /> },
  { label: "Avg Reviews Uplift", value: "+34%", sub: "Review Stand cohort (pilot)", icon: <TrendingUp size={18} /> },
];

const ImpactIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#04080F] text-white font-sans">
      <Helmet>
        <title>Wavelink Impact Index — Live Trust & Economic Impact Measurement</title>
        <meta name="description" content="Wavelink's open impact measurement framework: 100-business pilot (BD + GCC), economic and social KPIs, Proof-of-Presence trust events, Google Review Stand uplift. Updated quarterly." />
        <meta property="og:title" content="Wavelink Impact Index" />
        <meta property="og:description" content="Live impact measurement: NFC tap events, Google review uplift, verified business interactions. Bangladesh + GCC SME pilot data." />
        <meta property="og:url" content="https://getwaved.ai/impact" />
        <link rel="canonical" href="https://getwaved.ai/impact" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Top nav */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 text-[11px] text-white/35 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={12} /> Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4 mb-16">
          <motion.p custom={0} variants={fade} className="text-blue-400 font-black uppercase tracking-[0.5em] text-[10px]">
            Wavelink · Impact Index · Part III Framework
          </motion.p>
          <motion.h1 custom={1} variants={fade} className="text-5xl sm:text-7xl font-bold tracking-tighter leading-tight">
            Live Impact<br /><span className="text-blue-400">Measurement</span>
          </motion.h1>
          <motion.p custom={2} variants={fade} className="text-white/40 text-lg max-w-2xl leading-relaxed">
            Every Wavelink interaction generates a verifiable trust event. This index makes that impact transparent — tracking economic and social outcomes for the SMEs we serve in Bangladesh and the GCC.
          </motion.p>
          <motion.p custom={3} variants={fade} className="text-white/20 text-xs uppercase tracking-widest">
            Pilot: 100 businesses · 50 attested / 50 control · 90–180 days · Updated quarterly
          </motion.p>
        </motion.div>

        {/* Live stats grid */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20">
          {LIVE_STATS.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fade} className="border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
              <div className="text-blue-400">{s.icon}</div>
              <div className="text-3xl font-bold tracking-tight">{s.value}</div>
              <div>
                <div className="text-white text-sm font-semibold">{s.label}</div>
                <div className="text-white/30 text-xs mt-0.5">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pilot design */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={fade} custom={0} className="text-2xl font-bold mb-2">Pilot Framework</motion.h2>
          <motion.p variants={fade} custom={1} className="text-white/35 text-sm mb-8">
            100 businesses across Bangladesh (Dhaka, Chattogram) and GCC (Dubai, Abu Dhabi). Randomised into attested (Wavelink kit activated) and control groups.
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-4">
            {PHASES.map((p, i) => (
              <motion.div key={p.phase} custom={i} variants={fade} className={`border border-white/[0.07] bg-gradient-to-br ${p.color} p-6 space-y-3`}>
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{p.phase}</div>
                  <div className="text-white font-bold text-sm mt-1">{p.label}</div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Economic KPI table */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={fade} custom={0} className="text-2xl font-bold mb-1">Economic KPIs</motion.h2>
          <motion.p variants={fade} custom={1} className="text-white/35 text-sm mb-6">7 metrics tracking direct economic activity generated by Proof-of-Presence events.</motion.p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Metric</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Baseline</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Measurement</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 font-black">Cadence</th>
                </tr>
              </thead>
              <tbody>
                {ECONOMIC_KPIS.map((k, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 text-white/80">{k.metric}</td>
                    <td className="py-3 pr-4 text-white/40 text-xs">{k.baseline}</td>
                    <td className="py-3 pr-4 text-white/40 text-xs">{k.measure}</td>
                    <td className="py-3 text-blue-400 text-xs font-semibold">{k.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Social KPI table */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-20">
          <motion.h2 variants={fade} custom={0} className="text-2xl font-bold mb-1">Social KPIs</motion.h2>
          <motion.p variants={fade} custom={1} className="text-white/35 text-sm mb-6">7 metrics tracking trust-layer effects: cross-border interactions, review uplift, and referral spread.</motion.p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Metric</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Baseline</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 pr-4 font-black">Measurement</th>
                  <th className="text-left text-white/30 text-[10px] uppercase tracking-widest py-3 font-black">Cadence</th>
                </tr>
              </thead>
              <tbody>
                {SOCIAL_KPIS.map((k, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 text-white/80">{k.metric}</td>
                    <td className="py-3 pr-4 text-white/40 text-xs">{k.baseline}</td>
                    <td className="py-3 pr-4 text-white/40 text-xs">{k.measure}</td>
                    <td className="py-3 text-emerald-400 text-xs font-semibold">{k.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Outputs */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="border border-white/[0.07] bg-white/[0.02] p-8 space-y-4">
          <motion.h2 variants={fade} custom={0} className="text-xl font-bold">Outputs & Publication</motion.h2>
          <ul className="space-y-2 text-white/50 text-sm">
            {[
              "Open Impact Report published at getwaved.ai/impact — updated quarterly",
              "Machine-readable data included in public/llms.txt for LLM citation",
              "Case studies for 5+ high-performing SMEs from each market",
              "Shared with SDG 8 (Decent Work) reporting networks",
              "Available to investors as live KPI evidence during due diligence",
            ].map((o, i) => (
              <motion.li key={i} custom={i} variants={fade} className="flex items-start gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                {o}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Footer note */}
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-white/15 text-xs text-center mt-16">
          Wavelink Impact Index · Part III Pilot Framework · getwaved.ai/impact · Updated June 2026
        </motion.p>

      </div>
    </div>
  );
};

export default ImpactIndex;
