/**
 * License-report statistics — every count is derived at build time from
 * `data/ghs-verified-providers.json`. Do not hardcode headline numbers elsewhere.
 *
 * TODO (for Matt): There is currently no data field distinguishing "license lapsed /
 * expired" from "not yet looked up" vs "trade not licensed by Texas." Empty
 * `licenseNumber` covers all of those. If you want a lapsed finding, add an optional
 * field such as `licenseStatus: "active" | "lapsed" | "unchecked" | "not_required"`.
 */

import verifiedSource from "@/data/ghs-verified-providers.json";
import type { ProviderCategory } from "@/data/providers";
import { LICENSE_AUTHORITY_BY_CATEGORY } from "@/lib/verified-license";
import { formatLicenseLookupDate } from "@/lib/provider-license";

export const LICENSE_REPORT_PATH = "/reports/williamson-county-license-check" as const;

type VerifiedRow = {
  name: string;
  licenseNumber?: string;
  licenseType?: string;
  licenseVerifiedDate?: string;
};

type VerifiedFile = {
  _meta: { verifiedDate: string; source: string; criteria: string; notes?: string };
  plumbing: VerifiedRow[];
  hvac: VerifiedRow[];
  roofing: VerifiedRow[];
  electrical: VerifiedRow[];
  landscaping: VerifiedRow[];
  pest_control: VerifiedRow[];
  foundation_repair: VerifiedRow[];
  house_cleaning: VerifiedRow[];
};

const CATEGORY_KEYS: ReadonlyArray<{
  key: keyof Omit<VerifiedFile, "_meta">;
  category: ProviderCategory;
  label: string;
}> = [
  { key: "plumbing", category: "plumbing", label: "Plumbing" },
  { key: "hvac", category: "hvac", label: "HVAC" },
  { key: "electrical", category: "electrical", label: "Electrical" },
  { key: "pest_control", category: "pest-control", label: "Pest control" },
  { key: "roofing", category: "roofing", label: "Roofing" },
  { key: "landscaping", category: "landscaping", label: "Landscaping" },
  { key: "foundation_repair", category: "foundation", label: "Foundation repair" },
  { key: "house_cleaning", category: "cleaning", label: "House cleaning" },
];

/** Trades Texas does not license at the state level (no state license number expected). */
const NO_STATE_LICENSE_CATEGORIES: ReadonlySet<ProviderCategory> = new Set([
  "roofing",
  "landscaping",
  "foundation",
  "cleaning",
]);

export type CategoryLicenseStats = {
  category: ProviderCategory;
  label: string;
  authority: string | null;
  total: number;
  withLicenseNumber: number;
  withLicenseNumberAndVerifiedDate: number;
  withLicenseNumberWithoutVerifiedDate: number;
  withoutLicenseNumber: number;
  stateLicenseNotRequired: boolean;
};

export type AuthorityLicenseStats = {
  authority: string;
  withLicenseNumber: number;
  withLicenseNumberAndVerifiedDate: number;
};

export type LicenseReportStats = {
  totalProviders: number;
  withLicenseNumber: number;
  withLicenseNumberAndVerifiedDate: number;
  withLicenseNumberWithoutVerifiedDate: number;
  withoutLicenseNumber: number;
  /** Providers in trades Texas does not license at the state level. */
  inUnlicensedTrades: number;
  /** Empty licenseNumber inside plumbing / HVAC / electrical / pest-control. */
  licensedTradeMissingNumber: number;
  byCategory: CategoryLicenseStats[];
  byAuthority: AuthorityLicenseStats[];
  /** Distinct non-empty licenseVerifiedDate values in the file. */
  uniqueVerifiedDates: string[];
  uniqueVerifiedDateLabels: string[];
  batchMetaVerifiedDate: string;
  batchMetaVerifiedDateLabel: string;
  /** ISO calendar date for Article datePublished (earliest unique verified date, else meta). */
  reportDatePublished: string;
};

function trim(s: string | undefined): string {
  return (s ?? "").trim();
}

export function computeLicenseReportStats(): LicenseReportStats {
  const data = verifiedSource as VerifiedFile;

  let totalProviders = 0;
  let withLicenseNumber = 0;
  let withLicenseNumberAndVerifiedDate = 0;
  let withLicenseNumberWithoutVerifiedDate = 0;
  let withoutLicenseNumber = 0;
  let inUnlicensedTrades = 0;
  let licensedTradeMissingNumber = 0;

  const dateSet = new Set<string>();
  const byCategory: CategoryLicenseStats[] = [];
  const authorityMap = new Map<string, AuthorityLicenseStats>();

  for (const { key, category, label } of CATEGORY_KEYS) {
    const rows = data[key] ?? [];
    const authority = LICENSE_AUTHORITY_BY_CATEGORY[category] ?? null;
    const stateLicenseNotRequired = NO_STATE_LICENSE_CATEGORIES.has(category);

    let catTotal = 0;
    let catWithNum = 0;
    let catWithDate = 0;
    let catNumNoDate = 0;
    let catNoNum = 0;

    for (const row of rows) {
      catTotal++;
      totalProviders++;
      const num = trim(row.licenseNumber);
      const verifiedDate = trim(row.licenseVerifiedDate);

      if (stateLicenseNotRequired) inUnlicensedTrades++;

      if (num) {
        catWithNum++;
        withLicenseNumber++;
        if (authority) {
          const cur = authorityMap.get(authority) ?? {
            authority,
            withLicenseNumber: 0,
            withLicenseNumberAndVerifiedDate: 0,
          };
          cur.withLicenseNumber++;
          if (verifiedDate) cur.withLicenseNumberAndVerifiedDate++;
          authorityMap.set(authority, cur);
        }
        if (verifiedDate) {
          catWithDate++;
          withLicenseNumberAndVerifiedDate++;
          dateSet.add(verifiedDate);
        } else {
          catNumNoDate++;
          withLicenseNumberWithoutVerifiedDate++;
        }
      } else {
        catNoNum++;
        withoutLicenseNumber++;
        if (!stateLicenseNotRequired) licensedTradeMissingNumber++;
      }
    }

    byCategory.push({
      category,
      label,
      authority,
      total: catTotal,
      withLicenseNumber: catWithNum,
      withLicenseNumberAndVerifiedDate: catWithDate,
      withLicenseNumberWithoutVerifiedDate: catNumNoDate,
      withoutLicenseNumber: catNoNum,
      stateLicenseNotRequired,
    });
  }

  const uniqueVerifiedDates = [...dateSet].sort();
  const batchMetaVerifiedDate = trim(data._meta.verifiedDate);
  const reportDatePublished = uniqueVerifiedDates[0] ?? batchMetaVerifiedDate;

  return {
    totalProviders,
    withLicenseNumber,
    withLicenseNumberAndVerifiedDate,
    withLicenseNumberWithoutVerifiedDate,
    withoutLicenseNumber,
    inUnlicensedTrades,
    licensedTradeMissingNumber,
    byCategory,
    byAuthority: [...authorityMap.values()].sort((a, b) => a.authority.localeCompare(b.authority)),
    uniqueVerifiedDates,
    uniqueVerifiedDateLabels: uniqueVerifiedDates.map(formatLicenseLookupDate),
    batchMetaVerifiedDate,
    batchMetaVerifiedDateLabel: batchMetaVerifiedDate
      ? formatLicenseLookupDate(batchMetaVerifiedDate)
      : "",
    reportDatePublished,
  };
}
