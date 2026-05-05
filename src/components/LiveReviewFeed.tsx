import { ReviewCard } from "./ReviewCard";
import { Star, QrCode } from "lucide-react";
import googleQr from "@/assets/google-review-qr.png";
import { SponsoredExpandCard } from "./SponsoredExpandCard";
import {
    getSponsoredPlacementDecision,
    markSponsoredImpression,
    readSponsoredSessionState,
} from "@/lib/sponsored-orchestrator";
import { useEffect, useMemo } from "react";

const reviews = [
    {
        id: "1",
        name: "Mohammad Abir Abbas",
        city: "Chattogram",
        date: "Jan 15, 2026",
        productType: "Premium NFC Card",
        rating: 5,
        review: "The gold standard for smart networking. The design is breathtaking and the tap response is instant. Best investment for my professional identity!",
        verified: true,
    },
    {
        id: "2",
        name: "Shahadat Sakib",
        city: "Dhaka",
        date: "Jan 12, 2026",
        productType: "Review Stand",
        rating: 5,
        review: "Our Google reviews have doubled in just a week! The build quality is premium and it looks amazing on our checkout counter.",
        verified: true,
    },
    {
        id: "3",
        name: "Dr. Mohammad Abed Abbas",
        city: "Dhaka",
        date: "Jan 05, 2026",
        productType: "Smart Card",
        rating: 5,
        review: "In the medical field, efficiency is everything. Wavelink makes sharing my contact details seamless and professional.",
        verified: true,
    },
];

const LiveReviewFeed = () => {
    const sponsoredDecision = useMemo(
        () => getSponsoredPlacementDecision(readSponsoredSessionState()),
        [],
    );

    useEffect(() => {
        if (sponsoredDecision.shouldInsert) {
            markSponsoredImpression();
        }
    }, [sponsoredDecision.shouldInsert]);

    const feedItems = useMemo(() => {
        if (!sponsoredDecision.shouldInsert) {
            return reviews.map((review) => ({ type: "review" as const, id: review.id, review }));
        }

        const items = reviews.map((review) => ({ type: "review" as const, id: review.id, review }));
        const insertIndex = Math.min(
            sponsoredDecision.insertAfterIndex + 1,
            items.length,
        );
        items.splice(insertIndex, 0, {
            type: "sponsored" as const,
            id: `sponsored-${sponsoredDecision.placement}`,
            review: null,
        });
        return items;
    }, [sponsoredDecision.insertAfterIndex, sponsoredDecision.placement, sponsoredDecision.shouldInsert]);

    return (
        <section className="py-20 bg-background relative overflow-hidden" aria-labelledby="live-reviews-heading">
            {/* Contextual Vibe Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-glow-wave opacity-30 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-glow-teal opacity-20 blur-[100px]" />
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="max-w-xl text-left">
                        <div className="flex items-center gap-2 text-foreground font-bold tracking-[0.2em] text-[10px] uppercase mb-4">
                            <Star className="fill-primary text-primary motion-safe:animate-pulse" size={14} />
                            Compounding Proof
                        </div>
                        <h2 id="live-reviews-heading" className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-foreground font-serif leading-tight">
                            Latest Global Growth Signals
                        </h2>
                    </div>
                    <div className="flex items-center gap-5 bg-card/95 backdrop-blur-xl border border-border p-5 md:px-6 md:py-3 rounded-2xl shadow-luxury w-full lg:w-auto">
                        <div className="text-left md:text-right flex-1">
                            <div className="flex items-center gap-1 justify-start md:justify-end text-primary mb-1" aria-label="Average rating 4.8 out of 5">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-primary" aria-hidden="true" />)}
                            </div>
                            <p className="text-[11px] font-black text-foreground uppercase tracking-wider">Verified Trust: 4.8/5</p>
                        </div>
                        <div className="h-10 w-[1px] bg-border hidden md:block" />
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gradient-vibrant p-0.5 shadow-luxury">
                                    <div className="w-full h-full rounded-full bg-navy flex items-center justify-center text-[10px] text-white font-black uppercase">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Customer Reviews">
                    {feedItems.map((item, idx) => {
                        if (item.type === "sponsored") {
                            return (
                                <div key={item.id} role="listitem">
                                    <SponsoredExpandCard
                                        partner="মেসার্স এ. হোসাইন ফার্মেসী"
                                        sourceId="AHP-CHK-1999"
                                        placement={sponsoredDecision.placement}
                                        ruleVersion={sponsoredDecision.ruleVersion}
                                    />
                                </div>
                            );
                        }

                        return (
                            <div key={item.id} role="listitem">
                                <ReviewCard review={item.review} index={idx} />
                            </div>
                        );
                    })}
                </div>

                {/* Trust & QR Code Section */}
                <div className="mt-16 p-6 md:p-12 rounded-[2rem] bg-gradient-to-br from-navy via-navy to-[#0a1525] border border-white/15 shadow-luxury overflow-hidden relative group/rep-card">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 group-hover/rep-card:bg-accent/20 transition-all duration-1000" aria-hidden="true" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                        <div className="text-center md:text-left space-y-6 max-w-lg">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/50 text-accent text-[10px] font-black uppercase tracking-[0.2em] shadow-luxury-glow motion-safe:animate-pulse">
                                <QrCode size={12} aria-hidden="true" />
                                Infrastructure Access
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">Compound Your Reputation</h3>
                            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium tracking-tight">
                                Join the global growth system. Scan to verify your experience and help us scale elite business standards worldwide.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 pt-4" aria-label="Trust certificates">
                                <span className="text-xl md:text-2xl font-bold font-serif italic text-white/70 hover:text-white transition-luxury motion-safe:hover:scale-105 cursor-default select-none">Verified</span>
                                <span className="text-xl md:text-2xl font-bold font-serif text-white/70 hover:text-white transition-luxury motion-safe:hover:scale-105 cursor-default select-none tracking-tight">Global Growth</span>
                            </div>
                        </div>

                        <div className="relative group/qr">
                            <div className="absolute -inset-6 bg-gradient-vibrant rounded-full blur-3xl opacity-20 group-hover/qr:opacity-40 transition-opacity duration-1000 motion-safe:animate-pulse" aria-hidden="true" />
                            <div className="relative p-5 md:p-6 bg-white rounded-3xl shadow-luxury-intense border border-white/20 transform motion-safe:group-hover/qr:scale-[1.02] transition-transform duration-700">
                                <img
                                    src={googleQr}
                                    alt="Scan to leave a Google Review for Wavelink"
                                    width={224}
                                    height={224}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-44 h-44 md:w-56 md:h-56 rounded-xl"
                                />
                                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-navy rounded-2xl flex items-center justify-center shadow-luxury border border-white/10 rotate-12 group-hover/qr:rotate-0 transition-transform duration-500">
                                    <Star size={24} className="fill-accent text-accent motion-safe:animate-pulse" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveReviewFeed;
