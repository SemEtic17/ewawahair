import Wishlist from '../models/wishlist.model.js';
import { errorHandler } from '../utils/error.js';

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('items');
    res.json(wishlist ? wishlist.items : []);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [productId] });
    } else if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
    }
    await wishlist.save();
    res.json(wishlist.items);
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) return next(errorHandler(404, 'Wishlist not found'));
    wishlist.items = wishlist.items.filter(id => id.toString() !== productId);
    await wishlist.save();
    res.json(wishlist.items);
  } catch (error) {
    next(error);
  }
};
