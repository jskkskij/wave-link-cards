import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileCheck, UserCircle, Scale, Database, RefreshCw, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: UserCircle,
      title: "1. Accountability",
      content: "We are responsible for personal information under our control. We have designated a Privacy Officer to oversee compliance with PIPEDA and Law 25."
    },
    {
      icon: Info,
      title: "2. Identifying Purposes",
      content: "We identify the purposes for which personal information is collected at or before the time of collection (e.g., fulfilling orders, legitimate analytics)."
    },
    {
      icon: Shield,
      title: "3. Consent",
      content: "We obtain meaningful consent for the collection, use, or disclosure of personal information. You may withdraw consent at any time, subject to legal restrictions."
    },
    {
      icon: Database,
      title: "4. Limiting Collection",
      content: "We collect only the information necessary for identified purposes. We do not collect data indiscriminately."
    },
    {
      icon: Lock,
      title: "5. Limiting Use, Disclosure & Retention",
      content: "Personal information is used only for intended purposes. We retain data only as long as necessary (typically 7 years for financial records, or until account deletion)."
    },
    {
      icon: RefreshCw,
      title: "6. Accuracy",
      content: "We ensure personal information is as accurate, complete, and up-to-date as necessary for its intended use."
    },
    {
      icon: Shield,
      title: "7. Safeguards",
      content: "We protect personal information with security safeguards appropriate to its sensitivity, including encryption and strict access controls."
    },
    {
      icon: Eye,
      title: "8. Openness",
      content: "We make information about our policies and practices readily available. This policy is our commitment to transparency."
    },
    {
      icon: FileCheck,
      title: "9. Individual Access",
      content: "Upon request, we will inform you of the existence, use, and disclosure of your personal information and provide access to it."
    },
    {
      icon: Scale,
      title: "10. Challenging Compliance",
      content: "You may address a challenge concerning compliance with these principles to our Privacy Officer."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background pb-20">
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-glow">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 font-serif">
            Transparency Report
          </h1>
          <p className="text-xl text-muted-foreground uppercase tracking-widest font-medium">
            PIPEDA • GDPR • Law 25 Compliance
          </p>
        </div>

        {/* Law 25 Specific Alert */}
        <div className="mb-12 p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-start gap-4 animate-fade-in-up">
          <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">Quebec Law 25 Notice</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For our users in Quebec, we strictly adhere to Law 25 requirements, including the
              <strong> Right to De-indexation</strong> (Right to be Forgotten) and **Data Portability**.
              Any privacy breach affecting your data and posing a risk of serious injury will be reported
              immediately to the CAI and affected individuals.
            </p>
          </div>
        </div>

        {/* 10 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card
                key={index}
                className="group p-8 border-2 border-border/50 hover:border-primary/30 hover:shadow-luxury transition-all duration-500 bg-card/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{principle.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{principle.content}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Privacy Officer Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          <Card className="md:col-span-2 p-10 border-primary/30 border-2 shadow-luxury bg-primary/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <UserCircle className="w-64 h-64 text-primary" />
            </div>
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-serif flex items-center gap-3">
                <UserCircle className="w-8 h-8 text-primary" />
                Data Protection Officer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our designated Privacy Officer is responsible for our overall privacy compliance
                program and is your primary point of contact for data inquiries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-primary/10 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-mist mb-1">Privacy Officer</p>
                  <p className="text-foreground font-bold">Abir Abbas</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-primary/10 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-mist mb-1">Reporting Line</p>
                  <a href="mailto:waavelink@gmail.com" className="text-primary font-bold hover:underline">waavelink@gmail.com</a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-10 border-2 border-border/50 bg-card/30 flex flex-col justify-center text-center">
            <Scale className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-4 font-serif">Dispute Resolution</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              If a privacy concern is not resolved to your satisfaction, you may contact the
              Legal Department or the Office of the Privacy Commissioner of Canada.
            </p>
            <Button variant="outline" className="rounded-full w-full" onClick={() => window.open('https://www.priv.gc.ca/', '_blank')}>
              OPC Website
            </Button>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="rounded-full px-12 py-6 text-lg hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
          >
            ← Return to Network
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

