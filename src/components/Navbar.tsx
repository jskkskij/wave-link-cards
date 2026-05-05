import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
const wavelinkLogo = "/assets/wavelink-logo-new.webp";
const companyProfilePdf = "/assets/WavelinkCompanyProfile.pdf";
import { Menu, X, ShoppingBag, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  lang?: "en" | "bn";
}

const Navbar = ({ lang = "en" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#phase-2" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Affiliate", href: "#affiliate" },
    { name: "Investors", href: "/investor-deck", isRoute: true },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-0 right-0 z-[60] flex justify-center transition-luxury",
          isScrolled ? "translate-y-[-4px]" : "translate-y-0"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "relative flex items-center justify-between transition-luxury",
            "bg-white/60 backdrop-blur-2xl border border-white/20 shadow-luxury rounded-full px-6 md:px-8 py-2.5 md:py-3",
            "w-[94%] sm:w-[90%] md:w-[80%] lg:w-[65%]"
          )}
        >
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-luxury"
            aria-label="Wavelink Home"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src={wavelinkLogo}
              alt="Wavelink Logo - Your Smart Networking Infrastructure"
              width={112}
              height={32}
              className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-luxury"
              loading="eager"
              fetchPriority="high"
            />
            <span className="font-serif font-bold text-lg tracking-tight text-foreground hidden sm:block">
              Wavelink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[13px] font-bold text-muted-foreground hover:text-foreground transition-luxury uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[13px] font-bold text-muted-foreground hover:text-foreground transition-luxury uppercase tracking-widest"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('#order')}
              size="sm"
              className="hidden lg:flex bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-full px-6 py-2 transition-luxury shadow-luxury border-none above-fold-cta"
            >
              <span className="tracking-tight text-[14px]">Get Card</span>
              <ShoppingBag size={18} className="ml-2.5 stroke-[2.5]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-muted-foreground/10 rounded-full w-[44px] h-[44px] tap-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl px-8 pb-20"
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-sm">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif font-bold text-foreground hover:text-accent transition-luxury min-h-[48px] flex items-center tracking-tight"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      scrollToSection(link.href);
                    }}
                    className="text-3xl font-serif font-bold text-foreground hover:text-accent transition-luxury min-h-[48px] flex items-center tap-target tracking-tight"
                  >
                    {link.name}
                  </button>
                )
              ))}
              <Button
                onClick={() => { scrollToSection('#order'); setIsMobileMenuOpen(false); }}
                className="w-full mt-4 bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-full py-6 text-lg transition-luxury shadow-xl border-none above-fold-cta"
              >
                <span>Get Your NFC Card</span>
                <ShoppingBag size={20} className="ml-3" />
              </Button>
              <a
                href={companyProfilePdf}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-luxury min-h-[44px]"
              >
                <FileDown size={16} /> Company Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
