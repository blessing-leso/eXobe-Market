import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const PRODUCT_IMAGE_BUCKET = "product-images";

// Lazily create the client. Calling `createClient` with empty credentials
// throws synchronously ("supabaseUrl is required"), which would crash any
// page that merely imports this module. Storage is optional in this
// environment, so we only construct the client when it's actually used and
// the credentials are present.
let cachedClient: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return cachedClient;
}

export const isImageUploadConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function uploadProductImage(file: File, vendorId: string) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Image upload is not configured in this environment.");
  }

  const ext = file.name.split(".").pop();
  const path = `${vendorId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
