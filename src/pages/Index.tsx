import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
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
