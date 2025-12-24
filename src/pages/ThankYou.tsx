import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPaperToDigitalReveal, createScanLineEffect, createDigitalReveal } from "@/lib/animations";
import { CheckCircle2, Sparkles, Home, Package } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isTransformed, setIsTransformed] = useState(false);
  
  // Get personalized data from URL params or defaults
  const customerName = searchParams.get("name") || "Valued Customer";
  const orderId = searchParams.get("orderId") || "N/A";
  
  const paperRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Paper-to-digital transformation sequence
    const sequence = async () => {
      if (paperRef.current && containerRef.current) {
        // Step 1: Show paper note
        createPaperToDigitalReveal(paperRef.current, { delay: 300 });
        
        // Step 2: Scan line effect (digitization)
        setTimeout(() => {
          createScanLineEffect(containerRef.current!, { duration: 1500 });
        }, 1200);
        
        // Step 3: Transform to digital
        setTimeout(() => {
          if (paperRef.current) {
            paperRef.current.style.opacity = "0";
            paperRef.current.style.transform = "scale(0.95) translateY(20px)";
          }
          setIsTransformed(true);
          
          // Step 4: Reveal digital greeting
          if (digitalRef.current) {
            createDigitalReveal(digitalRef.current, { direction: "left", delay: 200 });
          }
        }, 2500);
      }
    };

    sequence();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-custom-navy via-primary to-custom-sky"
      aria-label="Thank you page"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* Paper Note (Initial State) */}
        <div
          ref={paperRef}
          className="relative bg-gradient-paper paper-texture rounded-2xl shadow-paper p-12 md:p-16 border-2 border-white/20"
          role="img"
          aria-label="Paper thank you note"
        >
          <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20,20 L80,20 L80,80 L20,80 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-custom-dark-gray mb-4 font-serif">
            Thank You
          </h1>
        </div>

        {/* Digital Greeting (Transformed State) */}
        {isTransformed && (
          <div
            ref={digitalRef}
            className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-luxury p-12 md:p-16 border border-white/50"
            role="article"
            aria-live="polite"
            aria-label="Digital thank you greeting"
          >
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow" />
                <CheckCircle2 className="relative w-20 h-20 text-primary" aria-hidden="true" />
              </div>
            </div>

            {/* Personalized Message */}
            <h1 className="text-4xl md:text-6xl font-bold text-custom-navy mb-4 font-serif">
              Thank You, {customerName}!
            </h1>
            
            <div className="mb-8">
              <p className="text-xl text-custom-dark-gray mb-2">
                Your order has been confirmed
              </p>
              <p className="text-lg text-muted-foreground">
                Order ID: <span className="font-semibold text-primary">{orderId}</span>
              </p>
            </div>

            {/* Decorative Sparkles */}
            <div className="flex justify-center gap-4 mb-8" aria-hidden="true">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" style={{ animationDelay: "0s" }} />
              <Sparkles className="w-8 h-8 text-primary animate-pulse" style={{ animationDelay: "0.3s" }} />
              <Sparkles className="w-6 h-6 text-primary animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>

            {/* Message */}
            <div className="bg-gradient-luxury/10 rounded-lg p-6 mb-8 border border-primary/20">
              <p className="text-lg text-foreground leading-relaxed">
                We're thrilled to be part of your digital transformation journey! 
                Your personalized Wavelink card is being prepared with care.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full px-8 shadow-luxury transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Return to home page"
              >
                <Home className="mr-2 w-5 h-5" aria-hidden="true" />
                Back to Home
              </Button>
              
              <Button
                onClick={() => navigate("/#order")}
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-2 hover:bg-accent transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Track your order"
              >
                <Package className="mr-2 w-5 h-5" aria-hidden="true" />
                Track Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThankYou;

