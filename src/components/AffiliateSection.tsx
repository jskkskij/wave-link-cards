import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import affiliateImage from "@/assets/affiliate-program.png";

const AffiliateSection = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden" id="affiliate">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
                            Affiliate Marketing Program
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join the Wavelink Affiliate Program today! Start earning attractive commissions by promoting our innovative Smart NFC Business Cards.
                        </p>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-luxury-glow">
                                <img
                                    src={affiliateImage}
                                    alt="Affiliate Marketing Program"
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>

                        {/* Right: Benefits */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <Card className="p-6 border-2 border-border/50 hover:border-sky/30 hover:shadow-luxury transition-all duration-300 bg-card/60 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center shrink-0">
                                        <DollarSign className="w-6 h-6 text-sky" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Attractive Commissions</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Earn competitive commissions on every sale you generate through your unique affiliate link.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border-2 border-border/50 hover:border-sky/30 hover:shadow-luxury transition-all duration-300 bg-card/60 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6 text-sky" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Leverage Your Network</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Share a product that truly stands out and helps professionals modernize their networking.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border-2 border-border/50 hover:border-sky/30 hover:shadow-luxury transition-all duration-300 bg-card/60 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-6 h-6 text-sky" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Passive Income Potential</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Build a sustainable income stream by promoting premium NFC business cards to your audience.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Card className="inline-block p-8 border-2 border-sky/30 shadow-luxury-glow bg-gradient-to-br from-card to-sky/5 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-sky to-primary rounded-full flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 font-serif">Ready to Join?</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md">
                                        Contact us today to get started with the Wavelink Affiliate Program
                                    </p>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-sky to-primary text-white hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-luxury transition-all duration-300 hover:scale-105"
                                    >
                                        <a href="mailto:waavelink@gmail.com?subject=Affiliate Program Inquiry">
                                            Join Now
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AffiliateSection;
