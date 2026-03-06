import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Language, translations } from "@/lib/translations";

const faqs = [
  {
    question: "এটা কি এবং কিভাবে কাজ করে? (What is this?)",
    answer: "এটা একটা স্মার্ট কার্ড। আপনার ভিজিটিং কার্ডের মতো, কিন্তু এটা মোবাইলে টাচ করলেই আপনার সব তথ্য (ফোন নাম্বার, ফেসবুক, লিঙ্ক) অন্য ফোনে অটোমেটিক চলে যাবে। কোনো অ্যাপ লাগে না।",
    icon: "🤝",
    color: "from-sky-400/20 to-blue-400/20"
  },
  {
    question: "রিভিউ স্ট্যান্ড দিয়ে কি গুগল রিভিউ বাড়ানো সম্ভব? (Boost Google Reviews?)",
    answer: "হ্যাঁ! আমাদের রিভিউ স্ট্যান্ড ব্যবহার করে খুব সহজেই কাস্টমারদের থেকে গুগল রিভিউ সংগ্রহ করতে পারবেন। কাস্টমার শুধু স্ট্যান্ডে ফোন টাচ করবে আর সরাসরি আপনার গুগল রিভিউ পেজ ওপেন হবে।",
    icon: "🚀",
    color: "from-yellow-400/20 to-orange-400/20"
  },
  {
    question: "আমার ফোনে কি চলবে? (Will it work on my phone?)",
    answer: "হ্যাঁ, সব স্মার্টফোনেই চলবে। নতুন ফোনে টাচ করলেই হবে, আর পুরাতন ফোনের জন্য কার্ডের পিছনে একটা কিউআর (QR) কোড আছে যা স্ক্যান করলেই হবে।",
    icon: "📱",
    color: "from-emerald-400/20 to-teal-400/20"
  },
  {
    question: "অর্ডার করবো কিভাবে? (How to order?)",
    answer: "খুবই সহজ! 'অর্ডার' বাটনে ক্লিক করে আপনার নাম-ঠিকানা দিন। আমরা আপনাকে হোয়াটসঅ্যাপে (WhatsApp) নক দেবো এবং আপনার কার্ডের ডিজাইন ঠিক করে দেবো।",
    icon: "🛍️",
    color: "from-orange-400/20 to-amber-400/20"
  },
  {
    question: "নিরাপদ তো? (Is it safe?)",
    answer: "একদম নিরাপদ। আপনি যা তথ্য সেভ করবেন, শুধু সেগুলোই মানুষ দেখতে পাবে। আপনার ফোনের কোনো গোপন তথ্য কেউ নিতে পারবে না।",
    icon: "🛡️",
    color: "from-rose-400/20 to-pink-400/20"
  },
  {
    question: "ইন্টারনেট লাগবে কি? (Do I need internet?)",
    answer: "হ্যাঁ, তথ্যগুলো দেখানোর জন্য ফোনে ইন্টারনেট সংযোগ থাকতে হবে।",
    icon: "🌐",
    color: "from-cyan-400/20 to-sky-400/20"
  },
  {
    question: "কত দিন লাগবে পেতে? (Delivery time?)",
    answer: "ঢাকার ভেতরে ৩-৫ দিন এবং ঢাকার বাইরে ৫-৭ দিন সময় লাগে।",
    icon: "🚚",
    color: "from-purple-400/20 to-indigo-400/20"
  }
];

interface FAQSectionProps {
  lang?: Language;
}

const FAQSection = ({ lang = "en" }: FAQSectionProps) => {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return faqs.length - 1;
      if (nextIndex >= faqs.length) return 0;
      return nextIndex;
    });
  };

  const currentFaq = faqs[currentIndex];

  const getCardStyle = (index: number) => {
    const totalCards = Math.min(5, faqs.length);
    const centerIndex = Math.floor(totalCards / 2);
    const relativeIndex = index - currentIndex;

    if (Math.abs(relativeIndex) > 2) return { display: 'none' };

    const position = relativeIndex + centerIndex;
    const rotation = (position - centerIndex) * 4;
    const xOffset = (position - centerIndex) * 100;
    const yOffset = Math.abs(position - centerIndex) * 20;
    const scale = position === centerIndex ? 1 : 0.9;
    const zIndex = totalCards - Math.abs(position - centerIndex);

    return {
      transform: `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    };
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="faq">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-blue font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8"
          >
            {lang === "en" ? "Knowledge Infrastructure" : "নলেজ ইনফ্রাস্ট্রাকচার"}
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8 font-bold leading-[1.1] tracking-[-0.04em]">
            {lang === "en" ? "Refining Clarity." : "স্বচ্ছতার সাথে উত্তর।"}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-tight tracking-tight font-medium max-w-2xl">
            {lang === "en" ? "Technical insights into the global trust architecture we are building." : "আমাদের বৈশ্বিক আস্থা অবকাঠামো সম্পর্কে বিস্তারিত জানুন।"}
          </p>
        </div>

        <div className="hidden md:block relative h-[560px] mb-12">
          <div className="absolute inset-0 flex items-center justify-center" role="region" aria-label="FAQ Cards">
            {faqs.map((faq, index) => {
              const style = getCardStyle(index) as any;
              if (style.display === 'none') return null;

              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className="absolute w-[440px] cursor-pointer"
                  style={style}
                  onClick={() => {
                    if (!isActive) {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }
                  }}
                  role="button"
                  aria-pressed={isActive}
                >
                  <div className={`
                    relative overflow-hidden
                    bg-white border border-muted
                    rounded-2xl p-12 shadow-luxury
                    transition-luxury
                    ${isActive ? 'shadow-luxury-intense bg-warm-gray' : 'opacity-60 grayscale hover:grayscale-0'}
                  `}>
                    <div className="relative z-10">
                      <div className={`
                        text-5xl mb-10 transition-luxury
                        ${isActive ? 'scale-110' : 'scale-90 opacity-40'}
                      `}>
                        {faq.icon}
                      </div>

                      <h3 className={`
                        text-2xl font-bold mb-6 font-serif tracking-tight leading-tight
                        transition-luxury
                        ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                      `}>
                        {faq.question}
                      </h3>

                      <div className={`
                        text-muted-foreground leading-relaxed text-base font-medium tracking-tight
                        transition-luxury
                        ${isActive
                          ? 'opacity-100 max-h-[250px] mt-6'
                          : 'opacity-0 max-h-0 overflow-hidden mt-0'
                        }
                      `}>
                        {faq.answer}
                      </div>
                    </div>

                    {isActive && (
                      <div className="absolute top-8 right-8">
                        <div className="w-2 h-2 bg-blue rounded-full animate-pulse" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View Implementation */}
        <div className="md:hidden relative h-[520px] mb-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="w-full bg-warm-gray border border-muted rounded-2xl p-10 shadow-luxury-intense">
                <div className="text-6xl mb-10 text-center">{currentFaq.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center font-serif tracking-tight leading-tight">
                  {currentFaq.question}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed text-base font-medium tracking-tight">
                  {currentFaq.answer}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-12">
          <button
            onClick={() => paginate(-1)}
            className="w-14 h-14 rounded-full border border-muted flex items-center justify-center hover:bg-warm-gray transition-luxury group"
            aria-label="Previous question"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-blue transition-luxury" />
          </button>

          <div className="flex gap-4" role="tablist">
            {faqs.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`
                  h-1.5 rounded-full transition-luxury
                  ${index === currentIndex
                    ? 'w-10 bg-blue'
                    : 'w-1.5 bg-muted hover:bg-muted-foreground'
                  }
                `}
                aria-selected={index === currentIndex}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-14 h-14 rounded-full border border-muted flex items-center justify-center hover:bg-warm-gray transition-luxury group"
            aria-label="Next question"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-blue transition-luxury" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
