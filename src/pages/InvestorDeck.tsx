import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Download, Loader2, CheckCircle,
  Zap, Shield, MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CONFIG } from "@/lib/config";

const fade = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.65, ease: "easeOut" } }),
};

const SLIDES = [
  "Cover", "The Problem", "Why Now", "Solution",
  "Products", "Business Model", "Market", "Traction",
  "The Moat", "Family Offices", "The Raise", "Team", "Vision",
];

const InvestorDeck = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setCurrent(Math.round(window.scrollY / window.innerHeight));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Valid email required."); return; }
    setSubmitting(true);
    try {
      await fetch(CONFIG.LEAD_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, source: "Investor Deck", timestamp: new Date().toISOString() }).toString(),
      });
      toast.success("Access request received. We'll be in touch.");
      setDialogOpen(false);
      setEmail("");
    } catch { toast.error("Submission failed. Please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="bg-[#04080F] text-white font-sans">
      <Helmet>
        <title>Wavelink Investor Deck — Trust Infrastructure for the Real Economy | Pre-seed/Seed 2026</title>
        <meta name="description" content="Wavelink is building the trust layer for the real economy — NFC-verified identity and proof-of-presence for SMEs in Bangladesh and the GCC. Raising $5M seed. Family office and angel investors welcome." />
        <meta property="og:title" content="Wavelink Investor Deck — Pre-seed/Seed 2026" />
        <meta property="og:description" content="Trust infrastructure for the real economy. Bangladesh + GCC. 90% gross margin. Raising $5M. View the deck." />
        <meta property="og:url" content="https://getwaved.ai/investor-deck" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://getwaved.ai/investor-deck" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ── Nav dots ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2.5 print:hidden">
        {SLIDES.map((label, i) => (
          <button key={i} onClick={() => goTo(i)} className="group relative flex items-center justify-end" aria-label={label}>
            <span className={`absolute right-7 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${current === i ? "opacity-100 text-blue" : "opacity-0 text-white/0"}`}>{label}</span>
            <div className={`rounded-full transition-all duration-300 ${current === i ? "w-1.5 h-6 bg-blue" : "w-1 h-4 bg-white/15 group-hover:bg-white/35"}`} />
          </button>
        ))}
      </div>

      {/* ── Top bar ── */}
      <div className="fixed top-5 left-5 z-50 flex gap-3 print:hidden">
        <Button variant="ghost" onClick={() => navigate("/")} className="rounded-none px-4 py-2 text-[11px] text-white/35 hover:text-white border border-white/10 hover:bg-white/5">
          <ArrowLeft className="mr-1.5 h-3 w-3" /> Exit
        </Button>
        <Button onClick={() => window.print()} className="rounded-none px-4 py-2 text-[11px] bg-blue hover:bg-blue/90 font-bold">
          <Download className="mr-1.5 h-3 w-3" /> Fact Sheet
        </Button>
      </div>

      {/* ══════════════════════════════════════════
          SLIDE 1 — COVER
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center p-8 pt-20 md:pt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue/[0.06] via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
            <motion.p custom={0} variants={fade} className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">
              Pre-seed / Seed &nbsp;·&nbsp; 2026
            </motion.p>
            <motion.h1 custom={1} variants={fade} className="text-7xl sm:text-[9rem] md:text-[11rem] font-bold tracking-tighter leading-[0.82]">
              Wave<span className="text-blue">Link</span>
            </motion.h1>
            <motion.p custom={2} variants={fade} className="text-2xl sm:text-4xl text-white/45 max-w-3xl leading-tight font-light">
              The trust layer for<br /><span className="text-white font-semibold">the real economy.</span>
            </motion.p>
            <motion.p custom={3} variants={fade} className="text-base sm:text-lg text-white/25 max-w-2xl leading-relaxed">
              Every real-world interaction, turned into verifiable digital proof —<br className="hidden sm:block" />
              portable across borders, readable by people and AI systems.
            </motion.p>
            <motion.div custom={4} variants={fade} className="flex flex-wrap gap-8 pt-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              <span className="flex items-center gap-2"><MapPin size={11} className="text-blue" /> Chattogram · Dhaka · GCC</span>
              <span className="flex items-center gap-2"><Shield size={11} className="text-blue" /> Mohammad Abir Abbas · Founder</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 2 — THE PROBLEM
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">The Problem</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">Good businesses<br />stay invisible.<br /><span className="text-black/25">Invisibility is expensive.</span></h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: "01", title: "Fragmented identity", body: "A clinic, a workshop, a founder — scattered across paper cards, WhatsApp, and unlinked profiles. No single verifiable identity to point to." },
                { n: "02", title: "No portable reputation", body: "Trust earned in one place can't travel. Cross a border or a platform and a proven operator starts again from zero." },
                { n: "03", title: "Biased first impressions", body: "When 2 seconds is the entire funnel, the business with more fake reviews beats the one doing better work." },
              ].map((p, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-7 bg-black/[0.03] border-l-[3px] border-blue space-y-3">
                  <p className="text-blue font-black text-[10px] uppercase tracking-[0.4em]">{p.n}</p>
                  <h4 className="font-bold text-base">{p.title}</h4>
                  <p className="text-sm text-black/45 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.p custom={4} variants={fade} className="text-sm text-black/25 italic border-t border-black/8 pt-6">
              The analog void: most real-world interactions leave no trust signal at all. The good ones simply evaporate.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 3 — WHY NOW
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Why Now</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">
                AI broke the last<br />signal we trusted.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: "🤖", t: "AI fakes are everywhere", b: "Generated identities, reviews, and profiles flood every channel. Self-reported trust is now worthless." },
                { icon: "🌐", t: "Commerce went borderless", b: "SMEs sell and partner across regions — but their reputation cannot cross with them." },
                { icon: "🏛️", t: "GCC regulation demands it", b: "GCC regulators now require verifiable identity at the edge. Compliance is a forcing function." },
                { icon: "💡", t: "One architecture answers both", b: "GCC regulation demands verifiability. Bangladesh's cost pressure demands it be cheap. WaveLink is built for exactly this." },
              ].map((item, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="flex gap-4 p-6 bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.t}</h4>
                    <p className="text-sm text-white/35 mt-1.5 leading-relaxed">{item.b}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div custom={5} variants={fade} className="p-5 border border-blue/20 bg-blue/[0.05]">
              <p className="text-blue text-sm font-bold">The window:</p>
              <p className="text-white/50 text-sm mt-1">Whoever owns verified real-world trust now becomes the default rail later. The window is open. It won't stay that way.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 4 — PROOF-OF-PRESENCE
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Solution</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">
                One tap turns a real<br />moment into proof.
              </h2>
              <p className="text-white/35 text-lg mt-4">We call it <span className="text-blue font-bold">Proof-of-Presence</span>.</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { step: "1", t: "Real interaction", b: "A visit, service, or handshake in the physical world." },
                { step: "2", t: "Tap / scan", b: "NFC or QR captures the moment — presence, not a self-report." },
                { step: "3", t: "AI verify", b: "Checked, attributed to a real identity, time-stamped." },
                { step: "4", t: "Portable trust event", b: "A verifiable record the business owns — readable by people and AI agents." },
              ].map((s, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-5 border border-white/[0.06] relative space-y-2">
                  <div className="text-6xl font-black text-white/[0.04] absolute top-2 right-3 leading-none">{s.step}</div>
                  <p className="text-blue font-black text-[9px] uppercase tracking-widest">Step {s.step}</p>
                  <p className="text-white font-bold text-sm">{s.t}</p>
                  <p className="text-white/30 text-xs leading-relaxed">{s.b}</p>
                </motion.div>
              ))}
            </div>
            <motion.div custom={5} variants={fade} className="grid grid-cols-3 gap-6 border-t border-white/[0.05] pt-6">
              {[
                { l: "Verified", d: "Tied to a real, present human — not a bot or fake account." },
                { l: "Portable", d: "Owned by the business — travels across borders and platforms." },
                { l: "Instant", d: "Captured in one tap, 15 seconds, at the moment of trust." },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-white font-black text-sm">{item.l}</p>
                  <p className="text-white/25 text-xs mt-1 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 5 — PRODUCTS
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Product Architecture</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">One architecture.<br />Three products.</h2>
              <p className="text-black/35 text-base mt-3">One AI-driven identity & verification layer underneath all three.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "💳", name: "NFC Identity Card", status: "Live · BD + GCC", desc: "The paper card that says 'trust me' becomes a tap that resolves to a verified identity and a living profile. Free to update, impossible to fake." },
                { icon: "🏪", name: "NFC Review Stand", status: "Live · BD + GCC", desc: "Feedback that normally evaporates is captured as a structured trust signal — at the moment of satisfaction, in 15 seconds." },
                { icon: "🧵", name: "Abaya Track", status: "In development", desc: "An invisible factory bottleneck becomes a provable record of operational reliability. EU ESPR Digital Product Passport-ready. Textile traceability at the edge." },
              ].map((p, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-7 border-2 border-black/[0.06] hover:border-blue/25 transition-all space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{p.icon}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 ${p.status.includes("Live") ? "bg-blue/10 text-blue" : "bg-black/5 text-black/25"}`}>{p.status}</span>
                  </div>
                  <h4 className="font-bold">{p.name}</h4>
                  <p className="text-sm text-black/45 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.p custom={4} variants={fade} className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 text-center border-t border-black/8 pt-6">
              Three products, one rail. — getwaved.ai
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 6 — BUSINESS MODEL
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Business Model</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">Free to adopt.<br />Paid to be trusted.</h2>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div custom={1} variants={fade} className="space-y-4">
                <div className="p-6 border border-white/[0.06] space-y-2">
                  <p className="text-blue font-black text-[10px] uppercase tracking-widest">Blade — Distribution</p>
                  <p className="text-white font-bold">Free digital identity tools</p>
                  <p className="text-white/35 text-sm leading-relaxed">Profiles, NFC links, review capture. Frictionless to put in every business's hands.</p>
                </div>
                <div className="p-6 border border-blue/20 bg-blue/[0.05] space-y-2">
                  <p className="text-blue font-black text-[10px] uppercase tracking-widest">Razor — Monetisation</p>
                  <p className="text-white font-bold">Usage-based fees on trust events</p>
                  <p className="text-white/35 text-sm leading-relaxed">Verification API calls, profile views, review capture, qualified leads. Revenue scales with every tap.</p>
                </div>
              </motion.div>
              <motion.div custom={2} variants={fade} className="space-y-2">
                <p className="text-white/25 font-black text-[10px] uppercase tracking-widest mb-4">Revenue Per Trust Event</p>
                {[
                  { e: "Verification API call", p: "$0.05" },
                  { e: "Profile view (resolved tap)", p: "$0.20" },
                  { e: "Verified review captured", p: "$0.50" },
                  { e: "Qualified lead introduction", p: "$5.00" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/[0.05]">
                    <span className="text-sm text-white/50">{r.e}</span>
                    <span className="text-white font-black tabular-nums">{r.p}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 px-4 py-2.5">
                    <Zap size={13} className="text-blue" />
                    <span className="text-blue font-black text-sm">~90% gross margin</span>
                    <span className="text-white/25 text-xs">— serverless on Cloudflare</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 7 — MARKET
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Market</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">400,000 businesses<br />with no way to prove<br /><span className="text-black/25">they're real.</span></h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "TAM", title: "Global phygital trust", sub: "Multi-billion", desc: "Global SME identity, verification, and trust infrastructure. AI-native systems will demand this layer — it doesn't exist yet." },
                { label: "SAM", title: "GCC + South Asia", sub: "Regional, high-growth", desc: "High-regulatory GCC combined with high-volume Bangladesh beachhead. Two ends of the same infrastructure bridge." },
                { label: "SOM", title: "Bangladesh · Year 1–2", sub: "400,000+ SMEs", desc: "High-footfall, high-trust businesses: clinics, agencies, restaurants, workshops. Pilot-ready segment with proven demand." },
              ].map((m, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-7 bg-black/[0.03] space-y-3">
                  <p className="text-blue font-black text-[10px] uppercase tracking-widest">{m.label}</p>
                  <h4 className="text-lg font-bold">{m.title}</h4>
                  <p className="text-3xl font-black text-black/12">{m.sub}</p>
                  <p className="text-sm text-black/45 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 8 — TRACTION
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Traction</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">Live in market.<br />Built to scale.</h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { n: "1,350+", l: "NFC cards deployed", s: "Bangladesh + GCC" },
                { n: "4.9 / 5", l: "Verified rating", s: "87 reviews" },
                { n: "4", l: "Markets live", s: "BD · UAE · QA · BH" },
                { n: "2024", l: "Founded", s: "Chattogram, BD" },
              ].map((s, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-6 border border-white/[0.06] space-y-1.5">
                  <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">{s.n}</p>
                  <p className="text-[9px] font-black text-blue uppercase tracking-widest">{s.l}</p>
                  <p className="text-xs text-white/20">{s.s}</p>
                </motion.div>
              ))}
            </div>
            <motion.div custom={5} variants={fade} className="grid grid-cols-3 gap-4">
              {[
                { phase: "Built ✓", d: "Platform live — NFC cards, review stands, Abaya Track — serverless on Cloudflare. GDPR & GCC data-residency compliant by design." },
                { phase: "Validated ✓", d: "Live in BD + GCC. 1,350+ cards deployed. 4.9-star rating. Organic demand before any paid acquisition." },
                { phase: "Next →", d: "GCC regional HQ · Scale pilots to revenue · Agent-readable Trust Graph v2 · Financial inclusion use cases." },
              ].map((m, i) => (
                <div key={i} className="p-5 border border-white/[0.06] space-y-2">
                  <p className="text-blue font-black text-[10px] uppercase tracking-widest">{m.phase}</p>
                  <p className="text-white/30 text-xs leading-relaxed">{m.d}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 9 — THE TRUST GRAPH (MOAT)
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">The Moat</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">The Trust Graph.</h2>
              <p className="text-black/35 text-lg mt-3">Every verified interaction makes it stronger — and harder to copy.</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div custom={1} variants={fade} className="space-y-6">
                <p className="text-base text-black/55 leading-relaxed">
                  WaveLink's real asset isn't a card or a stand. It's the graph underneath — the compounding network of verified real-world interactions that no late entrant can backfill.
                </p>
                {[
                  { l: "Nodes", d: "Verified identities — businesses and customers." },
                  { l: "Edges", d: "Verified trust events — every Proof-of-Presence tap." },
                  { l: "Moat", d: "Density compounds into signal a rival cannot manufacture retroactively." },
                ].map((g, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-blue rounded-full mt-1.5 shrink-0" />
                    <p className="text-sm"><span className="font-black text-black">{g.l} — </span><span className="text-black/45">{g.d}</span></p>
                  </div>
                ))}
              </motion.div>
              <motion.div custom={2} variants={fade} className="grid grid-cols-2 gap-4">
                {[
                  { name: "NFC Identity Card", desc: "Verified professional presence" },
                  { name: "Review Stand", desc: "Verified customer satisfaction" },
                  { name: "Abaya Track", desc: "Verified supply chain event" },
                  { name: "AI Agent Layer", desc: "Machine-readable trust output" },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-black/[0.03] border-l-[3px] border-blue space-y-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-black/40">{item.desc}</p>
                  </div>
                ))}
                <div className="col-span-2 p-4 bg-blue/[0.05] border border-blue/15 text-center">
                  <p className="text-blue font-black text-[10px] uppercase tracking-widest">One AI-driven identity & verification layer</p>
                  <p className="text-black/35 text-xs mt-1">underneath all products — the rail, not the app</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 10 — WHY FAMILY OFFICES
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-[#d4af37] font-black uppercase tracking-[0.5em] text-[10px]">For Patient Capital</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">
                Infrastructure, not a feature.<br />
                <span className="text-[#d4af37]">Generational thesis.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: "🏗️",
                  title: "Infrastructure compounding",
                  desc: "The Trust Graph deepens with every tap. Capital invested now buys the network effect at its cheapest point — before the moat closes.",
                },
                {
                  icon: "🌏",
                  title: "Geographic diversification",
                  desc: "Bangladesh beachhead (320M people, 400k+ SMEs) + GCC expansion (high AUM per capita, regulated market). Two non-correlated markets, one stack.",
                },
                {
                  icon: "📈",
                  title: "90% gross margin, edge-native",
                  desc: "Serverless on Cloudflare. Near-zero idle cost. Marginal cost per trust event approaches zero as scale grows — rare in hardware-originated businesses.",
                },
                {
                  icon: "🌱",
                  title: "ESG & impact-aligned returns",
                  desc: "Every verified SME becomes a bankable counterparty. Financial inclusion as a revenue mechanism, not charity. SDG 8 · 9 · 10 — structural alpha.",
                },
                {
                  icon: "🔒",
                  title: "Data sovereignty built in",
                  desc: "Data stays in-region by architecture — GCC and BD compliance by default. Not retrofitted. A structural advantage in a post-Schrems II world.",
                },
                {
                  icon: "⏳",
                  title: "Patient capital window",
                  desc: "The verified-trust rail for South Asia and GCC is being laid right now. Early capital owns the network — late capital pays for it.",
                },
              ].map((item, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="flex gap-4 p-5 border border-[#d4af37]/10 bg-[#d4af37]/[0.02] hover:border-[#d4af37]/25 transition-all">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-white/35 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div custom={7} variants={fade} className="p-5 border border-[#d4af37]/20 bg-[#d4af37]/[0.04]">
              <p className="text-[#d4af37] text-sm font-bold">The thesis in one sentence:</p>
              <p className="text-white/45 text-sm mt-1.5 leading-relaxed">
                Whoever lays the verified-trust rail for South Asia and the GCC in the next 24 months becomes the default identity layer for the region's digital economy — readable by humans, enterprises, and AI agents alike.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 11 — THE RAISE
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">The Raise</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">$5M Seed.<br />24-month runway.</h2>
              <p className="text-black/35 text-base mt-3">Target ~$12–15M pre-money &nbsp;·&nbsp; ≈25–30% dilution</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div custom={1} variants={fade} className="space-y-3">
                <p className="font-black text-[10px] uppercase tracking-widest text-black/25 mb-5">Use of Funds — $5M</p>
                {[
                  { item: "Product & engineering", amount: "$1.5M", w: "30%" },
                  { item: "GCC market entry & pilots", amount: "$1.2M", w: "24%" },
                  { item: "Team & hiring", amount: "$1.1M", w: "22%" },
                  { item: "Compliance & regulatory", amount: "$0.6M", w: "12%" },
                  { item: "Runway & operations", amount: "$0.6M", w: "12%" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1 flex justify-between py-2.5 border-b border-black/[0.06]">
                      <span className="text-sm text-black/60">{r.item}</span>
                      <span className="font-black text-sm">{r.amount}</span>
                    </div>
                    <div className="w-14 bg-black/8 rounded-full h-1 overflow-hidden shrink-0">
                      <div className="h-full bg-blue rounded-full" style={{ width: r.w }} />
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div custom={2} variants={fade} className="space-y-4">
                {[
                  {
                    phase: "Phase 1 · Year 1",
                    desc: "Deepen the Bangladesh beachhead. Stand up the GCC regional HQ. Ship verification rail v2.",
                    items: ["GCC regional HQ established", "Regulated verification pilots running", "SME & identity partners signed", "Hire local engineering + GTM"],
                  },
                  {
                    phase: "Phase 2 · Year 2",
                    desc: "Scale GCC pilots to revenue. Grow the Trust Graph. Make it agent-readable.",
                    items: ["Trust Graph agent-readable (AI API live)", "Revenue-stage GCC operation", "Financial inclusion use cases live", "Series A ready"],
                  },
                ].map((p, i) => (
                  <div key={i} className="p-6 bg-black/[0.03] space-y-3">
                    <p className="text-blue font-black text-[10px] uppercase tracking-widest">{p.phase}</p>
                    <p className="text-sm text-black/50 leading-relaxed">{p.desc}</p>
                    <ul className="space-y-1.5">
                      {p.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-black/35">
                          <CheckCircle size={11} className="text-blue shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 12 — TEAM
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#04080F] p-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-12">
            <motion.div custom={0} variants={fade}>
              <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Founding Team</p>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.88] mt-4">
                Trust. Product.<br />Hardware. Healthcare.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  initials: "MA",
                  name: "Mohammad Abir Abbas",
                  role: "Founder & CEO",
                  detail: "Researcher in AI systems, identity infrastructure, and trust architecture. Published on cryptographic audit logs and verifiable trust across GCC and South Asia. Builds — and writes — the rails.",
                },
                {
                  initials: "AA",
                  name: "Asaduzzaman Awal",
                  role: "Product CTO",
                  detail: "Leads product and engineering. Turns the trust architecture into shipped, market-ready product. The execution layer of the founding team.",
                },
                {
                  initials: "SA",
                  name: "Sarah Abbas",
                  role: "Semiconductor Engineer · Ulkasemi Ltd.",
                  detail: "Hardware and secure-element expertise. Verification at the device edge — the physical layer of the Trust Graph. Deep semiconductor background.",
                },
                {
                  initials: "MB",
                  name: "Mohammad Abed Abbas",
                  role: "Neurosurgeon · Operations Advisor",
                  detail: "Clinical-sector access for the healthcare market. Operational discipline, institutional credibility, and domain knowledge for the highest-stakes deployment environments.",
                },
              ].map((m, i) => (
                <motion.div key={i} custom={i + 1} variants={fade} className="p-6 border border-white/[0.06] space-y-3 hover:border-blue/30 transition-all">
                  <div className="w-9 h-9 bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <span className="text-blue font-black text-xs">{m.initials}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{m.name}</h4>
                    <p className="text-blue text-[10px] font-black uppercase tracking-widest mt-0.5">{m.role}</p>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed">{m.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SLIDE 13 — VISION + CTA
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-blue text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue via-blue to-[#021f4a] pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            <motion.p custom={0} variants={fade} className="text-white/35 font-black uppercase tracking-[0.5em] text-[10px]">Vision · 2026 → 2036</motion.p>
            <motion.h2 custom={1} variants={fade} className="text-6xl sm:text-8xl font-bold tracking-tighter leading-[0.85]">
              Make every<br />real-world interaction<br />provable.
            </motion.h2>
            <motion.p custom={2} variants={fade} className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
              The operators once illegible to global capital — emerging-market SMEs, first-time founders, businesses with no paper trail — become legible.
              Verifiable trust is, quietly, financial-inclusion infrastructure.
            </motion.p>
            <motion.p custom={3} variants={fade} className="text-white/35 italic">
              Let's build the trust layer for the real economy.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} variants={fade} className="flex flex-col items-center gap-5">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-blue px-12 py-8 rounded-none font-black text-2xl hover:scale-[1.03] transition-all shadow-2xl">
                  Request Data Room Access
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white border-none p-10 text-black rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold tracking-tighter mb-2">Institutional Portal</DialogTitle>
                  <p className="text-sm text-black/45 leading-relaxed">
                    Vetting required for secure access to the full data room. Family offices, VCs, and strategic partners welcome.
                  </p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                  <Input
                    type="email"
                    placeholder="partners@familyoffice.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-14 bg-black/5 border-none rounded-none px-5 text-lg focus:ring-0"
                    required
                  />
                  <Button type="submit" disabled={submitting} className="w-full h-14 bg-blue hover:bg-blue/90 text-white rounded-none font-black text-lg">
                    {submitting ? <Loader2 className="animate-spin" /> : "Request Access →"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/25">
              <span>Confidential</span><span>·</span>
              <span>Institutional Grade</span><span>·</span>
              <span>getwaved.ai</span>
            </div>
          </motion.div>

          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} custom={5} variants={fade} className="text-[10px] text-white/15 font-mono">
            Mohammad Abir Abbas · Founder, WaveLink · getwaved.ai<br />
            SHA-256 · 714D069D79ED4BBA… · v1.0 · Jun 2026 · Confidential
          </motion.p>
        </div>
      </section>

    </div>
  );
};

export default InvestorDeck;
