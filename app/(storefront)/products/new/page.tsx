"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createNewProduct, type CreateProductInput } from "@/lib/product-service";
import { cacheProductInSession } from "@/lib/session-product-cache";
import { DEFAULT_PRODUCT_THUMBNAIL } from "@/lib/constants";

const DEFAULT_PRODUCT_THUMBNAIL = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";

const initialFormData: CreateProductInput = {
  title: "",
  description: "",
  price: 0,
  brand: "",
  category: "",
  stock: 0,
  thumbnail: DEFAULT_PRODUCT_THUMBNAIL,
};

/**
 * New Product Page
 * Form for creating a new product
 * Note: DummyJSON creates products but doesn't persist them permanently
 */
export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateProductInput>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const processedValue = type === "number" 
      ? (value === "" ? 0 : Number(value)) 
      : value;
      
    setFormData((previous) => ({
      ...previous,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      setErrorMessage("Product title is required.");
      return;
    }
    
    setErrorMessage(null);
    setIsSaving(true);
    
    try {
      const createdProduct = await createNewProduct({
        title: formData.title.trim(),
        description: formData.description?.trim() || "—",
        price: formData.price,
        brand: formData.brand?.trim() || "Generic",
        category: formData.category?.trim() || "general",
        stock: formData.stock,
        thumbnail: formData.thumbnail?.trim() || DEFAULT_PRODUCT_THUMBNAIL,
      });
      
      // Cache the product locally since DummyJSON won't persist it
      cacheProductInSession(createdProduct);
      
      // Navigate to the product detail page
      router.push(`/products/${createdProduct.id}`);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Could not create product."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/products"
          className="text-sm font-semibold text-teal-600 transition hover:text-black"
        >
          ← Back to products
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">
          Add product
        </h1>
      </div>

      {/* Product creation form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title *"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            min={0}
            step="0.01"
            value={formData.price === 0 ? "" : formData.price}
            onChange={handleInputChange}
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            min={0}
            value={formData.stock === 0 ? "" : formData.stock}
            onChange={handleInputChange}
            className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          />
        </div>
        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleInputChange}
          className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          type="url"
          value={formData.thumbnail}
          onChange={handleInputChange}
          className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />

        {errorMessage && (
          <p className="rounded-lg bg-teal-600/10 px-4 py-2 text-sm text-teal-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="mt-2 rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create product"}
        </button>
      </form>
    </div>
  );
}

