import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  vendorId: z.string().min(1),
  name: z.string().min(2).max(120),
  description: z.string().min(10).max(1000),
  price: z.coerce.number().positive(),
  category: z.enum([
    "FASHION",
    "ELECTRONICS",
    "HOME_AND_GARDEN",
    "BEAUTY",
    "FOOD_AND_BEVERAGE",
    "ARTS_AND_CRAFTS",
    "SERVICES",
    "OTHER",
  ]),
  imageUrl: z.string().url().optional().or(z.literal("")),
  stock: z.coerce.number().int().min(0).default(1),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("q");

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category && category !== "ALL"
        ? { category: category as Prisma.ProductWhereInput["category"] }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { vendor: { select: { id: true, businessName: true, verified: true, province: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    products: products.map((p) => ({ ...p, price: p.price.toNumber() })),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const vendor = await prisma.vendor.findUnique({ where: { id: parsed.data.vendorId } });
  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  const product = await prisma.product.create({
    data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null },
  });

  return NextResponse.json(
    { product: { ...product, price: product.price.toNumber() } },
    { status: 201 }
  );
}
