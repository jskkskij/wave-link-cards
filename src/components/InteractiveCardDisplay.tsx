import { useState, useRef } from "react";
import productImage from "@/assets/wavelink-cards.png";
import { Sparkles, Move3d } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

interface InteractiveCardDisplayProps {
  className?: string;
}

const InteractiveCardDisplay = ({ className = "" }: InteractiveCardDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for drag interaction
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth spring physics for rotation
  const springConfig = { damping: 20, stiffness: 200 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Subtle parallax tilt when just hovering
    rotateY.set((x - 50) * 0.2);
    rotateX.set((50 - y) * 0.2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group cursor-grab active:cursor-grabbing ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Interactive Wavelink smart cards display"
    >
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          rotateX.set(0);
          rotateY.set(0);
        }}
        onDrag={(e, info) => {
          // Multiply drag distance for more sensitive rotation
          rotateY.set(info.offset.x * 0.5);
          rotateX.set(-info.offset.y * 0.5);
        }}
        className="relative w-full max-w-sm mx-auto transition-transform duration-1000 ease-out will-change-transform"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
          scale: isHovered ? 1.05 : 1,
        }}
      >
        {/* Vibrant Blue Glow - The "Energy Field" */}
        <div
          className={`absolute -inset-20 bg-primary/20 blur-[100px] rounded-full transition-all duration-1000 ${isHovered ? 'opacity-60 scale-110' : 'opacity-20 scale-100'}`}
        />

        {/* Floating "Aura" - Multiple Layers */}
        <div
          className={`absolute -inset-10 bg-[#0099ff]/10 blur-[60px] rounded-full transition-opacity duration-1000 ${isHovered ? 'opacity-40' : 'opacity-0'}`}
        />

        {/* Card Object - Seamless with Background */}
        <motion.div
          className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_30px_70px_rgba(0,153,255,0.4)] transition-all duration-700"
          animate={isHovered && !isDragging ? { y: -10 } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <img
            src={productImage}
            alt="Wavelink Smart Card"
            className="w-full h-auto object-cover pointer-events-none select-none"
            loading="lazy"
          />

          {/* Dynamic Light Sweep / Reflection */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              x: useTransform(smoothRotateY, [-180, 180], ["-100%", "100%"]),
              y: useTransform(smoothRotateX, [-180, 180], ["-100%", "100%"]),
            }}
          />
        </motion.div>

        {/* Interactive Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-10 -right-10 pointer-events-none"
              >
                <Sparkles className="text-[#0099ff] w-12 h-12 animate-pulse-glow" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -bottom-10 -left-10 pointer-events-none"
              >
                <Sparkles className="text-sky w-10 h-10 animate-float" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveCardDisplay;


