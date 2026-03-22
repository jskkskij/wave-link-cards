import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart3,
    TrendingUp,
    PieChart,
    Target,
    Zap,
    AlertCircle,
    ArrowLeft,
    XCircle,
    CheckCircle2
} from "lucide-react";

const Investors = () => {
    const navigate = useNavigate();

    const statuses = [
        {
            title: "Conversion Engine",
            status: "In Progress",
            description: "Optimization in progress - target 3.5% CR",
            icon: XCircle,
            color: "text-red-400",
            bg: "bg-red-500/10",
            details: "We are currently refining the user funnel and A/B testing checkout flows to maximize conversion rates."
        },
        {
            title: "Distribution Engine",
            status: "Starting",
            description: "Logistics infrastructure rollout initiated",
            icon: AlertCircle,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            details: "Initial rollout of logistics and delivery partnerships is underway. Building robust supply chain infrastructure."
        }
    ];

    return (
        <div className="min-h-screen bg-[#060b13] text-white selection:bg-blue/30 overflow-x-hidden font-sans">
            {/* Background Decor - Immersive Blue Luxury Aura */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-glow-wave opacity-40 rounded-full blur-[180px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-glow-teal opacity-20 rounded-full blur-[160px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue/[0.03] blur-[200px]" />
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24 animate-fade-in">
                    <div className="text-left space-y-8">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                            className="text-white/60 hover:text-white hover:bg-white/10 -ml-4 rounded-full px-6 transition-luxury border border-transparent hover:border-white/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 leading-tight tracking-[calc(-0.04em)] bg-gradient-to-r from-white via-white to-blue/50 bg-clip-text text-transparent">
                            Investor Relations
                        </h1>
                        <p className="text-2xl md:text-3xl text-white/90 max-w-4xl font-medium leading-relaxed !tracking-tight">
                            Building the <span className="text-blue font-bold shadow-blue/20">AI Trust Infrastructure</span> with NFC Business cards and Review stands for feedbacks.
                        </p>
                    </div>
                    <div className="lg:flex gap-4">
                        <div className="p-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center gap-6 shadow-2xl">
                            <div className="w-16 h-16 rounded-2xl bg-blue/20 flex items-center justify-center shadow-luxury-glow border border-blue/20">
                                <TrendingUp className="text-blue w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-blue font-black mb-1 opacity-80">Phase 2.1</p>
                                <p className="text-2xl font-bold font-serif text-white">Seed Stage</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Grid */}
                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    {statuses.map((item, index) => {
                        const Icon = item.icon;
                        const isStarting = item.status === "Starting";
                        return (
                            <Card key={index} className="bg-[#0c1425] backdrop-blur-3xl border-white/10 text-white overflow-hidden group hover:border-blue/40 transition-all duration-700 animate-fade-in-up rounded-[3rem] shadow-2xl" style={{ animationDelay: `${index * 0.15}s` }}>
                                <CardHeader className="p-10 pb-6">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`${item.bg} p-5 rounded-2xl border border-white/5`}>
                                            <Icon className={`w-10 h-10 ${item.color}`} />
                                        </div>
                                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border ${item.bg} ${item.color} border-white/10`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <CardTitle className="text-4xl font-serif mt-2 font-bold text-white tracking-tight">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-10 pb-12 space-y-8">
                                    <p className="text-2xl font-bold text-white/95 leading-tight">
                                        {item.description}
                                    </p>
                                    <p className="text-lg text-white/60 leading-relaxed font-medium">
                                        {item.details}
                                    </p>

                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-black text-white/30 mb-4">
                                            <span>Scale Progress</span>
                                            <span className={item.color}>{isStarting ? "15%" : "45%"}</span>
                                        </div>
                                        <div className={`h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5`}>
                                            <div
                                                className={`h-full ${item.color.replace('text-', 'bg-')} transition-all duration-2000 ease-out rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                                                style={{ width: isStarting ? "15%" : "45%" }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Infrastructure Roadmap Section - Fixed Contrast & Visibility */}
                <div className="relative group/roadmap">
                    <div className="absolute inset-0 bg-blue/20 blur-[120px] opacity-0 group-hover/roadmap:opacity-20 transition-opacity duration-1000" />
                    <Card className="bg-[#0a0f1a] backdrop-blur-3xl border border-white/10 text-white p-10 md:p-20 animate-fade-in-up rounded-[3.5rem] shadow-3xl overflow-hidden relative z-10" style={{ animationDelay: '0.4s' }}>
                        <div className="grid lg:grid-cols-12 gap-20">
                            <div className="lg:col-span-7 space-y-12">
                                <div className="space-y-4">
                                    <div className="text-blue font-black uppercase tracking-[0.4em] text-xs flex items-center gap-3">
                                        <Zap size={16} className="fill-blue text-blue" aria-hidden="true" />
                                        Infrastructure Layer
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tighter">
                                        Our <span className="italic font-normal text-white/40">Strategy</span>
                                    </h2>
                                </div>

                                <div className="space-y-10">
                                    {[
                                        { title: "NFC Pulse Architecture", desc: "Deploying 3k+ intelligent nodes as our first milestone to form a decentralized trust fabric." },
                                        { title: "Review Stand Bio-Sync", desc: "Standalone biometric-verified touchpoints for high-fidelity consumer feedback settlement." },
                                        { title: "AI Trust Settlement", desc: "Real-time neural processing of physical interactions into immutable institutional-grade trust scores." }
                                    ].map((point, i) => (
                                        <div key={i} className="flex gap-8 group/item">
                                            <div className="mt-1 w-14 h-14 rounded-3xl bg-white/[0.03] flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-blue/50 transition-all duration-500 shadow-xl">
                                                <CheckCircle2 className="w-7 h-7 text-blue opacity-50 group-hover/item:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-2xl tracking-tight text-white group-hover/item:text-blue transition-colors duration-300">{point.title}</h4>
                                                <p className="text-white/60 text-lg leading-relaxed font-medium">{point.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-10 p-12 bg-white/[0.02] rounded-[3rem] border border-white/5 relative shadow-inner">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue/30 blur-[60px] rounded-full animate-pulse-subtle" />
                                    <div className="relative text-8xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl">98%</div>
                                </div>
                                <div className="text-center space-y-3">
                                    <p className="text-xs uppercase tracking-[0.5em] text-blue font-black shadow-luxury-glow">Infrastructure Reliability</p>
                                    <p className="text-white/30 text-xs font-medium max-w-[180px] mx-auto leading-relaxed">System uptime verified across 24 nodes globally.</p>
                                </div>
                                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-[3px] border border-white/10">
                                    <div className="w-[98%] h-full bg-gradient-to-r from-blue via-blue to-glow-teal rounded-full shadow-[0_0_20px_rgba(0,119,255,0.6)]" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Institutional CTA */}
                <div className="mt-32 text-center animate-fade-in space-y-12">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-blue/10 border border-blue/20 rounded-full">
                            <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px]">Institutional Grade</p>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
                            Scale the <span className="italic text-white/50">Next Billion</span> Trust Points
                        </h3>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <Button
                            onClick={() => navigate("/investor-deck")}
                            className="bg-blue hover:bg-blue/90 text-white rounded-full px-20 py-10 text-2xl font-black tracking-tight transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,119,255,0.4)] group border-4 border-transparent hover:border-white/10"
                        >
                            Request Presentation
                            <Zap className="ml-4 w-7 h-7 group-hover:fill-white transition-all animate-pulse" />
                        </Button>
                        <p className="text-white/40 text-sm font-medium tracking-wide">Secure institutional portal access available upon vetting.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investors;
