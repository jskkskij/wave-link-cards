import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, Trophy, Zap, Check, MessageCircle } from "lucide-react";
import { CONFIG } from "@/lib/config";

const STORAGE_KEY = "wavelink-offer-dismissed";
const SHOW_DELAY_MS = 12000;
const COOLDOWN_HOURS = 24;

// ── Bulk tiers — all maintain ≥50% gross margin ──────────────────────────────
const TIERS = [
  {
    id: "trio",
    label: "Trio",
    qty: 3,
    perCardOriginal: 599,
    bundlePrice: 1599,
    originalTotal: 1797,
    tag: null,
  },
  {
    id: "xi",
    label: "Starting XI",
    qty: 5,
    perCardOriginal: 599,
    bundlePrice: 2599,
    originalTotal: 2995,
    tag: "⭐ Most Popular",
  },
  {
    id: "squad",
    label: "Full Squad",
    qty: 10,
    perCardOriginal: 599,
    bundlePrice: 4999,
    originalTotal: 5990,
    tag: "Best Value",
  },
] as const;

type TierId = typeof TIERS[number]["id"];

// Review stand add-on pricing (consistent with main pricing section)
const STAND_ORIGINAL = 1212;
const STAND_WITH_PACK = 999; // ৳213 off when bundled

const SpecialOfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierId>("xi");
  const [addStand, setAddStand] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const hoursSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60);
      if (hoursSince < COOLDOWN_HOURS) return;
    }
    const timer = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      document.body.style.overflow = "";
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, 400);
  }, []);

  const activeTier = TIERS.find(t => t.id === selectedTier)!;
  const savings = activeTier.originalTotal - activeTier.bundlePrice + (addStand ? STAND_ORIGINAL - STAND_WITH_PACK : 0);
  const totalPrice = activeTier.bundlePrice + (addStand ? STAND_WITH_PACK : 0);
  const perCard = Math.round(activeTier.bundlePrice / activeTier.qty);

  const handleWhatsApp = useCallback(() => {
    const standLine = addStand ? ` + NFC Review Stand (৳${STAND_WITH_PACK})` : "";
    const message = `Hi Wavelink! I want the World Cup ${activeTier.label} Pack — ${activeTier.qty} NFC cards${standLine} for ৳${totalPrice.toLocaleString()}. Let's go! 🏆⚽`;
    window.open(CONFIG.WHATSAPP_LINK(encodeURIComponent(message)), "_blank");
    handleClose();
  }, [activeTier, addStand, totalPrice, handleClose]);

  const handleOrder = useCallback(() => {
    handleClose();
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [handleClose]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/65 backdrop-blur-sm transition-opacity duration-400 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="World Cup 2026 Squad Pack Offer"
        id="special-offer-popup"
        className={`fixed z-[9999] inset-x-0
          bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:max-w-lg
          max-h-[92vh] md:max-h-[88vh]
          overflow-y-auto overscroll-contain
          bg-gradient-to-br from-[#030d03] via-[#061a06] to-[#04080F]
          md:rounded-3xl rounded-t-3xl
          border border-white/10
          shadow-[0_0_80px_rgba(16,185,129,0.2),0_0_160px_rgba(34,197,94,0.08)]
          transition-all duration-400 ease-out
          ${isClosing
            ? "translate-y-full md:translate-y-[10%] opacity-0 scale-95"
            : "translate-y-0 opacity-100 scale-100"
          }
        `}
      >
        {/* Pitch-green glow */}
        <div className="absolute top-0 left-1/3 w-56 h-56 bg-green-500/15 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none" aria-hidden="true" />

        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1" aria-hidden="true">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 px-5 md:px-8 py-6 md:py-8 space-y-5">

          {/* ── BADGE ── */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-[10px] md:text-xs font-black text-green-300 uppercase tracking-[0.2em]">
                FIFA World Cup 2026 · Limited Window
              </span>
              <span className="text-base" aria-hidden="true">⚽</span>
            </div>
          </div>

          {/* ── HEADLINE ── */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
              The Squad Pack Deal
            </h2>
            <p className="text-white/40 text-sm">
              Equip your whole team before the final whistle.
            </p>
          </div>

          {/* ── TIER SELECTOR ── */}
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map(tier => {
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all duration-200 ${
                    active
                      ? "bg-green-500/15 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20"
                  }`}
                  aria-pressed={active}
                  aria-label={`${tier.qty} card pack — ৳${tier.bundlePrice.toLocaleString()}`}
                >
                  {tier.tag && (
                    <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-black uppercase whitespace-nowrap rounded-full ${
                      tier.id === "xi"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500/80 text-black"
                    }`}>
                      {tier.tag}
                    </span>
                  )}
                  <span className={`text-lg font-serif font-bold ${active ? "text-white" : "text-white/60"}`}>
                    {tier.qty}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? "text-green-300" : "text-white/30"}`}>
                    {tier.label}
                  </span>
                  <span className={`text-xs font-bold ${active ? "text-white" : "text-white/50"}`}>
                    ৳{tier.bundlePrice.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── PRICE BREAKDOWN ── */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">{activeTier.qty} × NFC Card</span>
              <div className="flex items-center gap-2">
                <span className="text-white/30 line-through text-xs">৳{activeTier.originalTotal.toLocaleString()}</span>
                <span className="text-white font-bold">৳{activeTier.bundlePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Per card rate */}
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>Per card</span>
              <span className="text-green-400 font-bold">৳{perCard} <span className="text-white/30">(was ৳599)</span></span>
            </div>

            {/* Add-on stand toggle */}
            <div className="border-t border-white/10 pt-3">
              <button
                onClick={() => setAddStand(v => !v)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left ${
                  addStand
                    ? "bg-green-500/10 border-green-400/40"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
                aria-pressed={addStand}
              >
                <div>
                  <p className="text-sm font-bold text-white">+ NFC Review Stand</p>
                  <p className="text-xs text-white/40">Opens Google reviews on tap — no app</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-white/30 line-through text-xs">৳{STAND_ORIGINAL.toLocaleString()}</p>
                  <p className={`font-bold text-sm ${addStand ? "text-green-400" : "text-white/70"}`}>৳{STAND_WITH_PACK}</p>
                </div>
              </button>
            </div>

            {/* Total */}
            <div className="border-t border-dashed border-white/10 pt-3 flex items-end justify-between">
              <div>
                <p className="text-white/40 text-xs">Total you pay</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-white/30 text-sm font-bold">BDT</span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-300 text-xs font-bold">Save ৳{savings.toLocaleString()}</span>
                </div>
                <p className="text-white/20 text-[10px] mt-1">One-time. No subscriptions.</p>
              </div>
            </div>
          </div>

          {/* ── TRUST STRIP ── */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center">
            {[
              { icon: "🏆", text: "World Cup Window Pricing" },
              { icon: "⚡", text: "Bkash · WhatsApp Order" },
              { icon: "🚚", text: "Free Delivery BD" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-sm" aria-hidden="true">{item.icon}</span>
                <span className="text-white/40 text-xs font-bold">{item.text}</span>
              </span>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div className="space-y-2.5 pb-1">
            <button
              onClick={handleWhatsApp}
              className="w-full py-4 md:py-5 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 text-[#030d03] text-base md:text-lg font-black rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Order {activeTier.qty} Cards on WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={handleOrder}
              className="w-full py-3 bg-white/5 border border-white/10 text-white/60 text-sm font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <Zap className="w-4 h-4 inline mr-1.5" />
              Order on website instead
            </button>
          </div>

          <p className="text-center text-white/20 text-[10px]">
            Offer valid during FIFA World Cup 2026 window · Prices in BDT · Subject to availability
          </p>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferPopup;
