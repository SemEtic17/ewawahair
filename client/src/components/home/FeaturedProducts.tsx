import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import API from '@/utils/api';
import { ProductCard } from '@/components/shop/ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await API.get('/product/getproducts?isBestSeller=true&limit=4');
        setProducts(res.data.products || []);
      } catch (e) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-luxury text-luxury-black mb-6">
            Featured <span className="text-luxury-gold">Collections</span>
          </h2>
          <p className="text-luxury text-luxury-black/70 max-w-2xl mx-auto">
            Discover our most coveted pieces, handpicked for their exceptional quality and stunning beauty
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-luxury-black/70 text-lg">Loading featured products...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-luxury-black/70 text-lg">No featured products found.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="btn-gold text-lg px-12 py-4 group" asChild>
            <a href="/shop">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;