import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FilterNavbar = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
  const colors = [
    { name: "Black", value: "black", color: "#000000" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Cream", value: "cream", color: "#F5F5DC" },
    { name: "Brown", value: "brown", color: "#8B4513" },
    { name: "Navy", value: "navy", color: "#000080" },
    { name: "Gray", value: "gray", color: "#808080" },
    { name: "Maroon", value: "maroon", color: "#800000" },
    { name: "Amber", value: "amber", color: "#FFBF00" },
  ];
  const categories = ["All", "Shirts", "T-Shirts", "Polo", "Henley", "Shorts", "Trackpants"];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
  };

  return (
    <div className="bg-secondary border-b sticky top-[140px] z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground min-w-fit">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="text-xs h-8"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:border-l lg:pl-6">
            <h3 className="text-sm font-semibold text-foreground min-w-fit">Size:</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSize(size)}
                  className="text-xs h-8 w-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:border-l lg:pl-6">
            <h3 className="text-sm font-semibold text-foreground min-w-fit">Color:</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => toggleColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-smooth ${
                    selectedColors.includes(color.value) 
                      ? 'border-primary scale-110 shadow-md' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                >
                  {color.value === 'white' && (
                    <div className="w-full h-full rounded-full border border-gray-200"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedCategories.length > 0) && (
            <div className="flex items-center lg:border-l lg:pl-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Active filters display */}
        {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedCategories.length > 0) && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {selectedCategories.map((category) => (
                <Badge key={`cat-${category}`} variant="secondary" className="text-xs">
                  {category}
                  <button 
                    onClick={() => toggleCategory(category)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedSizes.map((size) => (
                <Badge key={`size-${size}`} variant="secondary" className="text-xs">
                  Size: {size}
                  <button 
                    onClick={() => toggleSize(size)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedColors.map((color) => (
                <Badge key={`color-${color}`} variant="secondary" className="text-xs">
                  {colors.find(c => c.value === color)?.name}
                  <button 
                    onClick={() => toggleColor(color)}
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