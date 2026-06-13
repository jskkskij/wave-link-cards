import { GCCLandingPage, type GCCMarketConfig } from "./GCCLandingPage";

const market: GCCMarketConfig = {
  countryCode: "ae",
  countryName: "United Arab Emirates",
  countryShort: "UAE",
  flag: "🇦🇪",
  cities: ["Dubai", "Abu Dhabi", "Ajman", "Sharjah"],
  currencySymbol: "AED",
  currencyCode: "AED",
  cardPrice: "29",
  cardOriginalPrice: "59",
  standPrice: "55",
  arabicName: "ويف لينك — بطاقة أعمال NFC الذكية",
  heroHeadline: "The Smart Business Card Dubai Professionals Actually Use.",
  heroSub:
    "NFC tap-to-share cards and Google Review Stands for UAE professionals. No app needed. No monthly fee. Starting at AED 29 — delivered to Dubai, Abu Dhabi & Ajman.",
  segments: [
    "Real Estate Agents",
    "Corporate Executives",
    "Fintech Professionals",
    "Restaurant & F&B Owners",
    "Freelance Consultants",
    "South Asian Expats",
    "GITEX Attendees",
    "Free Zone Entrepreneurs",
    "Healthcare Professionals",
    "SME Business Owners",
  ],
  trustStatement:
    "Built for UAE's multicultural professional landscape. Works in English and Arabic. No app install for the receiver — just tap and connect.",
  whatsappMessage:
    "Hi Wavelink, I'm in UAE (Dubai/Abu Dhabi/Ajman) and I want to order an NFC smart business card. Please share pricing in AED.",
  seoTitle:
    "NFC Smart Business Card Dubai & UAE — Wavelink | No App, No Subscription | AED 29",
  seoDescription:
    "Wavelink NFC smart business cards for professionals in Dubai, Abu Dhabi, and Ajman. Tap-to-share your profile instantly — no app required. From AED 29, no monthly fee. NFC Google Review Stands also available. Order via WhatsApp.",
  canonicalPath: "/ae",
  localKeywords: [
    "smart business card Dubai",
    "NFC card UAE no subscription",
    "digital business card Abu Dhabi",
    "tap to share card Ajman",
    "NFC card expat Dubai",
    "بطاقة عمل ذكية دبي",
    "بطاقة NFC الإمارات",
    "Google review stand UAE",
    "NFC card GITEX Dubai",
    "best digital business card UAE",
    "Popl alternative UAE",
    "HiHello alternative Dubai",
  ],
  faqs: [
    {
      q: "What is the best NFC business card for professionals in Dubai?",
      a: "Wavelink is a top-rated NFC smart business card brand for Dubai professionals — starting at AED 29 with no subscription fee. Unlike Popl or Dot, Wavelink requires no app on the receiving phone (native NFC only) and supports Arabic name display. Popular among South Asian expat professionals, real estate agents, and corporate executives across Dubai, Abu Dhabi, and Ajman.",
    },
    {
      q: "Is Wavelink available in the UAE?",
      a: "Yes. Wavelink ships NFC smart cards and Google Review Stands to Dubai, Abu Dhabi, Ajman, and Sharjah. Cards start at AED 29 — one-time purchase, no subscription. Contact Wavelink on WhatsApp to place your UAE order. Delivery via DHL or courier within the UAE.",
    },
    {
      q: "Does the Wavelink NFC card work without an app in UAE?",
      a: "Yes. Wavelink uses native NFC technology built into all modern iPhones (iOS 13+) and Android phones. The person receiving your card tap does not need to install any app — your digital profile opens directly in their phone's browser. A QR code on the back works as a fallback for older devices.",
    },
    {
      q: "How does Wavelink compare to Popl, Dot, or HiHello for UAE users?",
      a: "Wavelink is cheaper (AED 29 vs. USD 30–40 for Popl/Dot) and has no subscription fee. Wavelink also works without any app on the receiver's phone — a key differentiator in business settings. It supports Arabic display names (ويف لينك) and offers WhatsApp-based customer support, making it ideal for UAE's multicultural professional environment.",
    },
    {
      q: "Can Wavelink's Review Stand get me more Google reviews in Dubai?",
      a: "Yes. The Wavelink NFC Review Stand sits on your counter. When a customer taps their phone, it instantly opens your Google Business Profile review page — no app, no QR scanning, no typing. It is used by restaurants, clinics, retail stores, and service businesses across the UAE to capture high-intent Google reviews at the moment of satisfaction.",
    },
    {
      q: "Is the Wavelink NFC card available in Arabic?",
      a: "Wavelink cards can display Arabic names and text. The brand's Arabic name is ويف لينك. Cards can be fully customized in English and/or Arabic to suit Dubai's bilingual professional environment. Contact via WhatsApp to discuss Arabic card design.",
    },
    {
      q: "Does Wavelink ship to Abu Dhabi and Ajman?",
      a: "Yes. Wavelink delivers NFC business cards and Review Stands to Dubai, Abu Dhabi, Ajman, and Sharjah. Contact Wavelink on WhatsApp with your UAE delivery address and preferred design to get started.",
    },
    {
      q: "How do I pay for a Wavelink card in UAE?",
      a: "UAE orders are managed via WhatsApp. Wavelink accepts international bank transfer, Western Union, or other Gulf-friendly payment methods. Contact us to discuss the payment option most convenient for you.",
    },
  ],
};

const UAE = () => <GCCLandingPage market={market} />;
export default UAE;
