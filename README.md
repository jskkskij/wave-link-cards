# Wavelink Bangladesh - Digital Presence Platform

A premium, secure, and privacy-compliant web platform for NFC-powered smart business cards. Designed with a "Zen Luxury" aesthetic, focusing on performance, security hardening, and international privacy standards.

## 🛠 Technical Stack

### Core Architecture
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/) for ultra-fast builds and HMR.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type-safety and auditability.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom "Luxury Glow" design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid, performance-optimized micro-interactions.
- **Backend Services**: [Supabase](https://supabase.com/) (PostgreSQL/Auth) and [Google Apps Script](https://developers.google.com/apps-script) for order processing.

### Performance & Observability
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/speed-insights).
- **SEO/AEO**: Automated [Sitemap](file:///public/sitemap.xml) generation and JSON-LD Structured Data (Organization, Product, FAQ).
- **Metadata**: Verified via Google Search Console. 

---

## 📈 Audit Controls & Logging

Access and integrity are monitored through:
- **Build Logs**: GitHub Actions logs for every deployment (using modern `$GITHUB_STATE` and `$GITHUB_OUTPUT` syntax).
- **Runtime Insights**: Vercel Speed Insights and Analytics for performance and availability monitoring.
- **Form Integrity**: Submission tokens validated via Cloudflare Turnstile API.

---

## 🤖 AI-Ready Infrastructure

The platform implements the latest standards for AI model visibility and indexing:
- **LLM Context**: [llms.txt](file:///public/llms.txt) provided for structured site summaries.
- **AI Discovery**: Meta-links and `robots.txt` registration for LLM crawlers.
- **AEO**: Schema.org JSON-LD structured data for better representation in AI-powered search engines.

## 🛡 Security Architecture

The platform is hardened to protect both user data and system integrity:

### 1. Content Security Policy (CSP)
Strict CSP implemented via meta tags to prevent XSS and unauthorized data injection:
- `script-src`: Restrained to self, Google Analytics, and Cloudflare challenges.
- `frame-src`: Locked to YouTube (Demo), Google Drive, and Cloudflare challenges.
- `connect-src`: Limited to Supabase, Google Scripts, and Vercel services.

### 2. Bot Protection (Anti-Spam)
- **Cloudflare Turnstile**: Integrated across the Order and Review flows to prevent automated bot attacks while maintaining a frictionless user experience.

### 3. Data Integrity
- **Environment Management**: All sensitive endpoint URLs (Supabase, Google Scripts, WhatsApp numbers) are externalized into environment variables (`.env`).
- **Encrypted Transfers**: All payment redirections are handled via secure WhatsApp parameters to ensure no financial data is stored on-platform.

---

## ⚖️ Privacy & Compliance (Audit Ready)

Wavelink adheres to the "Gold Standard" of international data privacy laws:

### 🇪🇺 GDPR Compliance (Europe)
- **Transparency Report**: Detailed [Privacy Policy](file:///src/pages/PrivacyPolicy.tsx) explicitly listing all **8 GDPR Rights** (including Erasure and Portability).
- **Sub-Processor Transparency**: Clear disclosure of data handling by Vercel, Supabase, and Google.
- **Lawful Basis**: Defined processing under Contractual Necessity and Legitimate Interest (GDPR Art. 6).

### 🇨🇦 PIPEDA & Law 25 (Canada/Quebec)
- **Privacy by Default**: Cookie consent is requested before any analytical scripts are fired.
- **Explicit Rejection**: Users can opt-out of non-essential cookies via a custom [Cookie Consent](file:///src/components/CookieConsent.tsx) mechanism.
- **DPO Accountability**: Designated Data Protection Officer (Abir Abbas) with direct contact channels for data inquiries.

---

## 🚀 Deployment & Development

### Local Setup
1. Clone the repository.
2. Create a `.env` file based on the provided configuration.
3. Run `npm install`.
4. Run `npm run dev`.

### Production Audit
For security audits, please review:
- `index.html`: For CSP and SEO headers.
- `src/lib/config.ts`: For centralized endpoint management.
- `src/pages/PrivacyPolicy.tsx`: For legal alignment documentation.
