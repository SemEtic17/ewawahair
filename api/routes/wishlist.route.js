import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getWishlist);
router.post('/add', verifyToken, addToWishlist);
router.delete('/remove', verifyToken, removeFromWishlist);

export default router;
