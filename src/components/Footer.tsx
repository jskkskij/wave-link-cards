import { Facebook, Instagram, MessageCircle, FileText, Shield, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFIG } from "@/lib/config";

const Footer = () => {
  const footerLinks = [
    { name: "Company Profile", path: "/company-profile", icon: Building2 },
    { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", path: "/terms-of-service", icon: FileText },
  ];

  return (
    <footer className="bg-navy text-mist py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none paper-texture" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-medium mb-6 text-white">Wavelink</h3>
            <p className="text-mist/60 text-sm leading-relaxed mb-6">
              Bridging the gap between physical presence and digital identity with elegance and purpose.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61582857699324" },
                { icon: Instagram, href: "https://www.instagram.com/__wave_link__/" },
                { icon: MessageCircle, href: CONFIG.WHATSAPP_LINK("") }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-start-3">
            <h4 className="text-white font-serif mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-mist/60">
              {['Home', 'Features', 'Pricing', 'Reviews'].map((item) => (
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
          <a
            href="/trade-license.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-sky/30 hover:bg-white/5 transition-all duration-300"
          >
            <Shield className="w-4 h-4 text-sky group-hover:scale-110 transition-transform" />
            <span className="text-white/60 group-hover:text-sky transition-colors">Licensed Business</span>
          </a>

          <p>Designed with Intent.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
