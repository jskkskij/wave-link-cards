import { Card } from "@/components/ui/card";
import { Smartphone, Zap, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { translations, Language } from "@/lib/translations";

interface AboutSectionProps {
  lang?: Language;
}

const AboutSection = ({ lang = "en" }: AboutSectionProps) => {
  const t = translations[lang];
  const [hoveredStates, setHoveredStates] = useState([false, false, false]);

  const handleHover = (index: number) => {
    if (!hoveredStates[index]) {
      const newStates = [...hoveredStates];
      newStates[index] = true;
      setHoveredStates(newStates);
    }
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // Custom Zen Ease
      },
    },
  };

  const iconContainerVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      } as any
    },
    active: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      } as any
    }
  };

  const pulseVariants: Variants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      } as any,
    },
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="about">
      {/* Decorative Background Elements - Trust Infrastructure Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-glow-wave opacity-40 rounded-full blur-[120px] -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-glow-teal opacity-20 rounded-full blur-[120px] -z-10 animate-float" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
            <motion.h2
            className="text-[clamp(2rem,7vw,3.5rem)] font-bold text-foreground mb-6 leading-tight text-balance"
            variants={itemVariants}
          >
            {lang === "en" ? "Engineered for Global Growth" : "বৈশ্বিক প্রবৃদ্ধির জন্য নির্মিত"}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {lang === "en"
              ? "Wavelink provides the infrastructure businesses need to bridge the physical-digital gap and build instant, global trust at the first interaction."
              : "ওয়েভলিঙ্ক এমন একটি অবকাঠামো প্রদান করে যা ব্যবসার শারীরিক ও ডিজিটাল পার্থক্য দূর করতে এবং প্রথম যোগাযোগেই তাৎক্ষণিক বৈশ্বিক আস্থা তৈরি করতে সহায়তা করে।"}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          role="list"
          aria-label="Core Value Propositions"
        >
          {/* Universal Compatibility */}
          <motion.div variants={itemVariants} role="listitem">
            <Card
              onMouseEnter={() => handleHover(0)}
              className="group p-4 sm:p-6 md:p-8 text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 bg-card border-border/50 relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-[0_0_20px_rgba(75,207,181,0.3)] border border-white/10"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[0] ? "active" : "initial"}
                whileHover="hover"
              >
                <div
                  className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <Smartphone className="w-10 h-10 text-accent relative z-10" aria-hidden="true" />
              </motion.div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 font-serif ${hoveredStates[0] ? 'text-accent' : 'text-card-foreground group-hover:text-accent'}`}>{t.about.feature1Title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.about.feature1Desc}
              </p>
            </Card>
          </motion.div>

          {/* Trust Infrastructure */}
          <motion.div variants={itemVariants} role="listitem">
            <Card
              onMouseEnter={() => handleHover(1)}
              className="group p-8 text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 bg-card border-border/50 relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-[0_0_20px_rgba(75,207,181,0.3)] border border-white/10"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[1] ? "active" : "initial"}
                whileHover="hover"
              >
                <div className={`absolute inset-0 bg-accent/20 rounded-full transition-opacity duration-500 blur-xl ${hoveredStates[1] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true" />
                <Zap className="w-10 h-10 text-accent relative z-10" aria-hidden="true" />
              </motion.div>
              <h3 className={`text-[clamp(1.25rem,4vw,1.75rem)] font-bold mb-3 transition-colors duration-300 font-serif ${hoveredStates[1] ? 'text-accent' : 'text-card-foreground group-hover:text-accent'}`}>
                {lang === "en" ? "Trust Infrastructure" : "আস্থা অবকাঠামো"}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {lang === "en"
                  ? "Build credibility end-to-end. Your reputation compounds across every physical touchpoint, engineered for verification."
                  : "প্রান্ত থেকে প্রান্তে বিশ্বাসযোগ্যতা তৈরি করুন। আপনার সুনাম প্রতিটি শারীরিক স্পর্শবিন্দুতে বৃদ্ধি পাবে, যা যাচাইয়ের জন্য তৈরি।"}
              </p>
            </Card>
          </motion.div>

          {/* Global Market Access */}
          <motion.div variants={itemVariants} role="listitem">
            <Card
              onMouseEnter={() => handleHover(2)}
              className="group p-8 text-center hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 bg-card border-border/50 relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center"
            >
              <motion.div
                className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-[0_0_20px_rgba(75,207,181,0.3)] border border-white/10"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[2] ? "active" : "initial"}
                whileHover="hover"
              >
                <div className={`absolute inset-0 bg-accent/20 rounded-full blur-xl transition-opacity duration-500 ${hoveredStates[2] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true" />
                <Globe className="w-10 h-10 text-accent relative z-10" aria-hidden="true" />
              </motion.div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 font-serif ${hoveredStates[2] ? 'text-accent' : 'text-card-foreground group-hover:text-accent'}`}>
                {lang === "en" ? "Global Market Access" : "বৈশ্বিক বাজারে প্রবেশ"}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {lang === "en"
                  ? "Emerging-market businesses deploy global-grade experiences instantly. Geography stops being a limitation."
                  : "উদীয়মান বাজারের ব্যবসায়ীরা তাতক্ষণিকভাবে বৈশ্বিক মানের অভিজ্ঞতা স্থাপন করে। ভূগোল আর কোনো বাধা রবে না।"}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
