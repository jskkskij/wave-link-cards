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
          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border bg-card">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
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

          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border bg-card" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-foreground" />
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

          <Card className="p-8 text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up border-2 border-border bg-card" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook className="w-8 h-8 text-primary-foreground" />
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
