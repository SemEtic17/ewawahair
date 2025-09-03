import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileDropdown } from '@/components/profile/ProfileDropdown';
import shortLogo from '@/assets/logo/short-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-luxury border-b border-luxury-gold/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover-lift">
              <img 
                src={shortLogo} 
                alt="Ewawa Hair" 
                className="h-12 w-auto object-contain animate-glow"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-premium font-medium tracking-wide transition-luxury hover-gold relative ${
                    location.pathname === item.path 
                      ? 'text-luxury-gold' 
                      : 'text-luxury-white'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-luxury-white hover:text-luxury-black transition-luxury"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-luxury-white hover:text-luxury-black transition-luxury"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              {/* Auth Buttons / Profile */}
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-luxury-white hover:text-luxury-black">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-luxury-gold text-luxury-black hover:bg-luxury-gold-dark">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden text-luxury-white hover:text-luxury-black transition-luxury"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="backdrop-luxury h-full flex flex-col justify-center items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className={`heading-section text-center hover-gold transition-luxury ${
                      location.pathname === item.path 
                        ? 'text-luxury-gold' 
                        : 'text-luxury-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8 space-y-4"
              >
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-4">
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full text-lg px-8 py-4">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={toggleMenu}>
                      <Button className="btn-gold text-lg px-8 py-4 w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button className="btn-gold text-lg px-8 py-4">
                    Shop Now
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;