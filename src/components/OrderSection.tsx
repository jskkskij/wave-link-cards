import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Loader2, CheckCircle2, Upload, X, AlertCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { CONFIG } from "@/lib/config";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { initCSRFProtection, getCSRFToken, logSecurityEvent } from "@/lib/security";
import { motion } from "framer-motion";
import { OrderFormSchema, validateFormData } from "@/lib/validation";

interface OrderSectionProps {
  lang?: "en" | "bn";
}

const OrderSection = ({ lang = "en" }: OrderSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "1",
    product: "Smart Card", // Default product
    address: "",
    website: "" // Honeypot field for bot detection
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCSRFToken] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize CSRF protection
  useEffect(() => {
    const token = initCSRFProtection();
    setCSRFToken(token);
  }, []);

  // Rate limiting: max 3 submissions per minute, block for 5 minutes if exceeded
  const { checkRateLimit } = useRateLimit('order-form', {
    maxAttempts: 3,
    windowMs: 60000, // 1 minute
    blockDurationMs: 300000 // 5 minutes
  });

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

  // --- Aggressive Performance: Dynamic Turnstile Loading ---
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileInjected = useRef(false);

  const injectTurnstile = () => {
    if (turnstileInjected.current) return;
    turnstileInjected.current = true;

    const script = document.createElement('script');
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileLoaded(true);
    document.body.appendChild(script);

    logSecurityEvent('TURNSTILE_DYNAMIC_INJECTION', { form: 'order' }, 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check rate limit
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.isAllowed) {
      toast.error(rateLimitCheck.message || "Too many attempts. Please try again later.");
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { form: 'order' });
      return;
    }

    // 2. Validate CSRF token
    const currentCSRFToken = getCSRFToken();
    if (!currentCSRFToken || currentCSRFToken !== csrfToken) {
      toast.error("Security token invalid. Please refresh the page.");
      logSecurityEvent('CSRF_TOKEN_INVALID', { form: 'order' });
      return;
    }

    // 3. Validate Turnstile (optional - log but don't block)
    const formDataObj = new FormData(e.target as HTMLFormElement);
    const turnstileToken = formDataObj.get('cf-turnstile-response');

    if (!turnstileToken) {
      // Log for monitoring but don't block the user
      logSecurityEvent('TURNSTILE_MISSING', { form: 'order' }, 'info');
      console.warn('[Security] Turnstile token missing - proceeding with other validations');
    }

    // 4. Check honeypot field (bot detection)
    if (formData.website) {
      logSecurityEvent('HONEYPOT_TRIGGERED', { value: formData.website }, 'critical');
      toast.error("Security check failed. Please try again.");
      return;
    }

    // 5. Validate form data with Zod (runtime type safety)
    const validation = validateFormData(OrderFormSchema, formData);

    if (validation.success === false) {
      toast.error(validation.error);
      logSecurityEvent('VALIDATION_FAILED', { errors: validation.details }, 'warning');
      return;
    }

    // TypeScript now knows this is the success case
    const sanitizedData = validation.data;

    setIsSubmitting(true);

    try {
      // 6. Send text data to Google Sheets with CSRF token
      await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRF-Token": csrfToken,
        },
        body: new URLSearchParams({
          ...sanitizedData,
          hasCustomDesign: selectedImage ? "Yes" : "No",
          _csrf: csrfToken,
          timestamp: new Date().toISOString(),
        } as any).toString(),
      });

      toast.success("Order initiated!");
      logSecurityEvent('ORDER_SUBMITTED', { product: sanitizedData.product, quantity: sanitizedData.quantity });

      // 7. Construct WhatsApp Message with sanitized data
      let message = `Hello Wavelink, I would like to place an order.%0A%0A*Order Details:*%0AName: ${encodeURIComponent(sanitizedData.name)}%0APhone: ${encodeURIComponent(sanitizedData.phone)}%0AEmail: ${encodeURIComponent(sanitizedData.email)}%0AProduct: ${encodeURIComponent(sanitizedData.product)}%0AQuantity: ${sanitizedData.quantity}%0AAddress: ${encodeURIComponent(sanitizedData.address)}`;

      if (selectedImage) {
        message += `%0A%0A*Custom Design:* I have a design photo to share. I am attaching it now.`;
        toast.info("Opening WhatsApp... Please ATTACH your design photo there!", { duration: 6000 });
      } else {
        message += `%0A%0APlease confirm my order.`;
      }

      setTimeout(() => {
        window.open(CONFIG.WHATSAPP_LINK(message), '_blank');
        setIsSubmitting(false);
        // Reset form
        setFormData({ name: "", phone: "", email: "", quantity: "1", product: "Smart Card", address: "", website: "" });
        setSelectedImage(null);
        // Generate new CSRF token for next submission
        const newToken = initCSRFProtection();
        setCSRFToken(newToken);
      }, 1500);

    } catch (error) {
      console.error("Submission error:", error);
      logSecurityEvent('ORDER_SUBMISSION_ERROR', { error: String(error) });
      toast.error("Network error. Redirecting to WhatsApp manually.");
      const message = `Hello Wavelink, I tried to submit the form but it failed. Here are my details:%0AName: ${encodeURIComponent(sanitizedData.name)}%0APhone: ${encodeURIComponent(sanitizedData.phone)}%0A...`;
      window.open(CONFIG.WHATSAPP_LINK(message), '_blank');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-32 bg-background relative overflow-hidden" id="order">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-blue font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8"
          >
            {lang === "en" ? "Global Infrastructure" : "গ্লোবাল ইনফ্রাস্ট্রাকচার"}
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif text-foreground mb-3 sm:mb-4 md:mb-8 font-bold leading-[1.1] tracking-[-0.04em]">
            {lang === "en" ? "Begin the Connection." : "শুরু হোক আপনার নতুন যাত্রা।"}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-slate-300 leading-tight tracking-tight font-medium max-w-2xl">
            {lang === "en" ? "Deploy your professional presence with our luxury NFC hardware and intelligent software ecosystem." : "আমাদের লাক্সারি এনএফসি হার্ডওয়্যার এবং ইন্টেলিজেন্ট সফটওয়্যার ইকোসিস্টেমের মাধ্যমে আপনার পেশাদার পরিচিতি বিশ্বব্যাপী ছড়িয়ে দিন।"}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-muted p-4 sm:p-6 md:p-8 lg:p-14 rounded-2xl shadow-luxury">
            <form
              onSubmit={handleSubmit}
              className="space-y-10"
              aria-label="Order Information Form"
              onFocus={injectTurnstile}
              onMouseEnter={injectTurnstile}
            >
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Full Name</Label>
                  <Input
                    id="name" name="name" required placeholder="John Doe"
                    value={formData.name} onChange={handleInputChange}
                    className="h-14 bg-warm-gray/50 border-muted text-foreground placeholder:text-muted-foreground/40 focus:border-blue/30 focus:bg-white transition-luxury shadow-none rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Phone</Label>
                  <Input
                    id="phone" name="phone" required placeholder="+880..."
                    value={formData.phone} onChange={handleInputChange}
                    className="h-14 bg-warm-gray/50 border-muted text-foreground placeholder:text-muted-foreground/40 focus:border-blue/30 focus:bg-white transition-luxury shadow-none rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Email Address</Label>
                <Input
                  id="email" name="email" type="email" required placeholder="john@example.com"
                  value={formData.email} onChange={handleInputChange}
                  className="h-14 bg-warm-gray/50 border-muted text-foreground placeholder:text-muted-foreground/40 focus:border-blue/30 focus:bg-white transition-luxury shadow-none rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="space-y-3">
                  <Label htmlFor="product" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Infrastructure Component</Label>
                  <select
                    id="product" name="product"
                    value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full h-14 bg-warm-gray/50 border border-muted text-foreground rounded-xl px-4 focus:outline-none focus:border-blue/30 focus:bg-white transition-luxury appearance-none font-medium text-sm"
                  >
                    <option value="Smart Card">NFC Smart Card</option>
                    <option value="Review Stand">NFC Review Stand</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="quantity" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Volume</Label>
                  <Input
                    id="quantity" name="quantity" type="number" min="1" required
                    value={formData.quantity} onChange={handleInputChange}
                    className="h-14 bg-warm-gray/50 border-muted text-foreground placeholder:text-muted-foreground/40 focus:border-blue/30 focus:bg-white transition-luxury shadow-none rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Bespoke Design (Optional)</Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  className={`border-2 border-dashed rounded-2xl p-4 md:p-8 transition-luxury text-center hover:bg-warm-gray/30 group ${selectedImage ? 'border-blue/30 bg-blue/5' : 'border-muted'}`}
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                  {selectedImage ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow-luxury">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-contain bg-white" width={500} height={256} />
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(); }} className="absolute top-4 right-4 p-2 bg-foreground text-white rounded-full hover:bg-red-500 transition-luxury">
                          <X size={18} />
                        </button>
                      </div>
                      <p className="text-blue font-bold text-sm tracking-tight flex items-center gap-2">
                        <CheckCircle2 size={18} /> Asset Uploaded
                      </p>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-warm-gray flex items-center justify-center mb-6 group-hover:scale-110 transition-luxury">
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-blue transition-luxury" />
                      </div>
                      <p className="text-foreground font-bold tracking-tight">Upload Production Asset</p>
                      <p className="text-muted-foreground text-sm font-medium mt-1">High-resolution PNG or JPG preferred</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="address" className="text-[12px] sm:text-[13px] font-bold text-foreground uppercase tracking-widest px-1">Delivery Logistics</Label>
                <Textarea
                  id="address" name="address" required placeholder="Enter your deployment address..."
                  value={formData.address} onChange={handleInputChange}
                  className="min-h-[120px] bg-warm-gray/50 border-muted text-foreground placeholder:text-muted-foreground/40 focus:border-blue/30 focus:bg-white transition-luxury shadow-none rounded-xl p-4"
                />
              </div>

              {/* Honeypot field */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleInputChange} className="hidden" aria-hidden="true" />

              {/* Turnstile Container - Managed injection */}
              <div className="cf-turnstile" data-sitekey="0x4AAAAAAA4O8o_D_N6GfXyH"></div>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-800">100% Satisfaction Guarantee</p>
                    <p className="text-xs text-green-700/80">If you're not happy with the design, we'll redesign it for free. 7-day easy returns after delivery.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 sm:h-20 bg-primary hover:bg-primary/95 text-primary-foreground text-lg sm:text-xl font-bold rounded-2xl shadow-luxury-glow transition-luxury group"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Send className="mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-luxury" size={24} />
                      Deploy Order via WhatsApp
                    </>
                  )}
                </Button>
                <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  ⚡ Secure Transaction • No Hidden Fees • Real-time Support
                </p>
              </div>
            </form>
          </div>

          {/* Context Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-warm-gray border border-muted p-12 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-8 tracking-tight">Ecosystem Logistics</h3>
              <div className="space-y-10">
                {[
                  { title: "Bespoke Validation", desc: "Our design team manually validates every custom asset via WhatsApp before production." },
                  { title: "Secure Settlement", desc: "Transactions are handled through authorized banking channels (Bkash/Nagad) for security." },
                  { title: "Real-time Audits", desc: "Receive live telemetry on your production and delivery status directly from our logisitics team." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <CheckCircle2 className="w-7 h-7 text-blue shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground tracking-tight mb-2 uppercase text-[12px] tracking-widest">{item.title}</h4>
                      <p className="text-muted-foreground text-base font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-12 border border-muted rounded-2xl bg-white shadow-luxury">
              <p className="text-muted-foreground font-medium mb-8">Technical or Custom Inquiries?</p>
              <a
                href={CONFIG.WHATSAPP_LINK("Hello Wavelink, I have questions before ordering.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-foreground font-bold hover:text-blue transition-luxury group"
              >
                <span className="text-xl tracking-tight border-b-2 border-blue/20 group-hover:border-blue transition-luxury">Speak with our Tech Consultant</span>
                <MessageCircle size={28} className="text-blue" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;