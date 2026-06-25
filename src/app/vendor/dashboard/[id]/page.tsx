"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Eye, Package, ShoppingBag, ShieldCheck, Plus, ImageOff } from "lucide-react";
import { formatZAR, categoryLabel } from "@/lib/constants";

type DashboardProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
  views: number;
  unitsSold: number;
  active: boolean;
};

type DashboardData = {
  vendor: { businessName: string; verified: boolean; createdAt: string };
  products: DashboardProduct[];
  stats: { totalListings: number; totalViews: number; totalUnitsSold: number };
};

export default function VendorDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DashboardData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="font-display text-xl font-bold">Vendor not found</p>
        <Link href="/vendor/dashboard" className="mt-4 inline-block text-sm font-semibold text-crimson">
          Try a different ID
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-8 w-1/3 animate-pulse rounded bg-steel-light" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight">{data.vendor.businessName}</h1>
            {data.vendor.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-crimson-light px-2.5 py-1 text-xs font-semibold text-crimson-dark">
                <ShieldCheck className="h-3 w-3" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-steel-light px-2.5 py-1 text-xs font-semibold text-steel">
                Pending verification
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-steel">
            Member since {new Date(data.vendor.createdAt).toLocaleDateString("en-ZA")}
          </p>
        </div>
        <Link
          href="/vendor/register"
          className="inline-flex items-center gap-1.5 rounded-full bg-jet px-4 py-2.5 text-sm font-semibold text-white hover:bg-jet/90"
        >
          <Plus className="h-4 w-4" /> Add another listing
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard icon={Package} label="Listings" value={data.stats.totalListings} />
        <StatCard icon={Eye} label="Total views" value={data.stats.totalViews} />
        <StatCard icon={ShoppingBag} label="Units sold" value={data.stats.totalUnitsSold} />
      </div>

      <h2 className="mt-10 font-display text-lg font-bold">Your listings</h2>

      {data.products.length === 0 ? (
        <p className="mt-4 text-sm text-steel">No listings yet.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-steel-border">
          <table className="w-full text-sm">
            <thead className="bg-steel-light text-left text-xs uppercase tracking-wide text-steel">
              <tr>
                <th className="px-4 py-3">Listing</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-border">
              {data.products.map((p) => (
                <tr key={p.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-steel-light">
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-steel/40">
                          <ImageOff className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-jet">{p.name}</p>
                      <p className="text-xs text-steel">{categoryLabel(p.category)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatZAR(p.price)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">{p.views}</td>
                  <td className="px-4 py-3">{p.unitsSold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-steel-border p-4">
      <Icon className="h-4 w-4 text-crimson" />
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-steel">{label}</p>
    </div>
  );
}
