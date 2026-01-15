import { useEffect, useState, useCallback } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Zap } from "lucide-react";
import stand1 from "@/assets/review-stands/stand-1.jpg";
import stand2 from "@/assets/review-stands/stand-2.jpg";
import stand3 from "@/assets/review-stands/stand-3.jpg";
import stand4 from "@/assets/review-stands/stand-4.png";

const ReviewStandsSection = () => {
    const images = [stand1, stand2, stand3, stand4];
    const [api, setApi] = useState<CarouselApi>();

    // Manual Autoplay
    useEffect(() => {
        if (!api) return;

        const intervalId = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [api]);

    const scrollToOrder = () => {
        document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-gradient-to-t from-background via-secondary/5 to-background relative overflow-hidden" id="review-stands">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">New Arrival</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-serif">
                        NFC Enabled Review Stands
                    </h2>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 max-w-3xl mx-auto mb-2 font-serif">
                        "Double your Google/WhatsApp reviews with a single tap at checkout"
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Instant feedback while the customer is still in front of you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Carousel Section */}
                    <div className="w-full relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-sky/20 rounded-2xl blur-lg transform group-hover:scale-105 transition-transform duration-500"></div>
                        <Card className="border-0 bg-transparent shadow-none relative overflow-hidden rounded-2xl">
                            <CardContent className="p-0">
                                <Carousel
                                    setApi={setApi}
                                    className="w-full"
                                    opts={{
                                        loop: true,
                                    }}
                                >
                                    <CarouselContent>
                                        {images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <div className="overflow-hidden rounded-xl aspect-square relative shadow-2xl border border-white/10">
                                                        <img
                                                            src={image}
                                                            alt={`Wavelink NFC Review Stand View ${index + 1}`}
                                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-4 bg-background/50 hover:bg-background/80 text-foreground border-none backdrop-blur-sm" />
                                    <CarouselNext className="right-4 bg-background/50 hover:bg-background/80 text-foreground border-none backdrop-blur-sm" />
                                </Carousel>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Product Details Section */}
                    <div className="space-y-8 text-left">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold font-serif">Smart Review Stand</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-primary">৳1,699</span>
                                <span className="text-xl text-muted-foreground line-through">৳2,499</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">NFC Enabled</span>
                                <span className="bg-sky/10 text-sky text-xs font-bold px-3 py-1 rounded-full border border-sky/20">QR Code Backup</span>
                                <span className="bg-green-500/10 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">Waterproof</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                Boost your business credibility effortlessly. Place this stand at your reception or checkout counter, and let your customers share their positive experiences instantly. No apps required – just a simple tap or scan.
                            </p>

                            <ul className="space-y-3">
                                {[
                                    "Increase review volume by 300%",
                                    "Compatible with all smartphones",
                                    "Custom branded with your logo",
                                    "No monthly subscription fees"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Zap className="w-3 h-3 text-primary" />
                                        </div>
                                        <span className="text-foreground/80 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button
                            onClick={scrollToOrder}
                            className="w-full md:w-auto px-8 py-6 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                        >
                            Order Review Stand
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewStandsSection;
