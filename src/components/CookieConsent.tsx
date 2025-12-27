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
                                    Privacy Settings
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                    We use essential cookies for site functionality and analytical cookies (GDPR/PIPEDA compliant) to improve your experience. See our
                                    <Link to="/privacy-policy" className="text-primary hover:underline ml-1">Transparency Report</Link>.
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <Button
                                        onClick={() => handleAction(true)}
                                        className="flex-1 min-w-[120px] rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-luxury-glow hover:scale-[1.02] transition-all"
                                    >
                                        Accept All
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleAction(false)}
                                        className="flex-1 min-w-[120px] rounded-full border-primary/20 hover:bg-primary/5 text-foreground font-medium"
                                    >
                                        Reject All
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsVisible(false)}
                                        className="rounded-full hover:bg-primary/10 hover:text-primary shrink-0"
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
