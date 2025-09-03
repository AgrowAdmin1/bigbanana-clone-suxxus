
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { useShopify } from '@/contexts/ShopifyContext';
import ProductGallery from '@/components/ProductGallery';
import FilterNavbar from '@/components/FilterNavbar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const Collection = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const selectedSize = searchParams.get('size');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  
  const { fetchProducts, productsLoading } = useShopify();
  const { filteredProducts, setFilters, filterOptions } = useShopifyProducts();
  
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    // Fetch products when component mounts or category changes
    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply category and size filters
    const filters: any = {};
    
    if (category) {
      filters.productType = decodeURIComponent(category);
    }
    
    if (selectedSize) {
      // This would need to be implemented based on how sizes are stored in your products
      // For now, we'll use tags as an example
      filters.tags = [selectedSize];
    }
    
    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? parseFloat(minPrice) : 0,
        max: maxPrice ? parseFloat(maxPrice) : 1000
      };
    }
    
    setFilters(filters);
  }, [category, selectedSize, minPrice, maxPrice, setFilters]);

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'title-a-z':
        return a.title.localeCompare(b.title);
      case 'title-z-a':
        return b.title.localeCompare(a.title);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, selectedSize, minPrice, maxPrice, sortBy]);

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FilterNavbar selectedCategory={category ? decodeURIComponent(category) : undefined} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {category ? decodeURIComponent(category) : 'All Products'}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {selectedSize && (
                  <>
                    <span className="text-muted-foreground">Size:</span>
                    <Badge variant="default">{selectedSize}</Badge>
                  </>
                )}
                {(minPrice || maxPrice) && (
                  <>
                    <span className="text-muted-foreground">Price:</span>
                    <Badge variant="secondary">
                      ${minPrice || '0'} - ${maxPrice || '300'}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-muted-foreground mt-1">
                {sortedProducts.length} products found | Page {currentPage} of {totalPages}
              </p>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="title-a-z">Name: A to Z</option>
                <option value="title-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductGallery key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button 
                  variant="outline" 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({})}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
