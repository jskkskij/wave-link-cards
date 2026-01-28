import { Facebook, Instagram, MessageCircle, Music2 } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const TopConnectBar = () => {
    const socials = [
        { icon: Facebook, href: CONFIG.FACEBOOK_LINK, label: "Facebook", color: "hover:text-[#1877F2]" },
        { icon: Instagram, href: CONFIG.INSTAGRAM_LINK, label: "Instagram", color: "hover:text-[#E4405F]" },
        { icon: MessageCircle, href: CONFIG.WHATSAPP_LINK("Hello Wavelink!"), label: "WhatsApp", color: "hover:text-[#25D366]" },
        { icon: Music2, href: CONFIG.TIKTOK_LINK, label: "TikTok", color: "hover:text-[#000000]" }, // Using Music2 as TikTok fallback if Tiktok is missing
    ];

    return (
        <div className="w-full bg-navy/95 backdrop-blur-md border-b border-white/5 py-2 z-[60] relative">
            <div className="container mx-auto px-4 flex justify-between items-center text-[10px] md:text-xs">
                <div className="flex items-center gap-4 text-mist/60">
                    <span className="hidden sm:inline-block">Follow us:</span>
                    <div className="flex items-center gap-3">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "transition-all duration-300 transform hover:scale-110",
                                    social.color
                                )}
                                aria-label={social.label}
                            >
                                <social.icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="text-mist/40 font-medium tracking-wider uppercase flex items-center gap-4">
                    <span className="animate-pulse shadow-luxury-glow px-2 py-0.5 rounded-full bg-sky/10 text-sky border border-sky/20">
                        NFC Powered Connections
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopConnectBar;
