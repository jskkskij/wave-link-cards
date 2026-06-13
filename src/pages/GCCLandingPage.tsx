import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle, Check, Star, Zap, Shield, Globe,
  ChevronDown, ArrowRight, Facebook, Instagram, Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/lib/config";
import newLogo from "@/assets/wavelink-logo-new.webp";

export interface GCCMarketConfig {
  /** ISO country code: "ae" | "qa" | "bh" */
  countryCode: string;
  /** e.g. "United Arab Emirates" */
  countryName: string;
  /** e.g. "UAE" */
  countryShort: string;
  /** Flag emoji */
  flag: string;
  /** Primary cities served */
  cities: string[];
  /** Currency symbol */
  currencySymbol: string;
  /** ISO currency code */
  currencyCode: string;
  /** NFC card price (string, no symbol) */
  cardPrice: string;
  /** Review stand price (string, no symbol) */
  standPrice: string;
  /** Original / crossed-out price for card */
  cardOriginalPrice: string;
  /** Locale hero headline */
  heroHeadline: string;
  /** Locale hero sub */
  heroSub: string;
  /** Key professional segments */
  segments: string[];
  /** Market-specific trust statement */
  trustStatement: string;
  /** WhatsApp pre-filled order message */
  whatsappMessage: string;
  /** SEO page title */
  seoTitle: string;
  /** SEO meta description */
  seoDescription: string;
  /** Canonical URL path: "/ae" */
  canonicalPath: string;
  /** Arabic name shown in hero for Arabic-speaking audience */
  arabicName?: string;
  /** Market-specific FAQs */
  faqs: { q: string; a: string }[];
  /** Additional local keywords for schema */
  localKeywords: string[];
}

// ── Shared feature list ─────────────────────────────────────────────────────
const FEATURES = [
  { icon: Zap, title: "No App Required", body: "Works on native NFC — any modern iPhone or Android. The receiving phone needs zero installs." },
  { icon: Shield, title: "No Subscription", body: "One-time purchase. Free lifetime digital profile. No monthly fees — ever." },
  { icon: Globe, title: "Live-Editable Profile", body: "Update your number, title, or links anytime. The card never becomes outdated." },
  { icon: Star, title: "Google Review Stand", body: "Tap-to-review tabletop stand — opens Google, Trustpilot, or any review page instantly." },
];

const COMPETITOR_TABLE = [
  { feature: "No app required", wavelink: true, popl: false, hiHello: false, dot: false },
  { feature: "No subscription fee", wavelink: true, popl: false, hiHello: false, dot: false },
  { feature: "Live-editable profile", wavelink: true, popl: true, hiHello: true, dot: true },
  { feature: "Bangla & Arabic support", wavelink: true, popl: false, hiHello: false, dot: false },
  { feature: "WhatsApp ordering", wavelink: true, popl: false, hiHello: false, dot: false },
  { feature: "Google Review Stand hardware", wavelink: true, popl: false, hiHello: false, dot: false },
];

// ── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

// ── Component ───────────────────────────────────────────────────────────────
export const GCCLandingPage = ({ market }: { market: GCCMarketConfig }) => {
  const origin = CONFIG.SITE_CANONICAL_ORIGIN;
  const canonical = `${origin}${market.canonicalPath}`;
  const waMsg = encodeURIComponent(market.whatsappMessage);
  const waLink = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}`;

  // Structured data for this market
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonical}#localbusiness`,
    name: `Wavelink ${market.countryShort}`,
    alternateName: market.arabicName ? ["Wavelink", market.arabicName] : ["Wavelink"],
    url: canonical,
    telephone: CONFIG.SUPPORT_PHONE_E164,
    email: CONFIG.SUPPORT_EMAIL,
    description: market.seoDescription,
    areaServed: [
      { "@type": "Country", name: market.countryName },
      ...market.cities.map(c => ({ "@type": "City", name: c })),
    ],
    currenciesAccepted: market.currencyCode,
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#nfc-card`,
    name: `Wavelink NFC Smart Business Card — ${market.countryShort}`,
    description: `Tap-to-share NFC business card for professionals in ${market.cities.join(", ")}. No app required. ${market.currencySymbol}${market.cardPrice} — no subscription.`,
    brand: { "@type": "Brand", name: "Wavelink" },
    sku: `WL-NFC-CARD-${market.countryCode.toUpperCase()}`,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "87", bestRating: "5" },
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: market.currencyCode,
      price: market.cardPrice,
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: market.countryName },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: market.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Wavelink", item: origin },
      { "@type": "ListItem", position: 2, name: `Wavelink ${market.countryShort}`, item: canonical },
    ],
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>{market.seoTitle}</title>
        <meta name="description" content={market.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={market.seoTitle} />
        <meta property="og:description" content={market.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={CONFIG.OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content={[
          `NFC business card ${market.countryShort}`,
          `smart card ${market.cities[0]}`,
          `digital business card ${market.countryName}`,
          `NFC card no app ${market.countryShort}`,
          `Google review stand ${market.countryShort}`,
          ...market.localKeywords,
        ].join(", ")} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-white">

        {/* ── Navbar ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={newLogo} alt="Wavelink" className="h-8 w-auto" />
              <span className="font-bold text-lg tracking-tight">Wavelink</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 hidden sm:block">{market.flag} {market.countryShort}</span>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-bold px-4 py-2 rounded-full transition-all"
                aria-label="Order via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:block">Order Now</span>
              </a>
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-[20%] w-[60%] h-[60%] bg-sky-600/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-[10%] w-[40%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center py-24">
            {/* Market badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-300 mb-8"
            >
              <span>{market.flag}</span>
              <span>Now Serving {market.countryName} — {market.cities.join(" · ")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[clamp(2.4rem,8vw,6.5rem)] font-serif font-bold leading-[1.05] tracking-[-0.04em] mb-6 text-balance"
            >
              {market.heroHeadline}
            </motion.h1>

            {/* Arabic name for Arabic-speaking crawlers and audiences */}
            {market.arabicName && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg mb-2 font-medium"
                lang="ar"
                dir="rtl"
              >
                {market.arabicName}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 text-balance"
            >
              {market.heroSub}
            </motion.p>

            {/* Price pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-slate-900 border border-white/10 rounded-2xl px-6 py-3 mb-10"
            >
              <span className="text-slate-500 line-through text-lg">{market.currencySymbol}{market.cardOriginalPrice}</span>
              <span className="text-white font-bold text-3xl">{market.currencySymbol}{market.cardPrice}</span>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/30">NO SUBSCRIPTION</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-4 rounded-full transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.4)] w-full sm:w-auto justify-center"
                aria-label={`Order Wavelink NFC card via WhatsApp for ${market.countryShort}`}
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>
              <a
                href="#faq"
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-semibold text-base px-6 py-4 rounded-full transition-all w-full sm:w-auto justify-center"
              >
                Learn More
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-14 text-slate-500 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> No App Required</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> No Monthly Fee</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> 4.9★ Rated</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-400" /> 1,350+ Deployed</span>
            </motion.div>
          </div>
        </section>

        {/* ── Segments ── */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-10">
              Trusted by professionals across {market.countryName}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {market.segments.map((seg) => (
                <span
                  key={seg}
                  className="bg-slate-900 border border-white/10 text-slate-300 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {seg}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-24 border-t border-white/5" id="features">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp()} className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-4">
                Trust Infrastructure
              </motion.p>
              <motion.h2 variants={fadeUp(0.1)} className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4">
                Built different.
              </motion.h2>
              <motion.p variants={fadeUp(0.2)} className="text-slate-400 text-lg max-w-xl mx-auto">
                {market.trustStatement}
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp(i * 0.08)}
                  initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="bg-slate-900 border border-white/8 rounded-2xl p-6 hover:border-sky-500/30 transition-all"
                >
                  <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-24 border-t border-white/5 bg-slate-900/30" id="pricing">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">Simple. One-time.</h2>
              <p className="text-slate-400 text-lg">All prices in {market.currencyCode}. No hidden fees.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* NFC Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative bg-slate-900 border-2 border-sky-500/40 rounded-3xl p-8 overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-400 text-[10px] font-bold uppercase px-2 py-1 rounded-full border border-sky-500/30">
                  Best Seller
                </div>
                <h3 className="text-2xl font-bold font-serif mb-2">NFC Smart Card</h3>
                <p className="text-slate-400 text-sm mb-6">Tap-to-share profile · No app · QR fallback</p>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-bold">{market.currencySymbol}{market.cardPrice}</span>
                  <div className="mb-2">
                    <div className="text-slate-500 line-through text-sm">{market.currencySymbol}{market.cardOriginalPrice}</div>
                    <div className="text-green-400 text-xs font-bold">One-time</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Custom design & branding", "Live-editable digital profile", "Free lifetime profile hosting", "NFC + QR code", "WhatsApp ordering & support"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </motion.div>

              {/* Review Stand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all"
              >
                <h3 className="text-2xl font-bold font-serif mb-2">NFC Review Stand</h3>
                <p className="text-slate-400 text-sm mb-6">Tabletop · Tap-to-Google-Review · No app</p>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-bold">{market.currencySymbol}{market.standPrice}</span>
                  <div className="mb-2">
                    <div className="text-green-400 text-xs font-bold">One-time</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Opens Google review page on tap", "Works on any NFC phone", "No app needed for customers", "Premium tabletop display", "WhatsApp support included"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-white/20 hover:bg-white/5 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire via WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-4">Comparison</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Wavelink vs. the rest</h2>
              <p className="text-slate-400">Why professionals in {market.countryName} choose Wavelink over Western alternatives.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/60">
                    <th className="text-left py-4 px-5 text-slate-400 font-semibold">Feature</th>
                    <th className="py-4 px-4 text-sky-400 font-bold">Wavelink</th>
                    <th className="py-4 px-4 text-slate-500 font-semibold">Popl</th>
                    <th className="py-4 px-4 text-slate-500 font-semibold">HiHello</th>
                    <th className="py-4 px-4 text-slate-500 font-semibold">Dot</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITOR_TABLE.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-slate-900/20' : ''}`}>
                      <td className="py-3.5 px-5 text-slate-300">{row.feature}</td>
                      {[row.wavelink, row.popl, row.hiHello, row.dot].map((val, j) => (
                        <td key={j} className="py-3.5 px-4 text-center">
                          {val
                            ? <span className="text-green-400 text-base">✓</span>
                            : <span className="text-slate-600 text-base">✗</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 border-t border-white/5 bg-slate-900/20" id="faq">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-4">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Common questions from {market.countryShort}</h2>
            </div>
            <div className="space-y-4">
              {market.faqs.map(({ q, a }, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-slate-900 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-base list-none select-none hover:text-sky-300 transition-colors">
                    {q}
                    <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                  </summary>
                  <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-4">{market.flag} Serving {market.countryName}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                One tap. Your entire professional identity.
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join 1,350+ professionals who replaced paper cards with Wavelink. Starting at {market.currencySymbol}{market.cardPrice}.
              </p>
              <a
                href={waLink}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-10 py-5 rounded-full transition-all shadow-[0_0_50px_rgba(34,197,94,0.25)] hover:shadow-[0_0_70px_rgba(34,197,94,0.35)]"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp — {market.currencySymbol}{market.cardPrice}
              </a>
              <p className="text-slate-600 text-xs mt-6">No app required · No subscription · Ships to {market.cities.join(", ")}</p>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-12 bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
              <div className="space-y-3 max-w-xs">
                <Link to="/" className="flex items-center gap-2">
                  <img src={newLogo} alt="Wavelink" className="h-6 w-auto" />
                  <span className="font-bold">Wavelink</span>
                </Link>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Bangladesh's first NFC trust infrastructure company. Serving {market.countryName} from {market.cities[0]}.
                </p>
                {/* AEO machine-readable market signal */}
                <p className="sr-only">
                  Wavelink {market.countryShort} — NFC smart business cards {market.currencySymbol}{market.cardPrice} in {market.cities.join(", ")}.
                  No app, no subscription. Contact via WhatsApp. Founded 2024, Chattogram, Bangladesh.
                  {market.arabicName ? ` Arabic: ${market.arabicName}.` : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home (Bangladesh)</Link>
                <Link to="/company-profile" className="hover:text-white transition-colors">Company Profile</Link>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/drops/bangladesh-2035" className="hover:text-white transition-colors">Intelligence Report</Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Order</a>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">© 2026 Wavelink Global Ecosystem. {market.flag} {market.countryName}.</p>
              <div className="flex items-center gap-4">
                <a href={CONFIG.FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="w-4 h-4 text-slate-600 hover:text-white transition-colors" /></a>
                <a href={CONFIG.INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="w-4 h-4 text-slate-600 hover:text-white transition-colors" /></a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="w-4 h-4 text-slate-600 hover:text-white transition-colors" /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GCCLandingPage;
