import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { initSecurityMonitoring } from "@/lib/security-monitor";
import { initAnalytics } from "@/lib/analytics";
import { HelmetProvider } from "react-helmet-async";

// Lazy load components
const UnifiedConsent = lazy(() => import("./components/UnifiedConsent"));
const Schema = lazy(() => import("@/components/Schema"));
const AnalyticsDashboard = lazy(() => import("@/components/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));
const FeaturePulse = lazy(() => import("@/components/FeaturePulse").then(m => ({ default: m.FeaturePulse })));
const SpecialOfferPopup = lazy(() => import("@/components/SpecialOfferPopup"));

// Lazy load pages for performance
const ThankYou = lazy(() => import("./pages/ThankYou"));
const CompanyProfile = lazy(() => import("./pages/CompanyProfile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DataProcessingAgreement = lazy(() => import("./pages/DataProcessingAgreement"));
const Investors = lazy(() => import("./pages/Investors"));
const InvestorDeck = lazy(() => import("./pages/InvestorDeck"));
const IntelligenceReport = lazy(() => import("./pages/IntelligenceReport"));
const Shop = lazy(() => import("./pages/Shop"));
const MobileIndex = lazy(() => import("./pages/MobileIndex"));
const AnalyticsPage = lazy(() => import("@/components/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));
const UAE = lazy(() => import("./pages/UAE"));
const Qatar = lazy(() => import("./pages/Qatar"));
const Bahrain = lazy(() => import("./pages/Bahrain"));
const ImpactIndex = lazy(() => import("./pages/ImpactIndex"));
const GCCBanner = lazy(() => import("./components/GCCBanner"));

const queryClient = new QueryClient();

// Loading fallback for routes
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center" aria-label="Loading page">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

const App = () => {
  const isMobileRoute =
    typeof window !== "undefined" && window.location.pathname.startsWith("/m");

  // Initialize security monitoring + behavioral analytics on app startup
  useEffect(() => {
    if (isMobileRoute) return;
    initSecurityMonitoring();
    // Defer analytics slightly to not block LCP
    const analyticsTimer = setTimeout(() => initAnalytics(), 1000);
    return () => clearTimeout(analyticsTimer);
  }, [isMobileRoute]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {!isMobileRoute && <Toaster />}
          {!isMobileRoute && <Sonner />}
          <BrowserRouter>
            <Suspense fallback={null}>
              <Schema />
            </Suspense>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/m"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <MobileIndex />
                  </Suspense>
                }
              />
              <Route
                path="/thank-you"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <ThankYou />
                  </Suspense>
                }
              />
              <Route
                path="/company-profile"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <CompanyProfile />
                  </Suspense>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <PrivacyPolicy />
                  </Suspense>
                }
              />
              <Route
                path="/terms-of-service"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <TermsOfService />
                  </Suspense>
                }
              />
              <Route
                path="/dpa"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <DataProcessingAgreement />
                  </Suspense>
                }
              />
              <Route
                path="/investors"
                element={<Navigate to="/investor-deck" replace />}
              />
              <Route
                path="/investor-deck"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <InvestorDeck />
                  </Suspense>
                }
              />
              <Route
                path="/drops/bangladesh-2035"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <IntelligenceReport />
                  </Suspense>
                }
              />
              <Route
                path="/shop"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Shop />
                  </Suspense>
                }
              />
              {/* GCC Market Landing Pages */}
              <Route
                path="/ae"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <UAE />
                  </Suspense>
                }
              />
              <Route
                path="/qa"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Qatar />
                  </Suspense>
                }
              />
              <Route
                path="/bh"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Bahrain />
                  </Suspense>
                }
              />
              <Route
                path="/impact"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <ImpactIndex />
                  </Suspense>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {!isMobileRoute && (
              <Suspense fallback={null}>
                <GCCBanner />
                <UnifiedConsent />
                <SpecialOfferPopup />
              </Suspense>
            )}
            {!isMobileRoute && (
              <Suspense fallback={null}>
                <AnalyticsDashboard />
                <FeaturePulse />
              </Suspense>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
