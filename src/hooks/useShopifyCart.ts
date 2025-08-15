import { useMemo } from 'react';
import { useShopify } from '@/contexts/ShopifyContext';

export const useShopifyCart = () => {
  const { 
    cart, 
    cartLoading, 
    addToCart, 
    updateCartLine, 
    removeFromCart,
    createCart 
  } = useShopify();

  const cartItems = useMemo(() => {
    if (!cart?.lines?.edges) return [];
    
    return cart.lines.edges.map(edge => ({
      id: edge.node.id,
      productId: edge.node.merchandise.product.id,
      variantId: edge.node.merchandise.id,
      name: edge.node.merchandise.product.title,
      variant: edge.node.merchandise.title,
      price: parseFloat(edge.node.merchandise.price.amount),
      image: edge.node.merchandise.image?.url || '/placeholder.svg',
      quantity: edge.node.quantity,
      total: parseFloat(edge.node.cost.totalAmount.amount),
      selectedOptions: edge.node.merchandise.selectedOptions,
      handle: edge.node.merchandise.product.handle,
    }));
  }, [cart]);

  const cartSummary = useMemo(() => {
    if (!cart) {
      return {
        totalQuantity: 0,
        subtotal: 0,
        total: 0,
        currency: 'USD',
      };
    }

    return {
      totalQuantity: cart.totalQuantity,
      subtotal: parseFloat(cart.cost.subtotalAmount.amount),
      total: parseFloat(cart.cost.totalAmount.amount),
      currency: cart.cost.totalAmount.currencyCode,
    };
  }, [cart]);

  const isInCart = (variantId: string) => {
    return cartItems.some(item => item.variantId === variantId);
  };

  const getCartItemQuantity = (variantId: string) => {
    const item = cartItems.find(item => item.variantId === variantId);
    return item?.quantity || 0;
  };

  const handleAddToCart = async (variantId: string, quantity: number = 1) => {
    await addToCart(variantId, quantity);
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(lineId);
    } else {
      await updateCartLine(lineId, quantity);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    await removeFromCart(lineId);
  };

  const getCheckoutUrl = () => {
    return cart?.checkoutUrl || '';
  };

  return {
    cart,
    cartItems,
    cartSummary,
    cartLoading,
    isInCart,
    getCartItemQuantity,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    getCheckoutUrl,
    createCart,
  };
};