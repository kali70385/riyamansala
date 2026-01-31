import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
                <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-2">
                  We collect several types of information to provide and improve our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Vehicle listing information and photos</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-2">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell, trade, or rent your personal identification information to others. We may share 
                  generic aggregated demographic information not linked to any personal identification information 
                  with our business partners and trusted affiliates.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate data collection, storage, and processing practices and security measures 
                  to protect against unauthorized access, alteration, disclosure, or destruction of your personal 
                  information and data stored on our platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">5. Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to enhance user experience. You can choose to set your web browser to refuse cookies 
                  or to alert you when cookies are being sent. However, some portions of our service may not function 
                  properly without cookies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">6. Third-Party Services</h2>
                <p className="text-muted-foreground">
                  Our service may contain links to third-party websites. We are not responsible for the privacy 
                  practices or content of these third-party sites. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">7. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our service is not intended for users under the age of 18. We do not knowingly collect personal 
                  information from children under 18. If you become aware that a child has provided us with personal 
                  information, please contact us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">8. Your Rights</h2>
                <p className="text-muted-foreground mb-2">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Access, update, or delete your personal information</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">9. Changes to Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">10. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at riyamansala70385@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
