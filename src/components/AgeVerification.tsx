import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, UserCheck, Baby, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export const AgeVerification = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isVerified = localStorage.getItem("age_verified");
        if (!isVerified) {
            setIsVisible(true);
        }
    }, []);

    const handleVerify = (isAdult: boolean) => {
        if (isAdult) {
            localStorage.setItem("age_verified", "true");
            setIsVisible(false);
        } else {
            // Redirect or show limited content message
            window.location.href = "https://www.google.com"; // Default safe redirect
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy/95 backdrop-blur-md">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-card/10 border border-white/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16" />

                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-luxury">
                            <ShieldAlert className="w-10 h-10 text-primary" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold font-serif text-white tracking-tight">Age Verification</h3>
                                <p className="text-xl font-bold font-serif text-primary" dir="rtl">تأكيد العمر</p>
                            </div>

                            <div className="space-y-2 text-sm text-mist/80 leading-relaxed">
                                <p>Are you over 18 years of age? This website contains content and products intended for adults.</p>
                                <p dir="rtl" className="text-right">هل عمرك أكثر من 18 عاماً؟ يحتوي هذا الموقع على محتوى ومنتجات مخصصة للبالغين.</p>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-[10px] text-mist/60 text-left space-y-2">
                                <p className="flex items-start gap-2">
                                    <Baby className="w-3 h-3 shrink-0 text-primary" />
                                    UAE Compliance: We do not collect data from children under 13 for advertising purposes.
                                </p>
                                <p dir="rtl" className="text-right flex flex-row-reverse items-start gap-2">
                                    <Baby className="w-3 h-3 shrink-0 text-primary" />
                                    الامتثال لقوانين الإمارات: نحن لا نجمع بيانات الأطفال دون سن 13 عاماً لأغراض إعلانية.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button
                                onClick={() => handleVerify(false)}
                                variant="outline"
                                className="rounded-2xl border-white/10 hover:bg-white/5 text-mist h-14"
                            >
                                <div className="flex flex-col leading-tight">
                                    <span>No / Under 18</span>
                                    <span className="text-[10px] opacity-60">لا / تحت 18</span>
                                </div>
                            </Button>
                            <Button
                                onClick={() => handleVerify(true)}
                                className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 shadow-luxury-glow flex flex-col leading-tight"
                            >
                                <span>Yes / 18+</span>
                                <span className="text-[10px] opacity-80">نعم / 18+</span>
                            </Button>
                        </div>

                        <p className="text-[10px] text-mist/40 italic">
                            By entering, you agree to our Terms of Service and Privacy Policy aligned with UAE TDRA regulations.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
