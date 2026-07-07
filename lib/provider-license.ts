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

/** Card line for license type; appends number only when published. */
export function providerLicenseVerifiedLine(provider: Provider): string | null {
  const licenseType = provider.licenseType?.trim();
  if (!licenseType) return null;
  const licenseNumber = provider.licenseNumber?.trim();
  if (!licenseNumber) return licenseType;
  const verified = provider.licenseVerifiedDate?.trim();
  const dateSuffix = verified ? ` (verified ${formatLicenseLookupDate(verified)})` : "";
  return `${licenseType} #${licenseNumber}${dateSuffix}`;
}
