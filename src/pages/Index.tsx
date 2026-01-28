import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TopConnectBar from "@/components/TopConnectBar";

// Lazy load below-the-fold sections for performance optimization
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DemoVideoSection = lazy(() => import("@/components/DemoVideoSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const OrderSection = lazy(() => import("@/components/OrderSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const AdSenseBanner = lazy(() => import("@/components/AdSenseBanner")); // Lazy load AdSense
const AffiliateSection = lazy(() => import("@/components/AffiliateSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ReviewStandsSection = lazy(() => import("@/components/ReviewStandsSection"));
const Footer = lazy(() => import("@/components/Footer"));
const LiveReviewFeed = lazy(() => import("@/components/LiveReviewFeed"));

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
            <LiveReviewFeed />
          </Suspense>
          {/* Grouped to reduce excessive spacing */}
          <div className="space-y-0">
            <Suspense fallback={<SectionLoader />}>
              <FeaturesSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ReviewStandsSection />
            </Suspense>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <OrderSection />
          </Suspense>
          {/* Grouped to reduce excessive spacing caused by global space-y */}
          <div className="space-y-0">
            <Suspense fallback={<SectionLoader />}>
              <ReviewsSection />
            </Suspense>

            {/* Google AdSense Banner - Discrete Placement */}
            <Suspense fallback={null}>
              <AdSenseBanner />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <AffiliateSection />
            </Suspense>
          </div>
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
