export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
