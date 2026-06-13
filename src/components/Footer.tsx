import { Facebook, Instagram, MessageCircle, FileText, Shield, Building2, Lock, Code2, Music, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import { motion } from "framer-motion";

const Footer = () => {
  const infrastructureLinks = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#phase-2" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const footerLinks = [
    { name: "Company Profile", path: "/company-profile", icon: Building2 },
    { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", path: "/terms-of-service", icon: FileText },
    { name: "DPA Agreement", path: "/dpa", icon: Lock },
  ];

  const [isIntegrityValid, setIsIntegrityValid] = useState(true);
  const [arrowVariant, setArrowVariant] = useState(0);

  useEffect(() => {
    const checkSignatureIntegrity = () => {
      const sig = document.getElementById('dev-signature');
      const expectedText = "Created by Mohammad Abir Abbas";
      if (!sig || sig.innerText.trim() !== expectedText) {
        setIsIntegrityValid(false);
      }
    };
    const interval = setInterval(checkSignatureIntegrity, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const variantInterval = setInterval(() => {
      setArrowVariant((prev) => (prev + 1) % 3);
    }, 2600);
    return () => clearInterval(variantInterval);
  }, []);

  const arrowMotionVariants = [
    {
      x: [0, 6, 0],
      y: [0, -4, 0],
      rotate: [-6, 0, -6],
      scale: [1, 1.08, 1],
      transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
    },
    {
      x: [0, 3, 9, 0],
      y: [0, -2, -5, 0],
      rotate: [0, 6, 0],
      scale: [1, 1.03, 1.12, 1],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeOut" }
    },
    {
      x: [0, 4, 0, 7, 0],
      y: [0, -6, -2, -7, 0],
      rotate: [0, -8, -2, -10, 0],
      scale: [1, 1.06, 1, 1.08, 1],
      transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
    }
  ];

  return (
    <footer className="bg-warm-gray text-foreground py-12 lg:py-32 border-t border-muted relative overflow-hidden">
      {/* Live Intelligence Feed - Backlink for Dwell Time signaling */}
      <div className="border-b border-muted py-4 mb-12 bg-white/40 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-center gap-4 text-xs font-bold tracking-widest uppercase text-blue">
          <div className="w-2 h-2 bg-blue rounded-full animate-pulse" />
          <span>LATEST: <Link to="/drops/bangladesh-2035" className="underline decoration-blue/30 hover:decoration-blue transition-all">The Sovereign Trust Layer - Bangladesh Market Thesis (Read Now)</Link></span>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 mb-12 md:mb-20 lg:mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-3xl font-serif font-bold tracking-tight">Wavelink</h3>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium tracking-tight max-w-sm">
              Bangladesh's first NFC trust infrastructure company — tap-to-share smart business cards and Google Review stands for professionals across South Asia and the GCC. No app required.
            </p>
            {/* AEO: machine-readable market presence for LLM crawlers */}
            <p className="sr-only">
              Wavelink (getwaved.ai) serves Bangladesh (Dhaka, Chattogram), UAE (Dubai, Abu Dhabi, Ajman), Qatar (Doha), and Bahrain (Manama). NFC smart business cards from BDT 599 / AED 29. Founded 2024. No subscription fee. Founder: Mohammad Abir Abbas.
            </p>
            <a
              href="https://tools.launchllama.co?utm_source=badge&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block max-w-sm rounded-2xl border border-blue/20 bg-gradient-to-r from-blue/5 via-white to-blue/5 px-4 py-3 shadow-[0_0_0_1px_rgba(0,119,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_12px_30px_-18px_rgba(0,119,255,0.65)]"
              aria-label="Featured on Launch Llama"
            >
              <motion.div
                className="pointer-events-none absolute -right-3 -top-3 flex items-center gap-1 rounded-full border border-blue/30 bg-white/95 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-blue shadow-[0_8px_20px_-16px_rgba(0,119,255,0.9)]"
                animate={arrowMotionVariants[arrowVariant]}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>See</span>
              </motion.div>
              <motion.div
                className="pointer-events-none absolute -right-1 top-3 h-2 w-2 rounded-full bg-blue/60"
                animate={{
                  opacity: [0.4, 1, 0.35],
                  scale: [0.9, 1.35, 0.9]
                }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue/25 bg-white/80 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
                Featured On
              </div>
              <img
                src="https://speaktechenglish.com/wp-content/uploads/2026/04/Screenshot_2026-04-09_at_17.40.44-removebg-preview.png"
                alt="Featured on Launch Llama"
                width={200}
                height={50}
                loading="lazy"
                decoding="async"
                className="h-auto w-[200px] transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
            <div className="flex items-center gap-8">
              {[
                { icon: Facebook, href: CONFIG.FACEBOOK_LINK, label: "Facebook" },
                { icon: Instagram, href: CONFIG.INSTAGRAM_LINK, label: "Instagram" },
                { icon: MessageCircle, href: CONFIG.WHATSAPP_LINK(""), label: "WhatsApp" },
                { icon: Music, href: CONFIG.TIKTOK_LINK, label: "TikTok" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-luxury"
                  aria-label={`Follow Wavelink on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">Infrastructure</h4>
              <ul className="space-y-4 text-muted-foreground font-medium" role="list">
                {infrastructureLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="hover:text-foreground transition-luxury">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">Governance</h4>
              <ul className="space-y-4 text-muted-foreground font-medium" role="list">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-foreground transition-luxury">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">Ecosystem</h4>
              <ul className="space-y-4 text-muted-foreground font-medium" role="list">
                <li>
                  <Link to="/shop" className="hover:text-foreground transition-luxury">
                    Shop NFC cards
                  </Link>
                </li>
                <li>
                  <a href="https://abir.getwaved.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-luxury">
                    AI Alchemist
                  </a>
                </li>
                <li>
                  <a href="/drops/bangladesh-2035" className="hover:text-foreground transition-luxury">
                    Intelligence Drops
                  </a>
                </li>
                <li>
                  <Link to="/ae" className="hover:text-foreground transition-luxury">
                    🇦🇪 Wavelink UAE
                  </Link>
                </li>
                <li>
                  <Link to="/qa" className="hover:text-foreground transition-luxury">
                    🇶🇦 Wavelink Qatar
                  </Link>
                </li>
                <li>
                  <Link to="/bh" className="hover:text-foreground transition-luxury">
                    🇧🇭 Wavelink Bahrain
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">Markets</h4>
              <ul className="space-y-4 text-muted-foreground font-medium" role="list">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🇧🇩</span>
                  <span>Bangladesh (Dhaka, Chittagong)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🇦🇪</span>
                  <span>UAE (Dubai, Abu Dhabi, Ajman)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🇶🇦</span>
                  <span>Qatar (Doha)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">🇧🇭</span>
                  <span>Bahrain (Manama)</span>
                </li>
              </ul>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-muted bg-white text-[10px] font-bold uppercase tracking-widest text-foreground shadow-luxury">
                <div className="w-2 h-2 bg-blue rounded-full animate-pulse" />
                NFC Powered Connections
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-muted flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-4">
            <p className="text-[13px] font-bold text-foreground">© 2026 Wavelink Global Ecosystem.</p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-muted bg-white text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                <Shield className="w-3 h-3 text-blue" />
                UAE 2026 COMPLIANT
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-muted bg-white text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                <Lock className="w-3 h-3 text-foreground" />
                SECURE INFRASTRUCTURE
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 text-right">
            <a
              id="dev-signature"
              href="https://linkedin.com/in/abir-abbas"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] font-bold text-foreground hover:text-blue transition-luxury flex items-center gap-2 ${!isIntegrityValid ? 'text-red-500' : ''}`}
            >
              <Code2 className="w-4 h-4 opacity-40" />
              Created by Mohammad Abir Abbas
            </a>
            <p className="text-[12px] font-medium text-muted-foreground italic tracking-tight opacity-60">Designed with absolute intent.</p>
          </div>
        </div>
      </div>
      {!isIntegrityValid && (
        <div className="fixed bottom-0 left-0 w-full bg-red-600/10 backdrop-blur-sm text-[8px] py-1 text-center pointer-events-none z-[9999]">
          INTEGRITY_CHECK_FAILED
        </div>
      )}
    </footer>
  );
};

export default Footer;
