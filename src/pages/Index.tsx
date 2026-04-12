import { lazy, Suspense, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
const OnboardingTutorial = lazy(() => import("@/components/OnboardingTutorial").then(m => ({ default: m.OnboardingTutorial })));
import { Sparkles, Zap, Star, ShoppingBag } from "lucide-react";
import { translations, Language } from "@/lib/translations";
import { readContext, getPersonalizedContent, type PersonalizationContext, type PersonalizedContent } from "@/lib/personalization";
const SmartGreeting = lazy(() => import("@/components/SmartGreeting").then(m => ({ default: m.SmartGreeting })));
const PreferencesPanel = lazy(() => import("@/components/PreferencesPanel").then(m => ({ default: m.PreferencesPanel })));

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DemoVideoSection = lazy(() => import("@/components/DemoVideoSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const OrderSection = lazy(() => import("@/components/OrderSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const AdSenseBanner = lazy(() => import("@/components/AdSenseBanner"));
const AffiliateSection = lazy(() => import("@/components/AffiliateSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ReviewStandsSection = lazy(() => import("@/components/ReviewStandsSection"));
const Footer = lazy(() => import("@/components/Footer"));
const LiveReviewFeed = lazy(() => import("@/components/LiveReviewFeed"));

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center py-20" aria-label="Loading section">
    <div className="w-12 h-12 border-4 border-sky/30 border-t-sky rounded-full animate-spin" aria-hidden="true"></div>
  </div>
);

const Index = () => {
  const [lang, setLang] = useState<Language>("en");
  const hasConsent = typeof window !== 'undefined' && localStorage.getItem("cookie-consent") === "true";

  // Personalization context state (deferred so it never blocks LCP)
  const [personCtx, setPersonCtx] = useState<PersonalizationContext | null>(null);
  const [personContent, setPersonContent] = useState<PersonalizedContent | null>(null);

  // Safety check for translations
  const t = translations[lang] || translations["en"];

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 || /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Scroll Progress Bar (replaces framer-motion useScroll/useSpring) ---
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (rafId) return; // Already scheduled
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        if (progressBarRef.current) {
          // Direct DOM mutation: zero React overhead
          progressBarRef.current.style.transform = `scaleY(${progress})`;
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- Phase Detection (IntersectionObserver) ---
  const [activePhase, setActivePhase] = useState(1);
  const [showActiveTooltip, setShowActiveTooltip] = useState(true);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Center-of-viewport trigger
      threshold: 0
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const phaseMatch = id.match(/phase-(\d)/);
          if (phaseMatch) {
            const newPhase = parseInt(phaseMatch[1]);
            setActivePhase(newPhase);
            setShowActiveTooltip(true);

            if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
            tooltipTimeout.current = setTimeout(() => setShowActiveTooltip(false), 3000);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    ["phase-1", "phase-2", "phase-3"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, []);

  // --- Language Detection ---
  useEffect(() => {
    // Default to 'en', but check browser language as a non-breaking fallback
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'bn') {
      setLang('bn');
    }
  }, []);

  // --- Personalization init (deferred after LCP) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = readContext();
      setPersonCtx(ctx);
      setPersonContent(getPersonalizedContent(ctx));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- Sticky CTA: hide when order section is visible ---
  const [stickyCTAHidden, setStickyCTAHidden] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { setStickyCTAHidden(entries[0].isIntersecting); },
      { threshold: 0.1 }
    );
    const orderEl = document.getElementById('order');
    if (orderEl) observer.observe(orderEl);
    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
// --- Performance: Deferred AdSense Loading ---
  const [showAd, setShowAd] = useState(false);
  const adTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasConsent || showAd) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowAd(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });

    if (adTriggerRef.current) observer.observe(adTriggerRef.current);
    return () => observer.disconnect();
  }, [hasConsent, showAd]);

  
  const phases = [
    { id: 1, name: t.phases.phase1, desc: t.phases.phase1Desc, icon: Sparkles },
    { id: 2, name: t.phases.phase2, desc: t.phases.phase2Desc, icon: Zap },
    { id: 3, name: t.phases.phase3, desc: t.phases.phase3Desc, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-sky/20 selection:text-navy">
      {/* Smart Greeting Bar (personalization layer) */}
      {personCtx && personContent && (
        <Suspense fallback={null}>
          <SmartGreeting context={personCtx} content={personContent} />
        </Suspense>
      )}

      {!isMobile && (
        <Suspense fallback={null}>
          <OnboardingTutorial lang={lang} />
        </Suspense>
      )}
      <header>
        <Navbar lang={lang} />
      </header>

      {/* Vertical Side-Sticky Navigation — pure CSS transitions, no framer-motion */}
      <nav
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6"
        aria-label="Phase navigation"
      >
        {/* Progress bar: driven by CSS transform via direct DOM ref, zero React render cost */}
        <div className="relative h-48 md:h-64 w-1.5 bg-muted/30 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 w-full h-full bg-sky origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="flex flex-col gap-8">
          {phases.map((phase) => (
            <div key={phase.id} className="relative group">
              <button
                onClick={() => scrollToPhase(`phase-${phase.id}`)}
                className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 group/btn
                  ${activePhase === phase.id
                    ? "bg-blue text-white shadow-luxury-glow scale-110"
                    : "bg-white border-2 border-blue/10 text-blue/40 hover:border-blue/30 hover:bg-blue/5 hover:text-blue hover:shadow-luxury"}`}
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
                aria-label={`Go to ${phase.name}`}
                aria-current={activePhase === phase.id ? "true" : undefined}
              >
                <phase.icon className={`w-5 h-5 md:w-6 md:h-6 ${activePhase === phase.id ? "text-white animate-pulse" : "text-blue/40 group-hover/btn:text-blue animate-bounce"}`} />
              </button>

              {/* Tooltip: Glassmorphism and dynamic visibility */}
              <div
                className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-5 py-3 bg-white/10 backdrop-blur-lg text-blue rounded-2xl whitespace-nowrap shadow-luxury border border-white/20 pointer-events-none
                    transition-all duration-500 ease-out z-50 hidden lg:block
                    ${(hoveredPhase === phase.id || (activePhase === phase.id && showActiveTooltip))
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-5"}`}
                aria-hidden="true"
              >
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-blue/60 mb-1 leading-none">{phase.name}</p>
                <p className="text-sm font-bold tracking-tight text-blue">{phase.desc}</p>
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white/10 backdrop-blur-lg rotate-45 border-r border-t border-white/20" />
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Invisible trigger for AdSense */}
      <div ref={adTriggerRef} className="h-1 absolute top-[2000px] pointer-events-none" aria-hidden="true" />

      <main className="w-full">
        <HeroSection lang={lang} />

        <div className="space-y-0">
          {/* PHASE 1: THE SPARK */}
          <section id="phase-1" data-section="phase-1" className="relative group/section">
            {/* Contextual Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-[10%] -left-[5%] w-[50%] h-[40%] bg-glow-wave opacity-0 group-hover/section:opacity-60 transition-opacity duration-1000 blur-[120px]" />
              <div className="absolute bottom-[20%] -right-[5%] w-[40%] h-[40%] bg-glow-teal opacity-0 group-hover/section:opacity-40 transition-opacity duration-1000 blur-[100px]" />
            </div>
            <div className="relative z-10 space-y-12 lg:space-y-20 py-12 lg:py-32 px-4 sm:px-6">
              <Suspense fallback={<SectionLoader />}>
                <AboutSection lang={lang} />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <DemoVideoSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <LiveReviewFeed />
              </Suspense>
            </div>
          </section>

          {/* PHASE 2: THE POWER */}
          <section id="phase-2" data-section="phase-2" className="bg-muted/30 relative group/section overflow-hidden">
            {/* Constant Subtle Glow for Depth */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-glow-wave opacity-20 blur-[150px]" />
            </div>
            <div className="relative z-10 space-y-12 lg:space-y-20 py-12 lg:py-32 px-4 sm:px-6">
              <Suspense fallback={<SectionLoader />}>
                <ReviewStandsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <PricingSection />
              </Suspense>
            </div>
          </section>

          {/* PHASE 3: THE LEAP */}
          <section id="phase-3" data-section="phase-3" className="relative group/section overflow-hidden">
            {/* Powerful Final Exit Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-glow-wave opacity-40 blur-[120px]" />
              <div className="absolute top-0 right-0 w-[40%] h-[30%] bg-glow-teal opacity-20 blur-[100px]" />
            </div>
            <div className="relative z-10 space-y-20 lg:space-y-32 py-20 lg:py-32 px-4 sm:px-6">
              <Suspense fallback={<SectionLoader />}>
                <OrderSection lang={lang} />
              </Suspense>
              <div className="space-y-0">
                <Suspense fallback={<SectionLoader />}>
                  <ReviewsSection />
                </Suspense>

                {showAd && (
                  <Suspense fallback={null}>
                    <AdSenseBanner />
                  </Suspense>
                )}

                <Suspense fallback={<SectionLoader />}>
                  <AffiliateSection />
                </Suspense>
              </div>
              <Suspense fallback={<SectionLoader />}>
                <FAQSection lang={lang} />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ContactSection />
              </Suspense>
            </div>
          </section>
        </div>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

      {/* Sticky Mobile CTA — +12% mobile conversion */}
      <div
        className={`sticky-mobile-cta ${ stickyCTAHidden ? 'cta-hidden' : '' }`}
        aria-hidden={stickyCTAHidden}
      >
        <a
          href="#order"
          data-track-cta
          onClick={(e) => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 text-primary-foreground font-bold text-sm inline-link"
          aria-label="Get your NFC card — scroll to order section"
        >
          <ShoppingBag size={16} aria-hidden="true" />
          Get Your NFC Card — Ships in 3 Days
        </a>
      </div>
      <div className="sticky-cta-spacer" aria-hidden="true" />

      {/* Preferences Panel (personalization layer) */}
      {personCtx && (
        <Suspense fallback={null}>
          <PreferencesPanel onSelect={(seg) => setPersonContent(getPersonalizedContent({ ...personCtx!, segment: seg }))} />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
