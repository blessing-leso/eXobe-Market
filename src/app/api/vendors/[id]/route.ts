import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const vendor = await prisma.vendor.findUnique({
    where: { id },
    include: {
      products: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  // Dashboard stats: per-listing views + units sold (joined from OrderItem).
  const sales = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: { vendorId: id },
    _sum: { quantity: true },
  });
  const salesByProduct = new Map(sales.map((s) => [s.productId, s._sum.quantity ?? 0]));

  const products = vendor.products.map((p) => ({
    ...p,
    price: p.price.toNumber(),
    unitsSold: salesByProduct.get(p.id) ?? 0,
  }));

  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalUnitsSold = products.reduce((sum, p) => sum + p.unitsSold, 0);

  return NextResponse.json({
    vendor: { ...vendor, products: undefined },
    products,
    stats: {
      totalListings: products.length,
      totalViews,
      totalUnitsSold,
    },
  });
}
