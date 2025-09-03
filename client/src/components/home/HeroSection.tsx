import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Scene3D from '@/components/3d/Scene3D';
import heroImage from '@/assets/hero/premium-model-hero.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-luxury">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D className="w-full h-full" />
      </div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8 min-h-screen flex items-center mt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="heading-hero text-luxury-white leading-tight">
                Luxury
                <span className="block text-luxury-gold">Hair</span>
                <span className="block">Redefined</span>
              </h1>
              
              <p className="text-luxury text-luxury-white/90 max-w-xl mx-auto">
                Premium human hair extensions, wigs, and bundles crafted for the modern woman. 
                Experience unparalleled quality and cinematic beauty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/shop">
              <Button className="btn-gold group text-lg px-8 py-6">
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              </Link>
              <Link to="/gallery">
              <Button 
                variant="outline" 
                className="btn-outline-luxury text-lg px-8 py-6 border-luxury-white text-luxury-gold hover:bg-luxury-white hover:text-luxury-black group"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Watch Story
              </Button>
              </Link>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-luxury-white/20"
            >
              <div className="text-center lg:text-left">
                <div className="heading-section text-luxury-gold">100%</div>
                <p className="text-sm text-luxury-white/80 font-poppins">Human Hair</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="heading-section text-luxury-gold">5K+</div>
                <p className="text-sm text-luxury-white/80 font-poppins">Happy Clients</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="heading-section text-luxury-gold">24/7</div>
                <p className="text-sm text-luxury-white/80 font-poppins">Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-luxury-gold/20 blur-3xl rounded-full scale-110 animate-glow" />
              
              {/* Main Image */}
              <motion.img
                src={heroImage}
                alt="Premium Model with Ewawa Hair Branded Bag"
                className="relative z-10 w-full max-w-lg h-auto object-contain animate-float"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 right-0 w-20 h-20 border border-luxury-gold/30 rounded-full"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 left-0 w-16 h-16 border border-luxury-gold/40 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-luxury-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;