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

  const gdprRights = [
    { title: "Right to be Informed", desc: "Clear information about how we use your data." },
    { title: "Right of Access", desc: "Request a copy of your personal data." },
    { title: "Right to Rectification", desc: "Correct inaccurate or incomplete data." },
    { title: "Right to Erasure", desc: "Request deletion of your data (Right to be Forgotten)." },
    { title: "Right to Restrict", desc: "Limit how we process your personal data." },
    { title: "Right to Portability", desc: "Receive your data in a machine-readable format." },
    { title: "Right to Object", desc: "Object to processing for direct marketing." },
    { title: "Automated Decisions", desc: "Rights regarding automated profiling." }
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
          <p className="mt-4 text-sm text-mist/60 font-mono">Effective: Jan 2025 | Version 2.1</p>
        </div>

        {/* Legal Basis & Processors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="lg:col-span-2 p-8 border-2 border-primary/20 bg-primary/5 backdrop-blur-sm">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              Processing & Lawful Basis
            </h2>
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-bold text-foreground mb-1 uppercase tracking-tighter text-xs">A. Contractual Necessity</h4>
                <p className="text-muted-foreground">We process name, address, and payment info to fulfill your orders and deliver your WaveLink cards.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 uppercase tracking-tighter text-xs">B. Legitimate Interests</h4>
                <p className="text-muted-foreground">We use Vercel Analytics and Google Sheets for business reporting and service optimization.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 uppercase tracking-tighter text-xs">C. Consent</h4>
                <p className="text-muted-foreground">We collect email addresses for marketing and updates only with your explicit permission.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-2 border-border/50 bg-card/30">
            <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Sub-Processors
            </h2>
            <ul className="space-y-4 text-xs">
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold">Vercel</span>
                <span className="text-muted-foreground">Hosting / Analytics</span>
              </li>
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold">Supabase</span>
                <span className="text-muted-foreground">Database / Auth</span>
              </li>
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="font-bold">Google</span>
                <span className="text-muted-foreground">Video / Management</span>
              </li>
            </ul>
            <p className="mt-6 text-[10px] text-muted-foreground leading-tight italic">
              Data may be transferred across borders (e.g. Canada to USA) using Standard Contractual Clauses (SCCs).
            </p>
          </Card>
        </div>

        {/* 10 PIPEDA Principles */}
        <h2 className="text-3xl font-serif font-bold mb-8 text-center">The 10 Privacy Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card
                key={index}
                className="group p-6 border-border/50 hover:border-primary/20 hover:shadow-luxury transition-all duration-500 bg-card/30 backdrop-blur-sm"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{principle.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs">{principle.content}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* GDPR Explicit Rights */}
        <div className="mb-16 p-10 bg-navy text-white rounded-3xl shadow-luxury-intense relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Scale className="w-48 h-48" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-8 relative z-10">Your European (GDPR) Rights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {gdprRights.map((right, idx) => (
              <div key={idx} className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/5 hover:bg-white/20 transition-all">
                <h4 className="font-bold text-sm mb-1">{right.title}</h4>
                <p className="text-[10px] text-white/70 leading-tight">{right.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quebec Law 25 Notice */}
        <div className="mb-16 p-8 rounded-3xl border-2 border-primary/10 bg-primary/5 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Quebec Law 25 Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              For users in Quebec, we strictly adhere to Law 25, including the commitment to
              <strong> Confidentiality by Default</strong> and the immediate reporting of any data
              breach that poses a risk of serious injury.
            </p>
          </div>
        </div>

        {/* Privacy Officer & Dispute */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="md:col-span-2 p-10 border-primary/30 border-2 shadow-luxury bg-card/50 relative overflow-hidden">
            <h2 className="text-2xl font-serif font-bold mb-6">Data Protection Officer</h2>
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex-1">
                <p className="text-[10px] uppercase tracking-widest text-primary mb-1">DPO Name</p>
                <p className="text-xl font-bold font-serif">Abir Abbas</p>
              </div>
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex-1">
                <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Inquiry Channel</p>
                <a href="mailto:waavelink@gmail.com" className="text-xl font-bold font-serif text-primary hover:underline">waavelink@gmail.com</a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Response Commitment: Under GDPR Recital 63, we aim to resolve all data access requests within **30 days**.
            </p>
          </Card>

          <Card className="p-10 border-border/50 bg-card/30 flex flex-col justify-center text-center">
            <Info className="w-10 h-10 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-4">Questions?</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Contact the Office of the Privacy Commissioner of Canada for external disputes.
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
            className="rounded-full px-12 py-6 text-lg hover:bg-primary/5 border border-primary/10 transition-all font-serif"
          >
            ← Personal Connection Over Digital Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

