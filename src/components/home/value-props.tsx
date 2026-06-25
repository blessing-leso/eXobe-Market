"use client";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const PROPS = [
  {
    icon: Truck,
    title: "Free shipping",
    body: "Free delivery on orders above R700 across Gauteng metros — fast and right to your door.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    body: "Every transaction is protected and encrypted. Simple, safe and secure checkout.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    body: "Changed your mind? Hassle-free returns and friendly support on every order.",
  },
];

export function ValueProps() {
  return (
    <section className="border-b border-steel-border bg-steel-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {PROPS.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white">
              <p.icon className="h-5 w-5 text-crimson" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-jet">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-steel">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
