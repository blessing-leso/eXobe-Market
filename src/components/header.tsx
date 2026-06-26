"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export function Header() {
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  const links = [
    { href: "/products", label: "Browse" },
    { href: "/vendor/register", label: "Sell on eXobe" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-steel-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="eXobe home">
          <Image
            src="/exobe-logo.png"
            alt="eXobe"
            width={150}
            height={117}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-steel hover:text-jet transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-steel-light transition-colors"
            aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingCart className="h-5 w-5 text-jet" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-crimson px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-steel-light md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-steel-border bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-jet"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
