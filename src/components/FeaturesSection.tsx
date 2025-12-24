import { Card } from "@/components/ui/card";
import { Palette, Droplet, Globe2, Zap, Leaf, ShieldCheck, Lock } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Customizable Design",
    description: "Make it yours with personalized designs and branding"
  },
  {
    icon: Droplet,
    title: "Waterproof & Durable",
    description: "Built to last through daily wear and tear"
  },
  {
    icon: Globe2,
    title: "Smart Web Interface",
    description: "Manage and update your profile anytime, anywhere"
  },
  {
    icon: Zap,
    title: "One Tap to Share",
    description: "Instant contact sharing with NFC technology"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "A sustainable alternative to traditional paper cards"
  },
  {
    icon: ShieldCheck,
    title: "6-Month Warranty",
    description: "Coverage for software issues with proof of purchase"
  },
  {
    icon: Lock,
    title: "GDPR Protected",
    description: "Your data is securely stored, encrypted, and GDPR compliant"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Wavelink?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart features designed for modern professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up bg-card border-2 border-border hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
