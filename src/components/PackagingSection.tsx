import { motion } from "framer-motion";
import { Recycle, Leaf, ShieldCheck } from "lucide-react";
import { translations, Language } from "@/lib/translations";

interface PackagingSectionProps {
  lang?: Language;
}

const PackagingSection = ({ lang = "en" }: PackagingSectionProps) => {
  const t = translations[lang] as any;
  const content = t.packaging;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const curvedText = lang === "en" 
    ? "SUSTAINABLE PACKAGING • LONG-TERM CARE • ECO-FRIENDLY • " 
    : "সতর্ক প্যাকেজিং • আপনার সুরক্ষা • পরিবেশবান্ধব • ";

  return (
    <section className="py-32 relative overflow-hidden bg-background" id="packaging">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-glow-wave opacity-5 blur-[160px] -z-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left Side: Visual Content with Curvy Text */}
          <motion.div 
            variants={itemVariants}
            className="relative w-full max-w-[450px] aspect-square flex items-center justify-center"
          >
            {/* Curvy Animated Text Path */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  id="textCurve"
                  d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0"
                  fill="transparent"
                />
                <text className="fill-blue/30 uppercase text-[6px] font-black tracking-[0.3em] font-sans">
                  <textPath xlinkHref="#textCurve">
                    {curvedText.repeat(4)}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Inner Floating Image Container */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-[80%] h-[80%] rounded-[2.5rem] overflow-hidden shadow-luxury-glow border border-white/10 group"
            >
              <img 
                src="/assets/packaging.png" 
                alt="Wavelink Sustainable Packaging" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Decorative Orbiting Dots */}
            {[0, 120, 240].map((degree, idx) => (
              <motion.div
                key={idx}
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + idx * 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
                style={{ rotate: degree }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/40 blur-[2px]" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Copy Content */}
          <div className="flex-1 space-y-10 lg:pl-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
                <Leaf size={14} className="animate-pulse" />
                <span>Green Innovation</span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-foreground leading-[1.1] font-serif">
                {content.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {content.desc}
              </p>
            </motion.div>

            {/* Features Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Recycle, title: lang === "en" ? "90% Recycled" : "৯০% রিসাইকেল্ড", desc: lang === "en" ? "Post-consumer fibers." : "রিসাইকেল্ড ফাইবার।" },
                { icon: ShieldCheck, title: lang === "en" ? "Extra Protection" : "অতিরিক্ত সুরক্ষা", desc: lang === "en" ? "Double-walled design." : "ডাবল-ওয়াল ডিজাইন।" },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy border border-white/10 flex items-center justify-center text-accent shadow-luxury">
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <button className="group relative px-10 py-5 bg-navy text-white font-bold rounded-2xl shadow-luxury-glow hover:shadow-luxury transition-all duration-500 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  {content.cta}
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue/20 to-accent/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy -z-10" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagingSection;
