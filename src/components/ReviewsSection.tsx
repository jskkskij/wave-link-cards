import { Card, CardContent } from "./ui/card";
import { MessageSquareQuote, Mail } from "lucide-react";

// Video review interface - easy to update with new reviews
interface VideoReview {
  id: number;
  videoUrl: string; // Google Drive share link (use /preview format)
  customerName: string;
  testimonial: string;
}

// UPDATE THIS ARRAY WITH YOUR VIDEO REVIEWS
const videoReviews: VideoReview[] = [
  {
    id: 1,
    videoUrl: "https://drive.google.com/file/d/1VAz5BUjuyHyXwjlPY3cN0imBpjT-MV97/preview",
    customerName: "Abir Abbas",
    testimonial: "Amazing product! The NFC card is sleek and professional.",
  },
  {
    id: 2,
    videoUrl: "https://drive.google.com/file/d/1HVA7FwFii0zOIt0SndA6ZdrK0qWCZZQx/preview",
    customerName: "Shahadat Sakib",
    testimonial: "Game changer for networking. Highly recommend!",
  },
  {
    id: 3,
    videoUrl: "https://drive.google.com/file/d/1HKe7pG_xmm8ZR-tiXg7Y_aEaN-jXB4VX/preview",
    customerName: "Dr.Mohammad Abed Abbas",
    testimonial: "As a Med Professional it has given the best identity experience",
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-12 md:py-20 bg-gradient-to-b from-background via-mist/30 to-background relative overflow-hidden">
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

        {/* Video Reviews - Centered Layout with improved spacing for clarity */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-7xl mx-auto mb-16 md:mb-24">
          {videoReviews.map((review, index) => (
            <Card
              key={review.id}
              className="w-full md:w-[480px] group overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 border-white/20 bg-white/40 backdrop-blur-md animate-fade-in-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-0">
                {/* Video Container */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sky/20 to-navy/20 rounded-t-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                  <div className="relative w-full bg-navy/5 rounded-t-xl overflow-hidden aspect-video">
                    <iframe
                      src={review.videoUrl}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                      title={`Review by ${review.customerName}`}
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-8 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-xl border-2 border-white/50 shadow-lg">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy font-serif tracking-wide">
                        {review.customerName}
                      </h3>
                      {/* Optional role placeholder if available later */}
                      {/* <p className="text-xs text-mist/80 uppercase tracking-wider">Verified User</p> */}
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
          ))}
        </div>

        {/* Bottom CTA - Clearer & Styled */}
        <div className="flex justify-center animate-fade-in-delayed">
          <a
            href="mailto:waavelink@gmail.com"
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
