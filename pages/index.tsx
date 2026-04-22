import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

/**
 * Modern E-commerce Home Page
 * Features: Hero with product showcase, floating thumbnails, category selector
 */
export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Furniture");

  const categories = ["Furniture", "Electronics", "Fashion", "Home & Garden"];

  const productThumbnails = [
    {
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
      label: "Living Room",
      position: "top-12 right-8",
    },
    {
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop",
      label: "Bedroom",
      position: "top-1/2 right-4 -translate-y-1/2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=200&fit=crop",
      label: "Dining",
      position: "bottom-12 right-8",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
            {/* Left Content */}
            <div className="space-y-8 z-10">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                    e-commerce
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                    Website
                  </span>
                </h1>

                <p className="text-lg text-orange-800 font-medium tracking-wider">
                  SUPPORT LOCAL EVERYTHING
                </p>

                {/* Pagination dots */}
                <div className="flex gap-2 pt-4">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === activeSlide
                          ? "bg-gradient-to-r from-orange-400 to-pink-400 w-8"
                          : "bg-white/50"
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Category Selector */}
              <div className="flex items-center gap-4">
                <span className="text-orange-700 font-medium">
                  Popular category:
                </span>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-full px-6 py-2 pr-10 text-orange-900 font-medium focus:outline-none focus:border-orange-400 cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-600 pointer-events-none" />
                </div>
              </div>

              {/* Buy Now Button */}
              <Button
                asChild
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/products">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now
                </Link>
              </Button>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="relative flex items-center justify-center">
              {/* Large Circular Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-300/60 to-orange-400/40 blur-3xl" />
              </div>

              {/* Main Product Circle */}
              <div className="relative w-[450px] h-[450px] rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center shadow-2xl">
                {/* Main Product Image */}
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop"
                    alt="Featured Product"
                    className="w-80 h-80 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating Product Thumbnails */}
              {productThumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className={`absolute ${thumbnail.position} transform transition-all duration-500 hover:scale-110 cursor-pointer`}
                  style={{
                    animation: `float ${3 + index}s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white">
                      <img
                        src={thumbnail.image}
                        alt={thumbnail.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-medium text-orange-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {thumbnail.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Wave at Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl mb-3">
                    {index === 0 && "🪑"}
                    {index === 1 && "📱"}
                    {index === 2 && "👗"}
                    {index === 3 && "🏡"}
                  </div>
                  <h3 className="font-semibold text-lg text-orange-900">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-400 to-pink-400">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Discover Amazing Products</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Browse our collection and find everything you need for your home and
            lifestyle
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-8 py-6 text-lg font-semibold"
          >
            <Link href="/products">Explore All Products</Link>
          </Button>
        </div>
      </section>

      {/* Add floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Layout>
  );
}
