import { Card } from "@/components/ui/card";
import { Palette, Droplet, Globe2, Zap, Leaf, ShieldCheck, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: Palette,
    title: "Customizable Design",
    description: "Make it yours with personalized designs and branding"
  },
  {
    icon: Droplet,
    title: "Waterproof & Durable",
    description: "Built to last through daily wear and tear"
  },
  {
    icon: Globe2,
    title: "Smart Web Interface",
    description: "Manage and update your profile anytime, anywhere"
  },
  {
    icon: Zap,
    title: "One Tap to Share",
    description: "Instant contact sharing with NFC technology"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "A sustainable alternative to traditional paper cards"
  },
  {
    icon: ShieldCheck,
    title: "6-Month Warranty",
    description: "Coverage for software issues with proof of purchase"
  },
  {
    icon: Lock,
    title: "GDPR Protected",
    description: "Your data is securely stored, encrypted, and GDPR compliant"
  }
];

const FeaturesSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const iconPulseVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 0.4,
      scale: 1.5,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      } as any
    },
  };

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden" id="features">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-sky/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            variants={itemVariants}
          >
            Why Choose Wavelink?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Smart features designed for modern professionals
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="group p-8 transition-all duration-500 bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 cursor-default relative overflow-hidden"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500 shadow-luxury-glow">
                    <motion.div
                      className="absolute inset-0 bg-sky-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      variants={iconPulseVariants}
                      initial="initial"
                      whileHover="hover"
                    />
                    <feature.icon className="w-10 h-10 text-white relative z-10 filter drop-shadow-md" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
