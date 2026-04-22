import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * Product by ID API Endpoint for Pages Router
 * GET /api/products/[id] - Fetch a single product
 * PUT /api/products/[id] - Update a product (requires authentication)
 * DELETE /api/products/[id] - Delete a product (requires authentication)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (req.method === "GET") {
    return handleGet(req, res, id);
  } else if (req.method === "PUT") {
    return handlePut(req, res, id);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res, id);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

/**
 * GET Handler - Fetch a single product
 * Public route - no authentication required
 */
async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  try {
    await connectToDatabase();

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      error: "Failed to fetch product",
      message: error.message,
    });
  }
}

/**
 * PUT Handler - Update a product
 * Protected route - requires authentication
 */
async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to update products",
      });
    }

    await connectToDatabase();

    const body = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({
      product,
      message: "Product updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      error: "Failed to update product",
      message: error.message,
    });
  }
}

/**
 * DELETE Handler - Delete a product
 * Protected route - requires authentication
 */
async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to delete products",
      });
    }

    await connectToDatabase();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      error: "Failed to delete product",
      message: error.message,
    });
  }
}
