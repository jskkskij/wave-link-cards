import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileCheck, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Shield,
      title: "Data Collection & Consent",
      content: "In accordance with PIPEDA and GDPR, we collect only necessary information such as contact details and order information. We obtain your explicit consent before collecting, using, or disclosing any personal data."
    },
    {
      icon: Lock,
      title: "Security Safeguards",
      content: "We protect your personal information with security safeguards appropriate to the sensitivity of the information. This includes encryption and secure storage to prevent unauthorized access or disclosure."
    },
    {
      icon: Eye,
      title: "Limited Use & Disclosure",
      content: "We use your data solely for the purposes identified at the time of collection (e.g., order fulfillment). We do not sell or share your personal information with third parties for marketing purposes."
    },
    {
      icon: FileCheck,
      title: "Access & Accountability",
      content: "You have the right to access your personal information and challenge its accuracy. We are accountable for the data we collect and have designated a Privacy Officer to oversee our compliance."
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
            Compliance: PIPEDA & GDPR | Last Updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              At Wavelink, we are committed to protecting your privacy in compliance with Canada's <strong>Personal Information Protection
                and Electronic Documents Act (PIPEDA)</strong> and the <strong>General Data Protection Regulation (GDPR)</strong>.
              This policy outlines our commitment to transparency, security, and your personal data rights.
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

        {/* Accountability / Privacy Officer */}
        <Card className="mb-8 p-8 border-primary/30 border-2 shadow-luxury bg-[#0099ff]/5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UserCircle className="w-24 h-24 text-primary" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-serif flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-primary" />
              Privacy Officer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              In compliance with PIPEDA, we have designated a Privacy Officer to ensure your data is handled with the
              highest level of accountability.
            </p>
            <div className="bg-white/50 p-4 rounded-xl border border-primary/10">
              <p className="text-foreground"><strong>Officer:</strong> Abir Abbas</p>
              <p className="text-foreground"><strong>Contact:</strong> <a href="mailto:waavelink@gmail.com" className="text-primary hover:underline">waavelink@gmail.com</a></p>
              <p className="text-foreground"><strong>WhatsApp:</strong> <a href="https://wa.me/8801410809023" className="text-primary hover:underline">+8801410809023</a></p>
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

