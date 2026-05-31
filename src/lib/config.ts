/**
 * Centralized configuration for the application.
 * Using environment variables ensures security and ease of updates.
 */
const waRaw = import.meta.env.VITE_WHATSAPP_NUMBER || "8801410809023";
const waDigits = String(waRaw).replace(/\D/g, "");

export const CONFIG = {
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || "",
  WHATSAPP_NUMBER: waRaw,
  /** E.164 customer line (from WhatsApp business number). Replace with GBP phone when they match. */
  SUPPORT_PHONE_E164: waDigits ? `+${waDigits}` : "+8801410809023",
  SITE_CANONICAL_ORIGIN: "https://getwaved.ai",
  SITE_CANONICAL_URL: "https://getwaved.ai/",
  OG_IMAGE_URL: "https://getwaved.ai/assets/og-card.webp",
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || "official@getwaved.ai",
  TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY || "",
  LEAD_SCRIPT_URL: import.meta.env.VITE_LEAD_SCRIPT_URL || "",
  WHATSAPP_LINK: (message: string) =>
    `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "8801410809023"}?text=${message}`,
  FACEBOOK_LINK: "https://www.facebook.com/profile.php?id=61582857699324",
  INSTAGRAM_LINK: "https://www.instagram.com/__wave_link__/",
  TIKTOK_LINK: "https://www.tiktok.com/@wavelinkd",
  LINKEDIN_COMPANY: "https://www.linkedin.com/company/wavelink-tech",
  GOOGLE_REVIEW_LINK: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
  schemaSameAs: (): string[] => [
    CONFIG.FACEBOOK_LINK,
    CONFIG.INSTAGRAM_LINK,
    CONFIG.TIKTOK_LINK,
    CONFIG.LINKEDIN_COMPANY,
    "https://www.facebook.com/getwaved",
  ],
  MILESTONES: {
    cards: {
      current: 1350, // 45% of 3000
      target: 3000,
      label: "Cards Deployed"
    },
    reviews: {
      current: 450, // 15% of 3000 (just an example for the second bar in image)
      target: 3000,
      label: "Digital Review Stands"
    }
  }
};
