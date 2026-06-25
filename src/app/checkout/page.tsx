"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { formatZAR, PROVINCES } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clear } = useCartStore();
  const [form, setForm] = useState({ buyerName: "", buyerEmail: "", buyerPhone: "", province: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-display text-xl font-bold">Nothing to check out</p>
        <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-crimson">
          Browse the marketplace
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      clear();
      router.push(`/order/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold tracking-tight">Checkout</h1>
      <p className="mt-1 text-sm text-steel">
        No real payment is processed in this build — this places an enquiry-ready order record.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-jet">Full name</label>
          <input
            required
            value={form.buyerName}
            onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-steel-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-jet">Email</label>
          <input
            required
            type="email"
            value={form.buyerEmail}
            onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-steel-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-jet">Phone</label>
          <input
            required
            value={form.buyerPhone}
            onChange={(e) => setForm({ ...form, buyerPhone: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-steel-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-jet">Delivery province</label>
          <select
            required
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-steel-border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
          >
            <option value="" disabled>Select province</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-steel-light px-5 py-4">
          <span className="text-sm font-medium text-steel">Total ({items.length} item{items.length > 1 ? "s" : ""})</span>
          <span className="font-display text-xl font-bold">{formatZAR(totalAmount())}</span>
        </div>

        {error && <p className="rounded-lg bg-crimson-light px-4 py-2.5 text-sm text-crimson-dark">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark disabled:opacity-60"
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
  );
}
