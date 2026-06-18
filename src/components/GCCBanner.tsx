import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

const GCC_TIMEZONES = new Set([
  "Asia/Dubai",    // UAE
  "Asia/Qatar",    // Qatar
  "Asia/Bahrain",  // Bahrain
  "Asia/Kuwait",   // Kuwait
  "Asia/Riyadh",   // Saudi Arabia
  "Asia/Muscat",   // Oman
]);

const STORAGE_KEY = "wl-gcc-banner-dismissed";

// Detect GCC user by timezone (client-side, no API call)
const detectGCC = (): boolean => {
  try {
    return GCC_TIMEZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
};

const GCCBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (detectGCC()) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  if (!show) return null;

  return (
    <div
      role="banner"
      className="fixed top-0 inset-x-0 z-[9990] bg-gradient-to-r from-[#b8962e] via-[#d4af37] to-[#b8962e] text-[#03090a] py-2.5 px-4 flex items-center justify-center gap-3"
      style={{ fontFamily: "inherit" }}
    >
      <span className="text-base leading-none" aria-hidden="true">🇦🇪</span>
      <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-center">
        Visiting from the GCC?&nbsp;
        <span className="font-black">AED 179 Complete Business Kit</span>
        &nbsp;— NFC card + Review Stand, no subscription.
      </p>
      <Link
        to="/ae"
        onClick={dismiss}
        className="shrink-0 flex items-center gap-1 bg-black/15 hover:bg-black/25 text-[#03090a] font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all"
        aria-label="See GCC offer"
      >
        See offer <ArrowRight className="w-3 h-3" />
      </Link>
      <button
        onClick={dismiss}
        className="shrink-0 ml-1 text-black/40 hover:text-black transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default GCCBanner;
