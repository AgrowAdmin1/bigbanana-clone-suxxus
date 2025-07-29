import Header from "@/components/Header";
import FilterNavbar from "@/components/FilterNavbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FilterNavbar />
      <HeroSection />
      <CategoryGrid />
      <Footer />
    </div>
  );
};

export default Index;
