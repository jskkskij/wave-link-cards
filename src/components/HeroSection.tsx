import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";
import newLogo from "@/assets/wavelink-logo-new.png";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPaperToDigitalReveal } from "@/lib/animations";

const HeroSection = () => {
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* 
        Background Layer: "Water"
        Deep, calming, providing the void (Negative Space).
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy opacity-95 mix-blend-multiply" />
        <img
          src={heroBackground}
          alt="Hero background"
          className="w-full h-full object-cover opacity-30"
        />
        {/* Zen Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-background" />
      </div>

      {/* 
        Abstract Floating Elements: "Nature/Spirit"
        Replacing literal icons with ethereal glows and shapes.
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky/20 rounded-full blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-[120px] animate-float" />
      </div>

      {/* 
        Content Layer: "Structure/Logic"
        Centered, balanced, typographic focus.
      */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div ref={contentRef} className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
          {/* Main Headline - Large Serif (Eastern Balance) */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.2] md:leading-[1.1] animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Connect with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky via-white to-sky animate-shimmer bg-[length:200%_auto]">
              Seamless Flow
            </span>
          </h1>

          {/* Subheading - Clean Sans (Western Logic) */}
          <p className="text-base md:text-xl text-mist/80 max-w-2xl px-4 md:px-0 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            Where technology meets tranquility. A smart card designed to share connection and leave a lasting impression.
          </p>

          {/* 
             Merged CTA: "Dissolved into Infinite Scroll"
             Replaces the two distinct buttons with a single, flowing interaction.
          */}
          <div className="mt-8 md:mt-12 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={scrollToOrder}
              className="group flex flex-col items-center gap-4 text-mist/60 hover:text-white transition-colors duration-500"
            >
              <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium group-hover:text-sky transition-colors">
                Begin Journey
              </span>

              {/* Custom Scroll Indicator - simulating "infinite scroll" line */}
              <div className="relative w-[1px] h-12 md:h-16 bg-white/10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-sky to-transparent animate-drop" />
              </div>

              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-sky/50 transition-colors">
                <ArrowDown className="w-4 h-4 text-mist/60 group-hover:text-sky animate-bounce" />
              </div>
            </button>
          </div>
        </div>

        {/* 
            Visual representation of the card itself 
            Floating at the bottom, partially cut off to invite scrolling 
        */}
        <div className="relative w-[85%] sm:w-full max-w-sm md:max-w-lg mx-auto mt-12 md:mt-16 perspective-1000 animate-fade-in-delayed opacity-0">
          <div className="w-full aspect-[1.586/1] rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform rotate-X-12 animate-float-intense flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12" />
            <img
              src={newLogo}
              alt="Wavelink Logo"
              className="w-24 md:w-32 h-auto opacity-80 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
