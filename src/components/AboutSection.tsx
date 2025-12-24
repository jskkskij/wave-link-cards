import { Card } from "@/components/ui/card";
import { Smartphone, Zap, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What is Wavelink?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wavelink helps you share your contact, social, and professional info with a single tap using NFC-powered smart cards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">No App Required</h3>
            <p className="text-muted-foreground">
              Simply tap your Wavelink card on any smartphone. No downloads, no hassle.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Instant Sharing</h3>
            <p className="text-muted-foreground">
              Share all your contact details, social media, and portfolio in one tap.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Digital First</h3>
            <p className="text-muted-foreground">
              Update your information anytime by informing the official WhatsApp number.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
