import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Shield,
      title: "Data Collection",
      content: "We collect only the information necessary to provide our services, including contact details, order information, and payment data. All data is collected with your explicit consent."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "Your data is encrypted and stored securely using industry-standard security measures. We implement GDPR-compliant practices to protect your personal information from unauthorized access, disclosure, or misuse."
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: "We use your data solely to process orders, provide customer support, and improve our services. We do not sell, rent, or share your personal information with third parties for marketing purposes."
    },
    {
      icon: FileCheck,
      title: "Your Rights",
      content: "Under GDPR, you have the right to access, rectify, delete, or restrict processing of your personal data. You can also request data portability or object to processing. Contact us via WhatsApp to exercise these rights."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-serif">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last Updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              At Wavelink, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, store, and protect your data in compliance with the General Data 
              Protection Regulation (GDPR) and other applicable privacy laws.
            </p>
          </CardContent>
        </Card>

        {/* Policy Sections */}
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

        {/* Additional Information */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, 
              please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-foreground">
                <strong>WhatsApp:</strong> <a href="https://wa.me/8801410809023" className="text-primary hover:underline">+8801410809023</a>
              </p>
              <p className="text-foreground">
                <strong>Email:</strong> Contact us via WhatsApp for email support
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

export default PrivacyPolicy;

