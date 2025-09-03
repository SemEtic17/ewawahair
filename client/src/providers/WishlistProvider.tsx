import React, { useState, useEffect } from 'react';
import { WishlistContext } from '@/hooks/useWishlist';
import API from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const { user } = useAuth();

  // Load wishlist from backend on mount or when user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setItems([]);
        return;
      }
      try {
        const res = await API.get('/wishlist');
        setItems(
          (res.data || []).map((product: any) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
          }))
        );
      } catch (err) {
        setItems([]);
      }
    };
    fetchWishlist();
  }, [user]);

  const addItem = async (item: WishlistItem) => {
    if (!user) return;
    try {
      await API.post('/wishlist/add', { productId: item.id });
      // Always fetch the full wishlist after add to avoid duplicates and ensure correct state
      const res = await API.get('/wishlist');
      setItems(
        (res.data || []).map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        }))
      );
    } catch (err) {}
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    try {
      await API.delete('/wishlist/remove', { data: { productId: id } });
      // Fetch the updated wishlist after removal to ensure correct state
      const res = await API.get('/wishlist');
      setItems(
        (res.data || []).map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        }))
      );
    } catch (err) {}
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]); // Optionally, implement a backend endpoint to clear all
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider value={{
      items,
      itemCount,
      addItem,
      removeItem,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};