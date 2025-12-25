import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Lock, Users, Clock, TrendingUp, Zap, ArrowRight, Truck, Info, Building2 } from "lucide-react";
import InteractiveCardDisplay from "./InteractiveCardDisplay";
import { useState, useEffect } from "react";

const PricingSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [ordersToday, setOrdersToday] = useState(47); // Simulated live counter
  const [region, setRegion] = useState("BD"); // "BD", "USA", "CA"

  const pricingData = {
    BD: { symbol: "৳", original: "1,299", current: "599", currencyCode: "BDT", deposit: "300", shipping: "Free", tax: "Inclusive" },
    USA: { symbol: "$", original: "19.99", current: "9.99", currencyCode: "USD", deposit: "5", shipping: "$4.99", tax: "Excl. local taxes" },
    CA: { symbol: "$", original: "24.99", current: "14.99", currencyCode: "CAD", deposit: "7", shipping: "$6.50", tax: "Duty-inclusive (from China)" }
  };

  const currentPricing = pricingData[region as keyof typeof pricingData];

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    // Simulate orders counter (updates every 30 seconds)
    const orderTimer = setInterval(() => {
      setOrdersToday((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(orderTimer);
    };
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden" id="pricing">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Join 500+ Professionals</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-serif">
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
            <Card className="relative p-8 border-2 border-primary/40 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up overflow-visible">
              {/* Urgency Banner - Top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full shadow-luxury-glow flex items-center gap-2 animate-pulse">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    Offer Ends In: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Social Proof - Live Counter */}
              <div className="flex flex-col items-center gap-4 mb-6 pt-4">
                {/* Region Switcher */}
                <div className="flex bg-secondary/20 p-1 rounded-full border border-primary/20">
                  {["BD", "USA", "CA"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${region === r
                        ? "bg-primary text-white shadow-lg"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                    >
                      {r === "BD" ? "Bangladesh" : r === "USA" ? "USA" : "Canada"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{ordersToday}+</span>
                  <span>ordered today in {region === "BD" ? "Bangladesh" : "North America"}</span>
                </div>
              </div>

              {/* Price with Value Anchoring */}
              <div className="text-center mb-6">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">
                      {currentPricing.symbol}{currentPricing.original}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">Save 54%</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl md:text-8xl font-bold text-primary">
                      {currentPricing.symbol}{currentPricing.current}
                    </span>
                    <span className="text-xl text-muted-foreground">{currentPricing.currencyCode}</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
                    <p className="text-xs font-semibold text-primary/80 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Delivery: {currentPricing.shipping}
                    </p>
                    <p className="text-xs font-semibold text-mist/60 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {currentPricing.tax}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">One-time payment • No hidden fees</p>
                </div>
              </div>

              {/* Benefit-Focused Features */}
              <div className="space-y-3 mb-6">
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
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-card-foreground font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Scarcity Indicator */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-orange-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">Only 12 cards left at this price today!</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <ShieldCheck className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-green-700">6-Month Warranty</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <Lock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-blue-700">GDPR Protected</p>
                </div>
              </div>

              {/* Risk Reversal & Institutional Support */}
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 text-center">
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
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center group">
                    <p className="text-sm font-bold text-foreground mb-1 flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Institutional Support Available
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">For bulk orders & corporate solutions in Canada</p>
                    <a
                      href="mailto:waavelink@gmail.com"
                      className="text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1"
                    >
                      Contact Us <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>

              {/* MEGA CTA Button - Conversion Focus */}
              <Button
                onClick={scrollToOrder}
                className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary text-white hover:from-primary/90 hover:via-primary hover:to-primary/90 text-xl font-bold py-7 rounded-full shadow-luxury-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-2 relative overflow-hidden group animate-pulse-glow"
                aria-label="Order your Wavelink card now"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Your Card Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

