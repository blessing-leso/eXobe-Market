"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/product-card";

export function FeaturedProducts({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-steel-light">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-crimson">
              Fresh on eXobe
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Featured listings
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson hover:text-crimson-dark"
          >
            See all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
