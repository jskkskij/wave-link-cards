import { useEffect, useState, useRef } from "react";
import {
    ShieldCheck, MapPin, Calendar, Ghost, FileX,
    TrendingDown, Activity, Scissors, Dumbbell,
    Target, CheckCircle, TrendingUp, Award, Users,
    Info, Rocket, Zap, ArrowLeft, Download, Send, Loader2
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
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
        "Title",
        "The Trust Gap",
        "Solution Overview",
        "Market Opportunity",
        "Impact Metrics",
        "Final Ask"
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
        <div ref={containerRef} className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
            {/* Navigation Dots */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${currentSlide === index
                            ? "bg-blue-600 border-white scale-125 shadow-lg"
                            : (currentSlide === 0 || currentSlide === 4 || currentSlide === 5)
                                ? "bg-white/30 border-transparent hover:bg-white/50"
                                : "bg-slate-300 border-transparent hover:bg-slate-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Back Button & Download */}
            <div className="fixed top-6 left-6 z-50 flex gap-4 print:hidden">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/investors")}
                    className={`rounded-full px-6 backdrop-blur-md border ${(currentSlide === 0 || currentSlide === 4 || currentSlide === 5)
                        ? "text-white hover:bg-white/10 border-white/20"
                        : "text-slate-900 hover:bg-slate-900/5 border-slate-900/10"
                        }`}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                    onClick={handleDownload}
                    className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                >
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
            </div>

            {/* Slide 1: Title */}
            <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container mx-auto px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
                            <ShieldCheck className="w-5 h-5 text-cyan-400" />
                            <span className="text-sm font-medium tracking-wider uppercase">Verified by WaveLink</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tighter text-white">
                            Trusted Feedback<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">for High-Traffic</span><br />
                            Businesses
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
                            Transforming footfall into verifiable digital assets in the Bangladeshi economy.
                        </p>

                        <div className="flex flex-wrap gap-8 text-sm text-slate-400">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-400" />
                                <span>WaveLink Technologies | Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <span>2025 Confidential Investor Presentation</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Slide 2: The Trust Gap */}
            <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 py-20">
                <div className="container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight">The <span className="text-red-500">Trust Gap</span> in Physical Businesses</h2>
                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                            Businesses struggle to capture verified feedback. In Bangladesh, millions of transactions happen daily, but <span className="font-bold text-slate-900 underline decoration-red-500/30">80% of customer sentiment</span> is lost to the "Analog Void."
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            { icon: Ghost, title: "Silent Customers", text: "Most customers leave without a trace, taking their valuable feedback and sentiment with them.", color: "red" },
                            { icon: FileX, title: "Unverified Data", text: "Paper forms are ignored or faked. Online reviews are plagued by bots and unverified noise.", color: "orange" },
                            { icon: TrendingDown, title: "Lost Revenue", text: "Poor online ratings and lack of social proof drive potential customers away to competitors.", color: "amber" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-[2rem] p-10 shadow-xl border-t-8 border-${item.color}-500 group hover:-translate-y-2 transition-all duration-500`}
                            >
                                <div className={`w-20 h-20 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Slide 3: Solution Overview */}
            <section className="min-h-screen w-full flex items-center justify-center bg-white py-20">
                <div className="container mx-auto px-8">
                    <div className="mb-16">
                        <div className="w-1.5 h-16 bg-blue-600 mb-8 rounded-full" />
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">Built for Trust-Sensitive<br />Businesses</h2>
                        <p className="text-xl sm:text-2xl text-slate-500 font-medium tracking-tight">One tap. Verified feedback. Measurable growth.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Activity, title: "Clinics", text: "Patient confidence through verified reviews.", tag: "Real-time alerts", color: "blue" },
                            { icon: Scissors, title: "Salons", text: "Transforming service quality into digital social proof.", tag: "Fastest adoption in SA", color: "rose" },
                            { icon: Dumbbell, title: "Gyms", text: "Capturing post-workout engagement instantly.", tag: "+35% Retention", color: "amber" },
                            { icon: Target, title: "Turfs", text: "Data-driven management for sports hubs.", tag: "Sponsor-ready data", color: "indigo" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-[2rem] p-8 hover:bg-slate-50 transition-all duration-500 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl"
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm",
                                    item.color === 'blue' && "bg-blue-50 text-blue-600",
                                    item.color === 'rose' && "bg-rose-50 text-rose-600",
                                    item.color === 'amber' && "bg-amber-50 text-amber-600",
                                    item.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                )}
                                >
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-500 mb-6 leading-relaxed font-medium">{item.text}</p>
                                <div className={cn(
                                    "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-full w-fit",
                                    item.color === 'blue' && "bg-blue-50 text-blue-600",
                                    item.color === 'rose' && "bg-rose-50 text-rose-600",
                                    item.color === 'amber' && "bg-amber-50 text-amber-600",
                                    item.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                )}>
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>{item.tag}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Slide 4: Market Opportunity */}
            <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-20">
                <div className="container mx-auto px-8 max-w-7xl">
                    <div className="mb-16">
                        <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 block">Market Intelligence</span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-2 mb-6 tracking-tighter">The Real TAM: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">First Principles</span></h2>
                        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
                            Transparent market sizing combining official registration data with ground-truth industry intelligence.
                            Our 400K+ TAM represents the <span className="font-bold text-slate-900 border-b-2 border-blue-600/20">3-5 year digital transition opportunity</span>.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Chart Area */}
                        <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <h3 className="font-bold text-xl text-slate-800">Market Size: Registered vs. Capacity</h3>
                                <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                                        <span className="text-slate-600">Registered</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        <span className="text-slate-400">Potential</span>
                                    </div>
                                </div>
                            </div>

                            {[
                                { label: "Clinics & Diagnostics", meta: "DGHS Registered", width: "15%", val: "~16-18k", target: "200k+" },
                                { label: "Beauty Parlors", meta: "ABSOB Verified", width: "65%", val: "~100-120k", target: "150k+" },
                                { label: "Fitness Centers", meta: "Urban Core", width: "25%", val: "~2.5-4k", target: "15k+" },
                                { label: "Sports Turfs", meta: "Premium Venues", width: "40%", val: "~350-500", target: "1k+" }
                            ].map((bar, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <span className="font-bold text-slate-900 text-lg block">{bar.label}</span>
                                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{bar.meta}</span>
                                        </div>
                                    </div>
                                    <div className="relative h-12 md:h-14 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: bar.width }}
                                            transition={{ duration: 1.5, delay: i * 0.1 }}
                                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-end px-6 text-white text-sm font-black shadow-lg shadow-blue-500/20"
                                        >
                                            {bar.val}
                                        </motion.div>
                                        <div className="ml-6 text-xs text-slate-400 font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                                            Growth Path → {bar.target}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Core Serviceable</div>
                                <div className="text-4xl sm:text-6xl font-bold mb-2 tracking-tighter">~120k</div>
                                <div className="text-slate-400 text-sm font-medium">Verified establishments (2025)</div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                <div className="text-blue-200 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Long-Term TAM</div>
                                <div className="text-4xl sm:text-6xl font-bold mb-2 tracking-tighter">400k+</div>
                                <div className="text-blue-100 text-sm font-medium">Digital transition opportunity</div>
                            </motion.div>

                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                        <Info className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-2">Methodology</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                            Aggregated DGHS registrations, ABSOB surveys, and urban mapping. Adjusted for CAGR 2024-2027.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Slide 5: Impact Metrics */}
            <section className="min-h-screen w-full flex items-center justify-center bg-[#020617] text-white py-20">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">Measurable Impact</h2>
                        <p className="text-2xl text-slate-400 font-medium tracking-tight">Real results across our primary verticals</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
                        {[
                            { val: "+35%", title: "Member Retention", tag: "Gyms & Spas", color: "emerald" },
                            { val: "+40%", title: "Weekend Bookings", tag: "Sports Turfs", color: "cyan" },
                            { val: "100%", title: "Verified Presence", tag: "Data Integrity", color: "violet" }
                        ].map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-12 text-center border border-white/10 group hover:bg-white/10 transition-all duration-500 shadow-2xl"
                            >
                                <div className={`text-5xl sm:text-7xl font-bold text-${metric.color}-400 mb-6 group-hover:scale-110 transition-transform duration-500 tracking-tighter`}>{metric.val}</div>
                                <h3 className="text-2xl font-bold mb-3 text-white">{metric.title}</h3>
                                <p className="text-slate-300 text-base font-semibold">{metric.tag}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        {/* Dynamic Milestone Tracking (Scale Progress) */}
                        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                            {[
                                { key: 'cards', color: 'text-rose-400', barColor: 'bg-rose-500' },
                                { key: 'reviews', color: 'text-amber-400', barColor: 'bg-amber-500' }
                            ].map((milestone) => {
                                const data = (CONFIG.MILESTONES as any)[milestone.key];
                                const percentage = Math.round((data.current / data.target) * 100);
                                return (
                                    <div key={milestone.key} className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Scale Progress</h4>
                                                <p className="text-xl font-bold text-white tracking-tight">{data.label}</p>
                                            </div>
                                            <span className={`text-xl font-black ${milestone.color}`}>{percentage}%</span>
                                        </div>
                                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`absolute top-0 left-0 h-full ${milestone.barColor} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <span>{data.current.toLocaleString()} Units</span>
                                            <span>Target: {data.target.toLocaleString()}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Enterprise Infrastructure Box (existing) */}
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12 border border-white/5 shadow-inner">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold tracking-tight text-white">Enterprise Infrastructure</h3>
                                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                    Operational dashboards for Private Hospitals & Enterprise Care units. Real-time satisfaction measurement across OPD, IPD, and Pharmacy with high-fidelity institutional reporting.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-10">
                                {[
                                    { val: "96%", label: "OPD" },
                                    { val: "91%", label: "IPD" },
                                    { val: "88%", label: "PHRM" }
                                ].map((item, i) => (
                                    <div key={i} className="text-center group">
                                        <div className="text-4xl font-bold text-blue-400 group-hover:scale-110 transition-transform">{item.val}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-3">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Slide 6: Final Ask */}
            <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white text-center py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[200px]" />
                </div>

                <div className="container mx-auto px-8 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full mb-12 border border-white/20">
                            <Rocket className="w-5 h-5 text-blue-300" />
                            <span className="font-bold tracking-[0.2em] uppercase text-xs">Investment Opportunity</span>
                        </div>

                        <h2 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-10 leading-[0.9] tracking-tighter text-white">
                            Capture the<br />
                            <span className="text-blue-300">Analog Void</span>
                        </h2>

                        <p className="text-2xl md:text-3xl text-blue-100 mb-16 leading-relaxed max-w-3xl mx-auto font-medium opacity-90">
                            WaveLink is positioned to digitize <span className="text-white font-bold">400,000+</span> physical businesses, transforming silent transactions into verifiable digital assets.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
                            {[
                                { val: "120k", label: "Core Serviceable Market", icon: Users },
                                { val: "4", label: "High-Value Verticals", icon: Zap },
                                { val: "100%", label: "Data Integrity Layer", icon: ShieldCheck }
                            ].map((box, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group hover:bg-white/20 transition-all duration-500">
                                    <box.icon className="w-8 h-8 text-blue-300 mb-6 group-hover:rotate-12 transition-transform" />
                                    <div className="text-4xl sm:text-5xl font-bold mb-2 tracking-tighter">{box.val}</div>
                                    <div className="text-blue-200 text-[10px] sm:text-sm font-bold uppercase tracking-widest">{box.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-8">
                            <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => window.location.href = "/#order"}
                                        className="bg-white text-blue-800 px-16 py-10 rounded-full font-black text-2xl hover:bg-blue-50 transition-all hover:scale-105 shadow-2xl shadow-white/10"
                                    >
                                        BEGIN JOURNEY
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md bg-white rounded-[2rem] border-none shadow-2xl p-10">
                                    <DialogHeader>
                                        <DialogTitle className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                                            Stay Connected
                                        </DialogTitle>
                                        <p className="text-slate-500 font-medium">
                                            Join our exclusive lead list to receive updates on WaveLink's growth and investment milestones.
                                        </p>
                                    </DialogHeader>
                                    <form onSubmit={handleLeadSubmit} className="space-y-6 mt-6">
                                        <div className="space-y-2">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={leadEmail}
                                                onChange={(e) => setLeadEmail(e.target.value)}
                                                className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmittingLead}
                                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all group"
                                        >
                                            {isSubmittingLead ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <>
                                                    Subscribe to Leads
                                                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <p className="text-blue-200 text-sm font-bold tracking-widest uppercase opacity-60">
                                WaveLink Technologies | Dhaka, Bangladesh | 2025
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default InvestorDeck;
