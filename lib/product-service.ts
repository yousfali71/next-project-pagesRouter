/**
 * Product Service
 * Handles all product-related API operations with MongoDB
 */

import type { Product } from "@/types/product";

export type CreateProductInput = {
  title: string;
  description: string;
  price: number;
  brand?: string;
  category: string;
  stock?: number;
  thumbnail?: string;
  images?: string[];
};

export type UpdateProductInput = Partial<CreateProductInput>;

/**
 * Fetches all products from the API
 * Supports optional filtering by category and search
 */
export async function fetchAllProducts(options?: {
  category?: string;
  search?: string;
  limit?: number;
  skip?: number;
}) {
  const params = new URLSearchParams();

  if (options?.category) params.append("category", options.category);
  if (options?.search) params.append("search", options.search);
  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.skip) params.append("skip", options.skip.toString());

  const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch products from the server");
  }

  return response.json() as Promise<{ products: Product[]; total: number }>;
}

/**
 * Fetches a single product by ID
 * Returns null if product is not found (404)
 */
export async function fetchProductById(
  productId: string,
): Promise<Product | null> {
  const response = await fetch(`/api/products/${productId}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${productId}`);
  }

  const data = await response.json();
  return data.product as Product;
}

/**
 * Creates a new product via the API
 * Returns the created product with MongoDB _id
 */
export async function createNewProduct(productData: CreateProductInput) {
  const response = await fetch(`/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }

  const data = await response.json();
  return data.product as Product;
}

/**
 * Updates an existing product
 * Uses PUT method to update product fields
 */
export async function updateExistingProduct(
  productId: string,
  updates: UpdateProductInput,
) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || `Failed to update product with ID ${productId}`,
    );
  }

  const data = await response.json();
  return data.product as Product;
}

/**
 * Deletes a product by ID
 * Returns success message
 */
export async function deleteProductById(productId: string) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || `Failed to delete product with ID ${productId}`,
    );
  }

  return response.json();
}
