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
          alt="Premium NFC Business Cards and Review Stands"
          className="w-full h-full object-cover opacity-60"
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />

        {/* Subtle Brand Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-glow-wave blur-[120px] opacity-40 animate-pulse-subtle" />
          <div className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] bg-glow-teal blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[60vh] granular-blend-bottom z-[1] pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        <div ref={contentRef} className="flex flex-col items-center text-center gap-12 md:gap-16">

          {/* Main Headline - Apple-level Display Typography */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h1 className="font-serif text-[clamp(2.5rem,10vw,8rem)] text-white leading-[1.0] animate-fade-in opacity-0 font-bold tracking-[-0.04em] text-balance" style={{ animationDelay: '0.2s', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
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

            {/* Subheading - High Clarity & Outcome Focused */}
            <p className="text-sm md:text-lg lg:text-2xl text-slate-300 max-w-2xl mx-auto leading-tight animate-fade-in opacity-0 font-medium tracking-tight mt-4 text-balance" style={{ animationDelay: '0.4s' }}>
              {lang === "en" 
                ? "Deploy your professional presence with elite NFC Business Cards and Review Stands. Build instant trust with a single tap."
                : "এলিট এনএফসি বিজনেস কার্ড এবং রিভিউ স্ট্যান্ডের মাধ্যমে আপনার পেশাদার পরিচিতি গড়ে তুলুন। এক ট্যাপেই তৈরি করুন তাৎক্ষণিক বিশ্বাস।"}
            </p>
          </div>

          {/* Minimalist CTA Cluster */}
          <div className="animate-fade-in opacity-0 flex flex-col items-center gap-12" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-10 md:px-12 py-7 md:py-8 rounded-full text-lg md:text-xl shadow-luxury-intense transition-all active:scale-95 sm:w-auto w-full border border-white/10 glass-morphism-blue"
              aria-label={lang === "en" ? "Get Your Card Now" : "আপনার কার্ড সংগ্রহ করুন"}
            >
              {lang === "en" ? "GET YOUR CARD NOW" : "আপনার কার্ড সংগ্রহ করুন"}
            </Button>

            {/* Micro-interaction Scroll Indicator */}
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-6 text-slate-400 hover:text-white transition-luxury mt-8"
              aria-label="Scroll down to explore"
              title="Explore Wavelink Infrastructure"
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
