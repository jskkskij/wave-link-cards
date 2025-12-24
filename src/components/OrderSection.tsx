import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Loader2, CheckCircle2, Upload, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// PLACEHOLDER: User needs to replace this after following the setup guide
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_YOUR_SCRIPT_ID_HERE/exec";

const OrderSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "1",
    address: ""
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send text data to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...formData,
          hasCustomDesign: selectedImage ? "Yes" : "No"
        } as any).toString(),
      });

      toast.success("Order initiated!");

      // 2. Construct WhatsApp Message
      let message = `Hello Wavelink, I would like to place an order.%0A%0A*Order Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AQuantity: ${formData.quantity}%0AAddress: ${formData.address}`;

      if (selectedImage) {
        message += `%0A%0A*Custom Design:* I have a design photo to share. I am attaching it now.`;
        toast.info("Opening WhatsApp... Please ATTACH your design photo there!", { duration: 6000 });
      } else {
        message += `%0A%0APlease confirm my order.`;
      }

      setTimeout(() => {
        window.open(`https://wa.me/8801410809023?text=${message}`, '_blank');
        setIsSubmitting(false);
        // Reset form
        setFormData({ name: "", phone: "", email: "", quantity: "1", address: "" });
        setSelectedImage(null);
      }, 1500);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Redirecting to WhatsApp manually.");
      const message = `Hello Wavelink, I tried to submit the form but it failed. Here are my details:%0AName: ${formData.name}%0APhone: ${formData.phone}%0A...`;
      window.open(`https://wa.me/8801410809023?text=${message}`, '_blank');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-navy" id="order">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-5 paper-texture" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <span className="text-sky font-medium tracking-widest text-[10px] md:text-xs uppercase mb-4 inline-block px-3 py-1 border border-sky/20 rounded-full bg-sky/5">
            Start Your Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6">
            Place Your Order
          </h2>
          <p className="text-base md:text-lg text-mist/70 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
            Fill in the details below. We'll guide you to WhatsApp to finalize payment and design.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 md:gap-8">
          {/* Left Column: Form */}
          <div className="md:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-mist font-medium">Full Name</Label>
                  <Input
                    id="name" name="name" required placeholder="John Doe"
                    value={formData.name} onChange={handleInputChange}
                    className="bg-navy/50 border-white/10 text-white placeholder:text-white/20 focus:border-sky/50 focus:bg-navy/80 transition-all h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-mist font-medium">Phone Number</Label>
                  <Input
                    id="phone" name="phone" required placeholder="+880..."
                    value={formData.phone} onChange={handleInputChange}
                    className="bg-navy/50 border-white/10 text-white placeholder:text-white/20 focus:border-sky/50 focus:bg-navy/80 transition-all h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-mist font-medium">Email Address</Label>
                  <Input
                    id="email" name="email" type="email" required placeholder="john@example.com"
                    value={formData.email} onChange={handleInputChange}
                    className="bg-navy/50 border-white/10 text-white placeholder:text-white/20 focus:border-sky/50 focus:bg-navy/80 transition-all h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-mist font-medium">Quantity</Label>
                  <Input
                    id="quantity" name="quantity" type="number" min="1" required
                    value={formData.quantity} onChange={handleInputChange}
                    className="bg-navy/50 border-white/10 text-white placeholder:text-white/20 focus:border-sky/50 focus:bg-navy/80 transition-all h-12"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-mist font-medium">Custom Design (Optional)</Label>
                  <span className="text-xs text-sky bg-sky/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle size={10} />
                    You'll attach this in WhatsApp
                  </span>
                </div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer group ${selectedImage
                    ? 'border-sky/50 bg-sky/5'
                    : 'border-white/10 hover:border-sky/30 hover:bg-white/5'
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  {selectedImage ? (
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-white/20">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeImage(); }}
                          className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-red-500/80 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sky text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        Photo Selected
                      </p>
                      <p className="text-mist/50 text-xs mt-1">Remember to send this file in the WhatsApp chat!</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center py-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-mist/60 group-hover:text-sky transition-colors" />
                      </div>
                      <p className="text-mist font-medium text-sm">Click to upload your design</p>
                      <p className="text-mist/40 text-xs mt-1">Supports JPG, PNG (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-mist font-medium">Delivery Address</Label>
                <Textarea
                  id="address" name="address" required placeholder="Enter your full delivery address..."
                  value={formData.address} onChange={handleInputChange}
                  className="bg-navy/50 border-white/10 text-white placeholder:text-white/20 min-h-[100px] focus:border-sky/50 focus:bg-navy/80 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky text-navy hover:bg-sky/90 py-6 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Place Order on WhatsApp
                  </>
                )}
              </Button>
              <p className="text-center text-mist/40 text-xs mt-2">
                You will be redirected to WhatsApp to confirm details & attach design files.
              </p>
            </form>
          </div>

          {/* Right Column: Context */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-serif font-bold mb-4 text-white">Why WhatsApp?</h3>
              <ul className="space-y-4 text-mist/80">
                {[
                  "Instant confirmation of your design.",
                  "Secure payment via Bkash/Nagad.",
                  "Real-time updates on printing & delivery."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-sky shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Support */}
            <div className="bg-navy/30 border border-white/5 p-8 rounded-3xl text-center flex-1 flex flex-col justify-center items-center">
              <p className="text-mist/60 text-sm mb-4">Have questions before ordering?</p>
              <a
                href="https://wa.me/8801410809023"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-sky transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-sky/20 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">Chat with Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;