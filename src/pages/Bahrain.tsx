import { GCCLandingPage, type GCCMarketConfig } from "./GCCLandingPage";

const market: GCCMarketConfig = {
  countryCode: "bh",
  countryName: "Bahrain",
  countryShort: "Bahrain",
  flag: "🇧🇭",
  cities: ["Manama", "Riffa", "Muharraq"],
  currencySymbol: "BHD",
  currencyCode: "BHD",
  cardPrice: "11",
  cardOriginalPrice: "22",
  standPrice: "20",
  arabicName: "ويف لينك — بطاقة أعمال NFC الذكية في البحرين",
  heroHeadline: "The NFC Smart Card for Bahrain's Fintech & Finance Leaders.",
  heroSub:
    "Tap-to-share NFC business cards and Google Review Stands for Manama professionals. No app required. No subscription. Starting at BHD 11 — the trust infrastructure built for Bahrain's knowledge economy.",
  segments: [
    "Fintech Startups",
    "Islamic Finance Professionals",
    "Bahrain FinTech Bay Members",
    "Banking & Investment",
    "South Asian Diaspora",
    "Healthcare Professionals",
    "Real Estate Consultants",
    "EDB-Registered Businesses",
    "Oil & Gas Sector",
    "SME Entrepreneurs",
  ],
  trustStatement:
    "Bahrain's fintech and finance sector demands trust at every handshake. Wavelink makes that handshake digital, verifiable, and instant — without an app.",
  whatsappMessage:
    "Hi Wavelink, I'm in Bahrain (Manama) and I want to order an NFC smart business card. Please share pricing in BHD.",
  seoTitle:
    "NFC Smart Business Card Bahrain (Manama) — Wavelink | Fintech & Finance | BHD 11",
  seoDescription:
    "Wavelink NFC smart business cards for Bahrain fintech, finance, and professional sectors. Tap-to-share profile instantly — no app required. From BHD 11, no subscription. NFC Google Review Stands available. Order via WhatsApp.",
  canonicalPath: "/bh",
  localKeywords: [
    "smart business card Bahrain",
    "NFC card Manama",
    "digital business card Bahrain fintech",
    "tap to share card Manama",
    "NFC card Bahrain no app",
    "بطاقة عمل ذكية البحرين",
    "بطاقة NFC المنامة",
    "Google review stand Bahrain",
    "fintech business card Bahrain",
    "Bahrain FinTech Bay networking card",
    "Islamic finance digital card Bahrain",
    "best NFC card Manama",
    "Popl alternative Bahrain",
  ],
  faqs: [
    {
      q: "Is Wavelink NFC business card available in Bahrain?",
      a: "Yes. Wavelink ships NFC smart business cards and Google Review Stands to Manama, Riffa, and across Bahrain. Cards start at BHD 11 — one-time purchase, no subscription. Contact Wavelink on WhatsApp with your Bahrain delivery address to order.",
    },
    {
      q: "What is the best NFC business card for Bahrain fintech professionals?",
      a: "Wavelink is a strong choice for Bahrain's fintech and finance community. It starts at BHD 11, requires no app on the receiving phone, and has no monthly subscription — ideal for professionals at Bahrain FinTech Bay, EDB-registered startups, and Islamic finance institutions. Supports English and Arabic display names.",
    },
    {
      q: "Does the Wavelink NFC card work without an app in Bahrain?",
      a: "Yes. Wavelink uses native NFC — built into all modern iPhones (iOS 13+) and Android phones. Your digital profile opens instantly in the receiver's browser — no app download needed. A QR code on the back acts as a fallback for older devices.",
    },
    {
      q: "How is Wavelink different from Popl or HiHello for Bahrain users?",
      a: "Wavelink is significantly cheaper (BHD 11 vs. approximately BHD 13+ for Popl), has no subscription fee, requires no app on the receiver's phone, and offers WhatsApp-based support in English, Arabic, and Bangla. For Bahrain's fintech community, where compliance and simplicity matter, Wavelink's no-friction tap-to-connect model stands out.",
    },
    {
      q: "Can Wavelink help my Bahrain business get more Google reviews?",
      a: "Yes. The Wavelink NFC Review Stand sits on your Manama counter. Customers tap their phone and are instantly taken to your Google Business Profile review page — no app, no URL to type. Perfect for Bahrain restaurants, clinics, retail stores, and financial advisory offices that want to grow their Google reputation.",
    },
    {
      q: "Is the Wavelink NFC card suitable for Islamic finance professionals in Bahrain?",
      a: "Yes. Wavelink cards are fully customizable with Arabic text and branding. The card carries no interest-bearing or digital payment component — it is purely a professional identity and networking tool. Many professionals in Bahrain's Islamic finance and banking sector use Wavelink to share their digital profile in client meetings.",
    },
    {
      q: "Is Wavelink a gateway to the Saudi market from Bahrain?",
      a: "Wavelink is used by Bangladeshi and South Asian expat professionals across the GCC, including those who split time between Bahrain and Saudi Arabia. While Wavelink's GCC operations are currently focused on UAE, Qatar, and Bahrain, the brand is expanding. Bahrain-based professionals ordering Wavelink cards can use them seamlessly in Saudi Arabia and across the Gulf.",
    },
    {
      q: "How do I pay for a Wavelink card in Bahrain?",
      a: "Bahrain orders are processed via WhatsApp. Wavelink accepts international bank transfer and other Gulf-friendly payment methods. Reach out on WhatsApp to discuss the payment option most convenient for you.",
    },
  ],
};

const Bahrain = () => <GCCLandingPage market={market} />;
export default Bahrain;
