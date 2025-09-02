import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface HoverNavigationProps {
  onCategorySelect?: (category: string) => void;
}

const HoverNavigation = ({ onCategorySelect }: HoverNavigationProps) => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const categories = [
    'New Launches', 'Shirts', 'Polo Neck T-Shirts', 'Round Neck T-Shirts', 
    'Joggers', 'Jeans', 'Trousers', 'Shorts'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowPriceFilter(true);
  };

  const handleSizeSelect = (size: string, category: string) => {
    navigate(`/collection/${encodeURIComponent(category)}?size=${size}`);
    onCategorySelect?.(category);
  };

  const handlePriceFilterApply = () => {
    if (selectedCategory) {
      navigate(`/collection/${encodeURIComponent(selectedCategory)}?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
      onCategorySelect?.(selectedCategory);
    }
    setShowPriceFilter(false);
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      {/* Categories Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1 text-foreground hover:text-accent transition-colors duration-300 font-medium">
          Categories
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        </button>
        
        <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="relative group/item">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-md transition-colors duration-200"
                  >
                    {category}
                  </button>
                  
                  {/* Size submenu */}
                  <div className="absolute left-full top-0 ml-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 z-50">
                    <div className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-2">Select Size</div>
                      <div className="grid grid-cols-3 gap-1">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(size, category)}
                            className="px-2 py-1 text-xs border border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Filter Dialog */}
      <Dialog open={showPriceFilter} onOpenChange={setShowPriceFilter}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Price Range</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPriceFilter(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePriceFilterApply}
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HoverNavigation;