import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * Products API Endpoint for Pages Router
 * GET /api/products - Fetch all products with optional filtering
 * POST /api/products - Create a new product (requires authentication)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

/**
 * GET Handler - Fetch all products
 * Public route - no authentication required
 * Non-authenticated users see only 4 products
 */
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const { category, search, limit: limitParam, skip: skipParam } = req.query;
    let limit = parseInt((limitParam as string) || "0");
    const skip = parseInt((skipParam as string) || "0");

    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    const authenticated = !!session?.user;

    // Limit to 4 products for non-authenticated users
    if (!authenticated) {
      limit = 4;
    }

    // Build query filter
    const filter: any = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      products,
      total,
      limit,
      skip,
      isAuthenticated: authenticated,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      error: "Failed to fetch products",
      message: error.message,
    });
  }
}

/**
 * POST Handler - Create a new product
 * Protected route - requires authentication
 */
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "You must be logged in to create products",
      });
    }

    await connectToDatabase();

    const body = req.body;

    // Create new product
    const product = await Product.create(body);

    return res.status(201).json({
      product,
      message: "Product created successfully",
    });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      error: "Failed to create product",
      message: error.message,
    });
  }
}
