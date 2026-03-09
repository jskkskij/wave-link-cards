import { Button } from "@/components/ui/button";
import newLogo from "@/assets/wavelink-logo-new.png";
const heroBg = "/assets/hero-bg.jpg";
import { ArrowDown, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPaperToDigitalReveal } from "@/lib/animations";
import { translations, Language } from "@/lib/translations";

interface HeroSectionProps {
  lang?: Language;
}

const HeroSection = ({ lang = "en" }: HeroSectionProps) => {
  const t = translations[lang];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      createPaperToDigitalReveal(contentRef.current, { delay: 200 });
    }
  }, []);

  const scrollToProducts = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-32"
      aria-label="Hero section"
    >
      {/* 
        Background Layer: High-Impact Visual
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-60"
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />

        {/* Subtle Brand Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-glow-wave blur-[120px] opacity-40 animate-pulse-subtle" />
          <div className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] bg-glow-teal blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[60vh] granular-blend-bottom z-[1] pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div ref={contentRef} className="flex flex-col items-center text-center gap-12 md:gap-16">

          {/* Main Headline - Apple-level Display Typography */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.95] md:leading-[0.9] animate-fade-in opacity-0 font-bold tracking-[-0.04em]" style={{ animationDelay: '0.2s', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              {lang === "en" ? (
                <>
                  One Tap. <br />
                  <span className="text-white/90">Endless Connections.</span>
                </>
              ) : (
                <>
                  এক ট্যাপ। <br />
                  <span className="text-white/90">অফুরন্ত সংযোগ।</span>
                </>
              )}
            </h1>

            {/* Subheading - Refined & Clear */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-tight animate-fade-in opacity-0 font-medium tracking-tight mt-4" style={{ animationDelay: '0.4s' }}>
              We are building the AI Trust Infrastructure with NFC Business cards and Review stands for feedbacks.
            </p>
          </div>

          {/* Minimalist CTA Cluster */}
          <div className="animate-fade-in opacity-0 flex flex-col items-center gap-12" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-12 py-8 rounded-full text-xl shadow-luxury-intense transition-all active:scale-95 sm:w-auto w-full border border-white/10"
              aria-label={t.hero.cta}
            >
              BEGIN JOURNEY
            </Button>

            {/* Micro-interaction Scroll Indicator */}
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-6 text-slate-400 hover:text-white transition-luxury mt-8"
              aria-label="Scroll down to explore"
            >
              <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-blue-400 animate-drop" />
              </div>
              <ArrowDown className="w-4 h-4 animate-bounce opacity-40 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
