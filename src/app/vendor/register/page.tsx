"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { CATEGORIES, PROVINCES } from "@/lib/constants";
import { uploadProductImage } from "@/lib/supabase";

type VendorForm = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  province: string;
  description: string;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
};

const emptyVendor: VendorForm = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  province: "",
  description: "",
};

const emptyProduct: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "1",
};

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [vendor, setVendor] = useState(emptyVendor);
  const [product, setProduct] = useState(emptyProduct);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      setVendorId(data.vendor.id);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId) return;
    setSubmitting(true);
    setError(null);

    try {
      let imageUrl = "";
      if (imageFile) {
        try {
          imageUrl = await uploadProductImage(imageFile, vendorId);
        } catch {
          // Supabase Storage bucket may not be configured in this environment —
          // degrade gracefully to a placeholder rather than blocking the listing.
          imageUrl = "";
        }
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, vendorId, imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Listing failed");
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${step >= n ? "bg-crimson" : "bg-steel-border"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <h1 className="font-display text-2xl font-bold tracking-tight">Register your business</h1>
          <p className="mt-1 text-sm text-steel">Step 1 of 2 — takes about a minute.</p>

          <form onSubmit={handleVendorSubmit} className="mt-8 space-y-5">
            <Field label="Business name">
              <input required value={vendor.businessName} onChange={(e) => setVendor({ ...vendor, businessName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Your name">
              <input required value={vendor.ownerName} onChange={(e) => setVendor({ ...vendor, ownerName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Email">
              <input required type="email" value={vendor.email} onChange={(e) => setVendor({ ...vendor, email: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Phone">
              <input required value={vendor.phone} onChange={(e) => setVendor({ ...vendor, phone: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Province">
              <select required value={vendor.province} onChange={(e) => setVendor({ ...vendor, province: e.target.value })} className={inputClass}>
                <option value="" disabled>Select province</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Tell buyers about your business (optional)">
              <textarea rows={3} value={vendor.description} onChange={(e) => setVendor({ ...vendor, description: e.target.value })} className={inputClass} />
            </Field>

            {error && <p className="rounded-lg bg-crimson-light px-4 py-2.5 text-sm text-crimson-dark">{error}</p>}

            <button type="submit" disabled={submitting} className={buttonClass}>
              {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Continue"}
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="font-display text-2xl font-bold tracking-tight">List your first product</h1>
          <p className="mt-1 text-sm text-steel">Step 2 of 2 — you can add more listings to your shopfront later.</p>

          <form onSubmit={handleProductSubmit} className="mt-8 space-y-5">
            <Field label="Product or service photo">
              <label className="flex aspect-[16/9] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-steel-border bg-steel-light">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="flex flex-col items-center gap-1.5 text-steel">
                    <ImagePlus className="h-6 w-6" />
                    <span className="text-xs">Tap to upload</span>
                  </span>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </Field>
            <Field label="Name">
              <input required value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Description">
              <textarea required rows={3} minLength={10} value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (ZAR)">
                <input required type="number" min="0" step="0.01" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Stock / availability">
                <input required type="number" min="0" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} className={inputClass} />
              </Field>
            </div>
            <Field label="Category">
              <select required value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className={inputClass}>
                <option value="" disabled>Select category</option>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>

            {error && <p className="rounded-lg bg-crimson-light px-4 py-2.5 text-sm text-crimson-dark">{error}</p>}

            <button type="submit" disabled={submitting} className={buttonClass}>
              {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Publish listing"}
            </button>
          </form>
        </>
      )}

      {step === 3 && vendorId && (
        <div className="py-10 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-crimson" />
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">You&apos;re live on eXobe</h1>
          <p className="mt-2 text-steel">Your shopfront and first listing are published.</p>
          <button
            onClick={() => router.push(`/vendor/${vendorId}`)}
            className="mt-8 w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark"
          >
            View your shopfront
          </button>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-steel-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson bg-white";
const buttonClass =
  "w-full rounded-full bg-crimson py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark disabled:opacity-60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-jet">{label}</span>
      {children}
    </label>
  );
}
