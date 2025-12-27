import { Card } from "@/components/ui/card";
import { Smartphone, Zap, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const AboutSection = () => {
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
      {/* Decorative Background Elements - Vibrant Blue Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky/20 rounded-full blur-[120px] -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0066ff]/10 rounded-full blur-[120px] -z-10 animate-float" />

      <div className="container mx-auto px-4">
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
            What is Wavelink?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Wavelink helps you share your contact, social, and professional info with a single tap using NFC-powered smart cards.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* No App Required */}
          <motion.div variants={itemVariants}>
            <Card
              onMouseEnter={() => handleHover(0)}
              className="group p-8 text-center hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-luxury-glow"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[0] ? "active" : "initial"}
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 bg-sky-400/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  variants={pulseVariants}
                  animate="animate"
                />
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Smartphone className="w-10 h-10 text-white filter drop-shadow-md" />
                </motion.div>
              </motion.div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${hoveredStates[0] ? 'text-primary' : 'text-card-foreground group-hover:text-primary'}`}>No App Required</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply tap your Wavelink card on any smartphone. No downloads, no hassle.
              </p>
            </Card>
          </motion.div>

          {/* Instant Sharing */}
          <motion.div variants={itemVariants}>
            <Card
              onMouseEnter={() => handleHover(1)}
              className="group p-8 text-center hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-luxury-glow"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[1] ? "active" : "initial"}
                whileHover="hover"
              >
                <motion.div
                  className={`absolute inset-0 bg-sky-400/40 rounded-full transition-opacity duration-500 blur-xl ${hoveredStates[1] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Zap className="w-10 h-10 text-white filter drop-shadow-md" />
                </motion.div>
              </motion.div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${hoveredStates[1] ? 'text-primary' : 'text-card-foreground group-hover:text-primary'}`}>Instant Sharing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share all your contact details, social media, and portfolio in one tap.
              </p>
            </Card>
          </motion.div>

          {/* Digital First */}
          <motion.div variants={itemVariants}>
            <Card
              onMouseEnter={() => handleHover(2)}
              className="group p-8 text-center hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-card/50 backdrop-blur-sm border-border/50 relative overflow-hidden"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-luxury-glow"
                variants={iconContainerVariants}
                initial="initial"
                animate={hoveredStates[2] ? "active" : "initial"}
                whileHover="hover"
              >
                <div className={`absolute inset-0 bg-sky-400/30 rounded-full blur-xl transition-opacity duration-500 ${hoveredStates[2] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: hoveredStates[2] ? 5 : 20, repeat: Infinity, ease: "linear" }}
                  whileHover={{ rotate: 360, transition: { duration: 5, repeat: Infinity, ease: "linear" } }}
                  className="relative z-10"
                >
                  <Globe className="w-10 h-10 text-white filter drop-shadow-md" />
                </motion.div>
              </motion.div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${hoveredStates[2] ? 'text-primary' : 'text-card-foreground group-hover:text-primary'}`}>Digital First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Update your information anytime by informing the official WhatsApp number.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
