/**
 * Centralized configuration for the application.
 * Using environment variables ensures security and ease of updates.
 */
export const CONFIG = {
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || "",
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || "8801410809023",
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || "waavelink@gmail.com",
  TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY || "",
  WHATSAPP_LINK: (message: string) =>
    `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "8801410809023"}?text=${message}`,
  FACEBOOK_LINK: "https://www.facebook.com/profile.php?id=61582857699324",
  INSTAGRAM_LINK: "https://www.instagram.com/__wave_link__/",
  TIKTOK_LINK: "https://www.tiktok.com/@mohammadabir68",
  GOOGLE_REVIEW_LINK: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
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
