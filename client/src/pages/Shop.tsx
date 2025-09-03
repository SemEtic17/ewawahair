import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/shop/ProductCard';
import { fetchProducts } from '@/data/products';
import API from '@/utils/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({ wigs: 0, bundles: 0, closures: 0, frontals: 0 });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts({
          page,
          limit: 9,
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          lengths: selectedLengths,
          textures: selectedTextures,
          inStockOnly,
        });
        setProducts(res.products);
        setTotalPages(res.totalPages);
        setTotalProducts(res.total);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    loadProducts();
  }, [page, selectedCategory, searchQuery, sortBy, priceRange, selectedLengths, selectedTextures, inStockOnly]);

  // Fetch category counts (all products, not paginated)
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const res = await API.get('/product/getproducts?limit=0');
        const allProducts = res.data.products || [];
        const counts = { wigs: 0, bundles: 0, closures: 0, frontals: 0 };
        allProducts.forEach((p) => {
          if (counts[p.category] !== undefined) counts[p.category]++;
        });
        setCategoryCounts(counts);
      } catch (e) {
        // ignore
      }
    };
    fetchCategoryCounts();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', count: totalProducts },
    { id: 'wigs', name: 'Wigs', count: categoryCounts.wigs },
    { id: 'bundles', name: 'Bundles', count: categoryCounts.bundles },
    { id: 'closures', name: 'Closures', count: categoryCounts.closures },
    { id: 'frontals', name: 'Frontals', count: categoryCounts.frontals },
  ];

  const lengthOptions = ['12-14 inches', '16-18 inches', '20-22 inches', '24+ inches'];
  const textureOptions = ['Straight', 'Body Wave', 'Deep Wave', 'Curly', 'Kinky'];

  // Filtering, searching, and sorting should be implemented server-side for pagination

  const handleLengthChange = (length: string, checked: boolean) => {
    if (checked) {
      setSelectedLengths([...selectedLengths, length]);
    } else {
      setSelectedLengths(selectedLengths.filter(l => l !== length));
    }
    setPage(1);
  };

  const handleTextureChange = (texture: string, checked: boolean) => {
    if (checked) {
      setSelectedTextures([...selectedTextures, texture]);
    } else {
      setSelectedTextures(selectedTextures.filter(t => t !== texture));
    }
    setPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-luxury-white"
    >
      <Navigation />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-luxury text-luxury-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="heading-luxury">
              Premium <span className="text-luxury-gold">Hair Collection</span>
            </h1>
            <p className="text-luxury max-w-2xl mx-auto">
              Discover our complete range of luxury human hair products, 
              crafted for the discerning woman who demands perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/4 space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-luxury-black/50" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 border-luxury-black/20 focus:border-luxury-gold"
                />
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-semibold text-luxury-black">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-luxury ${
                        selectedCategory === category.id
                          ? 'bg-luxury-gold text-luxury-black'
                          : 'bg-luxury-white-cream hover:bg-luxury-gold-muted text-luxury-black'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm opacity-70">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-semibold text-luxury-black">
                  Filters
                </h3>
                
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-black">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-luxury-black/70">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Hair Length */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-black">Hair Length</label>
                  <div className="space-y-2">
                    {lengthOptions.map((length) => (
                      <div key={length} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedLengths.includes(length)}
                          onCheckedChange={(checked) => handleLengthChange(length, !!checked)}
                        />
                        <span className="text-sm text-luxury-black">{length}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hair Texture */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-luxury-black">Hair Texture</label>
                  <div className="space-y-2">
                    {textureOptions.map((texture) => (
                      <div key={texture} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedTextures.includes(texture)}
                          onCheckedChange={(checked) => handleTextureChange(texture, !!checked)}
                        />
                        <span className="text-sm text-luxury-black">{texture}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-3/4 space-y-6"
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-luxury-white-cream rounded-lg">
              <div className="text-luxury-black">
                  <span className="font-medium">{totalProducts} products</span> found
                </div>
                
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Sort by: Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-luxury-gold text-luxury-black hover:text-luxury-gold hover:bg-luxury-black' : ''}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-luxury-gold text-luxury-black hover:text-luxury-gold hover:bg-luxury-black' : ''}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-luxury-black/70 text-lg">Loading products...</p>
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-luxury-black/70 text-lg">No products found matching your criteria.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center pt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? 'default' : 'ghost'}
                      className={p === page ? 'bg-luxury-gold text-luxury-black' : ''}
                      onClick={() => setPage(p)}
                      disabled={p === page}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Shop;