import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

const UnifiedConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem("cookie-consent");
        const ageVerified = localStorage.getItem("age_verified");
        
        // Only show if one of them is missing
        if (!cookieConsent || !ageVerified) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        localStorage.setItem("age_verified", "true");
        setIsVisible(false);
        // Optional: Trigger analytics or reload if needed
        // window.location.reload(); 
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "false");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-6 right-6 z-[200] max-w-[320px] w-full"
                >
                    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50 overflow-hidden relative group">
                        {/* Subtle Glow */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                        
                        <div className="relative z-10 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Privacy & Age</span>
                                </div>
                                <button 
                                    onClick={() => setIsVisible(false)}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <p className="text-[11px] text-white/70 leading-relaxed">
                                By continuing, you confirm you are 18+ and agree to our 
                                <Link to="/privacy-policy" className="text-primary hover:underline mx-1">Privacy Policy</Link> 
                                and use of cookies.
                            </p>

                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-2 bg-primary hover:bg-primary/90 text-white text-[11px] font-bold rounded-lg transition-all shadow-lg shadow-primary/10"
                                >
                                    Accept & Continue
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 text-[11px] rounded-lg transition-all"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UnifiedConsent;
