import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a smart card?",
    answer: "A smart card is an NFC-enabled card that allows you to share your contact information, social media profiles, portfolio, and more with just a tap on any smartphone. No app required!"
  },
  {
    question: "Does it work on all phones?",
    answer: "Yes! Wavelink cards work with any NFC-enabled smartphone, which includes most modern Android and iPhone models (iPhone 7 and above). The recipient doesn't need to install any app."
  },
  {
    question: "What if my phone doesn't support NFC?",
    answer: "No worries! All our NFC cards include a QR code — simply scan to access your digital profile."
  },
  {
    question: "Does it require internet?",
    answer: "Yes. Since the profile data is dynamically loaded from our server, internet access is required to view it."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within Dhaka and 5-7 business days outside Dhaka. We'll provide tracking information once your order ships."
  },
  {
    question: "Can I customize my design?",
    answer: "Absolutely! You can upload your own design when placing an order, or choose from our pre-made templates. Our team will help ensure your design looks perfect."
  },
  {
    question: "How do I update my information?",
    answer: "You can update your contact details, social links, and profile information by informing us via WhatsApp or our official pages. We'll update your card profile accordingly."
  },
  {
    question: "What if my card gets damaged?",
    answer: "Our cards are waterproof and extremely durable. However, if you experience any issues, please contact our support team and we'll help you with a replacement."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Wavelink
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-card-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
