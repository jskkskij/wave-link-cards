import { motion } from "framer-motion";
import { Smartphone, MousePointer2, Filter, Share2, BellRing, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface FunnelStepProps {
    icon: any;
    title: string;
    description: string;
    index: number;
}

const FunnelStep = ({ icon: Icon, title, description, index }: FunnelStepProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex flex-col items-start text-left p-10 bg-white border border-muted transition-luxury hover:bg-warm-gray group"
    >
        <div className="w-12 h-12 flex items-center justify-start mb-8 transition-luxury group-hover:scale-110">
            <Icon className="w-6 h-6 text-foreground group-hover:text-blue transition-luxury" />
        </div>
        <h3 className="text-foreground font-serif font-bold mb-4 text-2xl tracking-tight leading-tight">{title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed font-medium tracking-tight mb-8">{description}</p>

        <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
            {`Stage 0${index + 1}`}
        </div>
    </motion.div>
);

const GrowthFunnel = ({ lang = "en" }: { lang?: Language }) => {
    const funnelSteps = [
        {
            icon: Smartphone,
            title: lang === "en" ? "Initial Engagement" : "প্রাথমিক সংযুক্তি",
            description: lang === "en" ? "A simple physical tap initiates a world-class digital transition." : "একটি স্মার্ট ট্যাপ ডিজিটাল রূপান্তরের শুভ সূচনা করে।"
        },
        {
            icon: MousePointer2,
            title: lang === "en" ? "Curated Experience" : "পরিশীলিত অভিজ্ঞতা",
            description: lang === "en" ? "Instant immersion into a high-performance profile infrastructure." : "একটি হাই-পারফরম্যান্স প্রোফাইলে তাৎক্ষণিক প্রবেশ।"
        },
        {
            icon: Filter,
            title: lang === "en" ? "Reputation Logic" : "সুনাম সুরক্ষা",
            description: lang === "en" ? "Sophisticated filtering to ensure only excellence hits your record." : "আপনার পেশাদার সুনাম অক্ষুণ্ণ রাখতে উন্নত ফিল্টার।"
        },
        {
            icon: Share2,
            title: lang === "en" ? "Streamlined Review" : "সহজ পর্যালোচনা",
            description: lang === "en" ? "Direct pathways to compound your digital credibility instantly." : "আপনার ডিজিটাল গ্রহণযোগ্যতা বৃদ্ধির সহজতম পথ।"
        },
        {
            icon: BellRing,
            title: lang === "en" ? "Sophisticated Follow-up" : "উন্নত ফলো-আপ",
            description: lang === "en" ? "Engineered sequences to maintain every professional bridge." : "পেশাদার সম্পর্ক বজায় রাখতে উন্নত অটোমেশন।"
        }
    ];

    return (
        <section className="py-12 lg:py-32 bg-background relative" id="funnel">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="max-w-3xl mb-12 md:mb-20 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-blue font-bold uppercase tracking-[0.3em] text-[9px] sm:text-[10px] md:text-xs mb-3 sm:mb-4 md:mb-6"
                    >
                        {lang === "en" ? "The Methodology" : "কার্যপ্রণালী"}
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif text-foreground mb-4 md:mb-8 leading-[1.1] font-bold tracking-[-0.04em]">
                        {lang === "en" ? "The Growth Infrastructure." : "বিকাশের অবকাঠামো।"}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-muted-foreground leading-tight tracking-tight font-medium max-w-2xl">
                        {lang === "en"
                            ? "A world-class process engineered to transform every physical interaction into a lasting digital asset."
                            : "প্রতিটি শারীরিক টাচপয়েন্টকে একটি দীর্ঘস্থায়ী ডিজিটাল সম্পদে রূপান্তর করার জন্য একটি উন্নত প্রক্রিয়া।"}
                    </p>
                </div>

                {/* Minimalist Grid Implementation */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-muted/30 border border-muted mb-12 md:mb-20 lg:mb-32">
                    {funnelSteps.map((step, idx) => (
                        <FunnelStep key={idx} {...step} index={idx} />
                    ))}
                </div>

                {/* Advanced Performance Moment */}
                <div className="bg-warm-gray border border-muted p-6 md:p-12 lg:p-20 relative overflow-hidden transition-luxury">
                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-6 mb-16">
                            <span className="text-foreground font-bold text-[10px] uppercase tracking-[0.3em] border-b border-blue pb-1">
                                {lang === "en" ? "System Optimization" : "সিস্টেম অপ্টিমাইজেশান"}
                            </span>
                            <span className="text-blue font-bold text-xs flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                                {lang === "en" ? "Exquisite ROI Performance" : "উন্নত রিটার্ন পারফরম্যান্স"}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-20 md:gap-32">
                            <div className="flex flex-col gap-8">
                                <h4 className="text-foreground text-2xl font-serif font-bold tracking-tight">
                                    {lang === "en" ? "Integrity Sentinel" : "কাঠামোগত নিরাপত্তা"}
                                </h4>
                                <p className="text-muted-foreground text-base leading-relaxed tracking-tight font-medium">
                                    {lang === "en"
                                        ? "Subtle routing protocols ensure friction is resolved privately, preserving your public excellence."
                                        : "উন্নত রাউটিং লজিক নিশ্চিত করে যে কোনো সমস্যা ব্যক্তিগতভাবে সমাধান করা হয়।"}
                                </p>
                            </div>

                            <div className="flex flex-col gap-8">
                                <h4 className="text-foreground text-2xl font-serif font-bold tracking-tight">
                                    {lang === "en" ? "Credibility Catalyst" : "বিশ্বাসযোগ্যতার শক্তি"}
                                </h4>
                                <p className="text-muted-foreground text-base leading-relaxed tracking-tight font-medium">
                                    {lang === "en"
                                        ? "Engineered pathways that empower your satisfied advocates to amplify your global reputation."
                                        : "সন্তুষ্ট ব্যক্তিদের মাধ্যমেই আপনার বৈশ্বিক সুনাম আরও দৃঢ় হবে।"}
                                </p>
                            </div>

                            <div className="flex flex-col gap-8">
                                <h4 className="text-foreground text-2xl font-serif font-bold tracking-tight">
                                    {lang === "en" ? "Professional Bridge" : "পেশাদার সেতুবন্ধন"}
                                </h4>
                                <p className="text-muted-foreground text-base leading-relaxed tracking-tight font-medium">
                                    {lang === "en"
                                        ? " Sophisticated automation sequences that maintain momentum across the professional lifecycle."
                                        : "উন্নত অটোমেশন সিকোয়েন্স যা আপনার পেশাদার যাত্রায় গতির সঞ্চার করে।"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthFunnel;
