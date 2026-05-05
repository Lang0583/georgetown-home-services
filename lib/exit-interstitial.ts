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

/** Path segment before `-contractors.htm` on Angi Georgetown company lists. */
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

export function angiGeorgetownContractorsUrl(angiCategorySlug: string): string {
  return `https://www.angi.com/companylist/us/tx/georgetown/${angiCategorySlug}-contractors.htm`;
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
