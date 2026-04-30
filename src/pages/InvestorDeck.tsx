import { useEffect, useState, useRef } from "react";
import {
    ShieldCheck, MapPin, Calendar,
    TrendingUp, Zap, ArrowLeft, Download, Send, Loader2,
    Shield, Globe, FileText, ArrowRight, CheckCircle, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CONFIG } from "@/lib/config";

const InvestorDeck = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
    const [leadEmail, setLeadEmail] = useState("");
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const slides = [
        "Sovereign Trust",
        "The Mechanic",
        "Market Logic",
        "Regulatory Mandate",
        "Revenue Alpha",
        "Institutional Ask"
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const index = Math.round(scrollPosition / windowHeight);
            if (index !== currentSlide) {
                setCurrentSlide(index);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentSlide]);

    const scrollToSlide = (index: number) => {
        window.scrollTo({
            top: index * window.innerHeight,
            behavior: "smooth"
        });
    };

    const handleDownload = () => {
        window.print();
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadEmail || !leadEmail.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setIsSubmittingLead(true);
        try {
            await fetch(CONFIG.LEAD_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: leadEmail,
                    source: "Investor Deck",
                    timestamp: new Date().toISOString(),
                }).toString(),
            });

            toast.success("Thank you! You've been added to our lead list.");
            setIsLeadDialogOpen(false);
            setLeadEmail("");
        } catch (error) {
            console.error("Lead submission error:", error);
            toast.error("Failed to submit. Please try again.");
        } finally {
            setIsSubmittingLead(false);
        }
    };

    return (
        <div ref={containerRef} className="investor-deck bg-[#04080F] text-white font-sans selection:bg-blue/30 selection:text-white">
            {/* Navigation Dots — hidden on mobile & print */}
            <div className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3 sm:gap-4 print:!hidden">
                {slides.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`group relative flex items-center justify-end`}
                        aria-label={`Go to slide ${label}`}
                    >
                        <span className={`absolute right-8 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${currentSlide === index ? "opacity-100 translate-x-0 text-blue" : "opacity-0 translate-x-4 text-white/20"}`}>
                            {label}
                        </span>
                        <div className={`w-1 h-6 sm:h-8 transition-all duration-500 ${currentSlide === index ? "bg-blue" : "bg-white/10 group-hover:bg-white/30"}`} />
                    </button>
                ))}
            </div>

            {/* Back Button & Download — responsive, hidden on print */}
            <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 flex gap-3 sm:gap-6 print:!hidden">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="rounded-none px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-white/40 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
                >
                    <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Exit
                </Button>
                <Button
                    onClick={handleDownload}
                    className="rounded-none px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-blue hover:bg-blue/90 text-white font-bold"
                >
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Fact Sheet
                </Button>
            </div>

            {/* Slide 1: Sovereign Trust Title */}
            <section className="deck-slide deck-slide-dark min-h-screen w-full flex items-center justify-center p-4 sm:p-8 pt-20 sm:pt-8 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 sm:space-y-12"
                    >
                        <div className="text-blue font-black uppercase tracking-[0.3em] sm:tracking-[0.6em] text-[10px] sm:text-xs">Drop 01 · 2026-2036</div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8] text-white">
                            Sovereign<br />
                            <span className="text-white/20">Trust</span>
                        </h1>
                        <p className="text-lg sm:text-2xl md:text-4xl text-white/60 max-w-3xl leading-tight tracking-tight">
                            The machine-readable protocol for the <span className="text-white">Circular Economy</span>.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-10 pt-4 sm:pt-12 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/20">
                            <div className="flex items-center gap-2 sm:gap-3"><MapPin size={12} className="text-blue sm:hidden" /><MapPin size={14} className="text-blue hidden sm:block" /> Dhaka · Dubai</div>
                            <div className="flex items-center gap-2 sm:gap-3"><Calendar size={12} className="text-blue sm:hidden" /><Calendar size={14} className="text-blue hidden sm:block" /> Q2 2026 Mandate</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Slide 2: The Mechanic (Industrial Zen) */}
            <section className="deck-slide deck-slide-light min-h-screen w-full flex items-center justify-center bg-white text-black p-4 sm:p-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
                        <div className="space-y-6 sm:space-y-12 order-2 lg:order-1">
                            <div className="text-blue font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs underline decoration-2 underline-offset-8">The Mechanic</div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">Zero Friction.<br />High Signal.</h2>
                            <p className="text-base sm:text-xl text-black/60 leading-relaxed font-medium">
                                Customers care about <span className="text-black font-bold">Revenue & Compliance</span>. Wavelink converts physical taps into institutional-grade trust data in 2 seconds.
                            </p>
                            <div className="space-y-3 sm:space-y-6 pt-4 sm:pt-8">
                                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest"><CheckCircle size={16} className="text-blue sm:hidden" /><CheckCircle size={18} className="text-blue hidden sm:block" /> NFC Origin Fingerprint</div>
                                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest"><CheckCircle size={16} className="text-blue sm:hidden" /><CheckCircle size={18} className="text-blue hidden sm:block" /> Machine-Readable Asset ID</div>
                                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest"><CheckCircle size={16} className="text-blue sm:hidden" /><CheckCircle size={18} className="text-blue hidden sm:block" /> EU ESPR Audit Readiness</div>
                            </div>
                        </div>
                        <div className="p-8 sm:p-12 md:p-24 border-[10px] sm:border-[20px] border-black/5 bg-slate-50 flex flex-col items-center justify-center order-1 lg:order-2">
                            <div className="text-7xl sm:text-[10rem] md:text-[12rem] font-bold tracking-tighter leading-none">2s</div>
                            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mt-2 sm:mt-4 opacity-40">Time to Compliance</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 3: Market Logic (HBS Metric) */}
            <section className="deck-slide deck-slide-dark min-h-screen w-full flex items-center justify-center bg-[#04080F] p-4 sm:p-8">
                <div className="container mx-auto max-w-6xl text-center space-y-10 sm:space-y-24">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="text-blue font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs">The Killer Metric</div>
                        <h2 className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-tighter leading-none text-white">
                            +9% Revenue
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-12 pb-6 sm:pb-12 border-b border-white/5">
                        <p className="text-lg sm:text-2xl md:text-4xl text-white/60 font-medium tracking-tight">
                            Harvard Business School (2025): A mere 1-star increase in rating leads to a <span className="text-white">5–9% causal revenue increase</span>.
                        </p>
                        <p className="text-sm sm:text-lg text-white/30 leading-relaxed max-w-2xl mx-auto">
                            Wavelink captures the "Silent 70%" of happy customers by reducing review friction from 60 seconds to 2 seconds.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-left">
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">270%</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Conversion Multiplier</div>
                            <p className="text-xs text-white/30 mt-2 sm:mt-4 leading-relaxed font-medium">Displaying 5+ reviews increases conversion significantly over zero reviews.</p>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">88%</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Paper Obsolescence</div>
                            <p className="text-xs text-white/30 mt-2 sm:mt-4 leading-relaxed font-medium">Disposable business cards have an 88% throw-away rate within one week.</p>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">70%</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Capture Rate</div>
                            <p className="text-xs text-white/30 mt-2 sm:mt-4 leading-relaxed font-medium">Capturing the previously "silent" sentiment through NFC-enabled touchpoints.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 4: Regulatory Mandate (EU/Dubai) */}
            <section className="deck-slide deck-slide-light min-h-screen w-full flex items-center justify-center bg-white text-black p-4 sm:p-8">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-10 sm:space-y-20">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="text-blue font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs">Global Mandates</div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">Mechanically<br />Inevitable.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-16">
                            <div className="space-y-4 sm:space-y-8 p-6 sm:p-12 bg-black/5">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">EU ESPR 2026/2027</div>
                                <h4 className="text-xl sm:text-3xl font-bold tracking-tight">Digital Product Passport (DPP)</h4>
                                <p className="text-sm sm:text-base text-black/60 leading-relaxed font-medium">
                                    Textiles entering the EU now require machine-readable traceability. Brands without passports cannot operate.
                                </p>
                            </div>
                            <div className="space-y-4 sm:space-y-8 p-6 sm:p-12 bg-black/5">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Dubai Strategy 2041</div>
                                <h4 className="text-xl sm:text-3xl font-bold tracking-tight">Zero Landfill Mandate</h4>
                                <p className="text-sm sm:text-base text-black/60 leading-relaxed font-medium">
                                    AED 74.5B budget penalizing untraceable waste. Wavelink provides the required "Origin Fingerprint."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 5: Revenue Alpha (Hick's Law focus) */}
            <section className="deck-slide deck-slide-dark min-h-screen w-full flex items-center justify-center bg-[#04080F] p-4 sm:p-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
                        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 md:p-24 flex flex-col items-center justify-center text-center">
                            <BarChart3 className="w-12 h-12 sm:w-24 sm:h-24 text-blue mb-4 sm:mb-8" />
                            <div className="text-4xl sm:text-6xl font-bold tracking-tighter text-white">Alpha</div>
                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/30 mt-2 sm:mt-4 italic">The Yield of Trust</p>
                        </div>
                        <div className="space-y-6 sm:space-y-12">
                            <div className="text-blue font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs underline decoration-2 underline-offset-8">Scale Logic</div>
                            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white leading-tight">Scale the Next Billion<br />Trust Points.</h2>
                            <p className="text-base sm:text-xl text-white/40 leading-relaxed font-medium italic">
                                "By designing for the customer, the UI becomes invisible. They stop looking at the software and start looking at the trust and revenue it generates."
                            </p>
                            <div className="pt-4 sm:pt-8 grid grid-cols-2 gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest text-white/20">
                                <div className="space-y-1 sm:space-y-2">
                                    <p className="text-blue">Core TAM</p>
                                    <p>400,000+ Businesses</p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <p className="text-blue">Serviceable</p>
                                    <p>120,000+ Units</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 6: Institutional Ask */}
            <section className="deck-slide deck-slide-blue min-h-screen w-full flex items-center justify-center bg-blue text-white p-4 sm:p-8 relative overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center space-y-8 sm:space-y-16 relative z-10">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="text-white/40 font-black uppercase tracking-[0.4em] sm:tracking-[0.8em] text-[10px] sm:text-xs">End of Drop 01</div>
                        <h2 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none">Capture the<br />Void.</h2>
                    </div>
                    <div className="flex flex-col items-center gap-6 sm:gap-12">
                        <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-white text-blue px-8 sm:px-16 py-6 sm:py-10 rounded-none font-black text-xl sm:text-3xl hover:scale-105 transition-all shadow-2xl"
                                >
                                    Join the Journey
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-white border-none p-8 sm:p-12 text-black rounded-none">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl sm:text-4xl font-bold tracking-tighter mb-2 sm:mb-4 text-black">
                                        Institutional Portal
                                    </DialogTitle>
                                    <p className="text-sm sm:text-base text-black/60 font-medium leading-relaxed">
                                        Vetting required for secure access to the full investor data room.
                                    </p>
                                </DialogHeader>
                                <form onSubmit={handleLeadSubmit} className="space-y-4 sm:space-y-8 mt-6 sm:mt-12">
                                    <Input
                                        type="email"
                                        placeholder="institutional@firm.com"
                                        value={leadEmail}
                                        onChange={(e) => setLeadEmail(e.target.value)}
                                        className="h-12 sm:h-16 bg-black/5 border-none rounded-none px-4 sm:px-6 text-base sm:text-xl focus:ring-0"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmittingLead}
                                        className="w-full h-12 sm:h-16 bg-blue hover:bg-blue/90 text-white rounded-none font-black text-base sm:text-xl"
                                    >
                                        {isSubmittingLead ? <Loader2 className="animate-spin" /> : "Request Access"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-white/40">
                             Institutional Grade · Secure Access · Wavelink
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InvestorDeck;
