import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Lock, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DataProcessingAgreement = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Global Vibe Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] -left-[5%] w-[60%] h-[60%] bg-glow-wave opacity-60 blur-[120px] animate-pulse-subtle" />
                <div className="absolute bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-glow-teal opacity-30 blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-serif">
                        Data Processing Agreement
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Ensuring your data privacy and GDPR compliance with transparency.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                    <Card className="p-8 border-2 border-primary/20 shadow-luxury bg-card/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-8 h-8 text-sky" />
                                <CardTitle className="text-2xl font-serif">Commitment to Privacy</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                This Data Processing Agreement ("DPA") forms part of the Terms of Service between Wavelink and its customers.
                                It reflects our commitment to abide by applicable data protection laws, including the GDPR, and to protect the
                                personal data of our users and their contacts.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 pt-4">
                                {[
                                    { icon: Lock, title: "Data Security", text: "We implement industry-standard encryption and security protocols." },
                                    { icon: Globe, title: "GDPR Compliance", text: "Fully aligned with EU data protection regulations." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-border/50">
                                        <item.icon className="w-6 h-6 text-sky shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                                            <p className="text-sm">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-8 border border-border/50 bg-card/40">
                        <CardContent className="space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-sky" />
                                    1. Definitions
                                </h3>
                                <p className="text-muted-foreground">
                                    In this DPA, "Personal Data", "Processing", "Controller", and "Processor" have the meanings given to them in the GDPR.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-sky" />
                                    2. Processing of Personal Data
                                </h3>
                                <p className="text-muted-foreground">
                                    Wavelink processes personal data only on behalf of the Customer and in accordance with the Customer's instructions.
                                    The duration of the processing shall be for the term of the Agreement.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-sky" />
                                    3. Technical and Organizational Measures
                                </h3>
                                <p className="text-muted-foreground">
                                    We have implemented and will maintain appropriate technical and organizational measures to protect personal data
                                    against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
                                </p>
                            </section>
                        </CardContent>
                    </Card>

                    <div className="text-center pt-8">
                        <Button
                            onClick={() => navigate("/")}
                            variant="outline"
                            className="rounded-full px-12 py-6 text-lg hover:bg-primary/5 border border-primary/20 transition-all font-serif"
                        >
                            ← Back to Main Page
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataProcessingAgreement;
