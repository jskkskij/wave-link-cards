import { ReviewCard } from "./ReviewCard";
import { Star, QrCode } from "lucide-react";
import googleQr from "@/assets/google-review-qr.png";

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
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Contextual Vibe Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-glow-wave opacity-30 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-glow-teal opacity-20 blur-[100px]" />
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl text-left">
                        <div className="flex items-center gap-2 text-accent font-bold tracking-widest text-[10px] uppercase mb-4">
                            <Star className="fill-accent text-accent" size={12} />
                            Compounding Proof
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif">
                            Latest Global Growth Signals
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 bg-accent/5 border border-accent/10 px-6 py-3 rounded-2xl">
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-accent">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-accent" />)}
                            </div>
                            <p className="text-xs font-bold text-navy">Verified Trust: 4.8/5</p>
                        </div>
                        <div className="h-10 w-[1px] bg-accent/20" />
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] text-navy font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Customer Reviews">
                    {reviews.map((review, idx) => (
                        <div key={review.id} role="listitem">
                            <ReviewCard review={review} index={idx} />
                        </div>
                    ))}
                </div>

                {/* Trust & QR Code Section */}
                <div className="mt-16 p-8 rounded-[2rem] bg-gradient-to-br from-navy to-[#1a2b4a] border border-white/10 shadow-luxury overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" aria-hidden="true" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-center md:text-left space-y-4 max-w-md">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-navy text-[10px] font-bold uppercase tracking-wider">
                                <QrCode size={12} aria-hidden="true" />
                                Infrastructure Access
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-white">Compound Your Reputation</h3>
                            <p className="text-mist/80 text-sm leading-relaxed">
                                Join the global growth system. Scan to verify your experience and help us scale elite business standards worldwide.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 pt-4 grayscale opacity-40" aria-label="Trust certificates">
                                <span className="text-xl font-bold font-serif italic text-white">Verified</span>
                                <span className="text-xl font-bold font-serif text-white">Global Growth</span>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                            <div className="relative p-4 bg-white rounded-3xl shadow-luxury-intense border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={googleQr}
                                    alt="Scan to leave a Google Review for Wavelink"
                                    width={192}
                                    height={192}
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-xl"
                                />
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-navy rounded-2xl flex items-center justify-center shadow-luxury border border-white/10">
                                    <Star size={20} className="fill-accent text-accent" aria-hidden="true" />
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
