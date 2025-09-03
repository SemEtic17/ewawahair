import React, { useState, useEffect } from 'react';
import { CartContext } from '@/hooks/useCart';
import API from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  length?: string;
  texture?: string;
  color?: string;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { user } = useAuth();

  // Helper to normalize cart items from backend
  const normalizeCartItems = (cart: any) => {
    if (!cart || !cart.items) return [];
    return cart.items.map((item: any) => ({
      id: item.product._id || item.product,
      name: item.product.name,
      price: Number(item.product.price) || 0,
      image: item.product.image,
      quantity: Number(item.quantity) || 1,
      category: item.product.category,
      length: item.product.length,
      texture: item.product.texture,
      color: item.product.color,
    }));
  };

  // Expose refreshCart for manual refresh
  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }
    try {
      const res = await API.get('/cart');
      setItems(normalizeCartItems(res.data));
    } catch (err) {
      setItems([]);
    }
  };

  // Load cart from backend on mount or when user changes
  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line
  }, [user]);

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    if (!user) return;
    try {
      await API.post('/cart/add', { productId: item.id, quantity: 1 });
      await refreshCart();
    } catch (err) {}
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    try {
      await API.delete('/cart/remove', { data: { productId: id } });
      await refreshCart();
    } catch (err) {}
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }
    try {
      await API.put('/cart/update', { productId: id, quantity });
      await refreshCart();
    } catch (err) {}
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await API.delete('/cart/clear');
      setItems([]);
    } catch (err) {}
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};