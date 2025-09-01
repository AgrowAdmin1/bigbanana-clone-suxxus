import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { shopifyAPI, ShopifyProduct, ShopifyCart, ShopifyCustomer } from '@/lib/shopify';
import { useToast } from '@/hooks/use-toast';

interface ShopifyState {
  // Products
  products: ShopifyProduct[];
  currentProduct: ShopifyProduct | null;
  productsLoading: boolean;
  productLoading: boolean;
  
  // Cart
  cart: ShopifyCart | null;
  cartLoading: boolean;
  
  // Customer
  customer: ShopifyCustomer | null;
  customerAccessToken: string | null;
  customerLoading: boolean;
  isAuthenticated: boolean;
  
  // Wishlist (stored locally)
  wishlist: string[];
  
  // Search & Filters
  searchQuery: string;
  selectedFilters: {
    productType?: string;
    vendor?: string;
    tags?: string[];
    priceRange?: { min: number; max: number };
    availability?: boolean;
  };
}

type ShopifyAction = 
  | { type: 'SET_PRODUCTS'; payload: ShopifyProduct[] }
  | { type: 'SET_CURRENT_PRODUCT'; payload: ShopifyProduct | null }
  | { type: 'SET_PRODUCTS_LOADING'; payload: boolean }
  | { type: 'SET_PRODUCT_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: ShopifyCart | null }
  | { type: 'SET_CART_LOADING'; payload: boolean }
  | { type: 'SET_CUSTOMER'; payload: ShopifyCustomer | null }
  | { type: 'SET_CUSTOMER_ACCESS_TOKEN'; payload: string | null }
  | { type: 'SET_CUSTOMER_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_WISHLIST'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: ShopifyState['selectedFilters'] }
  | { type: 'CLEAR_FILTERS' };

const initialState: ShopifyState = {
  products: [],
  currentProduct: null,
  productsLoading: false,
  productLoading: false,
  cart: null,
  cartLoading: false,
  customer: null,
  customerAccessToken: null,
  customerLoading: false,
  isAuthenticated: false,
  wishlist: [],
  searchQuery: '',
  selectedFilters: {},
};

function shopifyReducer(state: ShopifyState, action: ShopifyAction): ShopifyState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CURRENT_PRODUCT':
      return { ...state, currentProduct: action.payload };
    case 'SET_PRODUCTS_LOADING':
      return { ...state, productsLoading: action.payload };
    case 'SET_PRODUCT_LOADING':
      return { ...state, productLoading: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_CART_LOADING':
      return { ...state, cartLoading: action.payload };
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
    case 'SET_CUSTOMER_ACCESS_TOKEN':
      return { ...state, customerAccessToken: action.payload };
    case 'SET_CUSTOMER_LOADING':
      return { ...state, customerLoading: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'ADD_TO_WISHLIST':
      return { 
        ...state, 
        wishlist: [...state.wishlist, action.payload] 
      };
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(id => id !== action.payload) 
      };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, selectedFilters: { ...state.selectedFilters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, selectedFilters: {} };
    default:
      return state;
  }
}

interface ShopifyContextType extends ShopifyState {
  // Product actions
  fetchProducts: (options?: { query?: string; sortKey?: string; reverse?: boolean }) => Promise<void>;
  fetchProductByHandle: (handle: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  
  // Cart actions
  createCart: () => Promise<void>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  
  // Customer actions
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  
  // Wishlist actions
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Filter actions
  setSearchQuery: (query: string) => void;
  setFilters: (filters: ShopifyState['selectedFilters']) => void;
  clearFilters: () => void;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
};

interface ShopifyProviderProps {
  children: ReactNode;
}

export const ShopifyProvider = ({ children }: ShopifyProviderProps) => {
  const [state, dispatch] = useReducer(shopifyReducer, initialState);
  const { toast } = useToast();

  // Load stored data on initialization
  useEffect(() => {
    const storedCartId = localStorage.getItem('shopify-cart-id');
    const storedAccessToken = localStorage.getItem('shopify-customer-token');
    const storedWishlist = localStorage.getItem('shopify-wishlist');

    if (storedAccessToken) {
      dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: storedAccessToken });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      fetchCustomer(storedAccessToken);
    }

    if (storedWishlist) {
      try {
        const wishlist = JSON.parse(storedWishlist);
        dispatch({ type: 'SET_WISHLIST', payload: wishlist });
      } catch (error) {
        console.error('Error parsing stored wishlist:', error);
      }
    }

    if (!storedCartId) {
      createCart();
    }
  }, []);

  // Product actions
  const fetchProducts = useCallback(async (options: { query?: string; sortKey?: string; reverse?: boolean } = {}) => {
    dispatch({ type: 'SET_PRODUCTS_LOADING', payload: true });
    try {
      const products = await shopifyAPI.getProducts(options);
      dispatch({ type: 'SET_PRODUCTS', payload: products.edges.map(edge => edge.node) });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_PRODUCTS_LOADING', payload: false });
    }
  }, [toast]);

  const fetchProductByHandle = useCallback(async (handle: string) => {
    dispatch({ type: 'SET_PRODUCT_LOADING', payload: true });
    try {
      const product = await shopifyAPI.getProductByHandle(handle);
      dispatch({ type: 'SET_CURRENT_PRODUCT', payload: product });
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_PRODUCT_LOADING', payload: false });
    }
  }, [toast]);

  const searchProducts = useCallback(async (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    await fetchProducts({ query });
  }, [fetchProducts]);

  // Cart actions
  const createCart = async () => {
    dispatch({ type: 'SET_CART_LOADING', payload: true });
    try {
      const cart = await shopifyAPI.createCart();
      dispatch({ type: 'SET_CART', payload: cart });
      localStorage.setItem('shopify-cart-id', cart.id);
    } catch (error) {
      console.error('Error creating cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to create cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  };

  const addToCart = async (variantId: string, quantity: number) => {
    if (!state.cart) {
      await createCart();
    }

    dispatch({ type: 'SET_CART_LOADING', payload: true });
    try {
      const cart = await shopifyAPI.addToCart(state.cart!.id, [
        { merchandiseId: variantId, quantity }
      ]);
      dispatch({ type: 'SET_CART', payload: cart });
      toast({
        title: 'Success',
        description: 'Item added to cart!',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  };

  const updateCartLine = async (lineId: string, quantity: number) => {
    if (!state.cart) return;

    dispatch({ type: 'SET_CART_LOADING', payload: true });
    try {
      const cart = await shopifyAPI.updateCartLines(state.cart.id, [
        { id: lineId, quantity }
      ]);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to update cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!state.cart) return;

    dispatch({ type: 'SET_CART_LOADING', payload: true });
    try {
      const cart = await shopifyAPI.removeFromCart(state.cart.id, [lineId]);
      dispatch({ type: 'SET_CART', payload: cart });
      toast({
        title: 'Success',
        description: 'Item removed from cart.',
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  };

  // Customer actions
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string): Promise<boolean> => {
    dispatch({ type: 'SET_CUSTOMER_LOADING', payload: true });
    try {
      const result = await shopifyAPI.createCustomer({
        email,
        password,
        firstName,
        lastName,
      });

      if (result.customerUserErrors.length > 0) {
        toast({
          title: 'Error',
          description: result.customerUserErrors[0].message,
          variant: 'destructive',
        });
        return false;
      }

      // Automatically sign in after successful registration
      const signInResult = await signIn(email, password);
      return signInResult;
    } catch (error) {
      console.error('Error creating customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      dispatch({ type: 'SET_CUSTOMER_LOADING', payload: false });
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_CUSTOMER_LOADING', payload: true });
    try {
      const result = await shopifyAPI.createAccessToken(email, password);

      if (result.customerUserErrors.length > 0) {
        toast({
          title: 'Error',
          description: result.customerUserErrors[0].message,
          variant: 'destructive',
        });
        return false;
      }

      const accessToken = result.customerAccessToken.accessToken;
      dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: accessToken });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      localStorage.setItem('shopify-customer-token', accessToken);
      
      await fetchCustomer(accessToken);
      
      toast({
        title: 'Success',
        description: 'Welcome back!',
      });
      
      return true;
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      dispatch({ type: 'SET_CUSTOMER_LOADING', payload: false });
    }
  };

  const signOut = () => {
    dispatch({ type: 'SET_CUSTOMER', payload: null });
    dispatch({ type: 'SET_CUSTOMER_ACCESS_TOKEN', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    localStorage.removeItem('shopify-customer-token');
    
    toast({
      title: 'Success',
      description: 'You have been signed out.',
    });
  };

  const fetchCustomer = async (accessToken: string) => {
    try {
      const customer = await shopifyAPI.getCustomer(accessToken);
      dispatch({ type: 'SET_CUSTOMER', payload: customer });
    } catch (error) {
      console.error('Error fetching customer:', error);
      // If token is invalid, sign out
      signOut();
    }
  };

  // Wishlist actions
  const addToWishlist = (productId: string) => {
    if (!state.wishlist.includes(productId)) {
      const newWishlist = [...state.wishlist, productId];
      dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
      localStorage.setItem('shopify-wishlist', JSON.stringify(newWishlist));
      toast({
        title: 'Added to Wishlist',
        description: 'Item saved for later!',
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = state.wishlist.filter(id => id !== productId);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    localStorage.setItem('shopify-wishlist', JSON.stringify(newWishlist));
    toast({
      title: 'Removed from Wishlist',
      description: 'Item removed from your saved items.',
    });
  };

  // Filter actions
  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const setFilters = useCallback((filters: ShopifyState['selectedFilters']) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const isInWishlist = (productId: string) => {
    return state.wishlist.includes(productId);
  };

  const contextValue: ShopifyContextType = {
    ...state,
    fetchProducts,
    fetchProductByHandle,
    searchProducts,
    createCart,
    addToCart,
    updateCartLine,
    removeFromCart,
    signUp,
    signIn,
    signOut,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setSearchQuery,
    setFilters,
    clearFilters,
  };

  return (
    <ShopifyContext.Provider value={contextValue}>
      {children}
    </ShopifyContext.Provider>
  );
};