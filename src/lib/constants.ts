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
