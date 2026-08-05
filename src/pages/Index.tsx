import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ToolingSection from "@/components/ToolingSection";
import WarRoomSection from "@/components/WarRoomSection";
import NetworkSection from "@/components/NetworkSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="noise">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ToolingSection />
      <WarRoomSection />
      <NetworkSection />
      <PortfolioSection />
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
