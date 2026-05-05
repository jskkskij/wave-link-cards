import { Facebook, Instagram, MessageCircle, FileText, Shield, Building2, Lock, Code2, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

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
              Bridging the gap between physical presence and digital identity with elegance and purpose.
            </p>
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
                  <a href="https://aialchemist-ab1r.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-luxury">
                    AI Alchemist
                  </a>
                </li>
                <li>
                  <a href="/drops/bangladesh-2035" className="hover:text-foreground transition-luxury">
                    Intelligence Drops
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-foreground">Presence</h4>
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
