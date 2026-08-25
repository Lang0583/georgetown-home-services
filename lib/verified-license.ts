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

export type StateLicenseExemptInfo = {
  /** Exact licenseType string from data (e.g. "No Texas state roofing license required"). */
  label: string;
  /** Date we confirmed the trade is state-exempt / listing still active. */
  confirmedDate: string;
};

function looksStateExempt(licenseType: string | undefined): boolean {
  const t = licenseType?.trim().toLowerCase() ?? "";
  return t.includes("no texas state") && t.includes("license required");
}

/**
 * Returns license display info ONLY when BOTH licenseNumber and licenseVerifiedDate
 * exist in data. Never invents either field.
 */
export function verifiedLicenseInfo(provider: Provider): VerifiedLicenseInfo | null {
  const licenseNumber = provider.licenseNumber?.trim();
  const licenseVerifiedDate = provider.licenseVerifiedDate?.trim();
  if (!licenseNumber || !licenseVerifiedDate) return null;

  const authority =
    provider.licenseBody?.trim() || LICENSE_AUTHORITY_BY_CATEGORY[provider.category];
  if (!authority) return null;

  const licenseType = provider.licenseType?.trim() || null;

  return {
    licenseNumber,
    authority,
    licenseType,
    licenseVerifiedDate,
  };
}

/**
 * Trades Texas does not license at the state level (roofing, landscaping, foundation,
 * cleaning). Shows only when licenseType declares exemption AND licenseVerifiedDate is set.
 */
export function stateLicenseExemptInfo(provider: Provider): StateLicenseExemptInfo | null {
  if (verifiedLicenseInfo(provider)) return null;
  const label = provider.licenseType?.trim();
  const confirmedDate = provider.licenseVerifiedDate?.trim();
  if (!label || !confirmedDate || !looksStateExempt(label)) return null;
  return { label, confirmedDate };
}

export function formatVerifiedLicenseDateLabel(isoDate: string): string {
  return formatLicenseLookupDate(isoDate);
}
