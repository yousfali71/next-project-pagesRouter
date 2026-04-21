import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  thumbnail?: string;
  images?: string[];
  stock?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      default: 'https://via.placeholder.com/300x300?text=No+Image',
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
const Product: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
