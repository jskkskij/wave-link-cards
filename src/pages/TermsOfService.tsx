import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingBag, CreditCard, RotateCcw, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: ShoppingBag,
      title: "Ordering & Payment",
      content: "Orders are confirmed upon receipt of 50% advance payment via Bkash. The remaining balance is due upon order completion. All prices are in BDT (৳) and are subject to change without prior notice."
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: "Delivery times vary based on customization requirements. Standard delivery is 7-14 business days after order confirmation. We will provide tracking information once your order is ready for shipment."
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      content: "Due to the customized nature of our products, returns are only accepted for manufacturing defects. Refunds are processed within 14 business days. The 6-month warranty covers software-related issues with proof of purchase."
    },
    {
      icon: CreditCard,
      title: "Warranty",
      content: "All Wavelink cards come with a 6-month warranty covering software-related issues. Physical damage, loss, or misuse is not covered. Warranty claims require proof of purchase and must be reported via our official WhatsApp number."
    },
    {
      icon: Shield,
      title: "Security & Bots",
      content: "To protect our services, we use Cloudflare Turnstile for bot detection on our forms. By using our site, you agree to the processing of device-level data by Cloudflare as necessary for security verification."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background pb-20">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-serif">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground uppercase tracking-widest font-medium">
            Effective: Jan 2025 | Version 1.2
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              By placing an order with Wavelink Bangladesh, you agree to these Terms of Service.
              These terms govern your purchase of NFC smart business cards and your use of our digital profile services.
              All data handling is performed in accordance with our
              <a href="/privacy-policy" className="text-primary hover:underline ml-1">Transparency Report</a>.
            </p>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="p-8 border-2 border-border/50 hover:border-primary/20 hover:shadow-luxury transition-all duration-500 bg-card/40 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{section.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{section.content}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Terms */}
        <Card className="mb-8 p-10 border-2 border-primary/20 shadow-luxury bg-card/60 backdrop-blur-md">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-3xl font-serif">Governance</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Customization Logic
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Designs are finalized via WhatsApp. Once printing begins, modifications are subject to reprint fees.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Digital Sovereignty
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  We provide free lifetime updates for card content. We do not sell user data to third-party advertisers.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-center text-muted-foreground">
                For dispute resolution or inquiries, contact our Legal Desk via WhatsApp:{" "}
                <a href="https://wa.me/8801410809023" className="text-primary font-bold hover:underline">+8801410809023</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="rounded-full px-12 py-6 text-lg hover:bg-primary/5 border border-primary/10 transition-all font-serif"
          >
            ← Personal Connection Over Digital Terms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

