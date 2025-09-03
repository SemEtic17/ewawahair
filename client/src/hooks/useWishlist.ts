import { useState, useContext, createContext } from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    // Return default values for SSR compatibility
    return {
      items: [],
      itemCount: 0,
      addItem: () => {},
      removeItem: () => {},
      isInWishlist: () => false,
      clearWishlist: () => {},
    };
  }
  return context;
};

export { WishlistContext };