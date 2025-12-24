import { Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState, useRef, useEffect } from "react";

interface Review {
  id: string;
  name: string;
  city: string;
  date: string;
  productType: string;
  rating: number;
  review: string;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

export const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    // Add scroll reveal animation
    if (cardRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px' }
      );
      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <Card 
      ref={cardRef}
      className={`relative bg-card/80 backdrop-blur-sm border-border/50 transition-all duration-500 ease-out overflow-hidden group ${
        isHovered 
          ? 'shadow-luxury -translate-y-2 scale-[1.02] border-primary/30' 
          : 'shadow-sm hover:shadow-card-hover'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Review by ${review.name}`}
    >
      {/* Digital transformation overlay effect */}
      <div 
        className={`absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />
      
      {/* Shimmer effect on hover */}
      <div 
        className={`absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />
      <CardContent className="p-6 relative z-10">
        {/* Header with Avatar and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0 transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-luxury-glow' : ''
          }`}>
            {getInitial(review.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">
                {review.name}
              </h4>
              {review.verified && (
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </div>
            {review.verified && (
              <p className="text-xs text-primary font-medium">
                Verified Customer
              </p>
            )}
          </div>
        </div>

        {/* Location and Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>{review.city}</span>
          <span>•</span>
          <span>{review.date}</span>
        </div>

        {/* Product Type */}
        <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
          {review.productType}
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 transition-all duration-300 ${
                star <= review.rating
                  ? `fill-primary text-primary ${isHovered ? 'scale-110' : ''}`
                  : "text-muted"
              }`}
              style={{ transitionDelay: `${star * 20}ms` }}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">Rating: {review.rating} out of 5 stars</span>
        </div>

        {/* Review Text */}
        <p className={`text-foreground/80 leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-foreground' : ''
        }`}>
          "{review.review}"
        </p>
      </CardContent>
    </Card>
  );
};
