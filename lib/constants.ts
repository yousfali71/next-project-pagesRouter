/**
 * Application-wide constants and configuration
 * Centralizes reusable values for consistency and easy maintenance
 */

// Branding
export const APP_NAME = "Our Product";
export const APP_TAGLINE = "Your favorite online store";
export const APP_INITIALS = "OP";

// API Configuration
export const PRODUCTS_API_BASE_URL = "https://dummyjson.com/products";
export const PRODUCTS_FETCH_LIMIT = 100;

// Session Storage Keys
export const SESSION_STORAGE_PREFIX = "producthub";

// Navigation Links
export const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
] as const;

// Animation Delay Classes (used for staggered animations)
export const ANIMATION_DELAYS = [
  "yh-delay-1",
  "yh-delay-2",
  "yh-delay-3",
] as const;

// Default Product Thumbnail
export const DEFAULT_PRODUCT_THUMBNAIL =
  "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";

// Messages
export const MESSAGES = {
  loadingProducts: "Loading products…",
  loadingFilters: "Preparing filters…",
  productNotFound: "Product not found",
  productDeleteConfirm: "Are you sure you want to delete this product?",
  productUpdated: "Product updated successfully!",
  productDeleted: "Product deleted successfully!",
  sessionOnlyProduct: "Session-only product",
  sessionOnlyExplanation:
    "DummyJSON does not expose this ID on GET after create — you're seeing the copy saved in your browser. Edit/Update on the server is disabled; you can remove this copy or go back to the catalog.",
} as const;
