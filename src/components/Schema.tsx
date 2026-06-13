import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/lib/config";

const origin = CONFIG.SITE_CANONICAL_ORIGIN;
const siteUrl = CONFIG.SITE_CANONICAL_URL;
const ogImage = CONFIG.OG_IMAGE_URL;

const Schema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Wavelink",
    alternateName: [
      "Wavelink Technologies",
      "ওয়েভলিংক টেকনোলজিস",
      "ويف لينك",
      "WaveLink NFC",
      "Wavelink BD",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${origin}/assets/wavelink-logo-new.webp`,
      width: 400,
      height: 400,
    },
    image: ogImage,
    description:
      "Wavelink is Bangladesh's first NFC trust infrastructure company — tap-to-share smart business cards and Google Review stands that work without any app installation. Serving professionals across Bangladesh (Dhaka, Chattogram) and the GCC (Dubai, Abu Dhabi, Ajman, Qatar, Bahrain).",
    email: CONFIG.SUPPORT_EMAIL,
    telephone: CONFIG.SUPPORT_PHONE_E164,
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Mohammad Abir Abbas",
      url: "https://abir.getwaved.ai",
      sameAs: [CONFIG.LINKEDIN_COMPANY],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chandanpura",
      addressLocality: "Chattogram",
      addressCountry: "BD",
    },
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "City", name: "Dhaka" },
      { "@type": "City", name: "Chattogram" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Ajman" },
      { "@type": "City", name: "Doha" },
      { "@type": "City", name: "Manama" },
    ],
    sameAs: [
      ...CONFIG.schemaSameAs(),
      "https://www.crunchbase.com/organization/wavelink",
    ],
    knowsAbout: [
      "NFC business cards",
      "Digital business cards",
      "Customer review acquisition",
      "Google Business Profile optimization",
      "Trust and identity infrastructure",
      "Digital Product Passport",
      "EU ESPR 2026 compliance",
      "NFC technology",
      "Tap-to-share networking",
      "Review stand hardware",
      "Smart business card Bangladesh",
      "بطاقة أعمال NFC الذكية",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const localBusinessBDSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#localbusiness-bd`,
    name: "Wavelink Bangladesh",
    image: ogImage,
    url: siteUrl,
    telephone: CONFIG.SUPPORT_PHONE_E164,
    email: CONFIG.SUPPORT_EMAIL,
    priceRange: "৳",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chandanpura",
      addressLocality: "Chattogram",
      addressRegion: "Chittagong Division",
      addressCountry: "BD",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "City", name: "Dhaka" },
      { "@type": "City", name: "Chattogram" },
    ],
    currenciesAccepted: "BDT",
    paymentAccepted: "Cash, Bkash, Nagad, Rocket",
    description: "Wavelink Bangladesh — NFC স্মার্ট বিজনেস কার্ড এবং গুগল রিভিউ স্ট্যান্ড। কোনো অ্যাপ ছাড়াই কাজ করে।",
  };

  const localBusinessGCCSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#localbusiness-gcc`,
    name: "Wavelink GCC",
    alternateName: "ويف لينك الخليج",
    image: ogImage,
    url: `${origin}/gcc`,
    telephone: CONFIG.SUPPORT_PHONE_E164,
    email: CONFIG.SUPPORT_EMAIL,
    priceRange: "AED",
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Ajman" },
      { "@type": "City", name: "Doha" },
      { "@type": "City", name: "Manama" },
    ],
    currenciesAccepted: "AED, QAR, BHD",
    description: "Wavelink GCC — NFC smart business cards and review stands for UAE, Qatar & Bahrain. No app required. Serving South Asian expat professionals and local enterprises across the Gulf.",
  };

  const productNFCCardSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${origin}/#product-nfc-card`,
    name: "Wavelink NFC Smart Business Card",
    image: [ogImage, `${origin}/assets/wavelink-logo-new.webp`],
    description:
      "Tap-to-share NFC business card — opens your digital profile instantly in any mobile browser, no app installation required. Enterprise-grade networking and verifiable trust infrastructure. Compatible with all modern smartphones.",
    brand: { "@type": "Brand", name: "Wavelink" },
    sku: "WL-NFC-CARD-V1",
    gtin14: "",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Wavelink NFC Card — Bangladesh",
        url: `${origin}/#order`,
        priceCurrency: "BDT",
        price: "599",
        availability: "https://schema.org/InStock",
        eligibleRegion: { "@type": "Country", name: "Bangladesh" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "BDT" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "BD" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "d" },
            transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4, unitCode: "d" },
          },
        },
      },
      {
        "@type": "Offer",
        name: "Wavelink NFC Card — UAE / GCC",
        url: `${origin}/#order`,
        priceCurrency: "AED",
        price: "29",
        availability: "https://schema.org/InStock",
        eligibleRegion: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "Bahrain" },
        ],
      },
    ],
  };

  const productReviewStandSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${origin}/#product-review-stand`,
    name: "Wavelink NFC Google Review Stand",
    image: ogImage,
    description:
      "NFC-powered tabletop stand that lets customers tap to leave a Google or Trustpilot review instantly — no app required. Designed for restaurants, retail, clinics, and service businesses in Bangladesh and GCC.",
    brand: { "@type": "Brand", name: "Wavelink" },
    sku: "WL-REVIEW-STAND-V1",
    offers: [
      {
        "@type": "Offer",
        name: "Review Stand — Bangladesh",
        url: `${origin}/#order`,
        priceCurrency: "BDT",
        price: "1299",
        availability: "https://schema.org/InStock",
        eligibleRegion: { "@type": "Country", name: "Bangladesh" },
      },
      {
        "@type": "Offer",
        name: "Review Stand — UAE / GCC",
        url: `${origin}/#order`,
        priceCurrency: "AED",
        price: "55",
        availability: "https://schema.org/InStock",
        eligibleRegion: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "Bahrain" },
        ],
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Wavelink Trust Infrastructure",
    operatingSystem: "Web-based (iOS, Android, all modern browsers)",
    applicationCategory: "BusinessApplication",
    description:
      "Wavelink's digital trust layer connects physical NFC interactions to verified digital profiles — enabling tap-to-share contact exchange and high-intent review capture without any app installation. The infrastructure supports Digital Product Passport (DPP) standards aligned with EU ESPR 2026.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free lifetime digital profile with every Wavelink hardware purchase.",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      // ── Bangladesh / Universal ──────────────────────────────────────────
      {
        "@type": "Question",
        name: "What is Wavelink and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink is Bangladesh's first NFC trust infrastructure company. It makes smart business cards that share your contact details, social links, and portfolio when someone taps their smartphone against the card — no app required. Wavelink also offers NFC Review Stands that open Google or Trustpilot review pages instantly on tap. Founded in Chattogram in 2024, Wavelink serves professionals across Bangladesh and the GCC region.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an app to use a Wavelink NFC card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Wavelink operates on native NFC protocols built into modern smartphones (iOS 13+ and Android). Your digital profile opens directly in the phone's browser — no app installation needed on either side. For older phones, every Wavelink card includes a QR code fallback.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best NFC business card in Bangladesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink is Bangladesh's leading NFC business card brand, starting at BDT 599 with free delivery. It is the only locally-made NFC smart card brand with Bangla support, Bkash payment, and WhatsApp customer service. Over 1,350 professionals across Dhaka, Chattogram, and other cities use Wavelink cards.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Wavelink NFC Review Stand work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Place the Wavelink Review Stand on your counter. When a customer taps their phone, it instantly opens your Google Business Profile review page — no app, no typing. This is the fastest way to collect high-intent Google reviews at the moment of customer satisfaction. Compatible with all NFC-enabled Android and iOS devices.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a monthly subscription fee for Wavelink?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Wavelink is a one-time purchase — no monthly fees, no subscriptions. The standard digital profile infrastructure is free for life with every card or stand purchase.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a Wavelink NFC card cost in Bangladesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink NFC business cards start at BDT 599 in Bangladesh. Orders require a 50% advance via Bkash; the balance is due on completion. Free delivery within Bangladesh. Enterprise and team packs are available at discounted rates.",
        },
      },
      {
        "@type": "Question",
        name: "How do I order a Wavelink card in Bangladesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click the Order button on getwaved.ai, fill in your details, and Wavelink will contact you on WhatsApp to finalize your design. Payment is via Bkash (50% advance). Standard delivery is 3–4 business days across Bangladesh.",
        },
      },
      {
        "@type": "Question",
        name: "What is Wavelink's warranty and return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink products carry a 6-month warranty covering software and NFC-related defects. Returns are accepted only for manufacturing defects within 14 days of delivery. Refunds are processed within 14 business days. Physical damage, loss, or misuse is not covered. Warranty claims require proof of purchase via WhatsApp.",
        },
      },
      // ── GCC / UAE / Qatar / Bahrain ──────────────────────────────────────
      {
        "@type": "Question",
        name: "Is Wavelink available in Dubai and the UAE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Wavelink ships NFC smart business cards and Review Stands to Dubai, Abu Dhabi, Ajman, and across the UAE. Pricing for UAE orders starts at AED 29. The brand is popular among South Asian expat professionals and local businesses in the Gulf. Contact Wavelink via WhatsApp for GCC orders and delivery options.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best NFC business card for professionals in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink is a top choice for South Asian expat professionals in Dubai — it requires no app, starts at AED 29, and supports Arabic name display. Unlike Western brands (Popl, Dot, HiHello) that charge subscription fees, Wavelink is a one-time purchase with lifetime free profile hosting.",
        },
      },
      {
        "@type": "Question",
        name: "Does Wavelink deliver to Qatar and Bahrain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Wavelink delivers NFC smart cards and Review Stands to Qatar (Doha) and Bahrain (Manama). QAR and BHD pricing is available on request. Contact via WhatsApp for GCC shipping rates and delivery timelines.",
        },
      },
      {
        "@type": "Question",
        name: "How does Wavelink compare to Popl, HiHello, or Dot cards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink differs from Popl, HiHello, and Dot in three key ways: (1) No app required on either phone — works on native NFC. (2) No subscription fee — one-time purchase, free lifetime profile. (3) Local support in Bangladesh and GCC with Bkash, WhatsApp ordering, and Arabic/Bangla language support. Western alternatives typically cost 3–5× more and require monthly fees.",
        },
      },
      {
        "@type": "Question",
        name: "Is Wavelink NFC card compliant with EU Digital Product Passport standards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wavelink's trust infrastructure is designed with EU ESPR 2026 and Digital Product Passport (DPP) alignment in mind. The Drop 01 thesis (Asset Sovereignty & Circular Economy 2026–2036) outlines how Wavelink's NFC layer can serve as a product authentication and lifecycle tracking substrate for enterprises that need DPP compliance.",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessBDSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessGCCSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(productNFCCardSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(productReviewStandSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default Schema;
