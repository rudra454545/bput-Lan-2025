import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { BackgroundPaths } from "@/components/BackgroundPaths";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundPaths />
      </div>
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
