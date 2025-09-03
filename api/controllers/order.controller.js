import Order from '../models/order.model.js';
import { errorHandler } from '../utils/error.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { items, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(errorHandler(400, 'Order must have at least one item'));
    }
    const order = new Order({
      user: req.user.id,
      items,
      total,
      status: 'pending',
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
