import Header from "@/components/Header";
import FilterNavbar from "@/components/FilterNavbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");

  return (
    <div className="min-h-screen bg-background">
      <Header onCategorySelect={setSelectedCategory} />
      <FilterNavbar selectedCategory={selectedCategory} />
      <HeroSection />
      <CategoryGrid />
      <Footer />
    </div>
  );
};

export default Index;
