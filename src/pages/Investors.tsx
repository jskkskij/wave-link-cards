import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    Zap,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Globe,
    FileText,
    ArrowRight
} from "lucide-react";
import CustomerROIDashboard from "@/components/CustomerROIDashboard";

const Investors = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#04080F] text-white selection:bg-blue/30 overflow-x-hidden font-sans">
            {/* Background Decor - Industrial Zen Minimalist */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-blue/5 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-blue/[0.02] to-transparent" />
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10 max-w-7xl">
                {/* Header - Hick's Law focus */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-32 animate-fade-in">
                    <div className="text-left space-y-10">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                            className="text-white/40 hover:text-white hover:bg-white/5 -ml-4 rounded-full px-6 transition-all duration-500 border border-transparent hover:border-white/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Home
                        </Button>
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none text-white">
                            Sovereign<br />Trust
                        </h1>
                        <p className="text-2xl md:text-3xl text-white/60 max-w-2xl font-medium leading-tight tracking-tight">
                            Eliminating friction. Capture revenue. <br />
                            <span className="text-white">Mechanically inevitable compliance.</span>
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-3xl">
                            <p className="text-[10px] uppercase tracking-[0.5em] text-blue font-black mb-4 opacity-100">Capital Status</p>
                            <p className="text-4xl font-bold text-white tracking-tighter">Seed Series</p>
                            <p className="text-white/30 text-xs mt-2 uppercase tracking-widest font-bold">Phase 2.1 Deployment</p>
                        </div>
                    </div>
                </div>

                {/* Industrial Zen ROI Simulator Section */}
                <div className="mb-48">
                    <div className="mb-16 space-y-4">
                        <div className="text-blue font-black uppercase tracking-[0.4em] text-xs flex items-center gap-3">
                            <Zap size={16} className="fill-blue text-blue" />
                            Customer ROI Simulator
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Elite Interface</h2>
                    </div>
                    <CustomerROIDashboard />
                </div>

                {/* Circular Economy Engine (Reframed Flywheel) */}
                <div className="mb-48 relative">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <div className="text-blue font-black uppercase tracking-[0.4em] text-xs">The Engine</div>
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Circular Economy Logic</h2>
                                <p className="text-xl text-white/40 max-w-md leading-relaxed">
                                    A precise mechanism transforming physical materials into verified digital assets. No theory—just traceability.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Origin Fingerprint", desc: "NFC capture of material data at source (e.g., Textile waste)." },
                                    { title: "Machine-Readable Passport", desc: "EU ESPR 2026/2027 compliant digital identity." },
                                    { title: "Market Sovereignty", desc: "Institutional-grade audit readiness for global export." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="w-12 h-12 bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue/50 transition-all duration-500">
                                            <span className="text-xs font-black text-blue">{i + 1}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-xl tracking-tight text-white">{step.title}</h4>
                                            <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/[0.01] border border-white/5 p-12 md:p-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 blur-[100px] -z-10" />
                            <div className="space-y-12">
                                <div className="text-center group">
                                    <div className="text-8xl md:text-9xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-700">88%</div>
                                    <p className="text-blue font-black uppercase tracking-[0.5em] text-[10px] mt-4">Paper Obsolescence Rate</p>
                                </div>
                                <div className="pt-12 border-t border-white/5 space-y-6">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-white/40 italic">Review Velocity Logic:</span>
                                        <span className="text-blue font-black tracking-widest">+9% Revenue</span>
                                    </div>
                                    <p className="text-xs text-white/20 leading-relaxed max-w-[280px] mx-auto text-center">
                                        Harvard Business School (2025): +1 Star increase leads to causal 5-9% top-line revenue growth.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* White Paper / Fact Sheet Summary Table */}
                <div className="mb-48">
                    <div className="mb-16 space-y-4">
                        <div className="text-blue font-black uppercase tracking-[0.4em] text-xs">Investor Data Room</div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Sovereign Fact Sheet</h2>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Logic Category</th>
                                    <th className="text-left py-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Metric / Mandate</th>
                                    <th className="text-right py-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Reference Source</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { category: "Review Velocity", metric: "+1 Star = +9% Revenue", source: "Harvard Business School" },
                                    { category: "UX Efficiency", metric: "Zero Friction = 3x Adoption", source: "Hick's Law / Laws of UX" },
                                    { category: "Textile Traceability", metric: "Mandatory by 2027", source: "EU ESPR / DPP 2026" },
                                    { category: "Dubai Compliance", metric: "Zero Landfill Mandate", source: "Dubai Waste Strategy 2041" },
                                    { category: "Paper Obsolescence", metric: "88% Throw-away Rate", source: "Wave Connect 2026" }
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-white/[0.02] transition-all duration-300">
                                        <td className="py-8 font-bold text-xl tracking-tight text-white">{row.category}</td>
                                        <td className="py-8 text-white/60 font-medium">{row.metric}</td>
                                        <td className="py-8 text-right text-blue font-black uppercase tracking-widest text-[10px]">{row.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Institutional CTA */}
                <div className="text-center space-y-16">
                    <div className="space-y-6">
                        <h3 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-tight max-w-4xl mx-auto">
                            The Golden Ticket to <span className="text-blue italic">Global Markets</span>
                        </h3>
                    </div>
                    <div className="flex flex-col items-center gap-10">
                        <Button
                            onClick={() => navigate("/investor-deck")}
                            className="bg-blue hover:bg-blue/90 text-white rounded-none px-20 py-10 text-2xl font-black tracking-tight transition-all hover:scale-[1.02] group"
                        >
                            Request Presentation
                            <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                        </Button>
                        <div className="flex items-center gap-3 text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
                            <Shield size={14} /> Institutional Grade Security
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investors;
