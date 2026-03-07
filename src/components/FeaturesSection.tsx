import { Card } from "@/components/ui/card";
import { Palette, Droplet, Globe2, Zap, Leaf, ShieldCheck, Lock, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: Palette,
    title: "Bespoke Identity",
    description: "Express your unique brand with refined aesthetic control. Signal professional maturity through every physical and digital touchpoint."
  },
  {
    icon: ShieldCheck,
    title: "Verifiable Trust",
    description: "Infrastructure engineered for credibility. Your professional reputation compounds with every interaction, secured by NFC."
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Architecture for world-class connectivity. Geography is no longer a limitation for high-performance professional networks."
  },
  {
    icon: Zap,
    title: "Frictionless Flow",
    description: "Leverage high-speed protocols. Initiate relationships at the moment of impact with instant, seamless data exchange."
  },
  {
    icon: Droplet,
    title: "Industrial Grade",
    description: "Hardware built for endurance. Waterproof and scratch-resistant, designed for the rigors of global professional expansion."
  },
  {
    icon: Lock,
    title: "Secure Foundation",
    description: "Built on privacy and institutional compliance. Your professional data is encrypted and protected by design."
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as any,
      },
    },
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="features">
      {/* Structural Glows for Features */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[50%] h-[50%] bg-glow-wave opacity-30 blur-[130px]" />
        <div className="absolute bottom-0 left-[5%] w-[40%] h-[40%] bg-glow-teal opacity-10 blur-[110px]" />
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="max-w-3xl mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-blue font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8">
            The Infrastructure
          </div>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-8 font-serif leading-[1.1] tracking-[-0.04em]"
            variants={itemVariants}
          >
            Engineering Proof <br /> of Credibility.
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground leading-tight tracking-tight font-medium"
            variants={itemVariants}
          >
            Luxury engagement tools designed for high-performance professional networks.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-muted/30 border border-muted"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          role="list"
          aria-label="Core Infrastructure Pillars"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} role="listitem">
              <div
                className="group p-8 md:p-12 bg-white transition-luxury hover:bg-warm-gray flex flex-col items-start text-left min-h-[350px] sm:min-h-[400px] justify-between relative"
              >
                <div className="flex flex-col gap-8">
                  <div className="w-12 h-12 flex items-center justify-start">
                    <feature.icon className="w-6 h-6 text-foreground group-hover:text-blue transition-luxury" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-foreground font-serif tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed font-medium tracking-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Intentional Empty Space / Potential Index Number */}
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-8 group-hover:text-blue/30 transition-luxury">
                  {`Module 0${index + 1}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
