import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Facebook, Instagram } from "lucide-react";
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

                    <Card className="p-8 text-center hover:shadow-luxury-intense transition-all duration-500 animate-fade-in-up border-2 border-border/50 bg-card/60 backdrop-blur-sm group hover:-translate-y-2" style={{ animationDelay: '0.3s' }}>
                        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow group-hover:scale-110 transition-transform duration-500">
                            <Instagram className="w-10 h-10 text-white filter drop-shadow-md" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-card-foreground">Instagram</h3>
                        <p className="text-muted-foreground mb-4">Follow us on Instagram</p>
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            asChild
                        >
                            <a href="https://www.instagram.com/__wave_link__/" target="_blank" rel="noopener noreferrer">
                                @__wave_link__
                            </a>
                        </Button>
                    </Card>
                </div>

                {/* Map Section */}
                <div className="mt-16 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <Card className="overflow-hidden border-2 border-border/50 bg-card/60 backdrop-blur-sm shadow-luxury hover:shadow-luxury-intense transition-all duration-500 rounded-3xl">
                        <div className="relative w-full h-[450px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.0598574909786!2d91.839794!3d22.351368599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad27e7958ac0c5%3A0x4341ec76c8e2aaf6!2sWave%20Link!5e0!3m2!1sen!2sbd!4v1769610331439!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Wave Link Physical Location"
                                className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                        <div className="p-4 bg-navy/80 backdrop-blur-md text-white/80 text-center text-sm font-medium tracking-wide">
                            Official Location: Chandanpura, Chattogram, Bangladesh
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
