import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold sections for performance optimization
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DemoVideoSection = lazy(() => import("@/components/DemoVideoSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const OrderSection = lazy(() => import("@/components/OrderSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const AIVisibilitySection = lazy(() => import("@/components/AIVisibilitySection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center py-20" aria-label="Loading section">
    <div className="w-12 h-12 border-4 border-sky/30 border-t-sky rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading content...</span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-sky/20 selection:text-navy">
      <Navbar />
      <main className="w-full">
        <HeroSection />

        <div className="space-y-20 lg:space-y-32">
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <DemoVideoSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <OrderSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ReviewsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <AIVisibilitySection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
