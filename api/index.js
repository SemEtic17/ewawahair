import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import galleryRoutes from './routes/gallery.route.js';
import wishlistRoutes from './routes/wishlist.route.js';
import orderRoutes from './routes/order.route.js';
import cartRoutes from './routes/cart.route.js';
import customerRoutes from './routes/customer.route.js';
import settingsRoutes from './routes/settings.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL||'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

const __dirname = path.resolve();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/settings', settingsRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
