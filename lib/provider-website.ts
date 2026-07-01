import businessesRaw from "./businesses.json";
import type { Business } from "./businesses";
import { getBusinessWebsiteUrl } from "./businesses";

const businesses = businessesRaw as Business[];

const websiteByProviderName = new Map<string, string | null>(
  businesses.map((b) => [b.name.toLowerCase(), getBusinessWebsiteUrl(b)]),
);

/** Company homepage when known from the business directory; null otherwise. */
export function getProviderWebsiteUrl(providerName: string): string | null {
  return websiteByProviderName.get(providerName.toLowerCase()) ?? null;
}
