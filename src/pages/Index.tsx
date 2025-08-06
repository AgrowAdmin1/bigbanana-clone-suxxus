import Header from "@/components/Header";
import FilterNavbar from "@/components/FilterNavbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCart from "@/components/ShoppingCart";
import Wishlist from "@/components/Wishlist";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Mock handlers for e-commerce functionality
  const handleAddToCart = (productId: string) => {
    console.log("Adding to cart:", productId);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log("Adding to wishlist:", productId);
  };

  const handleQuickView = (productId: string) => {
    console.log("Quick view:", productId);
  };

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
