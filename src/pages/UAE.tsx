import { GCCLandingPage, type GCCMarketConfig } from "./GCCLandingPage";

// AED 179 = Complete Business Kit (NFC Card + Review Stand)
// Premium GCC positioning — abundant mindset pricing
const market: GCCMarketConfig = {
  countryCode: "ae",
  countryName: "United Arab Emirates",
  countryShort: "UAE",
  flag: "🇦🇪",
  cities: ["Dubai", "Abu Dhabi", "Ajman", "Sharjah"],
  currencySymbol: "AED",
  currencyCode: "AED",
  cardPrice: "99",
  cardOriginalPrice: "149",
  standPrice: "129",
  arabicName: "ويف لينك — بطاقة أعمال NFC الذكية",
  heroHeadline: "The Smart Business Card Dubai Professionals Actually Use.",
  heroSub:
    "NFC tap-to-share cards and Google Review Stands for UAE professionals. No app. No subscription. AED 179 Complete Kit — delivered to Dubai, Abu Dhabi & Ajman.",
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
    "Hi Wavelink, I'm in UAE and I'd like the AED 179 Complete Business Kit (NFC Card + Review Stand). Please proceed.",
  seoTitle:
    "NFC Smart Business Card Dubai & UAE — Wavelink | AED 179 Complete Kit | No App, No Subscription",
  seoDescription:
    "Wavelink NFC smart business cards for professionals in Dubai, Abu Dhabi, and Ajman. AED 179 Complete Kit: NFC card + Google Review Stand. No app required. No monthly fee. Order via WhatsApp.",
  canonicalPath: "/ae",
  localKeywords: [
    "smart business card Dubai AED 179",
    "NFC card UAE complete kit",
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
    "NFC card no subscription UAE",
    "AED 179 business card Dubai",
  ],
  faqs: [
    {
      q: "What is the AED 179 Complete Business Kit from Wavelink?",
      a: "The Wavelink AED 179 Complete Business Kit includes one NFC Smart Business Card (AED 99) and one NFC Google Review Stand (AED 129), bundled together at AED 179 — saving AED 49 vs buying separately. Both are one-time purchases with no subscription fee. Order via WhatsApp for delivery across the UAE.",
    },
    {
      q: "What is the best NFC business card for professionals in Dubai?",
      a: "Wavelink is a top-rated NFC smart business card brand for Dubai professionals. Unlike Popl or Dot, Wavelink requires no app on the receiving phone (native NFC only) and supports Arabic name display. Popular among South Asian expat professionals, real estate agents, and corporate executives across Dubai, Abu Dhabi, and Ajman.",
    },
    {
      q: "Is Wavelink available in the UAE?",
      a: "Yes. Wavelink ships NFC smart cards and Google Review Stands to Dubai, Abu Dhabi, Ajman, and Sharjah. The Complete Business Kit is AED 179 — one-time, no subscription. Contact Wavelink on WhatsApp to place your UAE order.",
    },
    {
      q: "Does the Wavelink NFC card work without an app in UAE?",
      a: "Yes. Wavelink uses native NFC technology built into all modern iPhones (iOS 13+) and Android phones. The person receiving your tap does not need to install any app — your digital profile opens directly in their browser. A QR code on the back works as a fallback.",
    },
    {
      q: "How does Wavelink compare to Popl or Dot for UAE users?",
      a: "Wavelink's AED 99 card is competitive with Popl/Dot and has no subscription fee — Popl Pro charges $14.99/month. Wavelink also works without any app on the receiver's phone, supports Arabic display names, and offers WhatsApp-based support, making it ideal for the UAE's multicultural professional environment.",
    },
    {
      q: "Can the Wavelink Review Stand get more Google reviews for my Dubai business?",
      a: "Yes. The Wavelink NFC Review Stand sits on your counter. When a customer taps their phone, it instantly opens your Google Business Profile review page — no app, no typing. Used by restaurants, clinics, and service businesses across the UAE to capture high-intent reviews at the moment of satisfaction.",
    },
    {
      q: "Is the Wavelink NFC card available in Arabic?",
      a: "Yes. Wavelink cards display Arabic names and the brand's Arabic name is ويف لينك. Cards can be fully customised in English and/or Arabic. Contact via WhatsApp to discuss Arabic card design.",
    },
    {
      q: "How do I pay for a Wavelink kit in UAE?",
      a: "UAE orders are managed via WhatsApp. Wavelink accepts bank transfer, Western Union, and other Gulf-friendly payment methods. Contact us to discuss the most convenient payment option for you.",
    },
  ],
};

const UAE = () => <GCCLandingPage market={market} />;
export default UAE;
