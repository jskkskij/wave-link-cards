import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingBag, CreditCard, RotateCcw, Truck } from "lucide-react";
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-serif">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last Updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              By placing an order with Wavelink, you agree to these Terms of Service. Please read them carefully. 
              These terms govern your purchase and use of our NFC smart business cards and related services.
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
                className="p-6 border-2 border-border hover:shadow-luxury transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-serif">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Terms */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Additional Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Customization</h4>
              <p className="text-muted-foreground">
                All designs are customizable. We'll guide you through the design process via WhatsApp. 
                Once approved, changes may incur additional fees.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Updates</h4>
              <p className="text-muted-foreground">
                Free lifetime updates are available for your card's digital content. Contact us via WhatsApp 
                to request updates to your contact information, social media links, or portfolio.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contact</h4>
              <p className="text-muted-foreground">
                For questions about these terms, contact us via WhatsApp:{" "}
                <a href="https://wa.me/8801410809023" className="text-primary hover:underline">+8801410809023</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="rounded-full px-8"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

