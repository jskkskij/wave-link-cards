import { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-6185927994614530";
const ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT || "1234567890";

const AdSenseBanner = () => {
    const adRef = useRef<HTMLModElement>(null);
    const hasPushed = useRef(false);
    const retryTimer = useRef<number | null>(null);

    useEffect(() => {
        const tryPush = () => {
            try {
                if (adRef.current && !hasPushed.current) {
                    // @ts-ignore
                    if (window.adsbygoogle) {
                        // @ts-ignore
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        hasPushed.current = true;
                        return;
                    }

                    retryTimer.current = window.setTimeout(tryPush, 350);
                }
            } catch (e) {
                console.error('AdSense error:', e);
            }
        };

        tryPush();

        return () => {
            if (retryTimer.current) {
                window.clearTimeout(retryTimer.current);
                retryTimer.current = null;
            }
        };
    }, []);

    return (
        <section className="py-0 bg-secondary/5 border-y border-white/5 flex justify-center overflow-hidden transition-all duration-500" aria-label="Sponsored ads section">
            <div className="container mx-auto px-4 flex justify-center w-full max-w-4xl">
                {/* 
                     AdSense Display Unit
                     Optimized for mobile:
                     - Stays within standard mobile width (320px+)
                     - Restricted height to remain "thinly seen"
                     - Reserved min-height to prevent CLS (cumulative layout shift)
                 */}
                <div className="w-full min-h-[50px] flex justify-center items-center rounded-lg overflow-hidden">
                    <ins className="adsbygoogle"
                        style={{ display: 'block', width: '100%', maxHeight: '100px' }}
                        data-ad-client={ADSENSE_CLIENT}
                        data-ad-slot={ADSENSE_SLOT}
                        data-ad-format="horizontal"
                        data-full-width-responsive="true"
                        ref={adRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default AdSenseBanner;
