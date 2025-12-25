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

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
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
                    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-xl shadow-2xl p-6 group">
                        {/* Animated Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors duration-1000" />

                        <div className="flex gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                <Cookie className="w-6 h-6 text-primary-foreground" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                                    Cookie Preference
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    We use cookies to enhance your experience and analyze our traffic in accordance with our
                                    <Link to="/privacy-policy" className="text-primary hover:underline ml-1">Privacy Policy</Link>.
                                </p>

                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={handleAccept}
                                        className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-luxury-glow hover:scale-[1.02] transition-all"
                                    >
                                        Accept All
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsVisible(false)}
                                        className="rounded-full hover:bg-primary/10 hover:text-primary"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
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
