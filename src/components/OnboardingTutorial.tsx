import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ChevronRight, ChevronLeft, CreditCard, Sparkles, ShoppingBag, MessageSquare, CheckCircle, HelpCircle, Layout, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { CONFIG } from "@/lib/config";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { initCSRFProtection, sanitizeFormData, logSecurityEvent } from "@/lib/security";
import { Loader2 } from "lucide-react";

interface TutorialStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    targetId?: string;
    content?: React.ReactNode;
}


export const OnboardingTutorial = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [spotlightRect, setSpotlightRect] = useState<{ x: number; y: number; width: number; height: number; borderRadius: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    // Review form state (for step 8)
    const [reviewData, setReviewData] = useState({
        rating: 0,
        text: "",
    });

    const steps: TutorialStep[] = [
        {
            title: "Welcome to WaveLink",
            description: "Your digital identity, reimagined. Start making lasting impressions with our smart networking solutions.",
            icon: <Sparkles className="w-12 h-12 text-sky animate-pulse" />,
            targetId: "hero"
        },
        {
            title: "Smart NFC Solutions",
            description: "Innovation at your fingertips. Tap and share your social profiles, contact info, and business details instantly.",
            icon: <CreditCard className="w-12 h-12 text-primary" />,
            targetId: "features"
        },
        {
            title: "NFC Enabled Review Stands",
            description: "Elevate your business presence. Double your Google or WhatsApp feedback instantly while customers are at checkout.",
            icon: <Star className="w-12 h-12 text-sky" />,
            targetId: "review-stands"
        },
        {
            title: "Simple & Affordable",
            description: "Premium quality without the premium price tag. Join 500+ professionals who trust WaveLink for their networking.",
            icon: <TrendingUp className="w-12 h-12 text-primary" />,
            targetId: "pricing"
        },
        {
            title: "Seamless Ordering",
            description: "Get yours in just 2 minutes. We guide you through WhatsApp to ensure your design is perfect.",
            icon: <ShoppingBag className="w-12 h-12 text-navy" />,
            targetId: "order"
        },
        {
            title: "Trusted by Many",
            description: "Hear from our vibrant community. Real stories from real people who have transformed their networking game.",
            icon: <MessageSquare className="w-12 h-12 text-sky" />,
            targetId: "reviews"
        },
        {
            title: "Always Here to Help",
            description: "Have questions? We've got answers. Explore our FAQs to learn everything about the future of networking.",
            icon: <HelpCircle className="w-12 h-12 text-primary" />,
            targetId: "faq"
        },
        {
            title: "How was the journey?",
            description: "We value your experience! Tell us what you think about our platform so far.",
            icon: <CheckCircle className="w-12 h-12 text-emerald-500" />,
            content: (
                <div className="space-y-4 mt-4 bg-background/50 p-6 rounded-xl border border-border/50">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setReviewData({ ...reviewData, rating: star })}
                                className="transition-transform hover:scale-125"
                            >
                                <Star
                                    className={`w-8 h-8 ${star <= reviewData.rating ? "fill-sky text-sky" : "text-muted-foreground"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <textarea
                        placeholder="Your thoughts..."
                        className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-sky/50 outline-none min-h-[100px]"
                        value={reviewData.text}
                        onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                    />
                    <Button
                        onClick={() => handleReviewSubmit()}
                        disabled={isSubmitting}
                        className="w-full bg-sky hover:bg-sky/90 text-navy font-bold flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Submit Feedback"
                        )}
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem("onboarding_seen");
        const urlParams = new URLSearchParams(window.location.search);
        const forceTutorial = urlParams.get('tutorial') === 'true';

        if (!hasSeenTutorial || forceTutorial) {
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleUpdateSpotlight = () => {
            const targetId = steps[currentStep].targetId;
            if (!targetId) {
                setSpotlightRect(null);
                return;
            }

            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    setSpotlightRect({
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                        borderRadius: 24
                    });
                }, 500); // Slightly more delay for reliable scroll position
            }
        };

        handleUpdateSpotlight();
        window.addEventListener('resize', handleUpdateSpotlight);
        return () => window.removeEventListener('resize', handleUpdateSpotlight);
    }, [isOpen, currentStep]);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem("onboarding_seen", "true");
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleDismiss();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const { checkRateLimit } = useRateLimit('feedback-tutorial', {
        maxAttempts: 1,
        windowMs: 60000 * 5, // 5 minutes window
    });

    const handleReviewSubmit = async () => {
        if (reviewData.rating === 0) {
            toast({
                title: "Incomplete Review",
                description: "Please provide a rating before submitting.",
                variant: "destructive",
            });
            return;
        }

        // 1. Check rate limit
        const rateLimitCheck = checkRateLimit();
        if (!rateLimitCheck.isAllowed) {
            toast({
                title: "Wait a moment",
                description: rateLimitCheck.message,
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // 2. Security: Initialize CSRF
            const csrfToken = initCSRFProtection();

            // 3. Data: Sanitize & Prepare
            const sanitizedFeedback = sanitizeFormData({
                type: 'tutorial-feedback',
                rating: reviewData.rating,
                comments: reviewData.text,
                url: window.location.href,
                timestamp: new Date().toISOString()
            });

            // 4. Persistence: Save to Google Sheets (Private)
            // Using "no-cors" as per the order form pattern
            await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRF-Token": csrfToken,
                },
                body: new URLSearchParams({
                    ...sanitizedFeedback,
                    _csrf: csrfToken,
                } as any).toString(),
            });

            logSecurityEvent('FEEDBACK_COPIED_TO_SHEET', { rating: reviewData.rating });

            // 5. Finalize: Redirect to Google Review (Public)
            window.open(CONFIG.GOOGLE_REVIEW_LINK, "_blank");

            toast({
                title: "Feedback Saved & Redirecting!",
                description: "Opening our Google Review profile. Thank you!",
            });

            handleNext();
        } catch (error) {
            console.error("Feedback submission error:", error);
            logSecurityEvent('FEEDBACK_SUBMISSION_FAILED', { error: String(error) });

            // Still redirect on failure to ensure user can leave review
            window.open(CONFIG.GOOGLE_REVIEW_LINK, "_blank");
            handleNext();
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Spotlight Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <mask id="spotlight-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <AnimatePresence>
                            {spotlightRect && (
                                <motion.rect
                                    key="spotlight"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: spotlightRect.x - 10,
                                        y: spotlightRect.y - 10,
                                        width: spotlightRect.width + 20,
                                        height: spotlightRect.height + 20,
                                        rx: spotlightRect.borderRadius
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    fill="black"
                                />
                            )}
                        </AnimatePresence>
                    </mask>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="rgba(2, 6, 23, 0.7)"
                    mask="url(#spotlight-mask)"
                    className="backdrop-blur-[2px]"
                />
            </svg>

            {/* Content Container */}
            <div className={`absolute inset-0 flex p-4 sm:p-8 pointer-events-none ${spotlightRect ? 'items-end sm:items-center sm:justify-end' : 'items-center justify-center'}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full max-w-sm bg-card/95 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl glass-morphism pointer-events-auto"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky/20 rounded-full blur-[60px] -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -ml-16 -mb-16" />

                        {/* Progress Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-1">
                                {steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentStep ? "w-6 bg-sky shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "w-1.5 bg-muted-foreground/20"}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-muted-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Step Icon & Text */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-luxury"
                            >
                                {steps[currentStep].icon}
                            </motion.div>

                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0f1d35] tracking-tight">
                                    {steps[currentStep].title}
                                </h3>
                                <p className="text-[#0f1d35]/80 text-sm sm:text-base leading-relaxed font-medium">
                                    {steps[currentStep].description}
                                </p>
                            </div>

                            {steps[currentStep].content && (
                                <div className="w-full">
                                    {steps[currentStep].content}
                                </div>
                            )}
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex items-center justify-between mt-8">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`text-navy/60 hover:text-navy hover:bg-navy/5 transition-all ${currentStep === 0 ? "opacity-0 cursor-default" : "opacity-100"}`}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>

                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={handleDismiss}
                                    className="text-[#0f1d35]/40 hover:text-[#0f1d35] transition-colors"
                                >
                                    Skip
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="bg-sky hover:bg-sky/90 text-[#0f1d35] font-bold px-6 rounded-2xl shadow-luxury-glow group"
                                >
                                    {currentStep === steps.length - 1 ? "Start" : "Next"}
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
