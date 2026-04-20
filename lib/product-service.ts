/**
 * Product Service
 * Handles all product-related API operations with DummyJSON
 *
 * Note: DummyJSON is a mock API. Created products via POST /add
 * receive IDs but are not retrievable via GET afterward.
 */

import type { Product } from "@/types/product";
import { PRODUCTS_API_BASE_URL, PRODUCTS_FETCH_LIMIT } from "./constants";

export type CreateProductInput = {
  title: string;
  description?: string;
  price?: number;
  brand?: string;
  category?: string;
  stock?: number;
  thumbnail?: string;
};

export type UpdateProductInput = Partial<Product>;

/**
 * Fetches all products from the API
 * Uses cache to avoid unnecessary refetches
 */
export async function fetchAllProducts() {
  const url = `${PRODUCTS_API_BASE_URL}?limit=${PRODUCTS_FETCH_LIMIT}`;
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Failed to fetch products from the server");
  }

  return response.json() as Promise<{ products: Product[] }>;
}

/**
 * Fetches a single product by ID
 * Returns null if product is not found (404)
 *
 * Note: Products created via the API are not stored permanently
 * and won't be retrievable via this method
 */
export async function fetchProductById(
  productId: number,
): Promise<Product | null> {
  const response = await fetch(`${PRODUCTS_API_BASE_URL}/${productId}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${productId}`);
  }

  return response.json() as Promise<Product>;
}

/**
 * Creates a new product via the API
 * Returns the created product with an assigned ID
 *
 * Important: The product is NOT permanently stored by DummyJSON
 * Use session storage to persist it locally for the current session
 */
export async function createNewProduct(productData: CreateProductInput) {
  const response = await fetch(`${PRODUCTS_API_BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json() as Promise<Product>;
}

/**
 * Updates an existing product
 * Uses PUT method to update product fields
 */
export async function updateExistingProduct(
  productId: number,
  updates: UpdateProductInput,
) {
  const response = await fetch(`${PRODUCTS_API_BASE_URL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update product with ID ${productId}`);
  }

  return response.json() as Promise<Product>;
}

/**
 * Deletes a product by ID
 * Returns the deleted product info with isDeleted flag
 */
export async function deleteProductById(productId: number) {
  const response = await fetch(`${PRODUCTS_API_BASE_URL}/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product with ID ${productId}`);
  }

  return response.json() as Promise<Product & { isDeleted?: boolean }>;
}

