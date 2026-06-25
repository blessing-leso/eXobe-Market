import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Client-side Supabase instance, used only for uploading product/vendor
// images to Supabase Storage. All trusted writes (vendor/product/order
// creation) go through Next.js API routes + Prisma, never direct from
// the browser to the DB.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const PRODUCT_IMAGE_BUCKET = "product-images";

export async function uploadProductImage(file: File, vendorId: string) {
  const ext = file.name.split(".").pop();
  const path = `${vendorId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
