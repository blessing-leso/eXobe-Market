"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLookupPage() {
  const router = useRouter();
  const [vendorId, setVendorId] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight">Vendor dashboard</h1>
      <p className="mt-2 text-sm text-steel">
        This build doesn&apos;t include vendor login (out of scope for the assessment window —
        see README). Paste the Vendor ID you received after registering.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (vendorId.trim()) router.push(`/vendor/dashboard/${vendorId.trim()}`);
        }}
        className="mt-8 flex flex-col gap-3"
      >
        <input
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          placeholder="e.g. clx1a2b3c4d5e6f7g8h9"
          className="w-full rounded-lg border border-steel-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
        />
        <button
          type="submit"
          className="rounded-full bg-crimson py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
        >
          View dashboard
        </button>
      </form>

      <p className="mt-6 text-sm text-steel">
        New here?{" "}
        <Link href="/vendor/register" className="font-semibold text-crimson">
          Register as a vendor
        </Link>
      </p>
    </div>
  );
}
