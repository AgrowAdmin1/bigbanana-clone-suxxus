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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      name: 'New Launches',
      sizes: ['S', 'M', 'L', 'XL', '2XL']
    },
    {
      name: 'Shirts', 
      sizes: ['S', 'M', 'L', 'XL', '2XL']
    },
    {
      name: 'Polo Neck T-Shirts',
      sizes: ['S', 'M', 'L', 'XL', '2XL']
    },
    {
      name: 'Round Neck T-Shirts',
      sizes: ['S', 'M', 'L', 'XL', '2XL']
    },
    {
      name: 'Joggers',
      sizes: ['28', '30', '32', '34', '36', '38']
    },
    {
      name: 'Jeans',
      sizes: ['28', '30', '32', '34', '36', '38']
    },
    {
      name: 'Trousers',
      sizes: ['28', '30', '32', '34', '36', '38']
    },
    {
      name: 'Shorts',
      sizes: ['28', '30', '32', '34', '36', '38']
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleSizeSelect = (categoryName: string, size: string) => {
    navigate(`/collection/${encodeURIComponent(categoryName)}?size=${size}`);
    onCategorySelect?.(categoryName);
  };

  const handlePriceFilterApply = () => {
    if (selectedCategory) {
      navigate(`/collection/${encodeURIComponent(selectedCategory)}?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
      onCategorySelect?.(selectedCategory);
    }
    setSelectedCategory(null);
  };

  return (
    <div className="hidden md:flex items-center gap-6 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          className="relative"
          onMouseEnter={() => setHoveredCategory(category.name)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Dialog open={selectedCategory === category.name} onOpenChange={(open) => !open && setSelectedCategory(null)}>
            <DialogTrigger asChild>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className="flex items-center gap-1 text-foreground hover:text-accent transition-colors duration-smooth font-medium py-2"
              >
                {category.name}
                <ChevronDown className="h-3 w-3" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter by Price - {category.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                  <div className="mt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={300}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$0</span>
                    <span>$300</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handlePriceFilterApply} className="flex-1">
                    Apply Filter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate(`/collection/${encodeURIComponent(category.name)}`);
                      onCategorySelect?.(category.name);
                      setSelectedCategory(null);
                    }}
                    className="flex-1"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Size Dropdown */}
          {hoveredCategory === category.name && (
            <div 
              className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-50 min-w-[200px]"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Select Size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {category.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(category.name, size)}
                    onMouseEnter={() => setHoveredSize(size)}
                    onMouseLeave={() => setHoveredSize(null)}
                    className={`
                      px-3 py-2 text-sm border rounded-md transition-colors
                      ${hoveredSize === size 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background text-foreground border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t">
                <button
                  onClick={() => {
                    navigate(`/collection/${encodeURIComponent(category.name)}`);
                    onCategorySelect?.(category.name);
                  }}
                  className="w-full text-xs text-accent hover:text-primary transition-colors"
                >
                  View All {category.name} →
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverNavigation;