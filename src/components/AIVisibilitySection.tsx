import { motion } from "framer-motion";
import { Bot, Sparkles, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const AIVisibilitySection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-navy/5" id="ai-visibility">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none paper-texture" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/10 text-sky text-sm font-medium mb-6 border border-sky/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI-Ready Architecture
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif"
                    >
                        Enhanced AI Visibility
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        LLms.txt Generator is your gateway to enhanced AI visibility. Our tool simplifies the process of creating llms.txt files - the new standard for making your website AI-friendly. By generating a structured, markdown-based summary of your site's content, you ensure that AI models like ChatGPT, Claude, and Gemini can better understand and represent your website.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-8 h-full bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-luxury-glow transition-all duration-500">
                            <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center mb-6">
                                <Bot className="w-6 h-6 text-sky" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">LLM Optimization</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Provide AI models with a clean, structured map of your professional identity.
                                Ensure that when someone asks an AI about you or your business, the answer is accurate and up-to-date.
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-8 h-full bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-luxury-glow transition-all duration-500">
                            <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center mb-6">
                                <Search className="w-6 h-6 text-sky" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Discoverability</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                By implementing the llms.txt standard, Wavelink bridges the gap between physical networking and
                                the next generation of AI-driven search and discovery.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIVisibilitySection;
