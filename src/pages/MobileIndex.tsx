import { Language, translations } from "@/lib/translations";
import { useEffect, useMemo, useState } from "react";

const MobileIndex = () => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "bn") setLang("bn");
  }, []);

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="font-semibold tracking-tight">
            Wavelink
          </a>
          <a
            href="/?view=desktop"
            className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
            aria-label={lang === "en" ? "View desktop site" : "ডেস্কটপ সাইট দেখুন"}
          >
            {lang === "en" ? "Desktop site" : "ডেস্কটপ সাইট"}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl">
        <section className="px-4 pb-10 pt-8 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            {lang === "en" ? "Mobile Experience" : "মোবাইল এক্সপেরিয়েন্স"}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {lang === "en"
              ? "One tap. Real business results."
              : "এক ট্যাপ। বাস্তব ব্যবসায়িক ফলাফল।"}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            {lang === "en"
              ? "Built for speed on mobile: quick loading, focused content, and fast path to order your NFC card."
              : "মোবাইলে দ্রুত লোডিং, ফোকাসড কনটেন্ট এবং এনএফসি কার্ড অর্ডারের দ্রুত পথ।"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {lang === "en" ? "Get your card" : "কার্ড নিন"}
            </a>
            <a
              href="/?view=desktop"
              className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold"
            >
              {lang === "en" ? "See full desktop site" : "পূর্ণ ডেস্কটপ সাইট দেখুন"}
            </a>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6" aria-label="Mobile value points">
          <h2 className="text-xl font-bold tracking-tight">
            {lang === "en" ? "Why mobile customers convert faster" : "কেন মোবাইল কাস্টমার দ্রুত কনভার্ট করে"}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>{lang === "en" ? "Fast page loads with reduced scripts" : "কম স্ক্রিপ্টে দ্রুত পেজ লোড"}</li>
            <li>{lang === "en" ? "Single primary call to action" : "একটি প্রধান কল-টু-অ্যাকশন"}</li>
            <li>{lang === "en" ? "No heavy visual effects on mobile" : "মোবাইলে হেভি ভিজ্যুয়াল ইফেক্ট নেই"}</li>
          </ul>
        </section>

        <section id="order" className="px-4 py-10 sm:px-6" aria-label="Mobile quick path">
          <h2 className="text-2xl font-bold tracking-tight">{t.order.title}</h2>
          <p className="mt-2 text-muted-foreground">
            {lang === "en"
              ? "Tap below to complete your order on the main checkout flow."
              : "নিচে ট্যাপ করে মূল চেকআউট ফ্লোতে অর্ডার সম্পন্ন করুন।"}
          </p>
          <a
            href="/#order"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {lang === "en" ? "Open checkout" : "চেকআউট খুলুন"}
          </a>
        </section>
      </main>
    </div>
  );
};

export default MobileIndex;
