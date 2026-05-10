import type { ReactNode } from "react";

/**
 * Georgetown / Williamson County home-service price ranges for /pricing and the calculator.
 * Single source: main guide tables and interactive estimator.
 */

export const PRICING_LAST_REVIEWED_MONTH = "April 2026";
export const PRICING_YEAR = "2026";

export type PricingRow = {
  job: string;
  /**
   * Numeric band for estimator totals. Use `0` for both when the line is not summable
   * (per-sq-ft, percentage discounts) — see `excludeFromEstimatorSum`.
   */
  low: number;
  high: number;
  /** When set, shown in tables/estimator instead of formatting `low`–`high`. */
  displayRange?: string;
  excludeFromEstimatorSum?: boolean;
};

export type PricingCategory = {
  key:
    | "plumbing"
    | "hvac"
    | "roofing"
    | "electrical"
    | "landscaping"
    | "pest"
    | "foundation"
    | "cleaning";
  title: string;
  /** Short line for the calculator tool. */
  intro: string;
  /** 1–2 sentences of Georgetown-specific context on the main pricing page. */
  localContext: string;
  rows: PricingRow[];
};

export const PRICING_CATEGORY_RELATED_LINKS: Readonly<
  Record<PricingCategory["key"], { bestHref: string; bestLabel: string; guideHref: string; guideLabel: string }>
> = {
  plumbing: {
    bestHref: "/best/best-plumbers-georgetown-tx",
    bestLabel: "Best plumbers in Georgetown, TX",
    guideHref: "/blog/emergency-plumber-cost-georgetown-tx",
    guideLabel: "Emergency plumber cost guide",
  },
  hvac: {
    bestHref: "/best/top-hvac-companies-georgetown-tx",
    bestLabel: "Best HVAC companies in Georgetown, TX",
    guideHref: "/blog/cost-to-replace-hvac-georgetown",
    guideLabel: "HVAC replacement cost guide",
  },
  roofing: {
    bestHref: "/best/best-roofers-georgetown-tx",
    bestLabel: "Best roofers in Georgetown, TX",
    guideHref: "/blog/roof-replacement-cost-georgetown-tx",
    guideLabel: "Roof replacement cost guide",
  },
  electrical: {
    bestHref: "/best/best-electricians-georgetown-tx",
    bestLabel: "Best electricians in Georgetown, TX",
    guideHref: "/services/electrician-georgetown-tx",
    guideLabel: "Electrical service guide (Georgetown)",
  },
  landscaping: {
    bestHref: "/best/best-landscaping-companies-georgetown-tx",
    bestLabel: "Best landscaping companies in Georgetown, TX",
    guideHref: "/services/landscaping-georgetown-tx",
    guideLabel: "Landscaping & lawn care guide",
  },
  pest: {
    bestHref: "/best/best-pest-control-georgetown-tx",
    bestLabel: "Best pest control in Georgetown, TX",
    guideHref: "/services/pest-control-georgetown-tx",
    guideLabel: "Pest control service guide",
  },
  foundation: {
    bestHref: "/best/best-foundation-repair-georgetown-tx",
    bestLabel: "Best foundation repair in Georgetown, TX",
    guideHref: "/blog/foundation-crack-georgetown-tx",
    guideLabel: "Foundation cracks & repair (Georgetown)",
  },
  cleaning: {
    bestHref: "/best/best-house-cleaning-services-georgetown-tx",
    bestLabel: "Best house cleaning in Georgetown, TX",
    guideHref: "/services/house-cleaning-georgetown-tx",
    guideLabel: "House cleaning service guide",
  },
};

export const PRICING_CATEGORIES: readonly PricingCategory[] = [
  {
    key: "plumbing",
    title: "Plumbing Costs in Georgetown TX",
    intro: "Typical plumbing line items in Georgetown — select rows to sum ranges in the calculator.",
    localContext:
      "Georgetown's hard water from the Edwards Aquifer shortens water heater life and causes mineral buildup in pipes, making maintenance calls more frequent than in softer-water markets.",
    rows: [
      { job: "Service call / diagnostic", low: 100, high: 175 },
      { job: "Drain clearing", low: 150, high: 350 },
      { job: "Water heater replacement", low: 800, high: 1500 },
      { job: "Slab leak repair", low: 500, high: 2500 },
      { job: "Full repipe (avg home)", low: 4000, high: 12000 },
      {
        job: "Emergency after-hours surcharge",
        low: 75,
        high: 150,
        displayRange: "+$75–$150",
      },
    ],
  },
  {
    key: "hvac",
    title: "HVAC Costs in Georgetown TX",
    intro: "Cooling-heavy workload in Central Texas — ranges are for typical residential equipment.",
    localContext:
      "Georgetown summers regularly exceed 100°F, meaning HVAC systems run harder and longer than in most U.S. markets. Systems here typically need replacement every 12–15 years rather than the national average of 15–20.",
    rows: [
      { job: "Service call / diagnostic", low: 75, high: 150 },
      { job: "Refrigerant recharge", low: 200, high: 400 },
      { job: "Capacitor / contactor replacement", low: 150, high: 300 },
      { job: "Coil cleaning", low: 100, high: 250 },
      { job: "Full system replacement (3-ton)", low: 5000, high: 9000 },
      { job: "Full system replacement (5-ton)", low: 8000, high: 14000 },
    ],
  },
  {
    key: "roofing",
    title: "Roofing Costs in Georgetown TX",
    intro: "Shingle-focused ranges; insurance-scope storm work follows different pricing than cash pay.",
    localContext:
      "Williamson County's spring hail season is the primary driver of roofing calls. Most reputable Georgetown roofers offer free post-storm inspections and can document damage for insurance claims.",
    rows: [
      {
        job: "Roof inspection",
        low: 0,
        high: 300,
        displayRange: "$0–$300 (free from many contractors)",
      },
      { job: "Minor shingle repair", low: 300, high: 800 },
      { job: "Partial replacement", low: 1500, high: 5000 },
      { job: "Full replacement (avg Georgetown home)", low: 9000, high: 20000 },
      { job: "Gutter replacement", low: 800, high: 2000 },
    ],
  },
  {
    key: "electrical",
    title: "Electrical Costs in Georgetown TX",
    intro: "Per-call and upgrade ranges — panel and EV jobs scale with access and service capacity.",
    localContext:
      "Older Georgetown neighborhoods like Georgetown Village frequently need panel upgrades when adding EV chargers or home additions. Sun City homes often require accessibility-focused electrical modifications.",
    rows: [
      { job: "Service call / diagnostic", low: 100, high: 175 },
      { job: "Outlet or switch repair", low: 100, high: 250 },
      { job: "Circuit breaker replacement", low: 150, high: 300 },
      { job: "Panel upgrade (100A to 200A)", low: 1500, high: 4000 },
      { job: "EV charger installation", low: 500, high: 1200 },
      { job: "Whole-home surge protection", low: 300, high: 700 },
    ],
  },
  {
    key: "landscaping",
    title: "Landscaping Costs in Georgetown TX",
    intro: "Lawn, beds, sod, and irrigation — ranges vary sharply by lot size and material.",
    localContext:
      "Georgetown's clay soil and heat require irrigation scheduling adjustments through the season. Bermuda and St. Augustine are the dominant grass types, each with different maintenance windows.",
    rows: [
      {
        job: "Lawn mowing (avg Georgetown lot)",
        low: 40,
        high: 80,
        displayRange: "$40–$80 per visit",
      },
      {
        job: "Monthly lawn maintenance plan",
        low: 120,
        high: 250,
        displayRange: "$120–$250 per month",
      },
      { job: "Seasonal bed cleanup", low: 200, high: 500 },
      {
        job: "Sod installation",
        low: 0,
        high: 0,
        displayRange: "$1.50–$3.00 per sq ft installed",
        excludeFromEstimatorSum: true,
      },
      { job: "Irrigation system tune-up", low: 75, high: 150 },
      { job: "Full irrigation installation", low: 3000, high: 8000 },
    ],
  },
  {
    key: "pest",
    title: "Pest Control Costs in Georgetown TX",
    intro: "Initial visits, maintenance plans, and structural pests — confirm scope in writing.",
    localContext:
      "Fire ants, mosquitoes, and seasonal rodent pressure are the most common calls in Georgetown. Spring and fall are peak treatment seasons as temperatures shift.",
    rows: [
      { job: "Initial inspection and treatment", low: 150, high: 300 },
      {
        job: "Quarterly perimeter plan",
        low: 75,
        high: 150,
        displayRange: "$75–$150 per quarter",
      },
      {
        job: "Annual termite monitoring",
        low: 200,
        high: 400,
        displayRange: "$200–$400 per year",
      },
      { job: "Termite treatment (avg home)", low: 500, high: 2500 },
      { job: "Rodent exclusion", low: 300, high: 700 },
    ],
  },
  {
    key: "foundation",
    title: "Foundation Repair Costs in Georgetown TX",
    intro: "Clay-soil movement is common — pier counts and drainage drive the final tab.",
    localContext:
      "Georgetown sits on expansive clay soil that swells with rain and shrinks in drought. Foundation movement is extremely common — most homes over 10 years old will show some cracking. Annual monitoring is recommended.",
    rows: [
      {
        job: "Engineer inspection",
        low: 0,
        high: 300,
        displayRange: "$0–$300 (many contractors offer free)",
      },
      { job: "Pressed concrete pier per pier", low: 1200, high: 1800 },
      { job: "Steel pier per pier", low: 1800, high: 3000 },
      { job: "Typical Georgetown home repair", low: 4000, high: 15000 },
      { job: "Drainage correction", low: 1500, high: 5000 },
    ],
  },
  {
    key: "cleaning",
    title: "House Cleaning Costs in Georgetown TX",
    intro: "Standard, deep, and move cleans — recurring plans usually beat one-time pricing.",
    localContext:
      "Georgetown's hard water leaves mineral deposits on fixtures and glass faster than softer markets. Ask cleaners specifically about hard water treatment as part of their standard service.",
    rows: [
      { job: "Standard clean (avg Georgetown home)", low: 120, high: 200 },
      { job: "Deep clean", low: 200, high: 350 },
      { job: "Move-out / move-in clean", low: 250, high: 400 },
      {
        job: "Recurring weekly service",
        low: 0,
        high: 0,
        displayRange: "15–20% below one-time rate",
        excludeFromEstimatorSum: true,
      },
      {
        job: "Recurring bi-weekly service",
        low: 0,
        high: 0,
        displayRange: "10–15% below one-time rate",
        excludeFromEstimatorSum: true,
      },
    ],
  },
];

export function formatPricingRange(row: PricingRow): string {
  if (row.displayRange) return row.displayRange;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  if (row.low === 0 && row.high === 0) return "—";
  if (row.low === 0) return `Up to ${fmt(row.high)}`;
  if (row.low === row.high) return fmt(row.low);
  return `${fmt(row.low)}–${fmt(row.high)}`;
}

export function findCategory(key: PricingCategory["key"]): PricingCategory {
  const c = PRICING_CATEGORIES.find((cat) => cat.key === key);
  if (!c) throw new Error(`[pricing-data] Unknown category: ${key}`);
  return c;
}

/** Rows we can express as numeric min/max offers for ItemList JSON-LD (skip % / per-sq-ft-only lines). */
function pricingRowToOfferBounds(row: PricingRow): { min: number; max: number } | null {
  if (row.excludeFromEstimatorSum && row.low === 0 && row.high === 0) return null;
  if (row.low === 0 && row.high === 0) return null;
  if (row.high < row.low) return null;
  return { min: row.low, max: row.high };
}

/**
 * Schema.org ItemList of Offer items with UnitPriceSpecification (USD ranges).
 * Use on trade hub pages; aligns visually with `PRICING_CATEGORIES` tables.
 */
export function serviceHubPricingItemListJsonLd(opts: {
  category: PricingCategory;
  pageUrl: string;
}): Record<string, unknown> {
  const offerItems = opts.category.rows
    .map((row) => {
      const b = pricingRowToOfferBounds(row);
      if (!b) return null;
      return { row, b };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: x.row.job,
        description: `Typical all-in range in the Georgetown, TX area for: ${x.row.job}. Not a quote.`,
        url: opts.pageUrl,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "USD",
          minPrice: x.b.min,
          maxPrice: x.b.max,
        },
      },
    }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.category.title,
    description: opts.category.localContext,
    numberOfItems: offerItems.length,
    itemListElement: offerItems,
  };
}

export type CostPostSupplement = {
  category: PricingCategory["key"];
  heading: string;
  lede: string;
  rowJobs: string[];
  decisionFrame?: ReactNode;
};

export const COST_POST_SUPPLEMENTS: Record<string, CostPostSupplement> = {
  "cost-to-replace-hvac-georgetown": {
    category: "hvac",
    heading: "Georgetown HVAC replacement cost ranges",
    lede:
      "Most Georgetown HVAC replacements land in the ranges below. Your actual quote depends on tonnage, efficiency tier, and any ductwork work discovered at removal. Use these as a sanity-check, not a quote.",
    rowJobs: [
      "Full system replacement (3-ton)",
      "Full system replacement (5-ton)",
      "Service call / diagnostic",
    ],
  },
  "ac-repair-cost-georgetown-tx": {
    category: "hvac",
    heading: "Georgetown AC repair cost ranges",
    lede:
      "Most AC repair calls in Georgetown resolve for under $1,000 once you exclude full replacements. Diagnostic fees are usually credited toward approved repairs.",
    rowJobs: [
      "Service call / diagnostic",
      "Capacitor / contactor replacement",
      "Refrigerant recharge",
      "Coil cleaning",
    ],
  },
  "roof-replacement-cost-georgetown-tx": {
    category: "roofing",
    heading: "Georgetown roof replacement cost ranges",
    lede:
      "Roof replacement pricing in Georgetown is driven by square footage, shingle tier, decking condition at tear-off, and whether ventilation or flashing detail is in scope. Insurance-scope roofs (hail/wind) follow a different pricing path than cash-pay.",
    rowJobs: [
      "Full replacement (avg Georgetown home)",
      "Partial replacement",
      "Gutter replacement",
      "Minor shingle repair",
    ],
  },
};
