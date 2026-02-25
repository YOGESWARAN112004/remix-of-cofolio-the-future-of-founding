import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WarRoomSection from "@/components/WarRoomSection";
import PortfolioSection from "@/components/PortfolioSection";
import NetworkSection from "@/components/NetworkSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="noise">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <WarRoomSection />
      <PortfolioSection />
      <NetworkSection />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 text-center">
        <p className="text-muted-foreground text-sm">
          © 2026 Cofolio. Built by builders, for builders.
        </p>
      </footer>
    </div>
  );
};

export default Index;
