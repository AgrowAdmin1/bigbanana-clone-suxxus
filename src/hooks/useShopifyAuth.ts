import { useState } from 'react';
import { useShopify } from '@/contexts/ShopifyContext';

export const useShopifyAuth = () => {
  const { 
    customer, 
    customerLoading, 
    isAuthenticated, 
    signUp, 
    signIn, 
    signOut 
  } = useShopify();
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUp = async (formData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    const success = await signUp(
      formData.email, 
      formData.password, 
      formData.firstName, 
      formData.lastName
    );
    
    if (success) {
      setIsSignUpMode(false);
    }
    
    return success;
  };

  const handleSignIn = async (email: string, password: string) => {
    const success = await signIn(email, password);
    return success;
  };

  const toggleMode = () => {
    setIsSignUpMode(prev => !prev);
  };

  return {
    customer,
    customerLoading,
    isAuthenticated,
    isSignUpMode,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut,
    toggleMode,
  };
};