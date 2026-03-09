import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAction = (accepted: boolean) => {
        localStorage.setItem("cookie-consent", accepted ? "true" : "false");
        setIsVisible(false);
        if (accepted) {
            window.location.reload(); // Reload to trigger analytics scripts that check for this flag
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[#0f172a] backdrop-blur-2xl shadow-2xl p-6 group shadow-luxury-glow">
                        {/* Animated Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors duration-1000" />

                        <div className="flex gap-4 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                <Cookie className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        Data Privacy & Consent
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </h3>
                                    <span className="text-[10px] font-bold text-primary tracking-wider" dir="ltr">ডাটা প্রাইভেসি</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <p className="text-xs text-mist/80 leading-relaxed font-medium">
                                        In compliance with the Bangladesh Data Protection Laws (2025), we require your explicit consent to process non-essential cookies. Your data is secure.
                                    </p>
                                    <p className="text-xs text-mist/80 leading-relaxed font-medium text-left" dir="ltr">
                                        বাংলাদেশ ডেটা সুরক্ষা আইন (২০২৫) অনুযায়ী, আমরা আপনার সম্মতি চাচ্ছি। আপনার তথ্য সম্পূর্ণ নিরাপদ।
                                    </p>
                                    <Link to="/privacy-policy" className="inline-block text-[10px] text-primary hover:underline font-bold uppercase tracking-wider">
                                        Transparency Report / ট্রান্সপারেন্সি রিপোর্ট
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={() => handleAction(true)}
                                        className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-luxury-glow hover:scale-[1.02] transition-all flex justify-between px-6"
                                    >
                                        <span>Accept All</span>
                                        <span dir="ltr">সব গ্রহণ করুন</span>
                                    </Button>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleAction(false)}
                                            className="rounded-xl border-white/10 hover:bg-white/5 text-mist font-medium h-10 text-xs"
                                        >
                                            Reject / বাতিল
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsVisible(false)}
                                            className="rounded-xl hover:bg-primary/10 hover:text-primary text-mist/60 text-xs"
                                        >
                                            Close / بند کر
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
