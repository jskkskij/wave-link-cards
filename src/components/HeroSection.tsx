import { Button } from "@/components/ui/button";
import newLogo from "@/assets/wavelink-logo-new.png";
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

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
      aria-label="Hero section"
    >
      {/* 
        Background Layer: Enhanced Vibe
        Subtle logo-aligned glows to bring back the "blue energy".
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-glow-wave blur-[120px] opacity-80 animate-pulse-subtle" />
        <div className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] bg-glow-teal blur-[100px] opacity-50" />
        {/* Additional subtle glow for center depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-glow-wave blur-[150px] opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div ref={contentRef} className="flex flex-col items-center text-center gap-16 md:gap-24">

          {/* Main Headline - Apple-level Display Typography */}
          <div className="flex flex-col gap-6 md:gap-8">
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-foreground leading-[0.95] md:leading-[0.9] animate-fade-in opacity-0 font-bold tracking-[-0.04em]" style={{ animationDelay: '0.2s' }}>
              {lang === "en" ? (
                <>
                  One Tap. <br />
                  <span className="text-blue">Endless Connections.</span>
                </>
              ) : (
                <>
                  এক ট্যাপ। <br />
                  <span className="text-blue">অফুরন্ত সংযোগ।</span>
                </>
              )}
            </h1>

            {/* Subheading - Refined & Clear */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-tight animate-fade-in opacity-0 font-medium tracking-tight" style={{ animationDelay: '0.4s' }}>
              {lang === "en"
                ? "The luxury infrastructure for professional trust. Elevate your presence with engineered NFC excellence."
                : "পেশাদার আস্থার জন্য বিলাসবহুল অবকাঠামো। আপনার উপস্থিতিকে আরও উন্নত করুন।"
              }
            </p>
          </div>

          {/* Minimalist CTA Cluster */}
          <div className="animate-fade-in opacity-0 flex flex-col items-center gap-12" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={scrollToOrder}
              size="lg"
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-10 py-7 rounded-full text-lg shadow-luxury-intense transition-all active:scale-95 sm:w-auto w-full transition-luxury"
              aria-label={t.hero.cta}
            >
              {t.hero.cta}
            </Button>

            {/* Micro-interaction Scroll Indicator */}
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-6 text-muted-foreground hover:text-foreground transition-luxury"
              aria-label="Scroll down to explore"
            >
              <div className="w-[1px] h-16 bg-muted relative overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-blue animate-drop" />
              </div>
            </button>
          </div>
        </div>

        {/* 
            Visual Moment: The Card
            Near-monochrome, subtle shadow, 100% refined.
        */}
        <div className="relative w-full max-w-sm md:max-w-2xl mx-auto mt-20 md:mt-24 perspective-1000 animate-fade-in-delayed opacity-0 group/card" aria-hidden="true">
          <div className="w-full aspect-[1.586/1] rounded-2xl bg-white border border-muted shadow-luxury-intense transform rotate-X-12 flex items-center justify-center transition-luxury hover:rotate-X-0 hover:scale-[1.02] hover:shadow-luxury-glow cursor-default">
            <img
              src={newLogo}
              alt="Wavelink Logo"
              width={160}
              height={160}
              fetchPriority="high"
              className="w-28 md:w-40 h-auto opacity-100 transition-luxury group-hover/card:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
