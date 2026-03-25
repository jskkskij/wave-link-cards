import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CreditCard, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { translations, Language } from "@/lib/translations";

interface TutorialStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    targetId?: string;
    content?: React.ReactNode;
}

interface OnboardingTutorialProps {
    lang?: Language;
}

export const OnboardingTutorial = ({ lang = "en" }: OnboardingTutorialProps) => {
    const tDict = translations[lang];
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const steps: TutorialStep[] = [
        {
            title: tDict.onboarding.welcome,
            description: tDict.onboarding.welcomeDesc,
            icon: <Sparkles className="w-12 h-12 text-sky animate-pulse" />,
        },
        {
            title: tDict.onboarding.howItWorks,
            description: tDict.onboarding.howItWorksDesc,
            icon: <CreditCard className="w-12 h-12 text-primary animate-bounce" />,
        },
        {
            title: tDict.onboarding.orderEasily,
            description: tDict.onboarding.orderEasilyDesc,
            icon: <ShoppingBag className="w-12 h-12 text-sky animate-pulse" />,
        }
    ];

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem("onboarding_seen");
        const urlParams = new URLSearchParams(window.location.search);
        const forceTutorial = urlParams.get('tutorial') === 'true';

        // Strict mobile check function
        const isMobileDevice = () => {
            if (typeof window === 'undefined') return false;
            const isNarrow = window.innerWidth < 1024;
            const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            return isNarrow || isMobileUA;
        };

        // If it's a mobile device, we explicitly do NOT want to show the tutorial
        if (isMobileDevice() && !forceTutorial) {
             return;
        }

        if (!hasSeenTutorial || forceTutorial) {
            const scheduler = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 3000));
            scheduler(() => {
                if (!isMobileDevice() || forceTutorial) {
                    const timer = setTimeout(() => setIsOpen(true), 1500);
                    return () => clearTimeout(timer);
                }
            });
        }
    }, []);

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


    if (!isOpen) return null;

    // Animated pointer variants
    const Pointer = ({ delay }: { delay: number }) => (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
                opacity: [0.7, 0],
                x: [0, 20],
                y: [0, 20],
            }}
            transition={{ 
                duration: 1.5, 
                delay,
                repeat: Infinity,
                repeatDelay: 0.5
            }}
            className="absolute pointer-events-none"
            style={{
                left: `${25 + delay * 15}%`,
                top: `${15 + delay * 8}%`,
            }}
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                    d="M2 2L2 28L8 16L16 30L20 26L12 12L24 12L2 2Z"
                    fill="rgb(0, 119, 255)"
                    className="drop-shadow-lg"
                />
            </svg>
        </motion.div>
    );

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden hidden lg:flex items-center justify-center">
            {/* Animated Pointers Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[0, 0.3, 0.6, 0.9].map((delay) => (
                    <Pointer key={delay} delay={delay} />
                ))}
            </div>

            {/* Simplified Modal */}
            <div className="relative z-10 pointer-events-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -30 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl"
                    >
                        {/* Simple Progress */}
                        <div className="flex gap-2 mb-6 justify-center">
                            {steps.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all ${idx === currentStep ? "bg-sky w-8" : "bg-slate-300 w-2"}`}
                                    animate={idx === currentStep ? { scale: 1.1 } : {}}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-blue/10 rounded-2xl"
                            >
                                {steps[currentStep].icon}
                            </motion.div>

                            <h3 className="text-2xl font-bold text-slate-900">
                                {steps[currentStep].title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {steps[currentStep].description}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-2 mt-8 justify-center">
                            <Button
                                variant="ghost"
                                onClick={handleDismiss}
                                className="text-slate-600 hover:text-slate-900"
                            >
                                Skip
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="bg-sky hover:bg-sky/90 text-navy font-bold px-6 rounded-xl"
                            >
                                {currentStep === steps.length - 1 ? "Start" : "Next"}
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
