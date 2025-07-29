import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface FilterNavbarProps {
  selectedCategory?: string;
}

const FilterNavbar = ({ selectedCategory }: FilterNavbarProps) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Define categories that should show size filters
  const categoriesWithSizes = ["New Launches", "Shirts", "T-Shirts", "Joggers", "Jeans", "Trousers", "Shorts"];
  
  // Don't show the navbar if no category is selected or if it's Home
  if (!selectedCategory || selectedCategory === "Home" || !categoriesWithSizes.includes(selectedCategory)) {
    return null;
  }

  // Different size ranges based on category
  const getSizes = (category: string) => {
    const clothingSizes = ["2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL"];
    const pantsSizes = ["38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60"];
    
    if (category === "Jeans" || category === "Trousers" || category === "Joggers") {
      return pantsSizes;
    }
    return clothingSizes;
  };

  const sizes = getSizes(selectedCategory);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
  };

  return (
    <div className="bg-secondary border-b sticky top-[140px] z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Current Category Display */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground min-w-fit">Category:</h3>
            <Badge variant="default" className="text-xs w-fit">
              {selectedCategory}
            </Badge>
          </div>

          {/* Sizes */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:border-l lg:pl-6">
            <h3 className="text-sm font-semibold text-foreground min-w-fit">
              Size {selectedCategory === "Jeans" || selectedCategory === "Trousers" || selectedCategory === "Joggers" ? "(Waist)" : ""}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSize(size)}
                  className="text-xs h-8 min-w-[3rem]"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {selectedSizes.length > 0 && (
            <div className="flex items-center lg:border-l lg:pl-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear Sizes
              </Button>
            </div>
          )}
        </div>

        {/* Active size filters display */}
        {selectedSizes.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground">Selected sizes:</span>
              {selectedSizes.map((size) => (
                <Badge key={`size-${size}`} variant="secondary" className="text-xs">
                  {size}
                  <button 
                    onClick={() => toggleSize(size)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterNavbar;