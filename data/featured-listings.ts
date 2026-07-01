import type { ProviderCategory } from "./providers";
import { getCategoryForBestSlug } from "./providers";

/** Paid featured slot — one per trade category, shown above organic listings on /best/* pages. */
export type FeaturedListingRecord = {
  category: ProviderCategory;
  name: string;
  /** Direct business URL — no lead forms or intermediary quote flows. */
  websiteUrl: string;
  description: string;
  phone?: string;
  serviceArea?: string;
  specialties?: string[];
};

/**
 * Active featured listings. Add one entry per category when a business subscribes.
 * Leave empty until a slot is sold — pages render organic listings only.
 */
export const FEATURED_LISTINGS: FeaturedListingRecord[] = [
  // Example (uncomment and edit when a slot is live):
  // {
  //   category: "plumbing",
  //   name: "Example Plumbing Co.",
  //   websiteUrl: "https://example.com",
  //   description: "Georgetown plumber specializing in slab leaks and water heaters.",
  //   phone: "(512) 555-0100",
  //   serviceArea: "Georgetown, Round Rock, Cedar Park",
  //   specialties: ["Slab leak detection", "Water heater replacement"],
  // },
];

export function getFeaturedListingForCategory(category: ProviderCategory): FeaturedListingRecord | null {
  return FEATURED_LISTINGS.find((entry) => entry.category === category) ?? null;
}

export function getFeaturedListingForBestSlug(slug: string): FeaturedListingRecord | null {
  const category = getCategoryForBestSlug(slug);
  if (!category) return null;
  return getFeaturedListingForCategory(category);
}
