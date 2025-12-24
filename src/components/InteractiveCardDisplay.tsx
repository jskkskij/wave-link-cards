import { useState, useRef } from "react";
import productImage from "@/assets/wavelink-cards.png";
import { Sparkles } from "lucide-react";

interface InteractiveCardDisplayProps {
  className?: string;
}

const InteractiveCardDisplay = ({ className = "" }: InteractiveCardDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Interactive Wavelink smart cards display"
    >
      {/* 
        Zen Container:
        No badges, just the object in the void.
      */}

      <div
        className="relative w-full max-w-sm mx-auto transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.05}deg) rotateX(${(50 - mousePosition.y) * 0.05}deg) scale(1.02)`
            : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Soft Ambient Shadow (The "Ground") */}
        <div
          className="absolute -inset-4 bg-navy/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
          style={{
            transform: `translate(${(50 - mousePosition.x) * 0.2}px, ${(50 - mousePosition.y) * 0.2}px)`
          }}
        />

        {/* Card Object */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 bg-white">
          <img
            src={productImage}
            alt="Wavelink Smart Card"
            className="w-full h-auto object-cover"
            loading="lazy"
          />

          {/* Subtle Shimmer (Light Reflection) */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"
            style={{
              opacity: isHovered ? 0.5 : 0,
              transform: `translateX(${(mousePosition.x - 50)}%) translateY(${(mousePosition.y - 50)}%)`,
              transition: 'opacity 0.5s ease, transform 0.1s ease-out'
            }}
          />
        </div>

        {/* Floating "Spirit" Particles */}
        {isHovered && (
          <>
            <Sparkles
              className="absolute -top-6 -right-6 text-sky/50 w-8 h-8 animate-float"
              style={{ animationDelay: '0s' }}
            />
            <Sparkles
              className="absolute -bottom-4 -left-4 text-primary/30 w-6 h-6 animate-float"
              style={{ animationDelay: '0.5s' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveCardDisplay;


