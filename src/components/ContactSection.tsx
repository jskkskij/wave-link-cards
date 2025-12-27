import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Facebook } from "lucide-react";
import { CONFIG } from "@/lib/config";

const ContactSection = () => {
  return (
    <section className="py-20 bg-secondary" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-luxury-intense transition-all duration-500 animate-fade-in-up border-2 border-border/50 bg-card/60 backdrop-blur-sm group hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow group-hover:scale-110 transition-transform duration-500">
              <MessageCircle className="w-10 h-10 text-white filter drop-shadow-md" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">WhatsApp</h3>
            <p className="text-muted-foreground mb-4">Chat with us directly</p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href={CONFIG.WHATSAPP_LINK("")} target="_blank" rel="noopener noreferrer">
                +{CONFIG.WHATSAPP_NUMBER}
              </a>
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-luxury-intense transition-all duration-500 animate-fade-in-up border-2 border-border/50 bg-card/60 backdrop-blur-sm group hover:-translate-y-2" style={{ animationDelay: '0.1s' }}>
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-10 h-10 text-white filter drop-shadow-md" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Email</h3>
            <p className="text-muted-foreground mb-4">Send us a message</p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`}>
                {CONFIG.SUPPORT_EMAIL}
              </a>
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-luxury-intense transition-all duration-500 animate-fade-in-up border-2 border-border/50 bg-card/60 backdrop-blur-sm group hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow group-hover:scale-110 transition-transform duration-500">
              <Facebook className="w-10 h-10 text-white filter drop-shadow-md" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Facebook</h3>
            <p className="text-muted-foreground mb-4">Follow our page</p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="https://www.facebook.com/profile.php?id=61582857699324" target="_blank" rel="noopener noreferrer">
                Visit Page
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
