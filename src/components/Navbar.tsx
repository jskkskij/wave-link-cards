import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import wavelinkLogo from "@/assets/wavelink-logo-new.png";
import companyProfilePdf from "@/assets/WaveLinkCompanyProfile.pdf";
import { Menu, X, ShoppingBag, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Reviews", href: "#reviews" },
    { name: "Affiliate", href: "#affiliate" },
    { name: "FAQ", href: "#faq" },
    { name: "Profile", href: "/company-profile", isRoute: true },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      // If not on home, just let the link handle it (or navigate home first)
      // For simplicity in this demo, we'll assume anchors work on home
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
          "fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-500",
          isScrolled ? "py-0" : "py-2"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "relative flex items-center justify-between transition-all duration-500",
            // Glass Pill Styling - More translucent when scrolled
            isScrolled
              ? "bg-white/40 backdrop-blur-sm border border-white/10 shadow-sm"
              : "bg-white/80 backdrop-blur-md border border-white/20 shadow-luxury",
            "rounded-full",
            // Responsive Sizing
            isScrolled ? "w-[92%] sm:w-[95%] md:w-[85%] lg:w-[70%] py-2 px-4 sm:px-6" : "w-[88%] sm:w-[90%] md:w-[80%] lg:w-[60%] py-3 sm:py-4 px-6 sm:px-8"
          )}
        >
          {/* Logo Section - Dimmed when scrolled */}
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 group transition-all duration-500",
              isScrolled ? "opacity-30" : "opacity-100"
            )}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src={wavelinkLogo}
                alt="Wavelink"
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-serif font-semibold text-xl tracking-tight text-navy hidden sm:block opacity-0 lg:opacity-100 transition-opacity duration-300 -translate-x-2 lg:translate-x-0">
              Wavelink
            </span>
          </Link>

          <div className={cn(
            "hidden lg:flex items-center gap-8 transition-all duration-500",
            isScrolled ? "opacity-30 pointer-events-none" : "opacity-100"
          )}>
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative text-sm font-medium text-foreground/80 hover:text-navy transition-colors duration-300 group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-navy/50 -translate-x-1/2 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-sm font-medium text-foreground/80 hover:text-navy transition-colors duration-300 group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-navy/50 -translate-x-1/2 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full" />
                </a>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-black/5 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            <Button
              onClick={() => scrollToSection('#order')}
              className={cn(
                "hidden lg:flex items-center gap-2 rounded-full px-6 transition-all duration-500",
                // Enhanced focus when scrolled
                isScrolled
                  ? "bg-navy text-white hover:bg-navy/90 shadow-luxury-glow scale-110 animate-pulse-glow border-2 border-white/30"
                  : "bg-navy text-white hover:bg-navy/90 shadow-none hover:shadow-lg border border-transparent scale-100",
                "relative overflow-visible"
              )}
            >
              {/* Glow ring when scrolled */}
              {isScrolled && (
                <div className="absolute -inset-1 bg-navy rounded-full blur-xl opacity-50 animate-pulse" aria-hidden="true" />
              )}
              <span className="relative z-10 font-semibold">Get Card</span>
              <ShoppingBag size={16} className="ml-1 relative z-10" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto clip-path-full" : "opacity-0 pointer-events-none"
      )}>
        {navLinks.map((link, idx) => (
          link.isRoute ? (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-3xl font-serif text-navy hover:text-navy/60 transition-all duration-500 transform translate-y-0",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 100}ms` }}
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
              className={cn(
                "text-3xl font-serif text-navy hover:text-navy/60 transition-all duration-500 transform translate-y-0",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          )
        ))}
        <Button
          onClick={() => scrollToSection('#order')}
          className="mt-8 bg-navy text-white rounded-full px-12 py-6 text-xl"
        >
          Order Now
        </Button>
      </div>

      <style>{`
        .clip-path-full {
            clip-path: circle(150% at 100% 0);
        }
      `}</style>
    </>
  );
};

export default Navbar;

