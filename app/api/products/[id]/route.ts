import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * GET /api/products/[id] - Fetch a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product", message: error.message },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/products/[id] - Update a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product,
      message: "Product updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product", message: error.message },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/products/[id] - Delete a product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product", message: error.message },
      { status: 500 },
    );
  }
}
