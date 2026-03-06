import { lazy, Suspense, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { OnboardingTutorial } from "@/components/OnboardingTutorial";
import { Sparkles, Zap, Star } from "lucide-react";
import { translations, Language } from "@/lib/translations";

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DemoVideoSection = lazy(() => import("@/components/DemoVideoSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
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
const GrowthFunnel = lazy(() => import("@/components/GrowthFunnel"));

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center py-20" aria-label="Loading section">
    <div className="w-12 h-12 border-4 border-sky/30 border-t-sky rounded-full animate-spin" aria-hidden="true"></div>
  </div>
);

const Index = () => {
  const [lang, setLang] = useState<Language>("en");
  const hasConsent = typeof window !== 'undefined' && localStorage.getItem("cookie-consent") === "true";

  // Safety check for translations
  const t = translations[lang] || translations["en"];

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

  // --- Phase Detection (throttled with RAF) ---
  const [activePhase, setActivePhase] = useState(1);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const phaseTicking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (phaseTicking.current) return;
      phaseTicking.current = true;
      requestAnimationFrame(() => {
        const phaseIds = ["phase-1", "phase-2", "phase-3"];
        for (let i = 0; i < phaseIds.length; i++) {
          const element = document.getElementById(phaseIds[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              setActivePhase(i + 1);
              break;
            }
          }
        }
        phaseTicking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Language Detection ---
  useEffect(() => {
    // Default to 'en', but check browser language as a non-breaking fallback
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'bn') {
      setLang('bn');
    }
  }, []);

  const scrollToPhase = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const phases = [
    { id: 1, name: t.phases.phase1, desc: t.phases.phase1Desc, icon: Sparkles },
    { id: 2, name: t.phases.phase2, desc: t.phases.phase2Desc, icon: Zap },
    { id: 3, name: t.phases.phase3, desc: t.phases.phase3Desc, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-sky/20 selection:text-navy">
      <OnboardingTutorial lang={lang} />
      <Navbar lang={lang} />

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
                <phase.icon className={`w-5 h-5 md:w-6 md:h-6 ${activePhase === phase.id ? "text-white" : "text-blue/40 group-hover/btn:text-blue"}`} />
              </button>

              {/* Tooltip: High-contrast vibrant blue for maximum readability during onboarding */}
              <div
                className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-5 py-3 bg-blue text-white rounded-2xl whitespace-nowrap shadow-luxury-intense pointer-events-none
                    transition-all duration-300 ease-out z-50
                    ${(hoveredPhase === phase.id || activePhase === phase.id)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-5"}`}
                aria-hidden="true"
              >
                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-90 mb-1 leading-none">{phase.name}</p>
                <p className="text-sm font-bold tracking-tight">{phase.desc}</p>
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </nav>

      <main className="w-full">
        <HeroSection lang={lang} />

        <div className="space-y-0">
          {/* PHASE 1: THE SPARK */}
          <section id="phase-1" className="relative group/section">
            {/* Contextual Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-[10%] -left-[5%] w-[50%] h-[40%] bg-glow-wave opacity-0 group-hover/section:opacity-60 transition-opacity duration-1000 blur-[120px]" />
              <div className="absolute bottom-[20%] -right-[5%] w-[40%] h-[40%] bg-glow-teal opacity-0 group-hover/section:opacity-40 transition-opacity duration-1000 blur-[100px]" />
            </div>
            <div className="relative z-10 space-y-20 lg:space-y-32 py-20 lg:py-32">
              <Suspense fallback={<SectionLoader />}>
                <AboutSection lang={lang} />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <DemoVideoSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <LiveReviewFeed />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <GrowthFunnel lang={lang} />
              </Suspense>
            </div>
          </section>

          {/* PHASE 2: THE POWER */}
          <section id="phase-2" className="bg-muted/30 relative group/section overflow-hidden">
            {/* Constant Subtle Glow for Depth */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-glow-wave opacity-20 blur-[150px]" />
            </div>
            <div className="relative z-10 space-y-20 lg:space-y-32 py-20 lg:py-32">
              <Suspense fallback={<SectionLoader />}>
                <FeaturesSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ReviewStandsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <PricingSection />
              </Suspense>
            </div>
          </section>

          {/* PHASE 3: THE LEAP */}
          <section id="phase-3" className="relative group/section overflow-hidden">
            {/* Powerful Final Exit Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-glow-wave opacity-40 blur-[120px]" />
              <div className="absolute top-0 right-0 w-[40%] h-[30%] bg-glow-teal opacity-20 blur-[100px]" />
            </div>
            <div className="relative z-10 space-y-20 lg:space-y-32 py-20 lg:py-32">
              <Suspense fallback={<SectionLoader />}>
                <OrderSection lang={lang} />
              </Suspense>
              <div className="space-y-0">
                <Suspense fallback={<SectionLoader />}>
                  <ReviewsSection />
                </Suspense>
                {hasConsent && (
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
    </div>
  );
};

export default Index;
