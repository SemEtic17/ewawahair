import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Play, Heart, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import API from '@/utils/api';

interface GalleryItem {
  _id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  category: string;
  description: string;
  likes: number;
  isVideo: boolean;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'installations', name: 'Installations' },
    { id: 'styles', name: 'Styles' },
    { id: 'transformations', name: 'Transformations' },
    { id: 'reviews', name: 'Customer Reviews' },
  ];

   useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get('/gallery/getgallerys', {
          params: {
            category: selectedCategory,
            page: pagination.page,
            limit: 8, // Request 8 items per page
          },
        });
        setItems(response.data.items);
        setPagination(prev => ({ ...prev, totalPages: response.data.totalPages }));
      } catch (err) {
        setError('Failed to load gallery. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [selectedCategory, pagination.page]);

  // Handler for changing category
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPagination({ page: 1, totalPages: 1 }); // Reset to page 1 on category change
  };

  // Handler for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
        setPagination(prev => ({...prev, page: newPage}));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-luxury-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-luxury text-luxury-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="heading-luxury">
              Hair <span className="text-luxury-gold">Gallery</span>
            </h1>
            <p className="text-luxury max-w-2xl mx-auto">
              Discover the beauty of our premium hair through stunning installations, 
              transformations, and satisfied customer experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-luxury-white-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className={selectedCategory === category.id 
                  ? 'bg-luxury-gold text-luxury-black hover:bg-luxury-gold-rich' 
                  : 'text-luxury-black hover:bg-luxury-gold-muted'
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {loading && <p className="text-center">Loading...</p> /* Simple loading indicator */}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item._id} // Use _id from MongoDB
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover-lift transition-luxury group">
                      <div className="relative">
                        {item.isVideo ? (
                          <video
                            src={item.src}
                            controls
                            preload="metadata"
                            className="w-full h-[400px] aspect-square object-cover bg-black"
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-[400px] aspect-square object-contain group-hover:scale-105 transition-luxury"
                          />
                        )}

                        <div className="absolute top-3 right-3 flex gap-2">
                          {/* Interaction buttons... */}
                        </div>

                        <Badge 
                          className="absolute bottom-3 left-3 bg-luxury-gold text-luxury-black capitalize"
                        >
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-playfair text-lg font-semibold text-luxury-black mb-2">
                          {item.title}
                        </h3>
                        <p className="text-luxury-black/70 text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-luxury-black/60">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{item.likes}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-luxury-gold hover:text-luxury-gold-rich"
                          >
                            <Instagram className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {!loading && items.length === 0 && (
                <p className="text-center text-luxury-black/70 mt-8">No items found in this category.</p>
              )}

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                 <div className="flex justify-center items-center gap-4 mt-12">
                    <Button 
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        variant="outline"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <span className="text-sm text-luxury-black/80">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <Button 
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        variant="outline"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                 </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-luxury text-luxury-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="heading-section">
              Share Your <span className="text-luxury-gold">Ewawa Hair</span> Experience
            </h2>
            <p className="text-luxury max-w-2xl mx-auto">
              Tag us @ewawahair on Instagram to be featured in our gallery
            </p>
            <Button className="btn-gold">
              <Instagram className="mr-2 h-5 w-5" />
              Follow @ewawahair
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;