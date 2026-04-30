import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Building2, TrendingUp, Handshake, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILES = [
    {
        id: "dubai",
        label: "Dubai Hotelier",
        title: "Compliance in 2 Seconds",
        metric: "100%",
        subMetric: "Waste Strategy 2041 Compliant",
        action: "Get Digital Passport",
        icon: Building2,
        color: "#0077FF",
        context: "The Municipality knows you are compliant. Zero Landfill Mandate satisfied instantly."
    },
    {
        id: "bangladesh",
        label: "Bangladesh Factory MD",
        title: "Global Market Access",
        metric: "12",
        subMetric: "Global Buyers Trusted",
        action: "Initiate Sale",
        icon: Shield,
        color: "#00C2FF",
        context: "Your Jhut bale now has an Origin Fingerprint. Market entry via EU ESPR 2026 guaranteed."
    },
    {
        id: "malaysia",
        label: "Malaysia SME MD",
        title: "Revenue Multiplier",
        metric: "+9%",
        subMetric: "Top-line Revenue Increase",
        action: "Claim Sovereign ID",
        icon: TrendingUp,
        color: "#00E0D1",
        context: "Captured the 'Silent 70%'. HBS Verified: +1 Star rating drives causal revenue growth."
    }
];

const CustomerROIDashboard = () => {
    const [activeId, setActiveId] = useState(PROFILES[0].id);
    const activeProfile = PROFILES.find(p => p.id === activeId)!;

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#04080F] text-white p-4 md:p-12 font-sans selection:bg-blue/30">
            {/* Header - Hick's Law Navigation */}
            <div className="flex flex-wrap gap-4 mb-20">
                {PROFILES.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActiveId(p.id)}
                        className={`px-8 py-4 text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 border-b-2 ${
                            activeId === p.id 
                            ? "border-blue text-blue" 
                            : "border-white/5 text-white/30 hover:text-white/60"
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Industrial Zen Content Area */}
            <div className="relative min-h-[400px] flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="grid lg:grid-cols-2 gap-20 items-center w-full"
                    >
                        {/* High Signal Metric */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-blue/60 mb-8 uppercase tracking-[0.5em] text-[10px] font-black">
                                <activeProfile.icon size={16} />
                                Asset Sovereignty
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none">
                                    {activeProfile.metric}
                                </h2>
                                <p className="text-2xl md:text-3xl font-medium text-white/90 tracking-tight">
                                    {activeProfile.subMetric}
                                </p>
                            </div>
                            <p className="text-lg text-white/40 leading-relaxed max-w-md">
                                {activeProfile.context}
                            </p>
                        </div>

                        {/* Action-Oriented Interface */}
                        <div className="p-12 bg-white/[0.02] border border-white/5 space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-sm uppercase tracking-[0.2em] font-black text-white/60">Institutional Verification</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <Check size={14} className="text-blue" />
                                        EU ESPR 2026 Compliant
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <Check size={14} className="text-blue" />
                                        Machine-Readable Traceability
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <Check size={14} className="text-blue" />
                                        Audit Readiness Guaranteed
                                    </div>
                                </div>
                            </div>

                            <Button 
                                className="w-full h-20 text-xl font-black tracking-tight bg-blue hover:bg-blue/90 text-white transition-all hover:scale-[1.02]"
                            >
                                {activeProfile.action}
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Regulatory Footer */}
            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue">Logic Reference</p>
                    <p className="text-xs font-medium max-w-xs">Harvard Business School (2026): +1 Star Increase = +5–9% Revenue (Causal Analysis).</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue">Global Mandate</p>
                    <p className="text-xs font-medium max-w-xs">EU ESPR 2026: Machine-readable traceability required for all textile products entering the EU.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue">Regional Compliance</p>
                    <p className="text-xs font-medium max-w-xs">Dubai Integrated Waste Strategy 2041: Penalizes untraceable industrial waste (AED 74.5B Budget).</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerROIDashboard;
