import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    label: "List",
    title: "Create your shopfront",
    body: "Register your business and publish your first listing in minutes, straight from your phone.",
  },
  {
    label: "Get found",
    title: "Buyers discover you",
    body: "Show up in search and category browsing the moment your listing goes live.",
  },
  {
    label: "Get paid",
    title: "Turn browsers into buyers",
    body: "Buyers enquire, request quotes, or check out directly from your shopfront.",
  },
];

export function SellerCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-crimson">
          Sell on eXobe
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Selling shouldn&apos;t be the hard part.
        </h2>
        <p className="mt-4 leading-relaxed text-steel">
          You&apos;ve already built something worth buying. eXobe handles discovery, trust and
          the transaction — so you can focus on the product.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title} className="rounded-2xl border border-steel-border p-6">
            <span className="font-display text-sm font-semibold text-crimson">
              {`0${i + 1} · ${step.label}`}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel">{step.body}</p>
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
  );
}
