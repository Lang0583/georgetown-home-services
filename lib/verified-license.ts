import type { Provider, ProviderCategory } from "@/data/providers";
import { formatLicenseLookupDate } from "@/lib/provider-license";

/** Issuing authority short labels mapped by provider category. */
export const LICENSE_AUTHORITY_BY_CATEGORY: Readonly<
  Partial<Record<ProviderCategory, string>>
> = {
  plumbing: "TSBPE",
  hvac: "TDLR",
  electrical: "TDLR",
  "pest-control": "TDA SPCS",
};

export type VerifiedLicenseInfo = {
  licenseNumber: string;
  /** Short board acronym for display (TSBPE / TDLR / TDA SPCS). */
  authority: string;
  /** Longer license type from data when present (e.g. "TSBPE Responsible Master Plumber"). */
  licenseType: string | null;
  /** ISO date from data when present; never fabricated. */
  licenseVerifiedDate: string | null;
};

/**
 * Returns license display info ONLY when a non-empty licenseNumber exists in data.
 * Date is optional — if missing, callers show authority + number without a date.
 */
export function verifiedLicenseInfo(provider: Provider): VerifiedLicenseInfo | null {
  const licenseNumber = provider.licenseNumber?.trim();
  if (!licenseNumber) return null;

  const authority = LICENSE_AUTHORITY_BY_CATEGORY[provider.category];
  if (!authority) return null;

  const licenseType = provider.licenseType?.trim() || null;
  const licenseVerifiedDate = provider.licenseVerifiedDate?.trim() || null;

  return {
    licenseNumber,
    authority,
    licenseType,
    licenseVerifiedDate,
  };
}

export function formatVerifiedLicenseDateLabel(isoDate: string): string {
  return formatLicenseLookupDate(isoDate);
}
