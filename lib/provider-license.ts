import type { Provider, ProviderCategory } from "@/data/providers";
import { PROVIDERS_VERIFIED_ISO_DATE } from "@/data/providers";

/** Categories where Texas does not issue a state trade license. */
const UNLICENSED_TRADE_CATEGORIES: ReadonlySet<ProviderCategory> = new Set([
  "roofing",
  "landscaping",
  "foundation",
  "cleaning",
]);

export const UNLICENSED_TRADE_NOTE = "No state license required in Texas";

export function formatLicenseLookupDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** @deprecated Use PROVIDERS_VERIFIED_ISO_DATE from providers.ts */
export const PROVIDER_LICENSE_LOOKUP_DATE = PROVIDERS_VERIFIED_ISO_DATE;

/**
 * Plain-text license line when a real licenseNumber exists in data.
 * Date is optional — if missing, returns authority + number without inventing a date.
 * Prefer {@link VerifiedLicenseBadge} for UI; this remains for text-only contexts.
 */
export function providerLicenseVerifiedLine(provider: Provider): string | null {
  const licenseNumber = provider.licenseNumber?.trim();
  if (!licenseNumber) return null;

  const licenseType = provider.licenseType?.trim();
  const typePart = licenseType ? ` (${licenseType})` : "";
  const licenseVerifiedDate = provider.licenseVerifiedDate?.trim();
  if (licenseVerifiedDate) {
    return `License: ${licenseNumber}${typePart} — verified ${formatLicenseLookupDate(licenseVerifiedDate)}`;
  }
  return `License: ${licenseNumber}${typePart}`;
}

/** Neutral note for trades Texas does not license at the state level. */
export function providerUnlicensedTradeNote(provider: Provider): string | null {
  if (!UNLICENSED_TRADE_CATEGORIES.has(provider.category)) return null;
  if (provider.licenseNumber?.trim()) return null;
  return UNLICENSED_TRADE_NOTE;
}
