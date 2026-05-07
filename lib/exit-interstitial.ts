import { angiGeorgetownListUrl } from "./affiliates";
import type { ProviderGroup } from "./businesses";

const SESSION_PREFIX = "gths:exit-interstitial:";

/** Visible service phrase in modal body (matches Angi list intent). */
export const EXIT_INTERSTITIAL_SERVICE_LABEL: Record<ProviderGroup, string> = {
  plumber: "plumbing",
  hvac: "HVAC",
  roofer: "roofing",
  electrician: "electrical",
  landscaping: "landscaping",
  pest_control: "pest control",
  foundation_repair: "foundation repair",
  house_cleaning: "house cleaning",
};

/**
 * Category keys for Angi — must match paths in `lib/affiliates.ts` (not every list uses `*-contractors.htm`).
 */
export const EXIT_INTERSTITIAL_ANGI_SLUG: Record<ProviderGroup, string> = {
  plumber: "plumbing",
  hvac: "hvac",
  roofer: "roofing",
  electrician: "electrical",
  landscaping: "landscaping",
  pest_control: "pest-control",
  foundation_repair: "foundation-repair",
  house_cleaning: "house-cleaning",
};

export function exitInterstitialSessionKey(providerUrl: string, providerName: string): string {
  return SESSION_PREFIX + encodeURIComponent(providerUrl) + "::" + encodeURIComponent(providerName);
}

/** @deprecated Use {@link angiGeorgetownListUrl} from `lib/affiliates.ts`; kept for import stability. */
export function angiGeorgetownContractorsUrl(angiCategorySlug: string): string {
  return angiGeorgetownListUrl(angiCategorySlug);
}

export function exitInterstitialLabels(group: ProviderGroup | null): {
  serviceCategory: string;
  angiCategorySlug: string;
} {
  if (!group) {
    return { serviceCategory: "home", angiCategorySlug: "home" };
  }
  return {
    serviceCategory: EXIT_INTERSTITIAL_SERVICE_LABEL[group],
    angiCategorySlug: EXIT_INTERSTITIAL_ANGI_SLUG[group],
  };
}
