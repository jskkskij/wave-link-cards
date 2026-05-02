import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Lock, Users, Clock, TrendingUp, Zap, ArrowRight, Info, Building2 } from "lucide-react";
import InteractiveCardDisplay from "./InteractiveCardDisplay";
import { useState, useEffect } from "react";
import { CONFIG } from "@/lib/config";

const PricingSection = () => {
  const [ordersToday, setOrdersToday] = useState(47); // Simulated live counter
  const [region, setRegion] = useState("BD"); // "BD", "USA", "CA"

  const pricingData = {
    BD: { symbol: "৳", original: "1,299", current: "599", currencyCode: "BDT", deposit: "300", shipping: "Free", tax: "Inclusive" },
    USA: { symbol: "$", original: "19.99", current: "9.99", currencyCode: "USD", deposit: "5", shipping: "$4.99", tax: "Excl. local taxes" },
    CA: { symbol: "$", original: "24.99", current: "14.99", currencyCode: "CAD", deposit: "7", shipping: "$6.50", tax: "Duty-inclusive (from China)" }
  };

  const currentPricing = pricingData[region as keyof typeof pricingData];

  useEffect(() => {

    // Simulate orders counter (updates every 30 seconds)
    const orderTimer = setInterval(() => {
      setOrdersToday((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(orderTimer);
    };
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 lg:py-32 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden" id="pricing">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4 border border-accent/20">
            <TrendingUp className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-accent">Join 500+ Professionals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 font-serif">
            Simple, Affordable Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your smart card at an unbeatable price. Limited time offer.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Interactive Card Display */}
          <div className="order-1 md:order-1">
            <InteractiveCardDisplay className="mb-8" />
          </div>

          {/* Pricing Card - Conversion Optimized */}
          <div className="order-2 md:order-2">
            <Card className="relative p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-accent/40 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up overflow-visible">
              {/* Social Proof - Live Counter */}
              <div className="flex flex-col items-center gap-4 mb-6 pt-4">
                {/* Region Switcher */}
                <div className="flex bg-secondary/20 p-1 rounded-full border border-accent/20" role="group" aria-label="Region selection">
                  {["BD", "USA", "CA"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      aria-current={region === r ? "true" : "false"}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${region === r
                        ? "bg-accent text-navy shadow-lg"
                        : "text-muted-foreground hover:text-accent"
                        }`}
                    >
                      {r === "BD" ? "Bangladesh" : r === "USA" ? "USA" : "Canada"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Users className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span className="font-semibold text-accent">{ordersToday}+</span>
                  <span>ordered today in {region === "BD" ? "Bangladesh" : "North America"}</span>
                </div>
              </div>

              {/* Price with Value Anchoring */}
              <div className="text-center mb-6">
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl sm:text-6xl md:text-8xl font-bold text-navy">
                      {currentPricing.symbol}{currentPricing.current}
                    </span>
                    <span className="text-lg sm:text-xl text-muted-foreground">{currentPricing.currencyCode}</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
                    <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Info className="w-3 h-3" aria-hidden="true" />
                      {currentPricing.tax}
                    </p>
                    <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-green-600" aria-hidden="true" />
                      {currentPricing.shipping === "Free" ? "FREE Express Shipping" : `Shipping: ${currentPricing.symbol}${currentPricing.shipping}`}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                    100% Money-Back Guarantee • No Hidden Fees
                  </p>
                </div>
              </div>

              {/* Benefit-Focused Features */}
              <div className="space-y-3 mb-6" role="list" aria-label="Product features">
                {[
                  { text: "Customizable design", icon: Zap },
                  { text: "NFC technology - Tap & share instantly", icon: Zap },
                  { text: "Waterproof & durable - Lifetime quality", icon: Zap },
                  { text: "Smart web interface - Update anytime", icon: Zap },
                  { text: "Free lifetime updates - No extra cost", icon: Zap },
                  { text: "6-Month warranty - Risk-free", icon: ShieldCheck },
                  { text: "GDPR protected - Your data is safe", icon: Lock }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 group" role="listitem">
                      <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg border border-white/10">
                        <Icon className="w-4 h-4 text-accent filter drop-shadow-sm" aria-hidden="true" />
                      </div>
                      <span className="text-card-foreground font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Scarcity Indicator */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6" role="alert">
                <div className="flex items-center gap-2 text-orange-800">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-semibold">Only 12 cards left at this price today!</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <ShieldCheck className="w-5 h-5 text-green-700 mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xs font-semibold text-green-800">6-Month Warranty</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <Lock className="w-5 h-5 text-blue-700 mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xs font-semibold text-blue-800">GDPR Protected</p>
                </div>
              </div>

              {/* Risk Reversal & Institutional Support */}
              <div className="space-y-4 mb-6">
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    💰 {region === "BD" ? "Start with 50% down" : "International Shipping Available"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {region === "BD"
                      ? `Pay only ${currentPricing.symbol}${currentPricing.deposit} now, rest on delivery`
                      : `Secure checkout for ${currentPricing.currencyCode}`}
                  </p>
                </div>

                {region === "CA" && (
                  <div className="bg-navy/5 border border-navy/20 rounded-lg p-4 text-center group">
                    <p className="text-sm font-bold text-foreground mb-1 flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4 text-accent" aria-hidden="true" />
                      Institutional Support Available
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">For bulk orders & corporate solutions in Canada</p>
                    <a
                      href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
                      className="text-xs font-bold text-navy hover:underline flex items-center justify-center gap-1"
                    >
                      Contact Us <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>

              {/* MEGA CTA Button - Conversion Focus */}
              <Button
                onClick={scrollToOrder}
                className="w-full bg-accent text-navy hover:bg-accent/90 text-xl font-bold py-7 rounded-full shadow-[0_0_40px_rgba(75,207,181,0.4)] transition-all duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-accent/50 focus-visible:ring-offset-2 relative overflow-hidden group animate-pulse-glow"
                aria-label="Order your Wavelink card now"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></span>

                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Your Card Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </Button>

              {/* Trust Signals Below Button */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Fast Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Money-Back Guarantee
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

