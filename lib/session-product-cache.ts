/**
 * Session Product Cache
 * Provides client-side session storage for newly created products
 *
 * Why needed: DummyJSON API creates products but doesn't persist them
 * for retrieval. We cache them in sessionStorage so users can view
 * their newly created products during the current session.
 */

import type { Product } from "@/types/product";
import { SESSION_STORAGE_PREFIX } from "./constants";

/**
 * Generates a consistent storage key for a product ID
 */
function generateProductCacheKey(productId: number): string {
  return `${SESSION_STORAGE_PREFIX}:product:${productId}`;
}

/**
 * Saves a newly created product to session storage
 * Allows viewing the product even though the API won't return it
 */
export function cacheProductInSession(product: Product): void {
  try {
    const storageKey = generateProductCacheKey(product.id);
    const serializedProduct = JSON.stringify(product);
    sessionStorage.setItem(storageKey, serializedProduct);
  } catch (error) {
    // Silently fail if sessionStorage is unavailable or full
    console.warn("Failed to cache product in session:", error);
  }
}

/**
 * Retrieves a cached product from session storage
 * Returns null if the product is not in the cache
 */
export function retrieveCachedProduct(productId: number): Product | null {
  try {
    const storageKey = generateProductCacheKey(productId);
    const serializedProduct = sessionStorage.getItem(storageKey);

    if (!serializedProduct) {
      return null;
    }

    return JSON.parse(serializedProduct) as Product;
  } catch (error) {
    console.warn("Failed to retrieve cached product:", error);
    return null;
  }
}

/**
 * Removes a product from the session cache
 * Used when a user deletes a session-only product
 */
export function removeCachedProduct(productId: number): void {
  try {
    const storageKey = generateProductCacheKey(productId);
    sessionStorage.removeItem(storageKey);
  } catch (error) {
    console.warn("Failed to remove cached product:", error);
  }
}

/**
 * Checks if a product exists in the session cache
 */
export function isProductCached(productId: number): boolean {
  try {
    const storageKey = generateProductCacheKey(productId);
    return sessionStorage.getItem(storageKey) !== null;
  } catch {
    return false;
  }
}

