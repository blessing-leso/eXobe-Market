"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/product-card";
import { CATEGORIES } from "@/lib/constants";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Pick up a ?category= filter passed in from the landing page category grid.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl) setCategory(fromUrl);
  }, []);

  // Debounce the search input so we don't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category !== "ALL") params.set("category", category);

    fetch(`/api/products?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedQuery, category]);

  const empty = !loading && products.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Browse the marketplace</h1>
        <p className="mt-2 text-steel">Search by name, or filter by category to find what you need.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or services…"
            className="w-full rounded-full border border-steel-border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-crimson"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-steel-border bg-white py-2.5 px-4 text-sm outline-none focus:border-crimson sm:w-56"
        >
          <option value="ALL">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-steel-light" />
            ))}
          </div>
        ) : empty ? (
          <div className="rounded-xl border border-dashed border-steel-border py-16 text-center">
            <p className="font-semibold text-jet">No listings match yet</p>
            <p className="mt-1 text-sm text-steel">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
