import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { initSecurityMonitoring } from "@/lib/security-monitor";
import { initAnalytics } from "@/lib/analytics";
import { HelmetProvider } from "react-helmet-async";

// Lazy load components
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const AgeVerification = lazy(() => import("./components/AgeVerification").then(m => ({ default: m.AgeVerification })));
const Schema = lazy(() => import("@/components/Schema"));
const AnalyticsDashboard = lazy(() => import("@/components/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));
const FeaturePulse = lazy(() => import("@/components/FeaturePulse").then(m => ({ default: m.FeaturePulse })));

// Lazy load pages for performance
const ThankYou = lazy(() => import("./pages/ThankYou"));
const CompanyProfile = lazy(() => import("./pages/CompanyProfile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DataProcessingAgreement = lazy(() => import("./pages/DataProcessingAgreement"));
const Investors = lazy(() => import("./pages/Investors"));
const InvestorDeck = lazy(() => import("./pages/InvestorDeck"));
const AnalyticsPage = lazy(() => import("@/components/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));

const queryClient = new QueryClient();

// Loading fallback for routes
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center" aria-label="Loading page">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

const App = () => {
  // Initialize security monitoring + behavioral analytics on app startup
  useEffect(() => {
    initSecurityMonitoring();
    // Defer analytics slightly to not block LCP
    setTimeout(() => initAnalytics(), 1000);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={null}>
              <Schema />
            </Suspense>
            <Routes>
              <Route path="/" element={<Index />} />
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
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Investors />
                  </Suspense>
                }
              />
              <Route
                path="/investor-deck"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <InvestorDeck />
                  </Suspense>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Suspense fallback={null}>
              <CookieConsent />
              <AgeVerification />
            </Suspense>
            {/* Global persistent UI — analytics dashboard (Shift+Alt+D) + feature pulse */}
            <Suspense fallback={null}>
              <AnalyticsDashboard />
              <FeaturePulse />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
