"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-jet text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full border border-crimson/40 bg-crimson/10 px-3 py-1 text-xs font-medium text-crimson">
            South Africa&apos;s marketplace for verified local sellers
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Shop <span className="text-crimson">verified.</span>
            <br />
            Shop local.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Discover authentic products from trusted South African sellers. Real
            entrepreneurs, real value — one inclusive marketplace built mobile-first.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-crimson-dark"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/vendor/register"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Start selling
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-white/50">
            <div>
              <span className="font-display text-2xl font-bold text-white">9</span> provinces, one platform
            </div>
            <div>
              <span className="font-display text-2xl font-bold text-white">100%</span> vetted vendors
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-crimson/20 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-market.png"
              alt="A South African entrepreneur in her workshop surrounded by handmade goods"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-steel-border bg-white p-3 text-jet shadow-lg sm:-left-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-light">
              <ShieldCheck className="h-5 w-5 text-crimson" />
            </div>
            <div>
              <p className="text-sm font-semibold">Verified vendors</p>
              <p className="flex items-center gap-1 text-xs text-steel">
                <Star className="h-3 w-3 fill-crimson text-crimson" /> Vetted before they reach you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
