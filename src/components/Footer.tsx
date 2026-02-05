import { Facebook, Instagram, MessageCircle, FileText, Shield, Building2, Lock, Code2, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

const Footer = () => {
  const footerLinks = [
    { name: "Company Profile", path: "/company-profile", icon: Building2 },
    { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", path: "/terms-of-service", icon: FileText },
    { name: "Data Processing Agreement (DPA)", path: "/dpa", icon: Lock },
  ];

  const [isIntegrityValid, setIsIntegrityValid] = useState(true);

  useEffect(() => {
    // Signature Integrity Check (Hash-based)
    // text: "Created by Mohammad Abir Abbas"
    // hash: sha256 approximation or simple check to ensure it's not removed
    const checkSignatureIntegrity = () => {
      const sig = document.getElementById('dev-signature');
      const expectedText = "Created by Mohammad Abir Abbas";

      if (!sig || sig.innerText.trim() !== expectedText) {
        setIsIntegrityValid(false);
        console.error("CRITICAL: Developer signature integrity check failed.");
      }
    };

    const interval = setInterval(checkSignatureIntegrity, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-navy text-mist py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none paper-texture" />

      {/* Footer Top Bar */}
      <div className="border-b border-white/5 mb-16 relative z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-mist/40 font-medium">Follow us:</span>
            <div className="flex items-center gap-5">
              {[
                { icon: Facebook, href: CONFIG.FACEBOOK_LINK },
                { icon: Instagram, href: CONFIG.INSTAGRAM_LINK },
                { icon: MessageCircle, href: CONFIG.WHATSAPP_LINK("") },
                { icon: Music, href: CONFIG.TIKTOK_LINK }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist/40 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-[0.15em] text-mist/30 font-semibold select-none">
            NFC Powered Connections
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-medium mb-6 text-white">Wavelink</h3>
            <p className="text-mist/60 text-sm leading-relaxed">
              Bridging the gap between physical presence and digital identity with elegance and purpose.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-start-3">
            <h4 className="text-white font-serif mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-mist/60">
              {['Home', 'Features', 'Pricing', 'Reviews', 'Affiliate'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-sky transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-serif mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-mist/60">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-sky transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-mist/40">
          <p>© 2025 Wavelink. All rights reserved.</p>

          {/* Trade License Badge */}
          <div className="flex items-center gap-4">
            <a
              href="/trade-license.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-sky/30 hover:bg-white/5 transition-all duration-300"
            >
              <Shield className="w-4 h-4 text-sky group-hover:scale-110 transition-transform" />
              <span className="text-white/60 group-hover:text-sky transition-colors">Licensed Business</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <Lock className="w-4 h-4 text-green-500" />
              <span className="text-white/40">SSL SECURED</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-white/40">GDPR COMPLIANT</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-white/60 font-bold text-[10px]">UAE 2026 COMPLIANT</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 order-last md:order-none">
            <a
              id="dev-signature"
              href="https://linkedin.com/in/abir-abbas"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-sky transition-all duration-300 flex items-center gap-1 opacity-60 hover:opacity-100 ${!isIntegrityValid ? 'animate-pulse text-red-500' : ''}`}
              title="Identity Hash: dc73a2468725899a19456574"
            >
              <Code2 className="w-3 h-3" />
              Created by Mohammad Abir Abbas
            </a>
          </div>

          <p className="opacity-40 italic">Designed with Intent.</p>
        </div>
      </div>
      {!isIntegrityValid && (
        <div className="fixed bottom-0 left-0 w-full bg-red-600/10 backdrop-blur-sm text-[8px] py-0.5 text-center pointer-events-none z-[9999]" style={{ opacity: 0.1 }}>
          INTEGRITY_CHECK_FAILED_AUTH_REQUIRED
        </div>
      )}
    </footer>
  );
};

export default Footer;
