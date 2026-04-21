/**
 * Database Seeder
 * Populates MongoDB with sample product data
 * Run with: npm run seed
 */

const mongoose = require("mongoose");

// MongoDB connection URI from environment
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/our-product-store";

// Product schema matching the model
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    thumbnail: { type: String },
    images: [String],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// Sample products
const sampleProducts = [
  {
    title: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 299.99,
    category: "Electronics",
    brand: "AudioTech",
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    ],
    stock: 45,
    rating: 4.8,
  },
  {
    title: "Ergonomic Office Chair",
    description:
      "Comfortable ergonomic chair with lumbar support and adjustable height. Designed for long working hours.",
    price: 349.0,
    category: "Furniture",
    brand: "ComfortPlus",
    thumbnail:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
    ],
    stock: 28,
    rating: 4.6,
  },
  {
    title: "Stainless Steel Water Bottle",
    description:
      "Eco-friendly insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.99,
    category: "Home & Kitchen",
    brand: "EcoFlow",
    thumbnail:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    ],
    stock: 120,
    rating: 4.9,
  },
  {
    title: "Smart Fitness Watch",
    description:
      "Track your workouts, monitor heart rate, and stay connected with this feature-packed smartwatch.",
    price: 199.99,
    category: "Electronics",
    brand: "FitTrack",
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    stock: 67,
    rating: 4.5,
  },
  {
    title: "Organic Cotton T-Shirt",
    description:
      "Soft and comfortable 100% organic cotton t-shirt. Available in multiple colors.",
    price: 24.99,
    category: "Clothing",
    brand: "EcoWear",
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    ],
    stock: 200,
    rating: 4.7,
  },
  {
    title: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound and 12-hour battery life.",
    price: 79.99,
    category: "Electronics",
    brand: "SoundWave",
    thumbnail:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    ],
    stock: 85,
    rating: 4.4,
  },
  {
    title: "Yoga Mat Pro",
    description:
      "Extra thick non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and stretching.",
    price: 39.99,
    category: "Sports",
    brand: "ZenFit",
    thumbnail:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    ],
    stock: 95,
    rating: 4.6,
  },
  {
    title: "LED Desk Lamp",
    description:
      "Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
    price: 49.99,
    category: "Home & Kitchen",
    brand: "BrightSpace",
    thumbnail:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    ],
    stock: 72,
    rating: 4.8,
  },
];

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected successfully");

    console.log("🗑️  Clearing existing products...");
    await Product.deleteMany({});
    console.log("✅ Cleared");

    console.log("🌱 Seeding products...");
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${result.length} products`);

    console.log("✨ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
