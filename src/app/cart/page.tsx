"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ImageOff, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatZAR } from "@/lib/constants";

export default function CartPage() {
  const { items, setQuantity, removeItem, totalAmount } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-display text-xl font-bold">Your cart is empty</p>
        <p className="mt-2 text-steel">Find something worth buying from an African entrepreneur.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
        >
          Browse the marketplace <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-6 divide-y divide-steel-border rounded-xl border border-steel-border">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-steel-light">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-steel/40">
                  <ImageOff className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-jet">{item.name}</p>
                <p className="text-xs text-steel">{item.vendorName}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full border border-steel-border">
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center text-steel hover:text-jet"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center text-steel hover:text-jet"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-sm font-bold">{formatZAR(item.unitPrice * item.quantity)}</p>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.productId)}
              className="self-start text-steel hover:text-crimson"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-steel-light px-5 py-4">
        <span className="text-sm font-medium text-steel">Total</span>
        <span className="font-display text-xl font-bold">{formatZAR(totalAmount())}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-crimson py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark"
      >
        Proceed to checkout <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
