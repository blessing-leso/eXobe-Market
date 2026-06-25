"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/product-card";

type VendorProfile = {
  vendor: { businessName: string; description: string | null; verified: boolean; province: string; createdAt: string };
  products: ProductCardData[];
};

export default function VendorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<VendorProfile | null>(null);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => res.json())
      .then((d) =>
        setData({
          vendor: d.vendor,
          products: d.products.map((p: ProductCardData & { vendor?: unknown }) => ({
            ...p,
            vendor: { businessName: d.vendor.businessName, verified: d.vendor.verified },
          })),
        })
      )
      .catch(() => {});
  }, [id]);

  if (!data) {
    return <div className="mx-auto max-w-5xl px-4 py-10"><div className="h-8 w-1/3 animate-pulse rounded bg-steel-light" /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <h1 className="font-display text-2xl font-bold tracking-tight">{data.vendor.businessName}</h1>
        {data.vendor.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-crimson-light px-2.5 py-1 text-xs font-semibold text-crimson-dark">
            <ShieldCheck className="h-3 w-3" /> Verified vendor
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-steel">{data.vendor.province}</p>
      {data.vendor.description && <p className="mt-4 max-w-2xl text-sm text-steel">{data.vendor.description}</p>}

      <h2 className="mt-10 font-display text-lg font-bold">Listings</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
