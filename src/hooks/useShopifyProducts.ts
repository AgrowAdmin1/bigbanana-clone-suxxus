import { useMemo } from 'react';
import { useShopify } from '@/contexts/ShopifyContext';

export const useShopifyProducts = () => {
  const { 
    products, 
    currentProduct,
    productsLoading,
    productLoading,
    wishlist,
    searchQuery,
    selectedFilters,
    fetchProducts, 
    fetchProductByHandle,
    searchProducts,
    addToWishlist,
    removeFromWishlist,
    setSearchQuery,
    setFilters,
    clearFilters,
  } = useShopify();

  // Transform Shopify products to our format
  const transformedProducts = useMemo(() => {
    return products.map(product => {
      const firstVariant = product.variants.edges[0]?.node;
      const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
      const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
      const compareAtPrice = firstVariant?.compareAtPrice 
        ? parseFloat(firstVariant.compareAtPrice.amount) 
        : null;

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        price: minPrice,
        compareAtPrice,
        priceRange: minPrice !== maxPrice ? { min: minPrice, max: maxPrice } : null,
        images: product.images.edges.map(edge => ({
          url: edge.node.url,
          alt: edge.node.altText || product.title,
        })),
        variants: product.variants.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          price: parseFloat(edge.node.price.amount),
          compareAtPrice: edge.node.compareAtPrice 
            ? parseFloat(edge.node.compareAtPrice.amount) 
            : null,
          available: edge.node.availableForSale,
          selectedOptions: edge.node.selectedOptions,
        })),
        options: product.options,
        tags: product.tags,
        productType: product.productType,
        vendor: product.vendor,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        available: product.variants.edges.some(edge => edge.node.availableForSale),
      };
    });
  }, [products]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let filtered = transformedProducts;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.vendor.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (selectedFilters.productType) {
      filtered = filtered.filter(product => 
        product.productType === selectedFilters.productType
      );
    }

    if (selectedFilters.vendor) {
      filtered = filtered.filter(product => 
        product.vendor === selectedFilters.vendor
      );
    }

    if (selectedFilters.tags && selectedFilters.tags.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.tags!.some(tag => product.tags.includes(tag))
      );
    }

    if (selectedFilters.priceRange) {
      const { min, max } = selectedFilters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    if (selectedFilters.availability !== undefined) {
      filtered = filtered.filter(product => 
        product.available === selectedFilters.availability
      );
    }

    return filtered;
  }, [transformedProducts, searchQuery, selectedFilters]);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const productTypes = [...new Set(transformedProducts.map(p => p.productType))].filter(Boolean);
    const vendors = [...new Set(transformedProducts.map(p => p.vendor))].filter(Boolean);
    const allTags = transformedProducts.flatMap(p => p.tags);
    const tags = [...new Set(allTags)].filter(Boolean);
    
    const prices = transformedProducts.map(p => p.price);
    const priceRange = prices.length > 0 ? {
      min: Math.min(...prices),
      max: Math.max(...prices),
    } : { min: 0, max: 1000 };

    return {
      productTypes,
      vendors,
      tags,
      priceRange,
    };
  }, [transformedProducts]);

  // Transform current product
  const transformedCurrentProduct = useMemo(() => {
    if (!currentProduct) return null;

    const minPrice = parseFloat(currentProduct.priceRange.minVariantPrice.amount);
    const maxPrice = parseFloat(currentProduct.priceRange.maxVariantPrice.amount);
    const firstVariant = currentProduct.variants.edges[0]?.node;
    const compareAtPrice = firstVariant?.compareAtPrice 
      ? parseFloat(firstVariant.compareAtPrice.amount) 
      : null;

    return {
      id: currentProduct.id,
      title: currentProduct.title,
      handle: currentProduct.handle,
      description: currentProduct.description,
      price: minPrice,
      compareAtPrice,
      priceRange: minPrice !== maxPrice ? { min: minPrice, max: maxPrice } : null,
      images: currentProduct.images.edges.map(edge => ({
        url: edge.node.url,
        alt: edge.node.altText || currentProduct.title,
      })),
      variants: currentProduct.variants.edges.map(edge => ({
        id: edge.node.id,
        title: edge.node.title,
        price: parseFloat(edge.node.price.amount),
        compareAtPrice: edge.node.compareAtPrice 
          ? parseFloat(edge.node.compareAtPrice.amount) 
          : null,
        available: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions,
      })),
      options: currentProduct.options,
      tags: currentProduct.tags,
      productType: currentProduct.productType,
      vendor: currentProduct.vendor,
      available: currentProduct.variants.edges.some(edge => edge.node.availableForSale),
    };
  }, [currentProduct]);

  // Wishlist helpers
  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  // Sorting options
  const sortProducts = (products: typeof transformedProducts, sortBy: string) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'title-a-z':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-z-a':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return sorted;
    }
  };

  return {
    products: transformedProducts,
    filteredProducts,
    currentProduct: transformedCurrentProduct,
    productsLoading,
    productLoading,
    searchQuery,
    selectedFilters,
    filterOptions,
    wishlist,
    fetchProducts,
    fetchProductByHandle,
    searchProducts,
    setSearchQuery,
    setFilters,
    clearFilters,
    isInWishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    sortProducts,
  };
};