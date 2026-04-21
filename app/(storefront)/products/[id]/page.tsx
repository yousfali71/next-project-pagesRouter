"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  fetchProductById,
  updateExistingProduct,
  deleteProductById,
} from "@/lib/product-service";
import { Product } from "@/types/product";
import { MESSAGES } from "@/lib/constants";

type ProductEditData = {
  title: string;
  price: number;
  description: string;
};

/**
 * Product Detail Page
 * Displays full product information with edit and delete capabilities
 * Uses MongoDB for persistent storage
 */
export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Product state
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Edit state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState<ProductEditData>({
    title: "",
    price: 0,
    description: "",
  });
  const [actionError, setActionError] = useState<string | null>(null);

  /**
   * Fetches product data on mount from MongoDB
   */
  useEffect(() => {
    const productId = String(id);

    if (!productId) {
      setFetchError("Invalid product ID");
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setFetchError(null);

    async function loadProductData() {
      try {
        const apiProduct = await fetchProductById(productId);
        if (isCancelled) return;

        if (apiProduct) {
          setProduct(apiProduct);
          setEditFormData({
            title: apiProduct.title,
            price: apiProduct.price,
            description: apiProduct.description,
          });
          return;
        }

        setFetchError(MESSAGES.productNotFound);
      } catch (error) {
        if (!isCancelled) {
          setFetchError(
            error instanceof Error ? error.message : "Failed to load product",
          );
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadProductData();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  /**
   * Handles product update via MongoDB API
   */
  const handleProductUpdate = async () => {
    setActionError(null);

    try {
      const updatedProduct = await updateExistingProduct(
        String(id),
        editFormData,
      );
      setProduct((previous) =>
        previous ? { ...previous, ...updatedProduct } : previous,
      );
      setIsEditMode(false);
      alert(MESSAGES.productUpdated);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Update failed");
    }
  };

  /**
   * Handles product deletion from MongoDB
   */
  const handleProductDelete = async () => {
    if (!confirm(MESSAGES.productDeleteConfirm)) return;

    setActionError(null);

    try {
      await deleteProductById(String(id));
      alert(MESSAGES.productDeleted);
      router.push("/products");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Delete failed");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-teal-600" />
        <p className="text-sm font-medium text-neutral-500">Loading…</p>
      </div>
    );
  }

  // Error state
  if (fetchError || !product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="font-semibold text-neutral-950">
          {fetchError ?? MESSAGES.productNotFound}
        </p>
        <p className="mt-3 text-sm text-neutral-600">
          This product could not be found in the database.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          All products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="yh-animate-up mb-8 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-50"
      >
        ← Back
      </button>

      {/* Action error banner */}
      {actionError && (
        <p className="mb-6 rounded-lg border border-teal-600/30 bg-teal-600/10 px-4 py-3 text-sm text-teal-600">
          {actionError}
        </p>
      )}

      {/* Product details grid */}
      <div className="yh-animate-up grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Product image */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-lg">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={560}
            height={420}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        {/* Product info and actions */}
        <div className="flex flex-col gap-4">
          {isEditMode ? (
            // Edit form
            <div className="flex flex-col gap-4">
              <input
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
                className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="Title"
              />
              <input
                type="number"
                value={editFormData.price}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, price: +e.target.value })
                }
                className="rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="Price"
              />
              <textarea
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                className="min-h-[120px] rounded-lg border border-neutral-300 px-4 py-3 text-neutral-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                rows={4}
                placeholder="Description"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleProductUpdate}
                  className="rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Save (PUT)
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="rounded-lg border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <>
              <span className="w-fit rounded-full border border-neutral-950/10 bg-neutral-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-950">
                {product.category}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-neutral-950">
                {product.title}
              </h1>
              <p className="text-neutral-600">Brand: {product.brand}</p>
              <p className="text-4xl font-black text-teal-600">
                ${product.price}
              </p>
              <p className="leading-relaxed text-neutral-600">
                {product.description}
              </p>
              <p className="text-sm text-neutral-500">
                ⭐ {product.rating ?? "—"} · Stock: {product.stock ?? "—"}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="rounded-lg bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleProductDelete}
                  className="rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
