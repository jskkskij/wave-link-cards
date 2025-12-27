import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Award, Users, Target, Globe, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import companyProfilePdf from "@/assets/WaveLinkCompanyProfile.pdf";

const CompanyProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-serif">
            Company Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the digital transformation revolution with innovative NFC technology solutions
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-serif">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize networking and professional connections through cutting-edge NFC technology,
                making digital business cards accessible, sustainable, and efficient for professionals worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-serif">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the global leader in smart business card solutions, empowering millions of professionals
                to connect seamlessly while contributing to a paperless, sustainable future.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center font-serif">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Trust & Security", desc: "GDPR compliant data protection and secure transactions" },
              { icon: Users, title: "Customer First", desc: "Dedicated support and lifetime updates for all customers" },
              { icon: Award, title: "Innovation", desc: "Continuously evolving technology to meet modern needs" },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-luxury transition-all duration-300 border-2 border-border animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Company Information */}
        <Card className="max-w-4xl mx-auto p-8 border-2 border-primary/20 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-serif">Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Business Name</h4>
                <p className="text-muted-foreground">Wavelink</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Location</h4>
                <p className="text-muted-foreground">Bangladesh</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Industry</h4>
                <p className="text-muted-foreground">NFC Technology & Digital Solutions</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Founded</h4>
                <p className="text-muted-foreground">2024</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3">What We Do</h4>
              <p className="text-muted-foreground leading-relaxed">
                Wavelink specializes in creating premium NFC-powered smart business cards that enable professionals
                to share their contact information, social media profiles, and digital portfolios with a simple tap.
                Our eco-friendly, waterproof cards combine cutting-edge technology with elegant design, making networking
                more efficient and sustainable.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Download Company Profile */}
        <div className="text-center mt-12">
          <Card className="inline-block p-6 border-2 border-primary/30 shadow-luxury bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center gap-4">
              <FileText className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Download Full Company Profile</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get our complete company profile document
                </p>
                <Button
                  asChild
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full px-8 shadow-luxury transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={companyProfilePdf}
                    download="WaveLink_Company_Profile.pdf"
                  >
                    Download PDF
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="rounded-full px-12 py-6 text-lg hover:bg-primary/5 border border-primary/10 transition-all font-serif"
          >
            ← Legacy Foundation, Digital Future
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

