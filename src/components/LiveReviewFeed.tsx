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
        <section className="py-20 bg-background relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-sky font-bold tracking-widest text-xs uppercase mb-4">
                            <Star className="fill-sky text-sky" size={14} />
                            Live Feedback
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif">
                            Latest 5-Star Experience
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 bg-sky/5 border border-sky/10 px-6 py-3 rounded-2xl">
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-sky">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-sky" />)}
                            </div>
                            <p className="text-sm font-bold text-navy">Excellent 4.8/5</p>
                        </div>
                        <div className="h-10 w-[1px] bg-sky/20" />
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-primary flex items-center justify-center text-[10px] text-white font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <ReviewCard key={review.id} review={review} index={idx} />
                    ))}
                </div>

                {/* Trust & QR Code Section */}
                <div className="mt-16 p-8 rounded-[2rem] bg-gradient-to-br from-secondary/50 to-background border border-border/50 shadow-luxury">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-center md:text-left space-y-4 max-w-md">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                                <QrCode size={12} />
                                Scan to Review
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-navy">Review us on Google</h3>
                            <p className="text-muted-foreground">
                                Your feedback helps us grow. Scan this QR code to share your experience directly on our Google Profile.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 pt-4 grayscale opacity-40">
                                <span className="text-xl font-bold font-serif italic text-navy">Trustpilot</span>
                                <span className="text-xl font-bold font-serif text-navy">Google Reviews</span>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-sky/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-4 bg-white rounded-3xl shadow-luxury-intense border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={googleQr}
                                    alt="Google Review QR Code"
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-xl"
                                />
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-navy rounded-2xl flex items-center justify-center shadow-luxury">
                                    <Star size={20} className="fill-sky text-sky" />
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
