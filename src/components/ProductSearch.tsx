import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

interface ProductSearchProps {
  onSortChange?: (sortBy: string) => void;
}

const ProductSearch = ({ onSortChange }: ProductSearchProps) => {
  const {
    searchQuery,
    selectedFilters,
    filterOptions,
    setSearchQuery,
    setFilters,
    clearFilters,
  } = useShopifyProducts();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [priceRange, setPriceRange] = useState([
    selectedFilters.priceRange?.min || filterOptions.priceRange.min,
    selectedFilters.priceRange?.max || filterOptions.priceRange.max,
  ]);

  // Update local search when global search changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters({ [filterType]: value });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = selectedFilters.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', updatedTags.length > 0 ? updatedTags : undefined);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    handleFilterChange('priceRange', { min: values[0], max: values[1] });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedFilters.productType) count++;
    if (selectedFilters.vendor) count++;
    if (selectedFilters.tags?.length) count++;
    if (selectedFilters.priceRange) count++;
    if (selectedFilters.availability !== undefined) count++;
    return count;
  };

  const clearAllFilters = () => {
    clearFilters();
    setPriceRange([filterOptions.priceRange.min, filterOptions.priceRange.max]);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm"
                    >
                      Clear All
                    </Button>
                  )}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Product Type Filter */}
                {filterOptions.productTypes.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Category</Label>
                    <Select
                      value={selectedFilters.productType || ''}
                      onValueChange={(value) => handleFilterChange('productType', value || undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All categories</SelectItem>
                        {filterOptions.productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Brand Filter */}
                {filterOptions.vendors.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Brand</Label>
                    <Select
                      value={selectedFilters.vendor || ''}
                      onValueChange={(value) => handleFilterChange('vendor', value || undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All brands</SelectItem>
                        {filterOptions.vendors.map((vendor) => (
                          <SelectItem key={vendor} value={vendor}>
                            {vendor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Availability Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={selectedFilters.availability === true}
                        onCheckedChange={(checked) => 
                          handleFilterChange('availability', checked ? true : undefined)
                        }
                      />
                      <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                {filterOptions.tags.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {filterOptions.tags.slice(0, 20).map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedFilters.tags?.includes(tag) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleTagToggle(tag)}
                          className="text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {selectedFilters.productType && (
                <Badge variant="secondary" className="text-xs">
                  {selectedFilters.productType}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleFilterChange('productType', undefined)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedFilters.vendor && (
                <Badge variant="secondary" className="text-xs">
                  {selectedFilters.vendor}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleFilterChange('vendor', undefined)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedFilters.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleTagToggle(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Sort Options */}
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="title-a-z">Name: A to Z</SelectItem>
            <SelectItem value="title-z-a">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSearch;