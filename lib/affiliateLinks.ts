export const AFFILIATE_LINKS: Record<string, string> = {
  plumbing: "https://www.anrdoezrs.net/click-101745849-17141194",
  hvac: "https://www.anrdoezrs.net/click-101745849-17142830",
  heating: "https://www.dpbolvw.net/click-101745849-17142838",
  roofing: "https://www.kqzyfj.com/click-101745849-17142826",
  electrical: "https://www.anrdoezrs.net/click-101745849-17142831",
  pestControl: "https://www.jdoqocy.com/click-101745849-17141195",
  houseCleaning: "https://www.anrdoezrs.net/click-101745849-17142832",
  landscaping: "https://www.jdoqocy.com/click-101745849-17141193",
  foundationRepair: "https://www.jdoqocy.com/click-101745849-17141193",
  default: "https://www.jdoqocy.com/click-101745849-17141193",
};

export function getAffiliateLink(category?: string): string {
  if (!category) return AFFILIATE_LINKS.default;
  return AFFILIATE_LINKS[category] ?? AFFILIATE_LINKS.default;
}
