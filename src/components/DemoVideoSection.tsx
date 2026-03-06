import { useState, useRef, useEffect } from "react";

/**
 * DemoVideoSection — Google Drive iframe is injected ONLY when the section
 * enters the viewport (IntersectionObserver). This prevents an expensive
 * cross-origin network request from blocking the initial page load on mobile.
 */
const DemoVideoSection = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: load immediately if IO not supported
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before it enters view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
            See Wavelink in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how easy it is to share your digital business card
          </p>
        </div>

        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <div className="relative group">
            {/* Glow layer */}
            <div className="absolute -inset-1 bg-gradient-luxury rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            <div className="relative bg-background rounded-2xl overflow-hidden shadow-luxury border-2 border-primary/20 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {shouldLoad ? (
                  <iframe
                    src="https://drive.google.com/file/d/12xHapaNLUomHPwqxOBwqvyZMCneQ3xkC/preview?hd=1"
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="autoplay"
                    allowFullScreen
                    title="Wavelink Product Demo Video"
                    loading="lazy"
                  />
                ) : (
                  /* Lightweight placeholder until IO fires */
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-lg bg-muted/30 flex items-center justify-center"
                    aria-label="Video loading…"
                  >
                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary/50">
                      <svg className="w-10 h-10 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
