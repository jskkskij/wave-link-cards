import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, Check, MessageCircle, Share2, Star } from "lucide-react";
import { CONFIG } from "@/lib/config";

// ── Constants ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "wavelink-wc-offer-v3";
const SHOW_DELAY_MS = 10000;
const COOLDOWN_HOURS = 24;

// FIFA World Cup 2026 Final — July 19, 2026 21:00 UTC
const WC_FINAL_TS = new Date("2026-07-19T21:00:00Z").getTime();

// ── Social proof ticker ───────────────────────────────────────────────────────
// Real validation, not manufactured panic
const TICKER = [
  "Arif Hassan, Real Estate · Dhaka — ordered the Team Pack",
  "Sakib Ahmed, Finance Director · Chattogram — upgraded to Full Office",
  "Omar Al-Rashidi, Consultant · Dubai — ordered the Starter Kit",
  "Tanvir Islam, Managing Partner · Gulshan — ordered Team Pack",
  "Sarah Al-Mansoori, Marketing Head · Doha — ordered Starter Kit",
  "Rahim Chowdhury, CEO · Motijheel — ordered Team Pack",
  "Nadia Al-Farsi, Business Dev · Abu Dhabi — Full Office Pack",
  "Imran Hossain, Founder · Uttara — ordered Full Office",
];

// ── Pricing — 40% gross margin (COGS ≈ 50% retail, slight compression for bulk)
// Card retail ৳599, assumed COGS ~৳300
// Stand retail ৳1,212, assumed COGS ~৳606
// ─────────────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "starter",
    label: "Starter Kit",
    sublabel: "Solo professionals & small duos",
    emoji: "⚽",
    qty: 3,
    bundlePrice: 1849,
    originalTotal: 1797,   // 3 × ৳599
    tag: null,
    perksLabel: "Perfect for: Founders, Freelancers, Small practices",
  },
  {
    id: "team",
    label: "Team Pack",
    sublabel: "Growing teams & departments",
    emoji: "🏆",
    qty: 5,
    bundlePrice: 2999,
    originalTotal: 2995,   // 5 × ৳599
    tag: "Most Popular",
    perksLabel: "Perfect for: Sales teams, Agencies, SME departments",
  },
  {
    id: "office",
    label: "Full Office",
    sublabel: "Entire organisations",
    emoji: "👑",
    qty: 10,
    bundlePrice: 5699,
    originalTotal: 5990,   // 10 × ৳599
    tag: "Best Value",
    perksLabel: "Perfect for: Corporate, Hotels, Enterprise teams",
  },
] as const;
type TierId = typeof TIERS[number]["id"];

const STAND_ORIGINAL = 1212;
const STAND_PACK_PRICE = 1199; // ~1% GM compression vs retail, still healthy

// ── Confetti ──────────────────────────────────────────────────────────────────
const launchConfetti = () => {
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden";
  document.body.appendChild(wrap);

  if (!document.getElementById("wl-cf-ks")) {
    const s = document.createElement("style");
    s.id = "wl-cf-ks";
    s.textContent = `@keyframes wlcf{0%{transform:translateY(0) translateX(0) rotate(0deg) scale(1);opacity:1}80%{opacity:1}100%{transform:translateY(var(--ty)) translateX(var(--tx)) rotate(var(--r)) scale(0.5);opacity:0}}`;
    document.head.appendChild(s);
  }

  const colors = ["#d4af37","#f59e0b","#fbbf24","#22c55e","#10b981","#fcd34d","#fff","#86efac"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 5 + Math.random() * 10;
    el.style.cssText = `position:absolute;bottom:30%;left:${10 + Math.random() * 80}%;width:${size}px;height:${size * 0.42}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};animation:wlcf ${0.7 + Math.random() * 1}s ease-out ${Math.random() * 0.5}s forwards`;
    el.style.setProperty("--tx", `${(Math.random() - 0.5) * 400}px`);
    el.style.setProperty("--ty", `${-(100 + Math.random() * 350)}px`);
    el.style.setProperty("--r", `${Math.random() * 900 - 450}deg`);
    wrap.appendChild(el);
  }
  setTimeout(() => { try { document.body.removeChild(wrap); } catch {} }, 2200);
};

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
  const [selectedTier, setSelectedTier] = useState<TierId>("team");
  const [addStand, setAddStand]         = useState(false);
  const [tickerIdx, setTickerIdx]       = useState(0);
  const [tickerFade, setTickerFade]     = useState(true);
  const [timeLeft, setTimeLeft]         = useState(getTimeLeft);
  const [showShare, setShowShare]       = useState(false);
  const tickerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const rotate = () => {
      setTickerFade(false);
      tickerTimer.current = setTimeout(() => {
        setTickerIdx(i => (i + 1) % TICKER.length);
        setTickerFade(true);
      }, 400);
    };
    const t = setInterval(rotate, 4000);
    return () => { clearInterval(t); if (tickerTimer.current) clearTimeout(tickerTimer.current); };
  }, [isVisible]);

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
  const standSaving = STAND_ORIGINAL - STAND_PACK_PRICE;
  const totalPrice  = activeTier.bundlePrice + (addStand ? STAND_PACK_PRICE : 0);
  const totalOriginal = activeTier.originalTotal + (addStand ? STAND_ORIGINAL : 0);
  const totalSaving = totalOriginal - totalPrice;
  const perCard     = Math.round(activeTier.bundlePrice / activeTier.qty);

  const handleWhatsApp = useCallback(() => {
    launchConfetti();
    const standLine = addStand ? ` + NFC Review Stand (৳${STAND_PACK_PRICE})` : "";
    const msg = `Hi Wavelink! I'd like the World Cup ${activeTier.label} — ${activeTier.qty} NFC Smart Business Cards${standLine} for ৳${totalPrice.toLocaleString()}. Please proceed. 🏆`;
    setTimeout(() => {
      window.open(CONFIG.WHATSAPP_LINK(encodeURIComponent(msg)), "_blank");
      setShowShare(true);
    }, 300);
  }, [activeTier, addStand, totalPrice]);

  const handleViralShare = useCallback(() => {
    const msg = `My team just upgraded to Wavelink NFC cards — tap-to-share, no app, no subscription. World Cup timing offer active now: https://getwaved.ai ⚽🏆`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes wl-pulse-gold {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.5); }
          50%      { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
        }
        @keyframes wl-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        @keyframes wl-slide-up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .wl-gold-pulse { animation: wl-pulse-gold 2s ease-in-out infinite; }
        .wl-shimmer-wrap { position:relative; overflow:hidden; }
        .wl-shimmer-wrap::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
          animation:wl-shimmer 2.8s ease-in-out infinite;
        }
        .wl-slide-up { animation: wl-slide-up 0.4s ease-out forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/75 backdrop-blur-md transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="World Cup 2026 Team Pack Offer"
        className={`fixed z-[9999] inset-x-0
          bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:max-w-[460px]
          max-h-[95svh] md:max-h-[90vh]
          overflow-y-auto overscroll-contain
          bg-[#09090b]
          md:rounded-[32px] rounded-t-[32px]
          border border-[#d4af37]/20
          shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_32px_80px_rgba(0,0,0,0.8),0_0_120px_rgba(212,175,55,0.06)]
          transition-all duration-380 ease-out
          ${isClosing ? "translate-y-full md:translate-y-8 opacity-0 scale-[0.97]" : "translate-y-0 opacity-100 scale-100"}
        `}
      >
        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]" aria-hidden="true">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#d4af37]/6 rounded-full blur-[90px]" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-green-600/5 rounded-full blur-[80px]" />
        </div>

        {/* ── SOCIAL PROOF TICKER ── */}
        <div className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center gap-1 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
            ))}
          </div>
          <p
            className="text-[11px] text-white/50 truncate font-medium"
            style={{
              opacity: tickerFade ? 1 : 0,
              transform: tickerFade ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {TICKER[tickerIdx]}
          </p>
        </div>

        {/* Drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-0.5" aria-hidden="true">
          <div className="w-9 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-10 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white/30 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="relative z-10 px-5 md:px-7 pt-5 pb-7 space-y-5">

          {/* ── WORLD CUP WINDOW HEADER ── */}
          <div className="space-y-4">
            {/* Badge */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/30" />
              <span className="text-[10px] font-black text-[#d4af37]/70 uppercase tracking-[0.25em] whitespace-nowrap">
                ⚽ World Cup 2026 Window
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
            </div>

            {/* Countdown — framed as "timing", not panic */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Final whistle</p>
                <p className="text-xs text-white/50 font-medium">July 19 · MetLife Stadium</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { v: timeLeft.d, u: "d" },
                  { v: timeLeft.h, u: "h" },
                  { v: timeLeft.m, u: "m" },
                  { v: timeLeft.s, u: "s" },
                ].map(({ v, u }, i) => (
                  <div key={u} className="flex items-center gap-0.5">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1 min-w-[2.2ch] text-center">
                      <span className="text-white font-black text-sm tabular-nums">{u === "d" ? v : pad(v)}</span>
                    </div>
                    <span className="text-white/20 text-[9px]">{u}</span>
                    {i < 3 && <span className="text-white/15 text-xs mx-0.5">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-[26px] md:text-[30px] font-serif font-bold text-white leading-tight tracking-tight">
                Equip Your Team.<br />
                <span className="bg-gradient-to-r from-[#d4af37] via-yellow-300 to-[#d4af37] bg-clip-text text-transparent">
                  One tap. No app. Ever.
                </span>
              </h2>
              <p className="text-white/35 text-sm mt-1.5 leading-relaxed">
                1,350+ professionals across Bangladesh and GCC have already upgraded.
                World Cup timing — one window to get your whole team sorted.
              </p>
            </div>
          </div>

          {/* ── TIER SELECTOR ── */}
          <div className="space-y-2">
            {TIERS.map(tier => {
              const active = selectedTier === tier.id;
              const perC = Math.round(tier.bundlePrice / tier.qty);
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border text-left transition-all duration-200
                    ${active
                      ? "bg-[#d4af37]/[0.07] border-[#d4af37]/35 shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                      : "bg-white/[0.02] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  aria-pressed={active}
                >
                  {tier.tag && (
                    <span className={`absolute -top-2.5 right-4 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-full
                      ${tier.id === "team"
                        ? "bg-[#d4af37] text-black"
                        : "bg-white/10 text-white/60 border border-white/15"
                      }`}>
                      {tier.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0
                      ${active ? "bg-[#d4af37]/15" : "bg-white/[0.04]"}`}>
                      {tier.emoji}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${active ? "text-white" : "text-white/60"}`}>
                        {tier.qty} cards · {tier.label}
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">{tier.perksLabel}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className={`text-base font-black ${active ? "text-[#d4af37]" : "text-white/50"}`}>
                      ৳{tier.bundlePrice.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-white/25">৳{perC}/card</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── REVIEW STAND ADD-ON ── */}
          <button
            onClick={() => setAddStand(v => !v)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border text-left transition-all duration-200
              ${addStand ? "bg-green-500/[0.07] border-green-400/25" : "bg-white/[0.02] border-white/[0.07] hover:border-white/15"}`}
            aria-pressed={addStand}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg
                ${addStand ? "bg-green-500/15" : "bg-white/[0.04]"}`}>
                🏪
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className={`text-sm font-bold ${addStand ? "text-white" : "text-white/55"}`}>
                    Add NFC Review Stand
                  </p>
                  {addStand && <Check className="w-3.5 h-3.5 text-green-400" />}
                </div>
                <p className="text-[10px] text-white/25 mt-0.5">Google reviews open on tap · No app</p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-[10px] text-white/20 line-through">৳{STAND_ORIGINAL.toLocaleString()}</p>
              <p className={`text-sm font-bold ${addStand ? "text-green-300" : "text-white/40"}`}>
                ৳{STAND_PACK_PRICE.toLocaleString()}
              </p>
            </div>
          </button>

          {/* ── INVESTMENT SUMMARY ── */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 py-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-1">
                  Team Investment
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl md:text-5xl font-serif font-black text-white">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-white/20 text-sm">BDT</span>
                </div>
                <p className="text-[10px] text-white/20 mt-1">
                  One-time · Free lifetime profile · No subscription
                </p>
              </div>
              <div className="text-right">
                {totalSaving > 0 && (
                  <div className="inline-flex items-center gap-1 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full px-3 py-1 mb-1">
                    <span className="text-[#d4af37] text-xs font-black">↓ ৳{totalSaving.toLocaleString()} off</span>
                  </div>
                )}
                <p className="text-[10px] text-white/20">
                  ৳{perCard}/card · Free delivery BD
                </p>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="space-y-2">
            {!showShare ? (
              <button
                onClick={handleWhatsApp}
                className="wl-shimmer-wrap wl-gold-pulse w-full py-4 md:py-5 rounded-2xl font-black text-base md:text-[17px] text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #b8962e 0%, #d4af37 40%, #f0d060 70%, #d4af37 100%)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <MessageCircle className="w-5 h-5" />
                  Order {activeTier.qty} Cards on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            ) : (
              <div className="wl-slide-up space-y-2">
                <div className="w-full py-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-center">
                  <p className="text-[#d4af37] font-black text-sm">🎉 WhatsApp opening…</p>
                  <p className="text-white/30 text-xs mt-0.5">Your team pack is being prepared</p>
                </div>
                <button
                  onClick={handleViralShare}
                  className="w-full py-3.5 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-bold text-sm hover:bg-[#25D366]/20 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share with your network
                  <span className="text-[#25D366]/40 text-xs font-normal">— they'll thank you</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                handleClose();
                setTimeout(() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }), 500);
              }}
              className="w-full py-3 bg-transparent border border-white/[0.06] text-white/25 text-sm font-medium rounded-2xl hover:border-white/15 hover:text-white/40 transition-all"
            >
              Order on website instead
            </button>
          </div>

          <p className="text-center text-white/15 text-[9px] tracking-wide">
            FIFA World Cup 2026 window · Prices in BDT · Bkash · WhatsApp
          </p>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferPopup;
