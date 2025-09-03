import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {

  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();


  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id, // Use MongoDB ObjectId if available
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      length: product.length,
      texture: product.texture,
      color: product.color,
    });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast.success('Added to wishlist!');
    }
  };

  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-luxury-white rounded-lg shadow-soft p-6 hover-lift transition-luxury"
      >
        <div className="flex gap-6">
          <div className="relative w-48 h-48 flex-shrink-0">
            <img
              src={product.images[currentImage] || product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
              loading="eager"
              decoding="async"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
                  aria-label="Previous image"
                  type="button"
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
                  aria-label="Next image"
                  type="button"
                >
                  &#8594;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {product.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-luxury-gold' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </>
            )}
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-luxury-gold text-luxury-black">
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="absolute top-2 right-2 bg-luxury-black text-luxury-white">
                Best Seller
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-luxury-black/50 rounded-lg flex items-center justify-center">
                <span className="text-luxury-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-playfair text-xl font-semibold text-luxury-black">
                {product.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleWishlist}
                className={`text-luxury-black ${isInWishlist(product._id) ? 'hover:bg-black/5' : ''}`}
              >
                <Heart
                  className={`h-5 w-5 ${isInWishlist(product._id) ? 'fill-luxury-gold text-luxury-gold' : ''}`}
                />
              </Button>
            </div>
            
            <p className="text-luxury-black/70 mb-3">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {product.texture.replace('-', ' ')}
              </Badge>
              {product.length && (
                <Badge variant="secondary" className="text-xs">
                  {product.length}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {product.origin}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-luxury-gold fill-luxury-gold'
                        : 'text-luxury-black/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-luxury-black/70">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl text-luxury-black">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-luxury-black/50 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-luxury"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-luxury-white rounded-lg shadow-soft p-4 hover-lift transition-luxury group"
    >
      <div className="relative mb-4">
        <img
          src={product.images[currentImage] || product.image}
          alt={product.name}
          className="w-full aspect-square object-contain rounded-lg group-hover:scale-105 transition-luxury"
          loading="eager"
              decoding="async"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
              aria-label="Previous image"
              type="button"
            >
              &#8592;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
              aria-label="Next image"
              type="button"
            >
              &#8594;
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-luxury-gold' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-luxury-gold text-luxury-black">
            New
          </Badge>
        )}
        {product.isBestSeller && (
          <Badge className="absolute top-2 right-2 bg-luxury-black text-luxury-white">
            Best Seller
          </Badge>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-luxury-black/50 rounded-lg flex items-center justify-center">
            <span className="text-luxury-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-playfair text-lg font-semibold text-luxury-black line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {product.texture.replace('-', ' ')}
          </Badge>
          {product.length && (
            <Badge variant="secondary" className="text-xs">
              {product.length}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-luxury-gold fill-luxury-gold'
                    : 'text-luxury-black/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-luxury-black/70">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="font-bold text-lg text-luxury-black">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-luxury-black/50 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleWishlist}
              className={`text-luxury-black ${isInWishlist(product._id) ? 'hover:bg-black/5' : ''}`}
              aria-label="Add to wishlist"
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(product._id) ? 'fill-luxury-gold text-luxury-gold' : ''}`}
              />
            </Button>
            
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="sm"
              className="btn-luxury"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};