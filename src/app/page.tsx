import { prisma } from "@/lib/prisma";
import { LandingHero } from "@/components/home/landing-hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SellerCta } from "@/components/home/seller-cta";
import type { ProductCardData } from "@/components/product-card";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<ProductCardData[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: { vendor: { select: { businessName: true, verified: true } } },
      orderBy: { views: "desc" },
      take: 8,
    });
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price.toNumber(),
      imageUrl: p.imageUrl,
      category: p.category,
      stock: p.stock,
      vendor: p.vendor,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div>
      <LandingHero />
      <ValueProps />
      <FeaturedProducts products={products} />
      <CategoryGrid />
      <SellerCta />
    </div>
  );
}
