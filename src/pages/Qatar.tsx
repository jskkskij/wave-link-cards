import { GCCLandingPage, type GCCMarketConfig } from "./GCCLandingPage";

const market: GCCMarketConfig = {
  countryCode: "qa",
  countryName: "Qatar",
  countryShort: "Qatar",
  flag: "🇶🇦",
  cities: ["Doha", "Lusail", "Al Wakrah"],
  currencySymbol: "QAR",
  currencyCode: "QAR",
  cardPrice: "27",
  cardOriginalPrice: "54",
  standPrice: "55",
  arabicName: "ويف لينك — بطاقة أعمال NFC الذكية في قطر",
  heroHeadline: "The NFC Business Card Built for Doha's Global Professionals.",
  heroSub:
    "Tap-to-share NFC smart cards and Google Review Stands for Qatar professionals. No app needed on either phone. No monthly fee. Starting at QAR 27 — delivered to Doha, Lusail & beyond.",
  segments: [
    "Oil & Gas Executives",
    "Construction Professionals",
    "Hospitality & Tourism",
    "South Asian Expats",
    "FIFA Legacy Venue Businesses",
    "Lusail Smart City Entrepreneurs",
    "Healthcare Professionals",
    "Corporate Consultants",
    "Finance & Banking",
    "SME Owners",
  ],
  trustStatement:
    "Qatar is home to 88% expats. Wavelink bridges cultures with a card that works without an app, in English and Arabic, the moment you tap.",
  whatsappMessage:
    "Hi Wavelink, I'm in Qatar (Doha) and I want to order an NFC smart business card. Please share pricing in QAR.",
  seoTitle:
    "NFC Smart Business Card Qatar (Doha) — Wavelink | No App, No Subscription | QAR 27",
  seoDescription:
    "Wavelink NFC smart business cards for professionals in Doha, Lusail, and Qatar. Tap-to-share your profile instantly — no app required on either phone. From QAR 27, no monthly fee. NFC Google Review Stands available. Order via WhatsApp.",
  canonicalPath: "/qa",
  localKeywords: [
    "smart business card Doha",
    "NFC card Qatar no subscription",
    "digital business card Qatar",
    "tap to share card Doha",
    "NFC card expat Qatar",
    "بطاقة عمل ذكية الدوحة",
    "بطاقة NFC قطر",
    "Google review stand Qatar",
    "NFC card Lusail",
    "best digital business card Doha",
    "Popl alternative Qatar",
    "networking card Doha professional",
  ],
  faqs: [
    {
      q: "Is Wavelink NFC business card available in Qatar?",
      a: "Yes. Wavelink ships NFC smart business cards and Google Review Stands to Doha, Lusail, and across Qatar. Cards start at QAR 27 — one-time purchase, no subscription. Contact Wavelink on WhatsApp with your Qatar delivery address to order.",
    },
    {
      q: "What is the best NFC business card for professionals in Doha?",
      a: "Wavelink is a leading NFC smart card brand for Doha professionals. Starting at QAR 27 with no monthly fee, it requires no app on the receiving phone. Popular among Qatar's oil & gas executives, hospitality sector, and South Asian expat professionals. Supports English and Arabic display.",
    },
    {
      q: "Does the Wavelink NFC card work without an app in Qatar?",
      a: "Yes. Wavelink uses native NFC technology — any modern iPhone (iOS 13+) or Android phone. The person tapping your card needs zero app installs. Your professional profile opens directly in their browser. A QR code on the back serves as a fallback for older phones.",
    },
    {
      q: "How does Wavelink help Qatar restaurants and businesses get more Google reviews?",
      a: "The Wavelink NFC Review Stand sits on your counter in Doha or Lusail. When a customer taps their phone on the stand, it instantly opens your Google Business Profile review page — no app, no QR code to scan. This is the most effective way for Qatar restaurants, cafes, clinics, and retail businesses to collect high-intent Google reviews.",
    },
    {
      q: "Can I get a Wavelink NFC card with Arabic text in Qatar?",
      a: "Yes. Wavelink cards can be fully customized with Arabic text and name (ويف لينك). Cards are designed to suit Qatar's bilingual Arabic-English professional environment. Contact Wavelink on WhatsApp to discuss your Arabic card design.",
    },
    {
      q: "How does Wavelink compare to Popl for Qatar users?",
      a: "Wavelink starts at QAR 27 vs. Popl's USD 35+ (approximately QAR 128). Wavelink requires no app on the receiver's phone — Popl recommends the receiver install an app for the best experience. Wavelink also offers no subscription fee (Popl Pro is subscription-based), WhatsApp support, and Arabic language options.",
    },
    {
      q: "What payment methods are available for Qatar orders?",
      a: "Qatar orders are managed via WhatsApp. Wavelink accepts international bank transfer and Gulf-friendly payment methods. Contact us on WhatsApp to discuss the option most convenient for you in Qatar.",
    },
  ],
};

const Qatar = () => <GCCLandingPage market={market} />;
export default Qatar;
