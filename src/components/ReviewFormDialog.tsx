import { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { CONFIG } from "@/lib/config";

interface ReviewFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    name: string;
    city: string;
    date: string;
    productType: string;
    rating: number;
    review: string;
  }) => void;
}

export const ReviewFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: ReviewFormDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    productType: "NFC Card",
    rating: 0,
    review: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.city || !formData.review || formData.rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a rating.",
        variant: "destructive",
      });
      return;
    }

    // Validate Turnstile
    const formDataObj = new FormData(e.target as HTMLFormElement);
    const turnstileToken = formDataObj.get('cf-turnstile-response');

    if (!turnstileToken) {
      toast({
        title: "Security Verification Required",
        description: "Please complete the CAPTCHA to submit your review.",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    onSubmit({
      ...formData,
      date: currentDate,
    });

    // Reset form
    setFormData({
      name: "",
      city: "",
      productType: "NFC Card",
      rating: 0,
      review: "",
    });

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. Your review will appear shortly.",
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with WaveLink products
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="Enter your city"
              required
            />
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <Label htmlFor="productType">Product Type *</Label>
            <Input
              id="productType"
              value={formData.productType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, productType: e.target.value }))
              }
              placeholder="e.g., NFC Card"
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${star <= (hoveredRating || formData.rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                      }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {formData.rating} star{formData.rating !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review">Your Review *</Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, review: e.target.value }))
              }
              placeholder="Tell us about your experience with the product..."
              rows={4}
              required
            />
          </div>

          {/* Turnstile */}
          <div className="pt-2">
            <div
              className="cf-turnstile"
              data-sitekey={CONFIG.TURNSTILE_SITE_KEY}
              data-theme="light"
            ></div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
