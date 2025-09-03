import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  category: { type: String, required: true },
  description: { type: String },
  features: { type: [String], default: [] },
  length: { type: String },
  texture: { type: String },
  color: { type: String },
  origin: { type: String },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isBestSeller: { type: Boolean, default: false },
  isRecent: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
