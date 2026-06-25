import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.update({
    where: { id },
    data: { views: { increment: 1 } },
    include: { vendor: { select: { id: true, businessName: true, verified: true, province: true, createdAt: true } } },
  }).catch(() => null);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product: { ...product, price: product.price.toNumber() } });
}
