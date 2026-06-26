import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-steel-border bg-jet text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="inline-flex rounded-lg bg-white px-3 py-1.5">
              <Image
                src="/exobe-logo.png"
                alt="eXobe"
                width={150}
                height={117}
                className="h-11 w-auto object-contain"
              />
            </span>
            <p className="mt-3 text-sm text-white/60">
              The easiest way to discover, trust, buy, sell, finance, and export authentic
              African products. Built for South Africa today, architected for Africa tomorrow.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/40">
              Marketplace
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/products" className="text-white/70 hover:text-white">Browse products</Link></li>
              <li><Link href="/vendor/register" className="text-white/70 hover:text-white">Become a vendor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/40">
              eXobe Africa
            </h3>
            <p className="mt-3 text-sm text-white/60">
              A subsidiary of the KHICS Group. Operating across Gauteng, expanding across all
              nine provinces — continental from 2027.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} eXobe Africa (Pty) Ltd. Built for the Phase 2 technical assessment.
        </div>
      </div>
    </footer>
  );
}
