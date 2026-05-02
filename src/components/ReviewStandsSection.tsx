import { useEffect, useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReviewStandsSection = () => {
    const images = [stand1, stand2, stand3];
    const [api, setApi] = useState<CarouselApi>();
    const [customization, setCustomization] = useState<"semi" | "full">("semi");
    const [material, setMaterial] = useState<"white" | "black">("white");
    const [region, setRegion] = useState("BD"); // "BD", "USA", "CA", "UAE"

    const pricingData = {
        BD: {
            semi: { white: "1,212", black: "1,313" },
            full: { white: "1,515", black: "1,616" },
            symbol: "৳",
            currency: "BDT"
        },
        USA: {
            semi: { white: "14.99", black: "16.99" },
            full: { white: "19.99", black: "22.99" },
            symbol: "$",
            currency: "USD"
        },
        CA: {
            semi: { white: "19.99", black: "22.99" },
            full: { white: "24.99", black: "29.99" },
            symbol: "$",
            currency: "CAD"
        },
        UAE: {
            semi: { white: "55", black: "65" },
            full: { white: "75", black: "85" },
            symbol: "د.إ",
            currency: "AED"
        }
    };

    const currentPricing = pricingData[region as keyof typeof pricingData];

    const descriptions = {
        semi: "A perfect balance of branding and flexibility. The bottom section will feature the Wavelink logo and QR code, while the remaining area can be fully customized by the owner according to their preference. Ideal for a neat, branded, and professional look.",
        full: "Complete freedom, no restrictions. This option comes with no Wavelink logo—the entire stand is 100% customized based on your brand identity and design choice. Best for businesses that want total personalization."
    };

    // Manual Autoplay — paused when tab is not visible to save battery on mobile
    useEffect(() => {
        if (!api) return;

        let intervalId: ReturnType<typeof setInterval>;

        const start = () => {
            intervalId = setInterval(() => api.scrollNext(), 3000);
        };
        const stop = () => clearInterval(intervalId);

        const onVisibilityChange = () => {
            document.hidden ? stop() : start();
        };

        start();
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            stop();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [api]);

    const scrollToOrder = () => {
        document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="pt-8 pb-20 bg-gradient-to-t from-background via-secondary/5 to-background relative overflow-hidden" id="review-stands">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4 border border-accent/30">
                        <Zap className="w-4 h-4 text-accent fill-accent" aria-hidden="true" />
                        <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest">Growth Engine</span>
                    </div>
                    <h2 className="text-[clamp(2rem,8vw,4rem)] font-bold text-foreground mb-4 font-serif leading-tight">
                        Reputation Acceleration
                    </h2>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 max-w-3xl mx-auto mb-2 font-serif px-4">
                        "Your Review Stand Compounds the Proof"
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                        Deploy global-grade reputation towers instantly. Capture trust precisely where it's built: at the first physical interaction.
                    </p>

                    {/* Region Switcher */}
                    <div className="flex justify-center mt-8">
                        <div className="flex bg-secondary/20 p-1 rounded-full border border-primary/20" role="group" aria-label="Select Region">
                            {[
                                { id: "BD", label: "Bangladesh" },
                                { id: "USA", label: "USA" },
                                { id: "CA", label: "Canada" },
                                { id: "UAE", label: "Dubai" }
                            ].map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setRegion(r.id)}
                                    aria-current={region === r.id ? "true" : undefined}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${region === r.id
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Carousel Section */}
                    <div className="w-full relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg transform group-hover:scale-105 transition-transform duration-500"></div>
                        <Card className="border-0 bg-transparent shadow-none relative overflow-hidden rounded-2xl">
                            <CardContent className="p-0">
                                <Carousel
                                    setApi={setApi}
                                    className="w-full"
                                    aria-label="Review Stand Product Images"
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
                                                            alt={`Wavelink Digital Review Stand view ${index + 1}`}
                                                            loading="lazy"
                                                            decoding="async"
                                                            width={600}
                                                            height={600}
                                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious aria-label="Previous slide" className="left-4 bg-background/50 hover:bg-background/80 text-foreground border-none backdrop-blur-sm" />
                                    <CarouselNext aria-label="Next slide" className="right-4 bg-background/50 hover:bg-background/80 text-foreground border-none backdrop-blur-sm" />
                                </Carousel>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Product Details Section */}
                    <div className="space-y-8 text-left">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-3xl font-bold font-serif">Smart Review Stand</h3>
                                <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {region === "UAE" ? "Fast UAE Shipping" : region === "BD" ? "Next Day Delivery" : "Global Express"}
                                </div>
                            </div>

                            <div className="bg-white/50 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-6 md:p-8 relative overflow-hidden">
                                {/* Decorative glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

                                <Tabs defaultValue="semi" className="w-full" onValueChange={(val) => setCustomization(val as "semi" | "full")}>
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-secondary/10 p-1.5 rounded-full border border-secondary/10">
                                            <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 gap-2">
                                                <TabsTrigger
                                                    value="semi"
                                                    className="rounded-full py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
                                                >
                                                    Semi Custom
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="full"
                                                    className="rounded-full py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
                                                >
                                                    Full Custom
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>

                                        <div className="space-y-8 animate-fade-in">
                                            {/* Material Selection */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-bold text-foreground/80 tracking-wide uppercase text-[11px]">Choose Material</label>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <button
                                                        onClick={() => setMaterial("white")}
                                                        aria-label="Select White Material"
                                                        className={`relative overflow-hidden group p-5 rounded-2xl border transition-all duration-300 text-left ${material === "white" ? "border-primary/50 bg-white shadow-lg shadow-primary/5 ring-1 ring-primary/20" : "border-transparent bg-white/60 hover:bg-white hover:border-primary/20"}`}
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="w-8 h-8 rounded-full border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"></div>
                                                            {material === "white" && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in" aria-hidden="true"></div>}
                                                        </div>
                                                        <span className={`font-serif font-bold text-xl block ${material === "white" ? "text-primary" : "text-gray-600"}`}>White</span>
                                                        <span className="text-xs text-muted-foreground font-medium block">Standard L-Stand Size: 4" x 6"</span>
                                                        <span className="text-[10px] text-muted-foreground mt-1 block">Minimalist & Clean</span>
                                                        <div className={`absolute inset-0 border-2 border-primary rounded-2xl opacity-0 transition-opacity duration-300 ${material === "white" ? "opacity-100" : "group-hover:opacity-10"}`}></div>
                                                    </button>
                                                    <button
                                                        onClick={() => setMaterial("black")}
                                                        aria-label="Select Black Material"
                                                        className={`relative overflow-hidden group p-5 rounded-2xl border transition-all duration-300 text-left ${material === "black" ? "border-primary/50 bg-gray-900 shadow-lg shadow-black/20 ring-1 ring-primary/20" : "border-transparent bg-white/60 hover:bg-white hover:border-primary/20"}`}
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="w-8 h-8 rounded-full border border-gray-700 bg-gradient-to-br from-gray-800 to-black shadow-sm"></div>
                                                            {material === "black" && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in" aria-hidden="true"></div>}
                                                        </div>
                                                        <span className={`font-serif font-bold text-xl block ${material === "black" ? "text-white" : "text-gray-600"}`}>Black</span>
                                                        <span className={`text-xs font-medium block ${material === "black" ? "text-gray-400" : "text-muted-foreground"}`}>Standard L-Stand Size: 4" x 6"</span>
                                                        <span className={`text-[10px] mt-1 block ${material === "black" ? "text-gray-500" : "text-muted-foreground"}`}>Bold & Professional</span>
                                                        <div className={`absolute inset-0 border-2 border-primary rounded-2xl opacity-0 transition-opacity duration-300 ${material === "black" ? "opacity-100" : "group-hover:opacity-10"}`}></div>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price Display */}
                                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/0 to-transparent border border-primary/10">
                                                <div className="flex items-end justify-between">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-muted-foreground">Estimate Total</p>
                                                        <p className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                                                            {region === "BD" ? "Includes Tax" : region === "USA" ? "Excl. Taxes" : "Market Price"}
                                                        </p>
                                                    </div>
                                                    <div className="text-right flex-1">
                                                        <span className="block text-[clamp(2.5rem,10vw,4rem)] font-serif font-bold text-primary tracking-tight leading-none">
                                                            <span className={`text-[0.5em] align-top mr-1 opacity-60 ${region === "UAE" ? "text-[0.4em]" : ""}`}>
                                                                {currentPricing.symbol}
                                                            </span>
                                                            {currentPricing[customization][material]}
                                                        </span>
                                                        <span className="text-xs font-black text-navy/40 uppercase tracking-widest">{currentPricing.currency}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-border/50 pt-6">
                                                <p className="text-muted-foreground leading-relaxed text-sm">
                                                    {descriptions[customization]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Tabs>

                                <div className="space-y-6 mt-8 border-t border-border/40 pt-6">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full border border-primary/20">NFC Enabled</span>
                                        <span className="bg-accent/10 text-accent font-bold text-xs px-3 py-1.5 rounded-full border border-accent/20">QR Code Backup</span>
                                        <span className="bg-green-500/10 text-green-700 font-bold text-xs px-3 py-1.5 rounded-full border border-green-500/20">Waterproof</span>
                                    </div>

                                    <ul className="space-y-3">
                                        {[
                                            "Increase review volume by 300%",
                                            "Compatible with all smartphones",
                                            "Custom branded with your logo",
                                            "No monthly subscription fees"
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                    <Zap className="w-3 h-3 text-accent" aria-hidden="true" />
                                                </div>
                                                <span className="text-foreground/80 font-medium text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={scrollToOrder}
                                        className="w-full py-6 bg-accent hover:bg-accent/90 text-navy text-lg font-bold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 group"
                                    >
                                        Order Review Stand
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewStandsSection;
