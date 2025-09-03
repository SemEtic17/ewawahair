import { useWishlist } from '@/hooks/useWishlist';
import { Heart } from 'lucide-react';
// ...other imports...

const { itemCount } = useWishlist();

return (
  <div className="relative">
    <Heart className="h-6 w-6" />
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-luxury-gold text-xs text-luxury-black rounded-full px-1.5 py-0.5 font-bold">
        {itemCount}
      </span>
    )}
  </div>
);