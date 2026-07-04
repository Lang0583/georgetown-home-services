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
  /** Midpoint override when low/high is not a fair “typical” (optional). */
  typical?: number;
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
  /** 2–3 sentences on local price drivers for core service guide cost sections. */
  servicePriceContext: string;
  rows: PricingRow[];
};

/** Max job rows on core `/services/[slug]` cost sections (5–7 per spec). */
export const SERVICE_PAGE_PRICING_JOB_MAX = 7;

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
    servicePriceContext:
      "Georgetown's hard Edwards Aquifer water scales fixtures and shortens water-heater life, so “simple” repairs often include descaling or anode work that softer-water markets skip. Slab-on-grade homes in Sun City, Wolf Ranch, and Teravista hide supply lines under concrete—leak isolation and access drive slab-leak tabs higher than exposed-pipe repairs. Freeze-thaw swings and summer irrigation demand also spike emergency and after-hours plumbing calls across Williamson County.",
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
    servicePriceContext:
      "Georgetown summers regularly exceed 100°F, so capacitors, contactors, and condensate drains fail under longer runtimes than northern climates see. Two-story Teravista and Wolf Ranch layouts often need duct or airflow fixes—not just refrigerant—to cool upstairs bedrooms during peak weeks. Replacement quotes jump when attic access is tight, line sets need flushing, or equipment must be upsized after a Manual J review.",
    rows: [
      { job: "Service call / diagnostic", low: 75, high: 150 },
      { job: "Refrigerant recharge (R-410A)", low: 200, high: 500 },
      { job: "Capacitor replacement", low: 150, high: 350 },
      { job: "Contactor replacement", low: 150, high: 300 },
      { job: "Condensate drain clear", low: 75, high: 200 },
      { job: "Evaporator coil replacement", low: 800, high: 2000 },
      { job: "Compressor replacement", low: 1200, high: 2500 },
      { job: "Full system replacement (2.5–5 ton)", low: 5000, high: 12000 },
    ],
  },
  {
    key: "roofing",
    title: "Roofing Costs in Georgetown TX",
    intro: "Shingle-focused ranges; insurance-scope storm work follows different pricing than cash pay.",
    localContext:
      "Williamson County's spring hail season is the primary driver of roofing calls. Most reputable Georgetown roofers offer free post-storm inspections and can document damage for insurance claims.",
    servicePriceContext:
      "Williamson County hail and wind events are the main pricing variable—insurance-scope jobs follow adjuster lines while cash-pay repairs trade speed for flexibility. Tree litter in Berry Creek and Teravista valleys can dam water behind flashing, so labor rises when crews must trace leak paths beyond the ceiling stain. Square footage, shingle tier, decking replacement allowances, and ventilation upgrades separate a $9,000 reroof from a $20,000 scope on the same block.",
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
    servicePriceContext:
      "Older Georgetown Village bungalows often still run 100-amp panels that cannot safely add EV chargers, heat pumps, or kitchen remodel loads without a service upgrade. Long attic runs in two-story Wolf Ranch homes and garage-fed Sun City circuits change wire and labor versus a single-wall outlet swap. Permit fees, grounding updates, and trenching for detached garages or barns are the usual surprises on Georgetown electrical bids.",
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
    servicePriceContext:
      "Georgetown's expansive clay swells when wet and cracks in drought, so sod prep, irrigation zoning, and seasonal mowing cadence all move quotes block by block. Edwards Aquifer watering rules and HOA standards in Sun City and Wolf Ranch affect how often crews can visit and what bed maintenance includes. Lot size, mature tree shade, and whether work touches a licensed in-ground irrigation system separate a basic mow from a full landscape install.",
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
    servicePriceContext:
      "Georgetown's mix of subdivisions and greenbelt edges means fire ants, termites, scorpions, and rodents spike on different schedules—quarterly perimeter plans cost less than reactive whole-yard treatments. Sun City fruiting ornamentals and Wolf Ranch lots backing open space often need exclusion work, not spray alone. Structural termite jobs scale with foundation type and moisture patterns along Berry Creek tree lines.",
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
    servicePriceContext:
      "Georgetown's expansive clay swells after heavy rain and shrinks in drought, so pier counts, drainage fixes, and engineering reports drive tabs more than cosmetic crack filler. Mature trees in Berry Creek and poor downspout discharge against slabs in Teravista add seasonal movement that pier-only bids miss. Slab-on-grade Sun City ranches and pier-and-beam remnants near Georgetown Village need different repair approaches—and pricing.",
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
    servicePriceContext:
      "Georgetown's hard Edwards Aquifer water leaves mineral film on glass and fixtures, so deep cleans take longer than in soft-water markets unless crews plan descaling time. Two-story Teravista foyers and Wolf Ranch open plans change ladder and staging labor versus Sun City single-level ranches. Pets, pollen seasons, and move-out landlord checklists are the usual reasons one home quotes higher than a neighbor with the same square footage.",
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

const fmtUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function pricingRowTypicalValue(row: PricingRow): number | null {
  if (typeof row.typical === "number") return row.typical;
  if (row.low === 0 && row.high === 0) return null;
  if (row.high < row.low) return null;
  return Math.round((row.low + row.high) / 2);
}

/** Low column for three-band service/pricing tables. */
export function formatPricingLow(row: PricingRow): string {
  if (row.displayRange && row.low === 0 && row.high === 0) return "—";
  if (row.low === 0 && row.high > 0) return "Free";
  if (row.low === row.high) return fmtUsd(row.low);
  return fmtUsd(row.low);
}

/** Typical column — midpoint unless `displayRange` is the only meaningful band. */
export function formatPricingTypical(row: PricingRow): string {
  if (row.displayRange && row.low === 0 && row.high === 0) return row.displayRange;
  const typical = pricingRowTypicalValue(row);
  if (typical == null) return row.displayRange ?? "—";
  return fmtUsd(typical);
}

/** High column for three-band service/pricing tables. */
export function formatPricingHigh(row: PricingRow): string {
  if (row.displayRange && row.low === 0 && row.high === 0) return "—";
  if (row.low === 0 && row.high > 0) return fmtUsd(row.high);
  if (row.low === row.high) return fmtUsd(row.high);
  return fmtUsd(row.high);
}

export function formatPricingRange(row: PricingRow): string {
  if (row.displayRange) return row.displayRange;
  if (row.low === 0 && row.high === 0) return "—";
  if (row.low === 0) return `Up to ${fmtUsd(row.high)}`;
  if (row.low === row.high) return fmtUsd(row.low);
  return `${fmtUsd(row.low)}–${fmtUsd(row.high)}`;
}

/** Heading for core service guide cost sections. */
export function servicePricingSectionTitle(tradeLabel: string): string {
  return `What ${tradeLabel.toLowerCase()} costs in Georgetown TX`;
}

/** Five to seven common jobs for `/services/[slug]` cost tables. */
export function getServicePagePricingRows(category: PricingCategory): PricingRow[] {
  const min = 5;
  const rows = category.rows.slice(0, SERVICE_PAGE_PRICING_JOB_MAX);
  return rows.length >= min ? rows : category.rows.slice(0, min);
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
