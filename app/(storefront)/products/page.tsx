"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { MESSAGES } from "@/lib/constants";

/**
 * Products Listing Page
 * Displays all products with filtering by category and brand
 * Uses URL search params to maintain filter state
 * Non-authenticated users see only 4 products
 */

/**
 * Main products view component
 * Handles product fetching, filtering, and display logic
 */
function ProductsGridView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Extract filter values from URL params
  const activeCategory = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";

  /**
   * Updates URL search params when filters change
   * Maintains filter state in the URL for shareability
   */
  const updateFilterParam = useCallback(
    (filterType: "category" | "brand", filterValue: string) => {
      const updatedParams = new URLSearchParams(searchParams.toString());

      if (filterValue) {
        updatedParams.set(filterType, filterValue);
      } else {
        updatedParams.delete(filterType);
      }

      const queryString = updatedParams.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  /**
   * Fetches products from the API on component mount
   */
  useEffect(() => {
    setLoadError(null);

    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products from server");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products as Product[]);
        setIsAuthenticated(data.isAuthenticated || false);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setLoadError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Extract unique categories and brands from products
  const availableCategories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const availableBrands = useMemo(
    () =>
      [
        ...new Set(
          products.map((product) => product.brand).filter(Boolean) as string[],
        ),
      ].sort(),
    [products],
  );

  /**
   * Filters products based on selected category and brand
   */
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (activeBrand) {
      result = result.filter((product) => product.brand === activeBrand);
    }

    return result;
  }, [products, activeCategory, activeBrand]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-teal-600" />
        <p className="text-sm font-medium text-neutral-500">
          {MESSAGES.loadingProducts}
        </p>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="font-semibold text-teal-600">{loadError}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const hasActiveFilters = activeCategory || activeBrand;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Authentication notice for non-logged-in users */}
      {!isAuthenticated && (
        <div className="mb-8 rounded-lg border border-teal-200 bg-teal-50 p-4 yh-animate-up">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-teal-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-teal-900">
                Limited Preview Mode
              </h3>
              <p className="mt-1 text-sm text-teal-700">
                You're viewing only 4 products.{" "}
                <Link
                  href="/login"
                  className="font-semibold underline hover:text-teal-900"
                >
                  Sign in
                </Link>{" "}
                to see all products and add/edit items.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page header with add button */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="yh-animate-up">
          <h1 className="text-3xl font-black tracking-tight text-neutral-950">
            All products
          </h1>
          <p className="mt-2 max-w-xl text-neutral-600">
            Browse and filter our complete product catalog
          </p>
        </div>
        {session?.user && (
          <Link
            href="/products/new"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-black"
          >
            + Add product
          </Link>
        )}
      </div>

      {/* Filter controls */}
      <div className="yh-animate-up yh-delay-1 mb-8 flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="filter-category">
          Category
        </label>
        <select
          id="filter-category"
          value={activeCategory}
          onChange={(e) => updateFilterParam("category", e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 shadow-sm transition hover:border-neutral-950 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/25"
        >
          <option value="">All categories</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-brand">
          Brand
        </label>
        <select
          id="filter-brand"
          value={activeBrand}
          onChange={(e) => updateFilterParam("brand", e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 shadow-sm transition hover:border-neutral-950 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/25"
        >
          <option value="">All brands</option>
          {availableBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-black"
        >
          Clear filters
        </button>
      </div>

      {/* Results count */}
      <p className="yh-animate-up yh-delay-2 mb-8 text-sm text-neutral-500">
        <span className="font-semibold text-neutral-950">
          {filteredProducts.length}
        </span>{" "}
        products found
        {hasActiveFilters && (
          <span className="ml-2 text-neutral-400">
            (category: {activeCategory || "any"} · brand: {activeBrand || "any"}
            )
          </span>
        )}
      </p>

      {/* Products grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            className={`yh-animate-up ${
              index % 3 === 0
                ? "yh-delay-1"
                : index % 3 === 1
                  ? "yh-delay-2"
                  : "yh-delay-3"
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Fallback component shown while Suspense boundary loads
 */
function ProductsLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-teal-600" />
      <p className="text-sm font-medium text-neutral-500">
        {MESSAGES.loadingFilters}
      </p>
    </div>
  );
}

/**
 * Products page with Suspense boundary for search params
 */
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingFallback />}>
      <ProductsGridView />
    </Suspense>
  );
}
