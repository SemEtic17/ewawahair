import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'My Site' },
  siteDescription: String,
  adminEmail: String,                  // New field
  supportEmail: String,                // New field
  enableRegistration: Boolean,         // New field
  enableNotifications: Boolean,        // New field
  maintenanceMode: Boolean,            // New field
  currency: String,                    // New field
  timezone: String,                   // New field
  maxFileSize: Number,                 // New field
  allowedFileTypes: String,            // New field
  socialMediaLinks: {                  // New field
    facebook: String,
    instagram: String,
    twitter: String
  },
  businessInfo: {                      // Replaces flat fields
    address: String,
    phone: String,
    businessHours: String
  }
}, {
  toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export default mongoose.model('Settings', settingsSchema);