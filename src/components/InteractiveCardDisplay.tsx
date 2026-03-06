import { useState, useRef } from "react";
import productImage from "@/assets/wavelink-cards.png";
import { Sparkles, Move3d } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Language } from "@/lib/translations";

interface InteractiveCardDisplayProps {
  className?: string;
  lang?: Language;
}

const InteractiveCardDisplay = ({ className = "", lang = "en" }: InteractiveCardDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for drag and hover interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);

    if (!isDragging) {
      // Magnetic tilt logic
      rotateY.set((x - 50) * 0.4);
      rotateX.set((50 - y) * 0.4);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  // Holographic shimmer transforms
  const shimmerX = useTransform(smoothMouseX, [0, 100], ["-50%", "150%"]);
  const shimmerY = useTransform(smoothMouseY, [0, 100], ["-50%", "150%"]);

  return (
    <div
      ref={containerRef}
      className={`relative group cursor-grab active:cursor-grabbing py-20 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Interactive Wavelink smart cards display"
    >
      {/* Floating Instructions */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0">
        <div className="px-4 py-1.5 bg-blue text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 shadow-luxury-glow">
          <Move3d className="w-3.5 h-3.5 animate-pulse" />
          {lang === "en" ? "Interactive Enterprise Asset" : "ইন্টারেক্টিভ এন্টারপ্রাইজ এসেট"}
        </div>
      </div>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          rotateX.set(0);
          rotateY.set(0);
        }}
        onDrag={(e, info) => {
          rotateY.set(info.offset.x * 0.4);
          rotateX.set(-info.offset.y * 0.4);
        }}
        className="relative w-full max-w-2xl mx-auto transition-all duration-1000 ease-out will-change-transform touch-none"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          perspective: 2000,
          transformStyle: 'preserve-3d',
          scale: isHovered ? 1.1 : 1,
        }}
        aria-label="3D card interactive preview"
      >
        {/* Layered Volumetric Glows (The Energy Core) */}
        <div
          className={`absolute -inset-40 bg-glow-wave opacity-0 blur-[150px] rounded-full transition-all duration-1000 ${isHovered ? 'opacity-80 scale-125' : 'opacity-20 scale-100'}`}
          aria-hidden="true"
        />
        <div
          className={`absolute -inset-20 bg-glow-teal opacity-0 blur-[100px] rounded-full transition-all duration-1000 ${isHovered ? 'opacity-50 scale-110' : 'opacity-0'}`}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 bg-blue/20 blur-[60px] rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-40' : 'opacity-0'}`}
          aria-hidden="true"
        />

        {/* Magnetic Data Streams (Micro-Interactions) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <AnimatePresence>
            {isHovered && Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  x: (i % 2 === 0 ? 1 : -1) * (100 + i * 20),
                  y: (i % 3 === 0 ? 1 : -1) * (80 + i * 15),
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                className="absolute left-1/2 top-1/2 w-[2px] h-[40px] bg-gradient-to-t from-transparent via-blue to-transparent rotate-45"
              />
            ))}
          </AnimatePresence>
        </div>

        {/* The Card Object */}
        <motion.div
          className="relative z-10 drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_60px_120px_rgba(42,168,255,0.4)] transition-all duration-1000"
          animate={isHovered && !isDragging ? { y: -20 } : { y: 0 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <img
            src={productImage}
            alt="Wavelink Institutional Smart Card"
            width={800}
            height={800}
            className="w-full h-auto object-cover pointer-events-none select-none drop-shadow-2xl brightness-110"
            loading="lazy"
          />

          {/* Holographic Hologram Sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent mix-blend-overlay pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              x: shimmerX,
              y: shimmerY,
              filter: "blur(20px)",
            }}
            aria-hidden="true"
          />

          {/* Edge Glow Highlight */}
          <div className={`absolute inset-0 border-2 border-white/0 rounded-3xl transition-all duration-1000 pointer-events-none ${isHovered ? 'border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]' : ''}`} aria-hidden="true" />
        </motion.div>

        {/* Dynamic Interactive Sparkles */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-20 -right-20 pointer-events-none z-30"
                aria-hidden="true"
              >
                <Sparkles className="text-blue w-16 h-16 animate-pulse-glow" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -bottom-20 -left-20 pointer-events-none z-30"
                aria-hidden="true"
              >
                <Sparkles className="text-glow-teal w-14 h-14 animate-float" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveCardDisplay;


