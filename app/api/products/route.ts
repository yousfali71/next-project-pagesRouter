import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * GET /api/products - Fetch all products with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "0");
    const skip = parseInt(searchParams.get("skip") || "0");

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

    return NextResponse.json({
      products,
      total,
      limit,
      skip,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", message: error.message },
      { status: 500 },
    );
  }
}

/**
 * POST /api/products - Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Create new product
    const product = await Product.create(body);

    return NextResponse.json(
      { product, message: "Product created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product", message: error.message },
      { status: 500 },
    );
  }
}
