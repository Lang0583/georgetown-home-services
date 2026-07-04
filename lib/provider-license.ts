import type { Provider } from "@/data/providers";

/** Batch date for the most recent TSBPE / TDLR / TDA SPCS public lookup pass. */
export const PROVIDER_LICENSE_LOOKUP_DATE = "2026-06-15";

export function formatLicenseLookupDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Card line when license fields are populated; null when nothing to show. */
export function providerLicenseVerifiedLine(provider: Provider): string | null {
  if (!provider.licenseNumber?.trim() || !provider.licenseType?.trim()) return null;
  const verified = provider.licenseVerifiedDate?.trim();
  const dateSuffix = verified ? ` (verified ${formatLicenseLookupDate(verified)})` : "";
  return `License verified: ${provider.licenseType} #${provider.licenseNumber}${dateSuffix}`;
}
