import { useState, useEffect, useCallback } from "react";
import { X, Zap, Flame, ArrowRight, Sparkles, Wrench } from "lucide-react";
import { CONFIG } from "@/lib/config";

const STORAGE_KEY = "wavelink-offer-dismissed";
const SHOW_DELAY_MS = 12000; // 12s after page load
const COOLDOWN_HOURS = 24;

const SpecialOfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleCTA = useCallback(() => {
    handleClose();
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [handleClose]);

  const handleWhatsApp = useCallback(() => {
    const message = `Hello Wavelink! I want the Inflation-Buster Bundle — Review Stand + Smart Card + free setup. Let's go!`;
    window.open(CONFIG.WHATSAPP_LINK(encodeURIComponent(message)), "_blank");
    handleClose();
  }, [handleClose]);

  if (!isVisible) return null;

  // Bundle math
  const standPrice = 1212;
  const cardPrice = 599;
  const bundleTotal = standPrice + cardPrice;
  const savings = 162;
  const bundlePrice = bundleTotal - savings;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup — bottom-sheet on mobile, centered modal on desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Inflation-Buster Trust Bundle"
        id="special-offer-popup"
        className={`fixed z-[9999] inset-x-0 
          bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          w-full md:max-w-lg
          max-h-[90vh] md:max-h-[85vh]
          overflow-y-auto overscroll-contain
          bg-gradient-to-br from-[#04080F] via-[#0a1628] to-[#04080F]
          md:rounded-3xl rounded-t-3xl
          border border-white/10 
          shadow-[0_0_80px_rgba(0,119,255,0.25),0_0_160px_rgba(0,229,255,0.1)]
          transition-all duration-400 ease-out
          ${isClosing 
            ? "translate-y-full md:translate-y-[10%] opacity-0 scale-95" 
            : "translate-y-0 md:translate-y-[-50%] opacity-100 scale-100"
          }
        `}
      >
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        {/* Mobile drag indicator */}
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

        {/* Content */}
        <div className="relative z-10 px-5 md:px-8 py-6 md:py-8 space-y-5">

          {/* ── BADGE ── */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 animate-pulse-subtle">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] md:text-xs font-black text-amber-300 uppercase tracking-[0.2em]">
                Recession-Proof Deal
              </span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* ── HERO PRICE STATEMENT ── */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
              The Inflation-Buster Bundle
            </h2>

            {/* The one big statement */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
              {/* Two prices side by side */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="text-center">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Review Stand</p>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-white">৳{standPrice.toLocaleString()}</p>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white/20">+</div>
                <div className="text-center">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Smart Card</p>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-white">৳{cardPrice}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dashed border-white/10" /></div>
                <div className="relative flex justify-center">
                  <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-cyan-400 text-[#04080F] rounded-full">
                    Bundle & Save ৳{savings}
                  </span>
                </div>
              </div>

              {/* Final price */}
              <div className="text-center">
                <p className="text-white/40 text-xs mb-1">You pay only</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
                    ৳{bundlePrice.toLocaleString()}
                  </span>
                  <span className="text-white/30 text-sm font-bold">BDT</span>
                </div>
                <p className="text-white/30 text-xs mt-1">
                  <span className="line-through text-white/20">৳{bundleTotal.toLocaleString()}</span>
                  {" "}— One-time. No subscriptions. Ever.
                </p>
              </div>
            </div>
          </div>

          {/* ── FREE TECH SUPPORT CALLOUT ── */}
          <div className="relative bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-cyan-500/10 border border-emerald-400/20 rounded-2xl p-4">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-cyan-400 text-[#04080F] rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Included Free
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1.5">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Full Tech Support, Setup & Installation</p>
                <p className="text-white/40 text-xs">We handle everything — NFC programming, QR config, design upload. You just unbox and go.</p>
              </div>
            </div>
          </div>

          {/* ── TRUST STRIP ── */}
          <div className="flex items-center justify-center gap-4 flex-wrap text-center">
            {[
              { emoji: "🛡️", text: "Built for Life" },
              { emoji: "📦", text: "Fragile-Care Shipping" },
              { emoji: "⚡", text: "Zero Hidden Fees" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm" aria-hidden="true">{item.emoji}</span>
                <span className="text-white/40 text-xs font-bold">{item.text}</span>
              </div>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div className="space-y-2.5 pb-1">
            <button
              onClick={handleCTA}
              className="w-full py-4 md:py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 text-[#04080F] text-base md:text-lg font-black rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.3)] hover:shadow-[0_0_60px_rgba(0,200,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Grab the Bundle
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-white/5 border border-white/10 text-white/60 text-sm font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              💬 Ask on WhatsApp First
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferPopup;
