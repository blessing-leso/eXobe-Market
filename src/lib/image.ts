/**
 * Converts an uploaded image File into a compressed data URL that can be stored
 * directly in the database (the `Product.imageUrl` text column) and rendered
 * with a plain <img src>. This avoids relying on external object storage.
 *
 * The image is downscaled to a sensible max dimension to keep the payload small.
 * PNGs are preserved as PNG (to keep transparency); everything else is encoded
 * as JPEG for a smaller footprint.
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxDimension = 1200,
  quality = 0.82
): Promise<string> {
  const isPng = file.type === "image/png";

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load the image file."));
    image.src = dataUrl;
  });

  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    // Canvas unavailable — fall back to the original (already-read) data URL.
    return dataUrl;
  }
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(isPng ? "image/png" : "image/jpeg", quality);
}
