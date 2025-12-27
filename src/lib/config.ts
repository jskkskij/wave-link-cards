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
};
