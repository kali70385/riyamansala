import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I post a vehicle listing?",
      answer: "Click on the 'Post Ad' button in the header, fill in your vehicle details, upload photos, and submit. Your listing will be reviewed and published within 24 hours."
    },
    {
      question: "Is it free to post vehicle listings?",
      answer: "Basic listings are free. We also offer premium listing options with additional features like highlighted placement and extended visibility."
    },
    {
      question: "How can I contact a seller?",
      answer: "Click on any vehicle listing and you'll find the seller's contact information. You can reach them via phone or email directly through the listing page."
    },
    {
      question: "Are the vehicles inspected?",
      answer: "Sellers are responsible for the accuracy of their listings. We recommend buyers to thoroughly inspect vehicles and verify documentation before purchase."
    },
    {
      question: "Can I edit my listing after posting?",
      answer: "Yes, you can edit your listing anytime by logging into your account and accessing your posted ads. Changes will be updated immediately."
    },
    {
      question: "How long will my listing stay active?",
      answer: "Standard listings remain active for 30 days. You can renew your listing before it expires or upgrade to a premium listing for extended visibility."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Riyamansala facilitates connections between buyers and sellers. Payment arrangements are made directly between the buyer and seller."
    },
    {
      question: "How do I report a suspicious listing?",
      answer: "If you encounter a suspicious listing, please contact us immediately at riyamansala70385@gmail.com with the listing details. We take fraud prevention seriously."
    },
    {
      question: "Can I sell commercial vehicles?",
      answer: "Yes, we accept listings for all types of vehicles including cars, vans, SUVs, trucks, motorbikes, three-wheelers, and commercial vehicles."
    },
    {
      question: "Do you offer vehicle financing?",
      answer: "We don't provide financing directly, but many of our sellers work with financial institutions. Contact sellers directly to inquire about financing options."
    },
    {
      question: "How can I make my listing more visible?",
      answer: "Upgrade to a premium listing for highlighted placement, or ensure your listing has quality photos, detailed descriptions, and competitive pricing."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "Click on the 'Login' button and select 'Forgot Password'. Follow the instructions sent to your email to reset your password."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Find answers to common questions about Riyamansala
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a 
                href="mailto:riyamansala70385@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Ad Space - Above Footer */}
      <AdSpace variant="leaderboard" />
      
      <Footer />
    </div>
  );
};

export default FAQ;
