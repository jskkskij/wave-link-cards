import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "How does a Wavelink smart card work?",
    answer: "A Wavelink smart card uses Near Field Communication (NFC) technology to transmit your digital profile details instantly to any compatible smartphone. When you tap the card against a phone, it triggers a link that opens your personalized dashboard in the browser—no app installation needed.",
    icon: "💳",
    color: "from-sky-500/20 to-blue-500/20"
  },
  {
    question: "Is Wavelink compatible with all smartphones?",
    answer: "Yes, Wavelink is designed for universal compatibility. It works with all NFC-enabled devices, including iPhone 7 and newer, as well as most modern Android smartphones. For older devices, each card comes with a backup QR code for instant access.",
    icon: "📱",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    question: "What if my phone doesn't support NFC?",
    answer: "No worries! All our NFC cards include a QR code — simply scan to access your digital profile.",
    icon: "📷",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    question: "Does it require internet?",
    answer: "Yes. Since the profile data is dynamically loaded from our server, internet access is required to view it.",
    icon: "🌐",
    color: "from-cyan-500/20 to-sky-500/20"
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within Dhaka and 5-7 business days outside Dhaka. We'll provide tracking information once your order ships.",
    icon: "🚚",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    question: "Can I customize my design?",
    answer: "Absolutely! You can upload your own design when placing an order, or choose from our pre-made templates. Our team will help ensure your design looks perfect.",
    icon: "🎨",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    question: "How do I update my information?",
    answer: "You can update your contact details, social links, and profile information by informing us via WhatsApp or our official pages. We'll update your card profile accordingly.",
    icon: "✏️",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    question: "What if my card gets damaged?",
    answer: "Our cards are waterproof and extremely durable. However, if you experience any issues, please contact our support team and we'll help you with a replacement.",
    icon: "🛡️",
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    question: "How does using an NFC card help the environment?",
    answer: "By switching to a digital business card, you help eliminate the 8-10 billion paper cards printed annually, 88% of which are thrown away within a week. One Wavelink card lasts for years, drastically reducing paper waste and your environmental footprint.",
    icon: "🌱",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

const FAQSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return faqs.length - 1;
      if (nextIndex >= faqs.length) return 0;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Smoother, slower animations for better readability
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Calculate card positions for spread layout (desktop)
  const getCardStyle = (index: number) => {
    const totalCards = Math.min(5, faqs.length);
    const centerIndex = Math.floor(totalCards / 2);
    const relativeIndex = index - currentIndex;

    // Only show 5 cards at a time
    if (Math.abs(relativeIndex) > 2) return { display: 'none' };

    const position = relativeIndex + centerIndex;
    const rotation = (position - centerIndex) * 6; // Reduced rotation for stability
    const xOffset = (position - centerIndex) * 80;
    const yOffset = Math.abs(position - centerIndex) * 15;
    const scale = position === centerIndex ? 1 : 0.88;
    const zIndex = totalCards - Math.abs(position - centerIndex);

    return {
      transform: `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)',
    };
  };

  const currentFaq = faqs[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-navy relative overflow-hidden" id="faq">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/30 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <span className="text-sky font-medium tracking-widest text-xs uppercase mb-4 inline-block px-3 py-1 border border-sky/20 rounded-full bg-sky/5">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-mist/70 max-w-2xl mx-auto">
            Swipe or click to explore answers
          </p>
        </div>

        {/* Desktop: Card Spread Layout */}
        <div className="hidden md:block relative h-[520px] mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {faqs.map((faq, index) => {
              const style = getCardStyle(index);
              if (style.display === 'none') return null;

              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className="absolute w-[420px] cursor-pointer"
                  style={style}
                  onClick={() => {
                    if (!isActive) {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }
                  }}
                >
                  {/* Solid card with gradient accent */}
                  <div className={`
                    relative overflow-hidden
                    bg-[#0f1d35] 
                    border-2 ${isActive ? 'border-sky/60' : 'border-white/10'}
                    rounded-3xl p-8 shadow-2xl
                    transition-all duration-500
                    ${isActive ? 'shadow-[0_0_50px_rgba(14,165,233,0.4)]' : 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]'}
                  `}>
                    {/* Gradient overlay for active card */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${faq.color} opacity-30`} />
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`
                        text-6xl mb-6 text-center transition-all duration-500
                        ${isActive ? 'scale-110' : 'scale-100 opacity-60'}
                      `}>
                        {faq.icon}
                      </div>

                      {/* Question */}
                      <h3 className={`
                        text-xl font-bold mb-4 text-center min-h-[60px] flex items-center justify-center
                        transition-all duration-300
                        ${isActive ? 'text-white' : 'text-white/60'}
                      `}>
                        {faq.question}
                      </h3>

                      {/* Answer - only show on active card with smooth transition */}
                      <div className={`
                        text-mist/90 text-center leading-relaxed text-[15px]
                        transition-all duration-500 ease-in-out
                        ${isActive
                          ? 'opacity-100 max-h-[200px] mt-4'
                          : 'opacity-0 max-h-0 overflow-hidden mt-0'
                        }
                      `}>
                        {faq.answer}
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-sky rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Swipeable Cards with solid background */}
        <div className="md:hidden relative h-[480px] mb-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-sm mx-4">
                {/* Solid card with gradient accent */}
                <div className="relative overflow-hidden bg-[#0f1d35] border-2 border-sky/60 rounded-3xl p-8 shadow-2xl shadow-[0_0_50px_rgba(14,165,233,0.4)]">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentFaq.color} opacity-30`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-7xl mb-6 text-center">
                      {currentFaq.icon}
                    </div>

                    {/* Question */}
                    <h3 className="text-xl font-bold text-white mb-6 text-center min-h-[60px] flex items-center justify-center">
                      {currentFaq.question}
                    </h3>

                    {/* Answer */}
                    <p className="text-mist/90 text-center leading-relaxed text-[15px]">
                      {currentFaq.answer}
                    </p>
                  </div>

                  {/* Swipe hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-sky/40 rounded-full" />
                      <div className="w-1 h-1 bg-sky/40 rounded-full" />
                      <div className="w-1 h-1 bg-sky/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full bg-[#0f1d35] border-2 border-sky/30 flex items-center justify-center hover:bg-sky/20 hover:border-sky/60 transition-all duration-300 group shadow-lg"
            aria-label="Previous question"
          >
            <ChevronLeft className="w-6 h-6 text-sky/70 group-hover:text-sky transition-colors" />
          </button>

          {/* Dots Indicator with better visual feedback */}
          <div className="flex gap-2">
            {faqs.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`
                  h-2 rounded-full transition-all duration-500
                  ${index === currentIndex
                    ? 'w-8 bg-sky shadow-[0_0_8px_rgba(14,165,233,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/40 hover:w-3'
                  }
                `}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full bg-[#0f1d35] border-2 border-sky/30 flex items-center justify-center hover:bg-sky/20 hover:border-sky/60 transition-all duration-300 group shadow-lg"
            aria-label="Next question"
          >
            <ChevronRight className="w-6 h-6 text-sky/70 group-hover:text-sky transition-colors" />
          </button>
        </div>

        {/* Counter with better styling */}
        <div className="text-center mt-6">
          <span className="text-mist/60 text-sm font-medium">
            Question {currentIndex + 1} of {faqs.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
