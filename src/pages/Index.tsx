import Header from "@/components/Header";
import FilterNavbar from "@/components/FilterNavbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import ProductSearch from "@/components/ProductSearch";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useShopify } from "@/contexts/ShopifyContext";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const { 
    products, 
    productsLoading, 
    fetchProducts, 
    addToCart, 
    addToWishlist
  } = useShopify();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Convert ShopifyProduct to Product format for existing components
  const convertedProducts = products.map(product => {
    const firstVariant = product.variants.edges[0]?.node;
    const hasComparePrice = firstVariant?.compareAtPrice;
    
    return {
      id: product.id,
      name: product.title,
      price: parseFloat(firstVariant?.price.amount || '0'),
      originalPrice: hasComparePrice ? parseFloat(firstVariant.compareAtPrice!.amount) : undefined,
      image: product.images.edges[0]?.node.url || '/placeholder.svg',
      rating: 4.5, // Default rating since Shopify doesn't provide this
      reviewCount: 0, // Default since Shopify doesn't provide this
      category: product.productType || 'General',
      sizes: product.variants.edges.map(edge => edge.node.selectedOptions.find(opt => opt.name === 'Size')?.value).filter(Boolean) || [],
      colors: product.variants.edges.map(edge => edge.node.selectedOptions.find(opt => opt.name === 'Color')?.value).filter(Boolean) || [],
      isNew: product.tags.includes('new'),
      isOnSale: hasComparePrice ? true : false
    };
  });

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.variants.edges[0]) {
      addToCart(product.variants.edges[0].node.id, 1);
    }
  };

  const handleAddToWishlist = (productId: string) => {
    addToWishlist(productId);
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
      <main className="container mx-auto px-4 py-8">
        <ProductSearch />
        <ProductGrid 
          products={convertedProducts}
          isLoading={productsLoading}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={handleQuickView}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
