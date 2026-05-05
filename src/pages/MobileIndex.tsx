import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <header>
        <Navbar lang={lang} />
      </header>

      <main>
        {/* Temporary mobile entry point: this is intentionally minimal and fast. */}
        <HeroSection lang={lang} />

        <section className="px-4 py-10 sm:px-6" aria-label="Mobile quick path">
          <h2 className="text-2xl font-bold tracking-tight">{t.order.title}</h2>
          <p className="mt-2 text-muted-foreground">
            {lang === "en"
              ? "Mobile-first checkout and content blocks are loading in the next optimization pass."
              : "মোবাইল-ফার্স্ট চেকআউট ও কনটেন্ট ব্লক পরবর্তী অপ্টিমাইজেশন পাসে যুক্ত হবে।"}
          </p>
          <a
            href="#order"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {lang === "en" ? "Continue to order" : "অর্ডারে এগিয়ে যান"}
          </a>
        </section>
      </main>
    </div>
  );
};

export default MobileIndex;
