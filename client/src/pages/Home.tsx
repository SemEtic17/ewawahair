import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      
      {/* Brand Story Preview */}
      <section className="py-20 bg-luxury-black text-luxury-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-luxury-gold/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-luxury"
            >
              Crafted for <span className="text-luxury-gold">Perfection</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-luxury text-luxury-white/90"
            >
              Every strand tells a story of excellence. Our premium human hair collection 
              represents the pinnacle of luxury, quality, and natural beauty. 
              Experience hair that moves, feels, and looks naturally divine.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 pt-12"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-luxury-gold rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-luxury-black">1</span>
                </div>
                <h3 className="font-playfair text-xl font-semibold">Premium Sourcing</h3>
                <p className="text-luxury-white/70">Ethically sourced from the finest hair donors worldwide</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-luxury-gold rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-luxury-black">2</span>
                </div>
                <h3 className="font-playfair text-xl font-semibold">Expert Craftsmanship</h3>
                <p className="text-luxury-white/70">Meticulously processed by master artisans</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-luxury-gold rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-luxury-black">3</span>
                </div>
                <h3 className="font-playfair text-xl font-semibold">Luxury Delivery</h3>
                <p className="text-luxury-white/70">Presented in our signature golden packaging</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-gold relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="heading-luxury text-luxury-black">
              Ready to Transform Your Look?
            </h2>
            <p className="text-luxury text-luxury-black/80 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've discovered the Ewawa Hair difference. 
              Your dream hair is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
              <button className="btn-luxury text-lg px-12 py-4">
                Shop Collection
              </button>
              </Link>
              <Link to="/about">
              <button className="btn-outline-luxury text-lg px-12 py-4">
                About Us
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;