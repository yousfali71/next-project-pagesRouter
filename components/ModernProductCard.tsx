import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail?: string;
    category: string;
    rating?: number;
    stock?: number;
  };
}

/**
 * Modern Product Card Component with Shadcn/ui
 * Features: Image, title, price, rating, CTA button
 */
export default function ModernProductCard({ product }: ProductCardProps) {
  const { _id, title, description, price, thumbnail, category, rating, stock } =
    product;

  const displayImage =
    thumbnail || "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${_id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-neutral-100">
          <Image
            src={displayImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {stock !== undefined && stock <= 10 && stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Low Stock
            </div>
          )}
          {stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
            {category}
          </span>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <Link href={`/products/${_id}`}>
          <CardTitle className="line-clamp-2 text-base hover:text-orange-500 transition-colors">
            {title}
          </CardTitle>
        </Link>

        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-orange-500">
            ${price.toFixed(2)}
          </span>
        </div>

        <Button asChild size="sm">
          <Link href={`/products/${_id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
