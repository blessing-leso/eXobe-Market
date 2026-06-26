import Link from "next/link";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/constants";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-crimson">
            Shop by category
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Everything from local makers
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-crimson hover:text-crimson-dark"
        >
          Browse all &rarr;
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/products?category=${c.value}`}
            className="group relative overflow-hidden rounded-2xl border border-steel-border"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-steel-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CATEGORY_IMAGES[c.value]}
                alt={c.label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jet/80 to-transparent p-4">
              <p className="font-display text-sm font-bold text-white">{c.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
