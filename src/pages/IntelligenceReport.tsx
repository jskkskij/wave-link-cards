import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "@/styles/intelligence-report.css";
import CustomerROIDashboard from "@/components/CustomerROIDashboard";

const IntelligenceReport = () => {
  const [progress, setProgress] = useState(0);
  const [activeRef, setActiveRef] = useState("");

  useEffect(() => {
    const reportSchema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Drop 01: Asset Sovereignty & The Circular Economy (2026-2036)",
      "image": "https://getwaved.ai/assets/wavelink-logo-new.webp",
      "author": {
        "@type": "Person",
        "name": "Mohammad Abir Abbas",
        "url": "https://aialchemist-abir.vercel.app"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Wavelink",
        "logo": {
          "@type": "ImageObject",
          "url": "https://getwaved.ai/assets/wavelink-logo-new.webp"
        }
      },
      "datePublished": "2026-03-26",
      "genre": "Market Thesis",
      "keywords": "Circular Economy, Asset Sovereignty, EU ESPR, Digital Product Passport, NFC Bangladesh",
      "about": [
        { "@type": "Thing", "name": "Digital Product Passport" },
        { "@type": "Thing", "name": "Sovereign Trust" },
        { "@type": "Thing", "name": "EU ESPR 2026" }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(reportSchema);
    document.head.appendChild(script);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Intersection Observer for animations and TOC
    const obsOptions = {
      root: null,
      rootMargin: '-5% 0px -85% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('rv')) {
            entry.target.classList.add('on');
          }
          if (entry.target.id && ['infrastructure', 'bangladesh-market', 'roi-simulator', 'circular-engine'].includes(entry.target.id)) {
            setActiveRef(entry.target.id);
          }
        }
      });
    }, obsOptions);

    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
    
    ['infrastructure', 'bangladesh-market', 'roi-simulator', 'circular-engine'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="intelligence-report-body min-h-screen bg-[#04080F]">
      <Helmet>
        <title>Asset Sovereignty & The Circular Economy | Wavelink Intelligence Drop 01</title>
        <meta name="description" content="Analyzing the 2026 global regulatory mandates, Digital Product Passports, and the Sovereign Trust flywheel for circular economies." />
      </Helmet>

      {/* Progress Bar */}
      <div className="read-progress" style={{ width: `${progress}%`, background: '#0077FF' }}></div>

      {/* Navigation */}
      <nav className="nav-iq">
        <div className="nav-iq-inner">
          <Link to="/" className="nav-iq-logo">
            <img src="/assets/wavelink-logo-new.webp" alt="Wavelink Logo" style={{ height: "24px" }} />
            <span className="nav-iq-tag">INTELLIGENCE</span>
          </Link>
          <div className="nav-iq-links">
            <a href="#roi-simulator">ROI Simulator</a>
            <a href="#circular-engine">Circular Engine</a>
            <Link to="/shop" className="btn-p" style={{ padding: "8px 18px", fontSize: "12px", boxShadow: "none" }}>Order Nodes</Link>
          </div>
        </div>
      </nav>

      {/* TOC Sidebar */}
      <div className="toc-sidebar">
        <a href="#infrastructure" className={`toc-dot ${activeRef === 'infrastructure' ? 'active' : ''}`} title="Asset Sovereignty"></a>
        <a href="#roi-simulator" className={`toc-dot ${activeRef === 'roi-simulator' ? 'active' : ''}`} title="ROI Simulator"></a>
        <a href="#circular-engine" className={`toc-dot ${activeRef === 'circular-engine' ? 'active' : ''}`} title="Circular Engine"></a>
      </div>

      <main>
        {/* HERO - Industrial Zen */}
        <section className="hero" id="infrastructure">
          <div className="hero-noise"></div>
          <div className="pill"><span className="pill-dot"></span>Asset Sovereignty · 2026–2036</div>

          <h1 className="hero-h1">
            <strong>Sovereign Trust</strong> is the<br />New License to Operate
          </h1>

          <p className="hero-sub">
            Moving beyond software to <strong>Machine-Readable Traceability</strong>.<br />
            Wavelink is the digital fingerprint for the global Circular Economy.
          </p>

          <div className="hero-actions">
            <a href="#roi-simulator" className="btn-p">View Elite UI →</a>
            <a href="#circular-engine" className="btn-g">Circular Engine</a>
          </div>
        </section>

        {/* ROI SIMULATOR SECTION */}
        <section id="roi-simulator" className="py-32 bg-[#04080F]">
          <div className="wrap">
            <div className="rv mb-20 text-center">
                <span className="s-eyebrow">Customer Simulation</span>
                <h2 className="s-h2" style={{ color: 'white' }}>The Elite Interface</h2>
                <p className="s-lead" style={{ margin: '0 auto', maxWidth: '600px' }}>What a Managing Director sees when they log into the Wavelink platform. Zero friction. High signal.</p>
            </div>
            <CustomerROIDashboard />
          </div>
        </section>

        {/* CIRCULAR ENGINE (Reframed Flywheel) */}
        <section id="circular-engine" className="fly-bg">
          <div className="section">
            <div className="wrap">
              <div className="rv"><span className="s-eyebrow">The Mechanics</span></div>
              <div className="rv"><h2 className="s-h2">A Circular Economy Engine<br /><span>that compounds trust</span></h2>
                <p className="s-lead">Precise, friction-free tracking of material flows. Every tap generates a Digital Product Passport (DPP), satisfying the 2026 EU ESPR mandate instantly.</p></div>

              <div className="fly-inner">
                {/* SVG Flywheel - Re-styled for precision */}
                <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="rv">
                  <defs>
                    <linearGradient id="ga" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0077FF" /><stop offset="100%" stopColor="#00C2FF" /></linearGradient>
                  </defs>
                  <circle cx="170" cy="170" r="150" stroke="rgba(0,119,255,0.1)" strokeWidth="1" />
                  <path d="M170 20 A150 150 0 0 1 320 170" stroke="url(#ga)" strokeWidth="2" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 170 170" to="360 170 170" dur="20s" repeatCount="indefinite" />
                  </path>
                  <text x="170" y="165" textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="14" fontWeight="800" fill="#0077FF">SOVEREIGN</text>
                  <text x="170" y="185" textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="14" fontWeight="800" fill="#0077FF">TRUST</text>

                  {/* Circular Economy Nodes */}
                  <circle cx="170" cy="56" r="30" fill="#04080F" stroke="#0077FF" strokeWidth="1" />
                  <text x="170" y="55" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">ORIGIN</text>
                  <text x="170" y="65" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">FINGERPRINT</text>

                  <circle cx="295" cy="225" r="30" fill="#04080F" stroke="#0077FF" strokeWidth="1" />
                  <text x="295" y="224" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">MARKET</text>
                  <text x="295" y="234" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">ACCESS</text>

                  <circle cx="55" cy="235" r="30" fill="#04080F" stroke="#0077FF" strokeWidth="1" />
                  <text x="55" y="234" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">ASSET</text>
                  <text x="55" y="244" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">ID (DPP)</text>
                </svg>

                <div className="fly-steps">
                  <div className="fstep rv d1">
                    <div className="fstep-n">1</div>
                    <div className="fstep-body">
                      <h5>Origin Fingerprint (NFC Tap)</h5>
                      <p>Capturing material data at source. A factory in Bangladesh or a hotel in Dubai taps the tag, creating an immutable record of material origin and grade.</p>
                    </div>
                  </div>
                  <div className="fstep rv d2">
                    <div className="fstep-n">2</div>
                    <div className="fstep-body">
                      <h5>Digital Product Passport (DPP) Generation</h5>
                      <p>Machine-readable traceability becomes reality. The asset is now 100% compliant with EU ESPR 2026/2027 and Dubai Waste Strategy 2041 mandates.</p>
                    </div>
                  </div>
                  <div className="fstep rv d3">
                    <div className="fstep-n">3</div>
                    <div className="fstep-body">
                      <h5>Global Market Access</h5>
                      <p>Wavelink is the "Golden Ticket." Factories gain access to premium global buyers who require verified sustainability data for their supply chains.</p>
                    </div>
                  </div>
                  <div className="fstep rv d4">
                    <div className="fstep-n">4</div>
                    <div className="fstep-body">
                      <h5>Revenue & Compliance Loop</h5>
                      <p>Traceability leads to trust, trust leads to revenue (+9% via HBS logic), and revenue incentivizes further participation in the circular economy flywheel.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET TRUTHS */}
        <div className="bd-bg" id="bangladesh-market">
          <div className="section">
            <div className="wrap">
              <div className="rv"><span className="s-eyebrow">Mechanically Inevitable</span></div>
              <div className="rv"><h2 className="s-h2">2026 Global Mandates.<br /><em>Audit Readiness.</em></h2>
                <p className="s-lead">Regulatory shifts are moving from "voluntary" to "mandatory." Wavelink provides the infrastructure required to survive this transition.</p></div>

              <div className="bd-grid">
                <div className="insights">
                  <div className="insight rv d1">
                    <div className="ins-num">01</div>
                    <div className="ins-body">
                      <h4>EU ESPR Mandate (2026/2027)</h4>
                      <p>The Ecodesign for Sustainable Products Regulation requires machine-readable traceability (DPP) for textiles. No passport = no market access.</p>
                    </div>
                  </div>
                  <div className="insight rv d2">
                    <div className="ins-num">02</div>
                    <div className="ins-body">
                      <h4>Dubai Integrated Waste Strategy 2041</h4>
                      <p>AED 74.5B budget penalizing untraceable industrial waste. Wavelink provides the "Origin Fingerprint" required for regional compliance.</p>
                    </div>
                  </div>
                </div>

                <div className="adv-panel rv d2" style={{ background: 'rgba(0,119,255,0.05)', borderColor: 'rgba(0,119,255,0.1)' }}>
                  <div className="adv-header" style={{ color: '#0077FF' }}>The Sovereign Edge</div>
                  <div className="adv-item">
                    <div className="adv-ck" style={{ background: '#0077FF' }}>✓</div>
                    <div><h5>Audit Readiness</h5><p>Be ready for the auditor in 2 seconds, not 2 weeks.</p></div>
                  </div>
                  <div className="adv-item">
                    <div className="adv-ck" style={{ background: '#0077FF' }}>✓</div>
                    <div><h5>Machine-Readable Trust</h5><p>Trust that is built for AI search agents and global regulators.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="footer-cta">
          <h2>Secure your <strong>Asset Sovereignty</strong><br />in the Circular Economy</h2>
          <p>One tap. Zero friction. 100% compliant. Wavelink is the digital identity layer for the sustainable future.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link to="/shop" className="btn-p">Get Started →</Link>
          </div>
          <div className="footer-brand">
            <img className="footer-logo" src="/assets/wavelink-logo-new.webp" alt="Wavelink" />
            <div className="footer-tag">Asset Sovereignty &nbsp;·&nbsp; Bangladesh 🇧🇩 &nbsp;·&nbsp; Dubai 🇦🇪</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntelligenceReport;
