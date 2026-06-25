"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ImageOff, Minus, Plus, ArrowLeft } from "lucide-react";
import { formatZAR, categoryLabel } from "@/lib/constants";
import { useCartStore } from "@/stores/cart";

type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  stock: number;
  vendor: { id: string; businessName: string; verified: boolean; province: string };
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [qty, setQty] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setProduct(data.product))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-display text-xl font-bold">This listing isn&apos;t available</p>
        <p className="mt-2 text-steel">It may have been removed by the vendor.</p>
        <Link href="/products" className="mt-6 inline-block text-sm font-semibold text-crimson">
          ← Back to browsing
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-steel-light" />
          <div className="space-y-3">
            <div className="h-6 w-2/3 animate-pulse rounded bg-steel-light" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-steel-light" />
            <div className="h-24 w-full animate-pulse rounded bg-steel-light" />
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        vendorId: product.vendor.id,
        name: product.name,
        vendorName: product.vendor.businessName,
        unitPrice: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:text-jet"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-steel-light">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-steel/40">
              <ImageOff className="h-10 w-10" />
            </div>
          )}
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-crimson">
            {categoryLabel(product.category)}
          </span>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <Link
            href={`/vendor/${product.vendor.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-steel hover:text-jet"
          >
            {product.vendor.verified && <ShieldCheck className="h-4 w-4 text-crimson" />}
            Sold by <span className="font-semibold text-jet">{product.vendor.businessName}</span>
            <span className="text-steel">· {product.vendor.province}</span>
          </Link>

          <p className="mt-6 font-display text-3xl font-bold">{formatZAR(product.price)}</p>

          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-steel">
            {product.description}
          </p>

          <p className="mt-4 text-sm">
            {product.stock > 0 ? (
              <span className="text-steel">
                <span className="font-semibold text-jet">{product.stock}</span> in stock
              </span>
            ) : (
              <span className="font-semibold text-crimson">Out of stock</span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-steel-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center text-steel hover:text-jet"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-10 w-10 items-center justify-center text-steel hover:text-jet"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full bg-crimson py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
              >
                {added ? "Added to cart ✓" : "Add to cart"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
