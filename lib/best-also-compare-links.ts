/**
 * Cross-links for the sticky “Also compare” bar on `/best` routes (Georgetown core trades).
 */
export type AlsoCompareLink = { href: string; label: string };

const PLUMBERS = { href: "/best/best-plumbers-georgetown-tx", label: "Plumbers" } as const;
const HVAC = { href: "/best/top-hvac-companies-georgetown-tx", label: "HVAC companies" } as const;
const ROOFERS = { href: "/best/best-roofers-georgetown-tx", label: "Roofers" } as const;

const CORE_TRIO: AlsoCompareLink[] = [PLUMBERS, HVAC, ROOFERS];

const BY_SLUG: Record<string, AlsoCompareLink[]> = {
  "best-plumbers-georgetown-tx": [HVAC, ROOFERS],
  "top-hvac-companies-georgetown-tx": [PLUMBERS, ROOFERS],
  "best-roofers-georgetown-tx": [PLUMBERS, HVAC],
};

/** Best hub index: quick jumps to the three core comparisons. */
export function getAlsoCompareLinksForBestIndex(): AlsoCompareLink[] {
  return [...CORE_TRIO];
}

/** Best detail page: two sibling trades, or all three core guides for other categories. */
export function getAlsoCompareLinksForBestSlug(slug: string): AlsoCompareLink[] {
  const mapped = BY_SLUG[slug];
  if (mapped) return mapped.map((x) => ({ ...x }));
  return CORE_TRIO.map((x) => ({ ...x }));
}
