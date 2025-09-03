import express from 'express';
import { getOrders, createOrder } from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getOrders);
router.post('/create', verifyToken, createOrder);

export default router;
