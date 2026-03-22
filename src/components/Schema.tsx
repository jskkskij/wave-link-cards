import { Helmet } from "react-helmet-async";

const Schema = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WaveLink Technologies",
        "url": "https://getwaved.ai",
        "logo": "https://getwaved.ai/favicon.ico",
        "sameAs": [
            "https://www.facebook.com/getwaved",
            "https://www.linkedin.com/company/wavelink-tech"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+880-123456789",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["English", "Bengali"]
        }
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "WaveLink NFC Smart Card",
        "image": "https://getwaved.ai/placeholder.svg",
        "description": "Enterprise-grade NFC-powered smart cards for high-performance professional networking and verifiable trust.",
        "brand": {
            "@type": "Brand",
            "name": "WaveLink"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://getwaved.ai/#pricing",
            "priceCurrency": "BDT",
            "price": "599",
            "availability": "https://schema.org/InStock"
        }
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WaveLink Trust Infrastructure",
        "operatingSystem": "Web-based",
        "applicationCategory": "BusinessApplication",
        "description": "Digital Layer for physical business interactions, bridging the gap between in-person meetings and high-trust digital profiles."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Do I need an App to use the card?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Wavelink operates on native NFC protocols. Your profile opens directly in any mobile browser without any third-party app installation."
                }
            },
            {
                "@type": "Question",
                "name": "How does the NFC Review Stand work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "When a customer taps their phone on the stand, it instantly opens your Google or Trustpilot review page. It's designed to capture high-intent feedback at the point of interaction."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a monthly subscription fee?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. We believe in high-utility hardware. You pay once for the card or stand, and the standard digital profile infrastructure is free for life."
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(productSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(softwareSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
        </Helmet>
    );
};

export default Schema;
