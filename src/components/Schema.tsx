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
    alternateName: ["Wavelink Technologies", "ওয়েভলিংক টেকনোলজিস"],
    url: siteUrl,
    logo: `${origin}/favicon.ico`,
    image: ogImage,
    description:
      "NFC smart business cards and digital review stands for professionals — tap-to-share profiles and high-intent customer reviews without forcing app installs.",
    email: CONFIG.SUPPORT_EMAIL,
    foundingDate: "2024",
    sameAs: CONFIG.schemaSameAs(),
    knowsAbout: [
      "NFC business cards",
      "Digital business cards",
      "Customer review acquisition",
      "Google Business Profile",
      "Trust and identity infrastructure",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#localbusiness`,
    name: "Wavelink",
    image: ogImage,
    url: siteUrl,
    telephone: CONFIG.SUPPORT_PHONE_E164,
    email: CONFIG.SUPPORT_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chandanpura",
      addressLocality: "Chattogram",
      addressCountry: "BD",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: { "@type": "Country", name: "Bangladesh" },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${origin}/#product-nfc-card`,
    name: "Wavelink NFC Smart Business Card",
    image: ogImage,
    description:
      "Tap-to-share NFC business card — opens your profile in the phone browser; enterprise-grade networking and verifiable trust.",
    brand: { "@type": "Brand", name: "Wavelink" },
    sku: "WL-NFC-CARD",
    offers: {
      "@type": "Offer",
      url: `${origin}/#order`,
      priceCurrency: "BDT",
      price: "599",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "BDT",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "BD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "d",
          },
        },
      },
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Wavelink Trust Infrastructure",
    operatingSystem: "Web-based",
    applicationCategory: "BusinessApplication",
    description:
      "Digital layer for physical business interactions, bridging the gap between in-person meetings and high-trust digital profiles.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need an App to use the card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Wavelink operates on native NFC protocols. Your profile opens directly in any mobile browser without any third-party app installation.",
        },
      },
      {
        "@type": "Question",
        name: "How does the NFC Review Stand work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When a customer taps their phone on the stand, it instantly opens your Google or Trustpilot review page. It's designed to capture high-intent feedback at the point of interaction.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a monthly subscription fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We believe in high-utility hardware. You pay once for the card or stand, and the standard digital profile infrastructure is free for life.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a Wavelink NFC card cost in Bangladesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Promotional pricing on the site is shown in BDT (৳); Bangladesh orders list current price, deposit, and whether tax is inclusive in the pricing section. All prices are subject to change without prior notice per our Terms of Service.",
        },
      },
      {
        "@type": "Question",
        name: "How do ordering and payment work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orders are confirmed upon receipt of 50% advance payment via Bkash. The remaining balance is due upon order completion. All prices are in BDT (৳) and are subject to change without prior notice.",
        },
      },
      {
        "@type": "Question",
        name: "What are shipping and delivery times?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Delivery times vary based on customization requirements. Standard delivery is 7-14 business days after order confirmation. We will provide tracking information once your order is ready for shipment.",
        },
      },
      {
        "@type": "Question",
        name: "What is your return, refund, and warranty policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Due to the customized nature of our products, returns are only accepted for manufacturing defects. Refunds are processed within 14 business days. The 6-month warranty covers software-related issues with proof of purchase. All Wavelink cards come with a 6-month warranty covering software-related issues; physical damage, loss, or misuse is not covered. Warranty claims require proof of purchase and must be reported via our official WhatsApp number.",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default Schema;
