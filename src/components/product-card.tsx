"use client";
import Link from "next/link";
import { ShieldCheck, ImageOff } from "lucide-react";
import { formatZAR, categoryLabel } from "@/lib/constants";

export type ProductCardData = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
  vendor: { businessName: string; verified: boolean };
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-steel-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full bg-steel-light">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-steel/40">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
        {product.stock === 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-jet px-2 py-0.5 text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-crimson">
          {categoryLabel(product.category)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-jet">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-steel">
          {product.vendor.verified && <ShieldCheck className="h-3 w-3 text-crimson" />}
          <span className="line-clamp-1">{product.vendor.businessName}</span>
        </div>
        <p className="mt-2 font-display text-base font-bold text-jet">{formatZAR(product.price)}</p>
      </div>
    </Link>
  );
}
