"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Smartphone, TrendingUp, Search } from "lucide-react";

const STEPS = [
  {
    label: "List",
    title: "Create your shopfront",
    body: "Register your business and publish your first listing in minutes, from your phone.",
  },
  {
    label: "Get found",
    title: "Buyers discover you",
    body: "Show up in search and category browsing the moment your listing goes live.",
  },
  {
    label: "Get paid",
    title: "Convert browsers to buyers",
    body: "Buyers enquire, request quotes, or check out directly. You manage it from your dashboard.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-jet text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-crimson/40 bg-crimson/10 px-3 py-1 text-xs font-medium text-crimson">
              Built for South Africa · Architected for Africa
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Your business,<br />
              <span className="text-crimson">trusted</span> by buyers<br />
              who are looking for you.
            </h1>
            <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
              eXobe is where South African entrepreneurs list real products and services,
              and buyers find them with confidence. No middlemen between you and your customer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/vendor/register"
                className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-crimson-dark"
              >
                Start selling <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse the marketplace
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm text-white/50">
              <div><span className="font-display text-2xl font-bold text-white">9</span> provinces, one platform</div>
              <div><span className="font-display text-2xl font-bold text-white">2027</span> continental expansion</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-crimson/20 blur-3xl" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur">
              <div className="rounded-xl bg-white p-5 text-jet">
                <div className="flex items-center gap-2 text-xs font-medium text-steel">
                  <Search className="h-3.5 w-3.5" /> Search eXobe
                </div>
                <div className="mt-3 rounded-lg border border-steel-border px-3 py-2 text-sm text-steel">
                  &ldquo;handmade leather bags Johannesburg&rdquo;
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { name: "Thandeka's Leather Co.", note: "Verified vendor · Gauteng" },
                    { name: "Naledi Crafts", note: "Verified vendor · Free State" },
                  ].map((v) => (
                    <div key={v.name} className="flex items-center gap-3 rounded-lg border border-steel-border p-3">
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-steel-light" />
                      <div>
                        <p className="text-sm font-semibold">{v.name}</p>
                        <p className="flex items-center gap-1 text-xs text-steel">
                          <ShieldCheck className="h-3 w-3 text-crimson" /> {v.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-steel-border bg-steel-light">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 text-sm sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-crimson" />
            <span className="text-steel">Vendors are vetted and badge-verified before they reach buyers</span>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-crimson" />
            <span className="text-steel">Built mobile-first — list, browse and buy entirely from a phone</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-crimson" />
            <span className="text-steel">Dashboard insight into views and sales from day one</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-crimson">For entrepreneurs</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Selling shouldn&apos;t be the hard part.
          </h2>
          <p className="mt-4 text-steel">
            You&apos;ve already built something worth buying. eXobe handles discovery, trust, and the
            transaction — so you can focus on the product.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-steel-border p-6">
              <span className="font-display text-sm font-semibold text-crimson">{`0${i + 1} · ${step.label}`}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-steel">{step.body}</p>
            </div>
          ))}
        </div>

        <Link
          href="/vendor/register"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-jet px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jet/90"
        >
          Register your business <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="bg-steel-light">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-crimson">For buyers</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Buy from the people actually making it.
              </h2>
              <p className="mt-4 text-steel">
                Every vendor on eXobe is a real South African business — searchable by category,
                filterable by what matters to you, and verified before they ever reach your cart.
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
              >
                Explore listings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Fashion", "Electronics", "Home & Garden", "Beauty"].map((c) => (
                <div key={c} className="rounded-xl border border-steel-border bg-white p-5">
                  <div className="h-8 w-8 rounded-lg bg-crimson-light" />
                  <p className="mt-3 text-sm font-semibold">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
