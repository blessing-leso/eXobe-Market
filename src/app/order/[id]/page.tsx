"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatZAR } from "@/lib/constants";

type Order = {
  id: string;
  buyerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { quantity: number; unitPrice: number }[];
};

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order))
      .catch(() => {});
  }, [id]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-14 w-14 text-crimson" />
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Order placed</h1>
      <p className="mt-2 text-steel">
        {order ? `Thanks, ${order.buyerName}. ` : ""}
        Your order reference is below. The vendor will be in touch to confirm delivery.
      </p>

      <div className="mt-8 rounded-xl border border-steel-border p-5 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-steel">Reference</span>
          <span className="font-mono font-semibold">{id}</span>
        </div>
        {order && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-steel">Total</span>
            <span className="font-bold">{formatZAR(order.totalAmount)}</span>
          </div>
        )}
      </div>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-full bg-jet px-6 py-3 text-sm font-semibold text-white hover:bg-jet/90"
      >
        Continue browsing
      </Link>
    </div>
  );
}
