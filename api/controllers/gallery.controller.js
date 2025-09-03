import Gallery from '../models/gallery.model.js';

// Create a new gallery
export const createGallery = async (req, res, next) => {
  try {
    const gallery = new Gallery(req.body);
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    next(error);
  }
};

// Update an existing gallery
export const updateGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Gallery not found' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete a gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Gallery not found' });
    res.json({ message: 'Gallery deleted' });
  } catch (error) {
    next(error);
  }
};

export const getGallerys = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; // Set a default limit
    const skip = (page - 1) * limit;

    // Build filter object based on the category query
    const filter = {};
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Use Promise.all to fetch items and total count concurrently for efficiency
    const [items, total] = await Promise.all([
      Gallery.find(filter)
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit),
      Gallery.countDocuments(filter)
    ]);

    res.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};