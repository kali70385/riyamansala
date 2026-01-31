import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-primary-foreground/90">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Riyamansala, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">2. Use of Service</h2>
                <p className="text-muted-foreground mb-2">
                  You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Post false, inaccurate, misleading, defamatory, or libelous content</li>
                  <li>Use the service in any way that violates any applicable national or international law</li>
                  <li>Engage in any fraudulent activity or misrepresent your identity</li>
                  <li>Interfere with or disrupt the service or servers connected to the service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">3. User Accounts</h2>
                <p className="text-muted-foreground">
                  When you create an account with us, you must provide accurate, complete, and current information. 
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">4. Vehicle Listings</h2>
                <p className="text-muted-foreground">
                  Users who post vehicle listings are solely responsible for the accuracy and legality of their advertisements. 
                  Riyamansala does not verify the accuracy of listings and is not responsible for transactions between buyers and sellers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">5. Payment and Fees</h2>
                <p className="text-muted-foreground">
                  Certain features of our service may require payment. You agree to provide current, complete, and accurate 
                  purchase and account information for all services purchased through the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  The service and its original content, features, and functionality are owned by Riyamansala and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall Riyamansala be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of or inability to use the service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant 
                  changes by posting the new Terms on this page with an updated effective date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">9. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us at riyamansala70385@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Ad Space - Above Footer */}
      <AdSpace variant="leaderboard" />
      
      <Footer />
    </div>
  );
};

export default Terms;
