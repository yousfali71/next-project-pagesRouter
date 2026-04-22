import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  Star,
  Package,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";

/**
 * Product Detail Page
 * Shows full product information with edit/delete options for authenticated users
 */
export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
      } else {
        setError(data.error || "Product not found");
      }
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/products");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      alert("An error occurred while deleting the product");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
            <p className="text-neutral-600">Loading product...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="border-red-200 bg-red-50 max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-3 text-red-800 text-center">
                <AlertCircle className="h-12 w-12" />
                <h3 className="font-semibold text-lg">Product Not Found</h3>
                <p className="text-sm">{error}</p>
                <Button asChild className="mt-4">
                  <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const displayImage =
    product.thumbnail || "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src={displayImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images
                  .slice(0, 4)
                  .map((img: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100"
                    >
                      <Image
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded">
                    {product.category}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-neutral-500 text-sm">/5</span>
                    </div>
                  )}
                </div>

                {/* Title & Brand */}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                  {product.brand && (
                    <p className="text-neutral-600">Brand: {product.brand}</p>
                  )}
                </div>

                <Separator />

                {/* Price */}
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Price</p>
                  <p className="text-4xl font-bold text-orange-500">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-neutral-600" />
                  <span className="text-sm">
                    {product.stock !== undefined ? (
                      product.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                          In Stock ({product.stock} available)
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )
                    ) : (
                      <span className="text-neutral-600">
                        Stock information not available
                      </span>
                    )}
                  </span>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Admin Actions (for authenticated users) */}
                {session?.user && (
                  <>
                    <Separator />
                    <div className="flex gap-3">
                      <Button asChild variant="outline" className="flex-1">
                        <Link href={`/products/${id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleDelete}
                        disabled={deleting}
                      >
                        {deleting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
