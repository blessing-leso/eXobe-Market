export const CATEGORIES = [
  { value: "FASHION", label: "Fashion & Apparel" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "HOME_AND_GARDEN", label: "Home & Garden" },
  { value: "BEAUTY", label: "Beauty & Personal Care" },
  { value: "FOOD_AND_BEVERAGE", label: "Food & Beverage" },
  { value: "ARTS_AND_CRAFTS", label: "Arts & Crafts" },
  { value: "SERVICES", label: "Services" },
  { value: "OTHER", label: "Other" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const CATEGORY_IMAGES: Record<string, string> = {
  FASHION: "/products/fashion.png",
  ELECTRONICS: "/products/electronics.png",
  HOME_AND_GARDEN: "/products/home.png",
  BEAUTY: "/products/beauty.png",
  FOOD_AND_BEVERAGE: "/products/food.png",
  ARTS_AND_CRAFTS: "/products/crafts.png",
  SERVICES: "/products/services.png",
  OTHER: "/products/other.png",
};

export function categoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function formatZAR(amount: number | string) {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(n);
}

export const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];
