
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useShopify } from '@/contexts/ShopifyContext';
import { useToast } from '@/hooks/use-toast';

interface ProductGalleryProps {
  product: {
    id: string;
    title: string;
    handle: string;
    price: number;
    compareAtPrice?: number | null;
    images: Array<{
      url: string;
      alt: string;
    }>;
    variants: Array<{
      id: string;
      title: string;
      price: number;
      available: boolean;
    }>;
    available: boolean;
    tags: string[];
    vendor: string;
  };
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShopify();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const inWishlist = isInWishlist(product.id);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product.id);
      setIsWishlisted(true);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!product.available || product.variants.length === 0) {
      toast({
        title: 'Product Unavailable',
        description: 'This product is currently out of stock.',
        variant: 'destructive',
      });
      return;
    }

    // Use the first available variant
    const availableVariant = product.variants.find(v => v.available) || product.variants[0];
    
    try {
      await addToCart(availableVariant.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await handleAddToCart(e);
    navigate('/checkout');
  };

  const handleProductClick = () => {
    navigate(`/product/${product.handle}`);
  };

  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const currentImage = product.images[currentImageIndex] || { url: '/placeholder.svg', alt: product.title };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden" onClick={handleProductClick}>
        {/* Product Image with Navigation */}
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <img 
            src={currentImage.url} 
            alt={currentImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.includes('new') && (
            <Badge className="bg-accent text-accent-foreground">NEW</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleWishlistClick}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted || isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Vendor */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.vendor}
          </p>
          
          {/* Product Name */}
          <h3 className="font-medium text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add to Cart
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={handleBuyNow}
              disabled={!product.available}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductGallery;
