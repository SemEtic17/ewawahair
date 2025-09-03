import Product from '../models/product.model.js';

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Update an existing product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }
    let andFilters = [];
    if (req.query.search) {
      const search = req.query.search;
      andFilters.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { texture: { $regex: search, $options: 'i' } },
          { origin: { $regex: search, $options: 'i' } },
          { color: { $regex: search, $options: 'i' } },
        ]
      });
    }
    if (req.query.minPrice) {
      filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
    }
    if (req.query.lengths) {
      // lengths is a comma-separated string from UI, map to DB format if needed
      const selected = req.query.lengths.split(',').map(l => l.trim());
      // Build regex array for each selected length range
      const regexes = selected.map(option => {
        switch (option) {
          case '12-14 inches':
            return /12|13|14/;
          case '16-18 inches':
            return /16|17|18/;
          case '20-22 inches':
            return /20|21|22/;
          case '24+ inches':
            return /24|25|26|27|28|29|30/;
          default:
            return new RegExp(option.replace(/[^\d]/g, ''));
        }
      });
      // AND: product must match at least one selected length
      andFilters.push({ $or: regexes.map(r => ({ length: { $regex: r } })) });
    }
    if (req.query.textures) {
      // textures is a comma-separated string from UI, normalize to DB format
      const textures = req.query.textures.split(',').map(t => t.trim().toLowerCase().replace(/ /g, '-'));
      andFilters.push({ texture: { $in: textures } });
    }
    if (req.query.inStockOnly === 'true') {
      andFilters.push({ inStock: true });
    }

    // Build sort object with a unique secondary key for stable pagination
    let sort = {};
    switch (req.query.sort) {
      case 'price-low':
        sort = { price: 1, _id: 1 };
        break;
      case 'price-high':
        sort = { price: -1, _id: 1 };
        break;
      case 'newest':
        sort = { createdAt: -1, _id: 1 };
        break;
      case 'rating':
        sort = { rating: -1, _id: 1 };
        break;
      case 'featured':
      default:
        sort = { isBestSeller: -1, _id: 1 };
        break;
    }

    // Compose AND filter
    let finalFilter = { ...filter };
    if (andFilters.length > 0) {
      finalFilter = { ...filter, $and: andFilters };
    }
    const [products, total] = await Promise.all([
      Product.find(finalFilter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(finalFilter)
    ]);
    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
}