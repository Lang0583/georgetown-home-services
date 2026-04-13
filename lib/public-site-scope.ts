import type { ProviderGroup } from "./businesses";

/**
 * Extended trades beyond plumbing / HVAC / roofing. When hidden (default), they are not
 * promoted in nav, hubs, or directory listings—so you can ship without maintaining that data.
 *
 * Turn everything back on in production by setting:
 *   NEXT_PUBLIC_SHOW_EXTENDED_HOME_SERVICES=true
 */
export const EXTENDED_PROVIDER_GROUPS: readonly ProviderGroup[] = [
  "electrician",
  "landscaping",
  "pest_control",
  "foundation_repair",
  "house_cleaning",
] as const;

const EXTENDED_SERVICE_SLUGS = new Set([
  "electrician-georgetown-tx",
  "landscaping-georgetown-tx",
  "pest-control-georgetown-tx",
  "foundation-repair-georgetown-tx",
  "house-cleaning-georgetown-tx",
]);

const EXTENDED_BEST_SLUGS = new Set([
  "best-electricians-georgetown-tx",
  "best-landscaping-companies-georgetown-tx",
  "best-pest-control-georgetown-tx",
  "best-foundation-repair-georgetown-tx",
  "best-house-cleaning-services-georgetown-tx",
]);

export function showExtendedHomeServices(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_EXTENDED_HOME_SERVICES === "true";
}

export function isExtendedProviderGroup(group: ProviderGroup): boolean {
  return (EXTENDED_PROVIDER_GROUPS as readonly string[]).includes(group);
}

export function isExtendedServiceSlug(slug: string): boolean {
  return EXTENDED_SERVICE_SLUGS.has(slug);
}

export function isExtendedBestSlug(slug: string): boolean {
  return EXTENDED_BEST_SLUGS.has(slug);
}

/** Hide placeholder directory rows + ItemList schema for extended categories until you opt in. */
export function shouldShowExtendedDirectoryListings(): boolean {
  return showExtendedHomeServices();
}
