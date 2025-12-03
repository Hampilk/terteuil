import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import FeaturedPredictions from "@/components/home/FeaturedPredictions";
import TrustIndicators from "@/components/home/TrustIndicators";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Index = () => {
  useDocumentTitle("WinMix TipsterHub - AI-Powered Football Predictions");

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <TopBar />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Predictions */}
        <FeaturedPredictions />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
