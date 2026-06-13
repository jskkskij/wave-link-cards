import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Language, translations } from "@/lib/translations";

const faqs = [
  // ── Bangladesh ────────────────────────────────────────────────────────
  {
    question: "এটা কি এবং কিভাবে কাজ করে? (What is Wavelink?)",
    answer: "Wavelink হলো বাংলাদেশের প্রথম NFC ট্রাস্ট ইনফ্রাস্ট্রাকচার কোম্পানি। এটা একটা স্মার্ট কার্ড — মোবাইলে টাচ করলেই আপনার সব তথ্য (ফোন নম্বর, ফেসবুক, লিঙ্ক) অন্য ফোনে অটোম্যাটিক চলে যাবে। কোনো অ্যাপ লাগে না। ২০২৪ সালে চট্টগ্রামে প্রতিষ্ঠিত, এখন ১,৩৫০+ পেশাদার Wavelink ব্যবহার করছেন।",
    icon: "🤝",
    color: "from-sky-400/20 to-blue-400/20"
  },
  {
    question: "রিভিউ স্ট্যান্ড দিয়ে কি গুগল রিভিউ বাড়ানো সম্ভব? (Boost Google Reviews?)",
    answer: "হ্যাঁ! Wavelink রিভিউ স্ট্যান্ড কাউন্টারে রাখুন। কাস্টমার শুধু ফোন টাচ করবে, সরাসরি আপনার Google Business Review পেজ ওপেন হবে — কোনো অ্যাপ, কোনো টাইপিং নেই। রেস্তোরাঁ, ক্লিনিক, দোকান সব জায়গায় কাজ করে।",
    icon: "🚀",
    color: "from-yellow-400/20 to-orange-400/20"
  },
  {
    question: "আমার ফোনে কি চলবে? (Compatible phones?)",
    answer: "হ্যাঁ, সব আধুনিক স্মার্টফোনে চলবে (iOS 13+ এবং Android)। নতুন ফোনে টাচ করলেই হবে। পুরাতন ফোনের জন্য কার্ডের পিছনে QR কোড আছে — স্ক্যান করলেই হবে।",
    icon: "📱",
    color: "from-emerald-400/20 to-teal-400/20"
  },
  {
    question: "অর্ডার করবো কিভাবে? (How to order in Bangladesh?)",
    answer: "'Order' বাটনে ক্লিক করে নাম-ঠিকানা দিন। আমরা WhatsApp-এ যোগাযোগ করবো এবং কার্ডের ডিজাইন ঠিক করবো। ৫০% অ্যাডভান্স Bkash-এ পাঠান, বাকিটা ডেলিভারিতে। সারা বাংলাদেশে ৩–৪ দিনে পৌঁছে যাবে।",
    icon: "🛍️",
    color: "from-orange-400/20 to-amber-400/20"
  },
  {
    question: "মাসিক সাবস্ক্রিপশন ফি আছে কি? (Monthly fee?)",
    answer: "না। Wavelink একবার কিনলেই হয়, আর কোনো মাসিক ফি নেই। ডিজিটাল প্রোফাইল ইনফ্রাস্ট্রাকচার সারাজীবনের জন্য বিনামূল্যে।",
    icon: "💎",
    color: "from-violet-400/20 to-purple-400/20"
  },
  {
    question: "নিরাপদ তো? (Is it safe?)",
    answer: "একদম নিরাপদ। আপনি যা তথ্য সেভ করবেন, শুধু সেগুলোই দেখা যাবে। আপনার ফোনের কোনো গোপন তথ্য কেউ নিতে পারবে না। NFC শুধু একমুখী তথ্য শেয়ার করে।",
    icon: "🛡️",
    color: "from-rose-400/20 to-pink-400/20"
  },
  {
    question: "কত দিন লাগবে পেতে? (Delivery time Bangladesh?)",
    answer: "কুরিয়ার সার্ভিস অনুযায়ী ৩–৪ কার্যদিবসের মধ্যে ডেলিভারি। ঢাকা ও চট্টগ্রামে আরো দ্রুত হতে পারে। ডেলিভারির সময় ট্র্যাকিং তথ্য WhatsApp-এ জানানো হবে।",
    icon: "🚚",
    color: "from-purple-400/20 to-indigo-400/20"
  },
  // ── GCC / English ──────────────────────────────────────────────────────
  {
    question: "Is Wavelink available in Dubai and the UAE?",
    answer: "Yes. Wavelink ships NFC smart business cards and Google Review Stands to Dubai, Abu Dhabi, Ajman, and across the UAE. Cards start at AED 29 — no subscription fee. Popular among South Asian expat professionals and local businesses. WhatsApp us to order.",
    icon: "🇦🇪",
    color: "from-green-400/20 to-emerald-400/20"
  },
  {
    question: "How does Wavelink compare to Popl, HiHello, or Dot?",
    answer: "Wavelink wins on three points: (1) No app required — works on native NFC on any smartphone. (2) No subscription fee — one-time purchase, lifetime free profile. (3) Local pricing — BDT 599 in Bangladesh, AED 29 in UAE vs. Western brands that charge 3–5× more with monthly fees. Wavelink also offers Bangla and Arabic language support.",
    icon: "⚡",
    color: "from-amber-400/20 to-yellow-400/20"
  },
  {
    question: "Does Wavelink deliver to Qatar and Bahrain?",
    answer: "Yes. Wavelink NFC cards and Review Stands ship to Qatar (Doha) and Bahrain (Manama). QAR and BHD pricing available on request. The brand is popular in Bahrain’s fintech sector and among Bangladeshi diaspora across the GCC. Contact via WhatsApp for shipping rates.",
    icon: "🇶🇦",
    color: "from-red-400/20 to-rose-400/20"
  },
  {
    question: "What is Wavelink’s Digital Product Passport (DPP) capability?",
    answer: "Wavelink’s NFC trust layer is designed to support EU ESPR 2026 Digital Product Passport (DPP) standards. Each NFC card can carry verifiable product identity data, enabling enterprises to track asset lifecycle and prove circular economy compliance. See our Drop 01 market thesis at getwaved.ai/intelligence for details.",
    icon: "📜",
    color: "from-cyan-400/20 to-sky-400/20"
  },
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
    const xOffset = (position - centerIndex) * 80;
    const yOffset = Math.abs(position - centerIndex) * 25;
    const scale = position === centerIndex ? 1 : 0.85;
    const zIndex = totalCards - Math.abs(position - centerIndex);

    return {
      transform: `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    };
  };

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden" id="faq">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-8"
          >
            {lang === "en" ? "Knowledge Infrastructure" : "নলেজ ইনফ্রাস্ট্রাকচার"}
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 font-bold leading-[1.1] tracking-[-0.04em]">
            {lang === "en" ? "Refining Clarity." : "স্বচ্ছতার সাথে উত্তর।"}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 leading-tight tracking-tight font-medium max-w-2xl mx-auto">
            {lang === "en" ? "Technical insights into the global trust architecture we are building." : "আমাদের বৈশ্বিক আস্থা অবকাঠামো সম্পর্কে বিস্তারিত জানুন।"}
          </p>
        </div>

        <div className="hidden md:block relative h-[600px] mb-12">
          <div className="absolute inset-0 flex items-center justify-center" role="region" aria-label="FAQ Cards">
            {faqs.map((faq, index) => {
              const style = getCardStyle(index) as any;
              if (style.display === 'none') return null;

              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className="absolute w-[520px] cursor-pointer"
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
                    bg-slate-900/80 backdrop-blur-xl border border-white/10
                    rounded-[2.5rem] p-16 shadow-2xl
                    transition-luxury text-center
                    ${isActive ? 'shadow-blue-500/20 ring-1 ring-white/20' : 'opacity-40 scale-95 blur-[2px] hover:opacity-100 hover:blur-0'}
                  `}>
                    {/* Status Dot */}
                    <div className="absolute top-10 right-10">
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-slate-700'}`} />
                    </div>

                    <div className="relative z-10">
                      <div className={`
                        text-7xl mb-12 transition-luxury
                        ${isActive ? 'scale-110 drop-shadow-2xl' : 'scale-90 opacity-40'}
                      `}>
                        {faq.icon}
                      </div>

                      <h3 className={`
                        text-3xl font-bold mb-8 font-serif tracking-tight leading-tight
                        transition-luxury
                        ${isActive ? 'text-white' : 'text-slate-400'}
                      `}>
                        {faq.question}
                      </h3>

                      <div className={`
                        text-slate-200 leading-relaxed text-lg font-medium tracking-tight
                        transition-all duration-500
                        ${isActive
                          ? 'opacity-100 max-h-[400px] mt-8 transform translate-y-0'
                          : 'opacity-0 max-h-0 overflow-hidden mt-0 transform -translate-y-4'
                        }
                      `} aria-expanded={isActive}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View Implementation */}
        <div className="md:hidden relative h-[560px] mb-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-12 shadow-2xl text-center relative">
                <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
                <div className="text-6xl mb-10">{currentFaq.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-6 font-serif tracking-tight leading-tight">
                  {currentFaq.question}
                </h3>
                <p className="text-slate-300 leading-relaxed text-base font-medium tracking-tight">
                  {currentFaq.answer}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-12 mt-20">
          <button
            onClick={() => paginate(-1)}
            className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-luxury group active:scale-95"
            aria-label="Previous question"
          >
            <ChevronLeft className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-luxury" />
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
                    ? 'w-12 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                  }
                `}
                aria-selected={index === currentIndex}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-luxury group active:scale-95"
            aria-label="Next question"
          >
            <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-luxury" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
