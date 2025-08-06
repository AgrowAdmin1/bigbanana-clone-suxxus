import { useState } from "react";
import { Heart, ShoppingCart, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  sizes: string[];
}

interface WishlistProps {
  items: WishlistItem[];
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Wishlist = ({ 
  items, 
  onRemoveItem, 
  onAddToCart, 
  onViewProduct,
  isOpen,
  onOpenChange 
}: WishlistProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddSelectedToCart = () => {
    selectedItems.forEach(itemId => {
      const item = items.find(i => i.id === itemId);
      if (item && item.inStock) {
        onAddToCart(item.productId);
      }
    });
    setSelectedItems([]);
  };

  const inStockItems = items.filter(item => item.inStock);
  const outOfStockItems = items.filter(item => !item.inStock);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {items.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            My Wishlist
            {items.length > 0 && (
              <Badge variant="secondary">{items.length} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="font-medium text-foreground">Your wishlist is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Save items you love for later
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === inStockItems.length && inStockItems.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(inStockItems.map(item => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">Select All</span>
              </div>
              {selectedItems.length > 0 && (
                <Button 
                  size="sm" 
                  onClick={handleAddSelectedToCart}
                  className="h-8"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart ({selectedItems.length})
                </Button>
              )}
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {/* In Stock Items */}
              {inStockItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">In Stock</h4>
                  {inStockItems.map((item) => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedItems.includes(item.id)}
                      onToggleSelect={() => toggleItemSelection(item.id)}
                      onRemove={() => onRemoveItem(item.id)}
                      onAddToCart={() => onAddToCart(item.productId)}
                      onViewProduct={() => onViewProduct(item.productId)}
                    />
                  ))}
                </div>
              )}

              {/* Out of Stock Items */}
              {outOfStockItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Out of Stock</h4>
                  {outOfStockItems.map((item) => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      isSelected={false}
                      onToggleSelect={() => {}}
                      onRemove={() => onRemoveItem(item.id)}
                      onAddToCart={() => {}}
                      onViewProduct={() => onViewProduct(item.productId)}
                      disabled
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface WishlistItemCardProps {
  item: WishlistItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onAddToCart: () => void;
  onViewProduct: () => void;
  disabled?: boolean;
}

const WishlistItemCard = ({ 
  item, 
  isSelected, 
  onToggleSelect, 
  onRemove, 
  onAddToCart, 
  onViewProduct,
  disabled = false 
}: WishlistItemCardProps) => {
  const discountPercentage = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <Card className={`${disabled ? 'opacity-60' : ''}`}>
      <CardContent className="p-3">
        <div className="flex gap-3">
          {!disabled && (
            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
                className="rounded"
              />
            </div>
          )}
          
          <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={onViewProduct}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground uppercase">{item.category}</p>
                <h4 
                  className="font-medium text-sm leading-tight cursor-pointer hover:text-primary"
                  onClick={onViewProduct}
                >
                  {item.name}
                </h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={onRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">₹{item.price.toLocaleString()}</span>
              {item.originalPrice && (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              {item.sizes.slice(0, 4).map((size) => (
                <span 
                  key={size}
                  className="text-xs border border-border rounded px-1 py-0.5 text-muted-foreground"
                >
                  {size}
                </span>
              ))}
              {item.sizes.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{item.sizes.length - 4}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {item.inStock ? (
                <Button 
                  size="sm" 
                  className="h-7 text-xs flex-1"
                  onClick={onAddToCart}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs flex-1"
                  disabled
                >
                  Out of Stock
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0"
              >
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wishlist;