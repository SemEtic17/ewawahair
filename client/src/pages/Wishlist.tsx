import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import Navigation from '@/components/layout/Navigation';

const Wishlist = () => {
  const { items, itemCount, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from wishlist`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared');
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
    });
    clearWishlist();
    toast.success(`${items.length} items moved to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-playfair text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist and never lose track of them.
            </p>
            <Link to="/shop">
              <Button className="btn-luxury">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-playfair text-4xl font-bold">My Wishlist</h1>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
              <Button variant="outline" onClick={handleMoveAllToCart}>
                Move All to Cart
              </Button>
              <Button variant="outline" onClick={handleClearWishlist}>
                Clear Wishlist
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <Card className="group hover-lift transition-luxury min-w-[300px]">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full aspect-square object-contain rounded-lg group-hover:scale-105 transition-luxury"
                      />
                      
                      {/* Action buttons overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-luxury rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            onClick={() => handleAddToCart(item)}
                            className="bg-white/90 text-black hover:bg-white"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="bg-white/90 text-red-600 hover:bg-white hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-playfair text-lg font-semibold line-clamp-2">
                        {item.name}
                      </h3>
                      
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-lg">
                          ${item.price.toFixed(2)}
                        </span>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                          
                          <Button
                            onClick={() => handleAddToCart(item)}
                            size="sm"
                            className="btn-luxury"
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    onClick={handleMoveAllToCart}
                    className="w-full btn-luxury"
                    disabled={items.length === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Move All to Cart
                  </Button>
                  
                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;