import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Lazy load pages for performance
const ThankYou = lazy(() => import("./pages/ThankYou"));
const CompanyProfile = lazy(() => import("./pages/CompanyProfile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient();

// Loading fallback for routes
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center" aria-label="Loading page">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
