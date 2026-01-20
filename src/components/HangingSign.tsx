
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const HangingSign = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay for entrance animation
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToOrder = () => {
        const orderSection = document.querySelector('#order');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/#order';
        }
    };

    return (
        <div
            onClick={scrollToOrder}
            className={cn(
                "fixed z-[60] top-0 right-6 md:right-20 cursor-pointer transition-transform duration-1000 ease-out",
                isVisible ? "translate-y-0" : "-translate-y-full"
            )}
            style={{ willChange: 'transform' }}
        >
            {/* Main Animated Container - Swings as one unit */}
            <div
                className="group relative flex flex-col items-center origin-top animate-swing"
                style={{ animationDuration: '4s' }}
            >
                {/* Ropes/Strings */}
                <div className="flex justify-between w-20 md:w-24 -mb-2 z-0 relative">
                    <div className="w-[2px] h-12 md:h-16 bg-gradient-to-b from-neutral-800 to-neutral-400 shadow-sm"></div>
                    <div className="w-[2px] h-12 md:h-16 bg-gradient-to-b from-neutral-800 to-neutral-400 shadow-sm"></div>
                </div>

                {/* The Sign Board */}
                <div className="relative z-10 origin-top">
                    <div className="bg-navy border-2 border-amber-500/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-lg p-1 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0">

                        {/* Board Texture/Gradient */}
                        <div className="bg-gradient-to-br from-[#1a2333] to-[#0d121c] rounded md:px-5 px-3 py-2 md:py-3 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">

                            {/* Shimmer Effect Overlay */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />

                            {/* Content */}
                            <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-widest mb-0.5 relative z-10 leading-none">
                                Limited Time
                            </span>
                            <h3 className="text-white font-serif font-bold text-lg md:text-2xl leading-none relative z-10 drop-shadow-md">
                                ORDER NOW
                            </h3>

                            {/* Call to Action Indicator */}
                            <div className="mt-1 w-full h-[2px] bg-amber-500/30 rounded-full overflow-hidden relative z-10">
                                <div className="w-1/2 h-full bg-amber-500 animate-shimmer" />
                            </div>
                        </div>

                        {/* Decorative Screws/Rivets */}
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-inner"></div>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-inner"></div>
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-inner"></div>
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-inner"></div>
                    </div>

                    {/* Glow/Reflection behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-xl rounded-full -z-10 group-hover:bg-amber-500/20 transition-colors duration-500"></div>
                </div>
            </div>
        </div>
    );
};

export default HangingSign;
