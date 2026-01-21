import { useEffect, useRef } from 'react';

const AdSenseBanner = () => {
    const adRef = useRef<HTMLModElement>(null);
    const hasPushed = useRef(false);

    useEffect(() => {
        try {
            if (adRef.current && !hasPushed.current) {
                // Check if the script is loaded and we haven't already pushed this ad
                // @ts-ignore
                if (window.adsbygoogle) {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    hasPushed.current = true;
                }
            }
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <section className="py-0 bg-secondary/5 border-y border-white/5 flex justify-center overflow-hidden transition-all duration-500">
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
                        data-ad-client="ca-pub-6185927994614530"
                        data-ad-slot="auto"
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
