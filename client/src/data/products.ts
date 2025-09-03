import API from "../utils/api";

export interface Product {
  id: string;
  _id?: string; // MongoDB ObjectId, optional for backend compatibility
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'wigs' | 'bundles' | 'closures' | 'frontals';
  description: string;
  features: string[];
  length?: string;
  texture: 'straight' | 'body-wave' | 'deep-wave' | 'curly' | 'kinky';
  color: string;
  origin: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Fetch products from backend with pagination
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  lengths?: string[];
  textures?: string[];
  inStockOnly?: boolean;
}

export const fetchProducts = async (params: ProductQueryParams = {}): Promise<ProductListResponse> => {
  const {
    page = 1,
    limit = 9,
    category,
    search,
    sort,
    minPrice,
    maxPrice,
    lengths,
    textures,
    inStockOnly,
  } = params;

  const query = new URLSearchParams();
  query.set('page', page.toString());
  query.set('limit', limit.toString());
  if (category && category !== 'all') query.set('category', category);
  if (search) query.set('search', search);
  if (sort) query.set('sort', sort);
  if (minPrice !== undefined) query.set('minPrice', minPrice.toString());
  if (maxPrice !== undefined) query.set('maxPrice', maxPrice.toString());
  if (lengths && lengths.length > 0) query.set('lengths', lengths.join(','));
  if (textures && textures.length > 0) query.set('textures', textures.join(','));
  if (inStockOnly) query.set('inStockOnly', 'true');

  const response = await API.get(`/product/getproducts?${query.toString()}`);
  return response.data;
};

// Example usage for category filtering (now async)
export const getProductsByCategory = async (category: string) => {
  const products = await fetchProducts();
  if (category === 'all') return products;
  return products.products.filter(product => product.category === category);
};

// Example usage for searching (now async)
export const searchProducts = (query: string, products: Product[]) => {
  if (!query.trim()) return products;
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.texture.toLowerCase().includes(searchTerm) ||
    product.origin.toLowerCase().includes(searchTerm) ||
    product.color.toLowerCase().includes(searchTerm)
  );
};

export const filterProducts = (
  products: Product[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    lengths?: string[];
    textures?: string[];
    inStockOnly?: boolean;
  }
) => {
  return products.filter(product => {
    // Price filter
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    
    // Length filter
    if (filters.lengths && filters.lengths.length > 0) {
      const productLength = product.length;
      if (!productLength) return false;
      
      const matchesLength = filters.lengths.some(length => {
        switch (length) {
          case '12-14 inches':
            return productLength.includes('12') || productLength.includes('14');
          case '16-18 inches':
            return productLength.includes('16') || productLength.includes('18');
          case '20-22 inches':
            return productLength.includes('20') || productLength.includes('22');
          case '24+ inches':
            return productLength.includes('24') || productLength.includes('26') || productLength.includes('28');
          default:
            return false;
        }
      });
      if (!matchesLength) return false;
    }
    
    // Texture filter
    if (filters.textures && filters.textures.length > 0) {
      const normalizedTextures = filters.textures.map(t => t.toLowerCase().replace(' ', '-'));
      if (!normalizedTextures.includes(product.texture)) return false;
    }
    
    // Stock filter
    if (filters.inStockOnly && !product.inStock) return false;
    
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }
};