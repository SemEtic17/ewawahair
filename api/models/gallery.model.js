import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  src: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  description: { type: String },
  likes: { type: Number },
  isVideo: { type: Boolean, default: false }
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
