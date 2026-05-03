import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { CONFIG } from "@/lib/config";
import { MessageSquareQuote, Mail, Play } from "lucide-react";

// Video review interface
interface VideoReview {
  id: number;
  videoUrl: string;
  customerName: string;
  testimonial: string;
}

const videoReviews: VideoReview[] = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/2Cf40pKBaIg?si=z2xsKS2nEuW7TxX4",
    customerName: "Mohammad Abir Abbas, Creative Technologist/Mechanical Engineer, Bangladesh",
    testimonial: "Amazing product! The NFC card is sleek and professional.",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/q2c7rBADm1c",
    customerName: "Shahadat Sakib, Student, Bangladesh",
    testimonial: "Game changer for networking. Highly recommend!",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/65WefBC-Hg8",
    customerName: "Dr.Mohammad Abed Abbas, Neurosurgeon, BSMMU, Bangladesh",
    testimonial: "As a Med Professional it has given the best identity experience",
  },
];

const ReviewsSection = () => {
  // Track which video is currently playing by its ID
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section id="reviews" className="pt-12 pb-0 md:pt-20 md:pb-0 bg-gradient-to-b from-background via-mist/30 to-background relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <span className="inline-block py-1 px-3 mb-4 rounded-full border border-sky/20 bg-sky/5 text-sky font-medium tracking-widest text-xs uppercase">
            Community Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 font-serif">
            Hear From Our Happy Customers
          </h2>
          <p className="text-mist/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from professionals who have elevated their networking with Wavelink.
          </p>
        </div>

        {/* Video Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16 max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-24 px-0">
          {videoReviews.map((review, index) => {
            const videoId = getYouTubeId(review.videoUrl);
            const isPlaying = playingVideoId === review.id;

            return (
              <Card
                key={review.id}
                className={`w-full md:w-[480px] group overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 border-white/20 bg-white/40 backdrop-blur-md animate-fade-in-up hover:-translate-y-2 ${index === 0 ? "md:col-span-2 md:justify-self-center" : ""
                  }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-0">
                  {/* Video Container */}
                  <div className="relative w-full bg-black rounded-t-xl overflow-hidden aspect-video group-video">
                    {!isPlaying ? (
                      // 1. Thumbnail + Play Button (Facade)
                      <button
                        onClick={() => setPlayingVideoId(review.id)}
                        className="absolute inset-0 w-full h-full flex items-center justify-center group/play cursor-pointer"
                        aria-label={`Play review by ${review.customerName}`}
                      >
                        {/* High Quality Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('mqdefault')) {
                              target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                            }
                          }}
                          alt={`Video thumbnail for ${review.customerName}`}
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/play:opacity-100 transition-opacity duration-300"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/20 transition-colors duration-300" />

                        {/* Custom Animated Play Button */}
                        <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover/play:scale-110 transition-transform duration-300 group-hover/play:bg-white/20">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-sky-500 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-white ml-1 fill-white" />
                          </div>
                          {/* Pulse Effect */}
                          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                        </div>
                      </button>
                    ) : (
                      // 2. Actual Iframe (Loads only on click)
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        // KEY FIX: Use strict-origin-when-cross-origin to allow YouTube to verify domain
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={`Review by ${review.customerName}`}
                      />
                    )}
                  </div>

                  {/* Customer Info */}
                  <div className="p-8 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm relative z-20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-xl border-2 border-white/50 shadow-lg">
                        {review.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-navy font-serif tracking-wide">
                          {review.customerName}
                        </h3>
                      </div>
                    </div>
                    <div className="relative pl-6">
                      <MessageSquareQuote className="absolute top-0 left-0 w-5 h-5 text-sky" />
                      <p className="text-foreground/80 font-medium italic leading-relaxed text-base">
                        "{review.testimonial}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center animate-fade-in-delayed">
          <a
            href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white shadow-2xl border border-sky/10 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer hover:border-sky/30"
          >
            <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center group-hover:bg-sky/20 transition-colors shrink-0">
              <Mail className="w-6 h-6 text-sky" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-navy mb-1">Want to share your experience?</p>
              <p className="text-sm text-mist/60 font-medium">Contact us and we'll feature your story!</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
