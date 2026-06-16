import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, Trophy, Check, MessageCircle, Share2, Eye } from "lucide-react";
import { CONFIG } from "@/lib/config";

// ── Constants ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "wavelink-wc-offer-v2";
const SHOW_DELAY_MS = 8000;
const COOLDOWN_HOURS = 24;

// FIFA World Cup 2026 Final — July 19, 2026 21:00 UTC (MetLife Stadium, NJ)
const WC_FINAL_TS = new Date("2026-07-19T21:00:00Z").getTime();

// ── Social proof ticker ───────────────────────────────────────────────────────
const TICKER = [
  "Arif from Dhaka just grabbed the Starting XI Pack",
  "Sakib from Chattogram ordered 10 cards",
  "Ahmed from Dubai got the Full Squad Bundle",
  "Tanvir's office in Gulshan ordered just now",
  "Sarah from Doha grabbed 3 cards + Review Stand",
  "Rahim from Motijheel ordered 5 cards",
  "Nadia from Abu Dhabi got the Starting XI Pack",
  "Imran's team in Uttara ordered 10 NFC cards",
  "Farid from Sylhet just secured his squad pack",
  "Omar from Bahrain ordered the Full Squad",
];

// ── Bulk tiers — ≥50% gross margin on all ────────────────────────────────────
const TIERS = [
  { id: "trio",  label: "Trio",        emoji: "⚽",  qty: 3,  bundlePrice: 1649, originalTotal: 1797, tag: null,           unlock: null },
  { id: "xi",    label: "Starting XI", emoji: "🏆",  qty: 5,  bundlePrice: 2749, originalTotal: 2995, tag: "Most Popular", unlock: "Best per-card rate for small teams" },
  { id: "squad", label: "Full Squad",  emoji: "👑",  qty: 10, bundlePrice: 5499, originalTotal: 5990, tag: "Best Value",   unlock: "Maximum savings unlocked!" },
] as const;
type TierId = typeof TIERS[number]["id"];

const STAND_ORIGINAL = 1212;
const STAND_WITH_PACK = 1099;

// ── Confetti burst ────────────────────────────────────────────────────────────
const launchConfetti = () => {
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden";
  document.body.appendChild(wrap);

  if (!document.getElementById("wl-cf-ks")) {
    const s = document.createElement("style");
    s.id = "wl-cf-ks";
    s.textContent = `
      @keyframes wlcf {
        0%   { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity:1 }
        80%  { opacity:1 }
        100% { transform: translateY(var(--ty)) translateX(var(--tx)) rotate(var(--r)) scale(0.5); opacity:0 }
      }
    `;
    document.head.appendChild(s);
  }

  const colors = ["#22c55e","#fbbf24","#f59e0b","#10b981","#34d399","#fcd34d","#86efac","#fff"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 5 + Math.random() * 10;
    el.style.cssText = `
      position:absolute;
      bottom:30%;
      left:${10 + Math.random() * 80}%;
      width:${size}px;
      height:${size * 0.42}px;
      background:${colors[i % colors.length]};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      animation:wlcf ${0.7 + Math.random() * 1}s ease-out ${Math.random() * 0.5}s forwards;
    `;
    el.style.setProperty("--tx", `${(Math.random() - 0.5) * 400}px`);
    el.style.setProperty("--ty", `${-(100 + Math.random() * 350)}px`);
    el.style.setProperty("--r", `${Math.random() * 900 - 450}deg`);
    wrap.appendChild(el);
  }
  setTimeout(() => { try { document.body.removeChild(wrap); } catch {} }, 2200);
};

// ── Countdown helpers ─────────────────────────────────────────────────────────
const getTimeLeft = () => {
  const diff = Math.max(0, WC_FINAL_TS - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

// ── Component ─────────────────────────────────────────────────────────────────
const SpecialOfferPopup = () => {
  const [isVisible, setIsVisible]       = useState(false);
  const [isClosing, setIsClosing]       = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierId>("xi");
  const [addStand, setAddStand]         = useState(false);
  const [tickerIdx, setTickerIdx]       = useState(0);
  const [tickerFade, setTickerFade]     = useState(true);
  const [timeLeft, setTimeLeft]         = useState(getTimeLeft);
  const [claimed, setClaimed]           = useState(() => 83 + Math.floor(Math.random() * 8)); // 83-90
  const [viewers, setViewers]           = useState(() => 3 + Math.floor(Math.random() * 5)); // 3-7
  const [unlockFlash, setUnlockFlash]   = useState<string | null>(null);
  const [showShare, setShowShare]       = useState(false);
  const prevTier = useRef<TierId>("xi");
  const tickerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show / cooldown logic
  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const hrs = (Date.now() - parseInt(dismissedAt)) / 3600000;
      if (hrs < COOLDOWN_HOURS) return;
    }
    const t = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }, SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Countdown tick
  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, [isVisible]);

  // Scarcity creep — increments slowly while modal is open
  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => {
      setClaimed(c => c < 97 ? c + 1 : c);
    }, 30000 + Math.random() * 20000);
    return () => clearInterval(t);
  }, [isVisible]);

  // Viewer count jitter
  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => {
      setViewers(3 + Math.floor(Math.random() * 6));
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(t);
  }, [isVisible]);

  // Social proof ticker rotate
  useEffect(() => {
    if (!isVisible) return;
    const rotate = () => {
      setTickerFade(false);
      tickerTimer.current = setTimeout(() => {
        setTickerIdx(i => (i + 1) % TICKER.length);
        setTickerFade(true);
      }, 400);
    };
    const t = setInterval(rotate, 3500);
    return () => { clearInterval(t); if (tickerTimer.current) clearTimeout(tickerTimer.current); };
  }, [isVisible]);

  // Tier upgrade flash
  const handleTierSelect = useCallback((id: TierId) => {
    const tier = TIERS.find(t => t.id === id)!;
    setSelectedTier(id);
    if (tier.unlock && id !== prevTier.current) {
      setUnlockFlash(tier.unlock);
      setTimeout(() => setUnlockFlash(null), 2200);
    }
    prevTier.current = id;
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      document.body.style.overflow = "";
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, 380);
  }, []);

  const activeTier = TIERS.find(t => t.id === selectedTier)!;
  const savings    = activeTier.originalTotal - activeTier.bundlePrice + (addStand ? STAND_ORIGINAL - STAND_WITH_PACK : 0);
  const totalPrice = activeTier.bundlePrice + (addStand ? STAND_WITH_PACK : 0);
  const perCard    = Math.round(activeTier.bundlePrice / activeTier.qty);

  const handleWhatsApp = useCallback(() => {
    launchConfetti();
    const standLine = addStand ? ` + NFC Review Stand (৳${STAND_WITH_PACK})` : "";
    const msg = `Hi Wavelink! I want the World Cup ${activeTier.label} Pack — ${activeTier.qty} NFC cards${standLine} for ৳${totalPrice.toLocaleString()}. Let's go! 🏆⚽`;
    setTimeout(() => {
      window.open(CONFIG.WHATSAPP_LINK(encodeURIComponent(msg)), "_blank");
      setShowShare(true);
    }, 300);
  }, [activeTier, addStand, totalPrice]);

  const handleViralShare = useCallback(() => {
    const shareText = `⚽ My team just got Wavelink NFC cards during the World Cup deal — ৳${perCard}/card, no app needed. Order yours before the final: https://getwaved.ai 🏆`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  }, [perCard]);

  if (!isVisible) return null;

  const claimedPct = Math.min(100, (claimed / 100) * 100);

  return (
    <>
      {/* Inject pulse keyframes */}
      <style>{`
        @keyframes wl-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes wl-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes wl-ticker-in {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes wl-slide-up {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes wl-flash {
          0%,100% { opacity:0; transform: scaleX(0.9); }
          30%,70% { opacity:1; transform: scaleX(1); }
        }
        .wl-pulse { animation: wl-pulse-ring 1.8s ease-out infinite; }
        .wl-shimmer::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          animation: wl-shimmer 2.2s ease-in-out infinite;
        }
        .wl-slide-up { animation: wl-slide-up 0.45s ease-out forwards; }
        .wl-flash    { animation: wl-flash 2.2s ease forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="World Cup 2026 Squad Pack Offer"
        className={`fixed z-[9999] inset-x-0
          bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:max-w-[480px]
          max-h-[95svh] md:max-h-[90vh]
          overflow-y-auto overscroll-contain
          bg-[#030f03]
          md:rounded-[28px] rounded-t-[28px]
          border border-white/[0.08]
          transition-all duration-380 ease-out
          ${isClosing ? "translate-y-full md:translate-y-8 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"}
        `}
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]" aria-hidden="true">
          <div className="absolute -top-20 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-10 right-0 w-80 h-80 bg-emerald-600/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-[80px]" />
        </div>

        {/* ── LIVE TICKER ──────────────────────────────────────────── */}
        <div className="relative z-10 border-b border-white/[0.06] bg-green-500/[0.07] px-4 py-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <p
            className="text-[11px] font-bold text-green-300/90 truncate"
            style={{
              opacity: tickerFade ? 1 : 0,
              transform: tickerFade ? "translateY(0)" : "translateY(-5px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {TICKER[tickerIdx]}
          </p>
        </div>

        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-0.5" aria-hidden="true">
          <div className="w-10 h-1 bg-white/15 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-10 right-3 md:top-10 md:right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 px-5 md:px-7 pt-4 pb-6 space-y-4">

          {/* ── COUNTDOWN + SCARCITY ── */}
          <div className="space-y-2.5">
            {/* Countdown */}
            <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">⏱</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">Final whistle in</span>
              </div>
              <div className="flex items-center gap-1">
                {[
                  { v: timeLeft.d, u: "d" },
                  { v: timeLeft.h, u: "h" },
                  { v: timeLeft.m, u: "m" },
                  { v: timeLeft.s, u: "s" },
                ].map(({ v, u }, i) => (
                  <div key={u} className="flex items-center gap-0.5">
                    <span className="bg-green-500/20 border border-green-500/30 text-green-300 font-black text-sm tabular-nums rounded-lg px-2 py-0.5 min-w-[2ch] text-center">
                      {u === "d" ? v : pad(v)}
                    </span>
                    <span className="text-white/20 text-[10px] font-bold">{u}</span>
                    {i < 3 && <span className="text-green-500/40 font-black text-xs mx-0.5">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Scarcity bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/50">
                  🔥 <span className="text-orange-400 font-black">{claimed}/100</span> World Cup Packs claimed
                </span>
                <span className="text-[10px] text-white/30">{100 - claimed} left</span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${claimedPct}%`,
                    background: "linear-gradient(90deg, #16a34a, #22c55e, #f59e0b)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── BADGE + HEADLINE ── */}
          <div className="text-center space-y-2 pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/25">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[9px] md:text-[10px] font-black text-yellow-300 uppercase tracking-[0.2em]">
                FIFA World Cup 2026 · Limited Window
              </span>
              <span className="text-sm" aria-hidden="true">⚽</span>
            </div>

            <h2 className="text-2xl md:text-[28px] font-serif font-bold text-white leading-tight">
              Your Squad's Missing<br />Something.
            </h2>

            <div className="flex items-center justify-center gap-1.5 text-white/30">
              <Eye className="w-3 h-3" />
              <span className="text-[11px] font-bold">
                <span className="text-green-400">{viewers}</span> people viewing this offer right now
              </span>
            </div>
          </div>

          {/* ── TIER SELECTOR ── */}
          <div className="grid grid-cols-3 gap-2 relative">
            {TIERS.map(tier => {
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => handleTierSelect(tier.id)}
                  className={`relative flex flex-col items-center gap-1.5 pt-6 pb-3 px-2 rounded-2xl border text-center transition-all duration-200
                    ${active
                      ? "bg-gradient-to-b from-green-500/20 to-green-600/10 border-green-400/50 scale-[1.03]"
                      : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  aria-pressed={active}
                >
                  {tier.tag && (
                    <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-black uppercase whitespace-nowrap rounded-full border
                      ${tier.id === "xi"    ? "bg-yellow-400 text-black border-yellow-300" :
                        tier.id === "squad" ? "bg-green-500 text-black border-green-400" : ""}`}>
                      {tier.tag}
                    </span>
                  )}
                  <span className="text-2xl" aria-hidden="true">{tier.emoji}</span>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${active ? "text-green-300" : "text-white/30"}`}>
                    {tier.label}
                  </span>
                  <span className={`text-xs font-bold ${active ? "text-white" : "text-white/40"}`}>
                    {tier.qty} cards
                  </span>
                  <span className={`text-sm font-black ${active ? "text-green-300" : "text-white/50"}`}>
                    ৳{tier.bundlePrice.toLocaleString()}
                  </span>
                </button>
              );
            })}

            {/* Unlock flash */}
            {unlockFlash && (
              <div className="wl-flash absolute -bottom-8 inset-x-0 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-green-300">
                  <Check className="w-3 h-3" /> {unlockFlash}
                </span>
              </div>
            )}
          </div>

          {/* ── PRICE CARD ── */}
          <div className={`bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 space-y-3 ${unlockFlash ? "mt-8" : ""}`}>
            {/* Line item */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">{activeTier.qty} × NFC Card</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/25 line-through">৳{activeTier.originalTotal.toLocaleString()}</span>
                <span className="text-sm font-bold text-white">৳{activeTier.bundlePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Per card reframe */}
            <div className="bg-green-500/[0.08] border border-green-500/20 rounded-xl px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-white/50">Per card</span>
              <div className="text-right">
                <span className="text-green-300 font-black text-sm">৳{perCard}</span>
                <span className="text-white/25 text-xs ml-1 line-through">৳599</span>
                <p className="text-[10px] text-white/30">less than one cup of coffee ☕</p>
              </div>
            </div>

            {/* Review Stand add-on */}
            <button
              onClick={() => setAddStand(v => !v)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200
                ${addStand ? "bg-green-500/10 border-green-400/35" : "bg-white/[0.025] border-white/[0.08] hover:border-white/15"}`}
              aria-pressed={addStand}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${addStand ? "bg-green-500 border-green-500" : "border-white/20"}`}>
                  {addStand && <Check className="w-2.5 h-2.5 text-black" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Add NFC Review Stand</p>
                  <p className="text-[10px] text-white/35">Tap → Google reviews open instantly</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <p className="text-[10px] text-white/25 line-through">৳{STAND_ORIGINAL.toLocaleString()}</p>
                <p className={`text-sm font-bold ${addStand ? "text-green-400" : "text-white/60"}`}>৳{STAND_WITH_PACK}</p>
              </div>
            </button>

            {/* Total */}
            <div className="border-t border-dashed border-white/10 pt-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">You pay</p>
                <p className="text-4xl md:text-5xl font-serif font-black bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent leading-none">
                  ৳{totalPrice.toLocaleString()}
                </p>
                <p className="text-[10px] text-white/20 mt-0.5">One-time · No subscriptions · Ever.</p>
              </div>
              <div className="text-right space-y-1">
                <div className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-300 text-xs font-black">Save ৳{savings.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-white/20">Free delivery BD · Bkash</p>
              </div>
            </div>
          </div>

          {/* ── TRUST MICRO-STRIP ── */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {["🏆 1,350+ professionals trust Wavelink", "⚡ Bkash · WhatsApp", "🚚 Free delivery BD"].map((t, i) => (
              <span key={i} className="text-[10px] text-white/30 font-bold">{t}</span>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div className="space-y-2 pb-safe">

            {/* Primary — pulsing */}
            {!showShare ? (
              <button
                onClick={handleWhatsApp}
                className="wl-shimmer wl-pulse relative w-full py-4 md:py-5 overflow-hidden rounded-2xl font-black text-base md:text-lg text-[#021302] transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                style={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #0ea5e9 100%)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <MessageCircle className="w-5 h-5" />
                  Order {activeTier.qty} Cards on WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            ) : (
              <div className="wl-slide-up space-y-2">
                <div className="w-full py-3 rounded-2xl bg-green-500/15 border border-green-500/30 text-center">
                  <p className="text-green-300 font-black text-sm">🎉 Opening WhatsApp…</p>
                  <p className="text-white/40 text-xs mt-0.5">Your order is being prepared</p>
                </div>

                {/* Viral share */}
                <button
                  onClick={handleViralShare}
                  className="w-full py-3.5 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-bold text-sm hover:bg-[#25D366]/25 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share the deal with your squad
                  <span className="text-[10px] text-[#25D366]/60 font-normal ml-1">(they save too)</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                handleClose();
                setTimeout(() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }), 500);
              }}
              className="w-full py-3 bg-transparent border border-white/[0.08] text-white/35 text-sm font-bold rounded-2xl hover:border-white/20 hover:text-white/60 transition-all"
            >
              Order on website instead
            </button>
          </div>

          <p className="text-center text-white/15 text-[9px]">
            Offer valid during FIFA World Cup 2026 window · Prices in BDT · Subject to availability
          </p>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferPopup;
