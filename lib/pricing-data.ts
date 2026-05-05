import type { ReactNode } from "react";

/**
 * Georgetown / Williamson County home-service price ranges.
 *
 * These are editorial ranges synthesized from publicly available Central Texas
 * contractor pricing and BLS/RSMeans-style national labor+material benchmarks,
 * then localized for Williamson County market conditions (clay soil, 100°F+
 * summers driving equipment load, Edwards Aquifer hard water, Williamson County
 * permit requirements).
 *
 * Numbers are reviewed quarterly. The `lastReviewedMonth` constant below is the
 * single place to update when we refresh them.
 *
 * Values are intentionally ranges, not point estimates, and the copy around
 * them makes clear these are not quotes. Keep it that way — we're a directory
 * and editorial guide, not a contractor.
 */

export const PRICING_LAST_REVIEWED_MONTH = "April 2026";
export const PRICING_YEAR = "2026";

export type PricingRow = {
  job: string;
  low: number;
  high: number;
  /** Georgetown-specific context for why the range is what it is. */
  notes?: string;
};

export type PricingCategory = {
  key:
    | "plumbing"
    | "hvac"
    | "roofing"
    | "electrical"
    | "foundation"
    | "landscaping"
    | "pest"
    | "cleaning";
  /** Section heading (H2) on /pricing */
  title: string;
  /** Short sentence shown above the table. */
  intro: string;
  /** Georgetown-specific pricing drivers — rendered as a small list under the table. */
  priceDrivers: string[];
  rows: PricingRow[];
};

/** Best-of directory + deeper cost/guide link for each pricing section. */
export const PRICING_CATEGORY_RELATED_LINKS: Readonly<
  Record<
    PricingCategory["key"],
    { bestHref: string; bestLabel: string; guideHref: string; guideLabel: string }
  >
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
    intro:
      "Most Georgetown plumbing bills fall into three buckets: a diagnostic/service call, a parts-and-labor repair, or a larger replacement job. These ranges assume a licensed local plumber working standard hours.",
    priceDrivers: [
      "Edwards Aquifer hard-water scaling shortens water-heater and fixture life, so replacements trend higher than national averages.",
      "Slab-on-grade construction (the norm in Georgetown) makes main-line repairs more expensive than accessible crawlspace layouts.",
      "Williamson County permit requirements on gas, re-pipes, and water-heater swaps add $75–$250 depending on scope.",
    ],
    rows: [
      { job: "Standard service call / diagnosis", low: 100, high: 175, notes: "Often credited toward approved repair same day" },
      { job: "Drain clearing (typical kitchen or bath clog)", low: 150, high: 350 },
      { job: "Main-line cabling or hydro-jet", low: 325, high: 850 },
      { job: "Water heater replacement (standard tank)", low: 900, high: 1800, notes: "Many 40–50 gal installs with permits land $1,650–$3,200+" },
      { job: "Toilet repair (flapper / fill valve / wax)", low: 150, high: 450 },
      { job: "Slab leak repair (detection + repair, typical scope)", low: 500, high: 2500, notes: "Major re-routes or extensive dig-through can exceed this band" },
      { job: "Emergency/after-hours plumber call", low: 250, high: 650, notes: "Separate from any repair cost" },
    ],
  },
  {
    key: "hvac",
    title: "HVAC Costs in Georgetown TX",
    intro:
      "Georgetown's long cooling season pushes equipment hard, so full replacements are common every 12–18 years. These ranges cover single-unit residential systems in typical Georgetown homes.",
    priceDrivers: [
      "Triple-digit summer load accelerates compressor, capacitor, and contactor wear vs. national baselines.",
      "Two-story layouts common in Wolf Ranch / Sun City add ductwork complexity and zoning decisions to replacement scope.",
      "SEER2 efficiency tier chosen can swing a replacement by $2,000–$4,000 for the same tonnage.",
    ],
    rows: [
      { job: "Service call + diagnosis", low: 75, high: 150, notes: "Commonly credited toward approved repair" },
      { job: "Capacitor or contactor replacement", low: 150, high: 300 },
      { job: "Refrigerant recharge (plan on leak repair)", low: 200, high: 400, notes: "Small charge; major leak diagnosis runs higher" },
      { job: "Refrigerant work (larger top-off / leak search)", low: 275, high: 650 },
      { job: "Condensate drain clear + safety switch reset", low: 150, high: 400 },
      { job: "Blower motor replacement", low: 450, high: 1200 },
      { job: "Evaporator coil replacement", low: 1400, high: 2800 },
      { job: "Compressor replacement (older system)", low: 1800, high: 3600, notes: "Usually prompts replace-vs-repair conversation" },
      { job: "AC-only replacement (2–3 ton, standard SEER2)", low: 5000, high: 8500 },
      { job: "Full system replacement (AC + furnace/air handler, 3–5 ton)", low: 5000, high: 14000, notes: "High-efficiency or zoned systems can reach $16k+" },
      { job: "Annual maintenance (tune-up)", low: 95, high: 225 },
    ],
  },
  {
    key: "roofing",
    title: "Roofing Costs in Georgetown TX",
    intro:
      "Georgetown roofing quotes swing widely because of hail history, underlayment/decking condition at tear-off, and whether ventilation or flashing detail is included. Ranges assume asphalt shingle on typical single-family roofs.",
    priceDrivers: [
      "Williamson County hail events (most recent notable storm lines up with spring convective season) drive insurance-scope roofs higher than cash-pay repairs.",
      "Decking replacement discovered during tear-off is almost always additional and priced per sheet ($75–$125 installed).",
      "Steep-pitch or two-story sections with limited access add labor; single-story walk-up roofs price near the low end.",
    ],
    rows: [
      { job: "Roof inspection + written report", low: 150, high: 300, notes: "Some companies waive with replacement contract" },
      { job: "Minor repair (flashing, 1–2 shingles, pipe boot)", low: 300, high: 800 },
      { job: "Mid-scope repair (valley, larger flashing section, small area)", low: 800, high: 2500 },
      { job: "Partial replacement (one slope / section)", low: 1500, high: 5000, notes: "Tie-in and matching shingle batch affect price" },
      { job: "Emergency roof tarping / temporary stabilization", low: 400, high: 1200 },
      { job: "Full roof replacement (~2,000 sqft, architectural shingle)", low: 9000, high: 20000 },
      { job: "Roof replacement (2,500–3,200 sqft, mid-tier shingle + ventilation upgrade)", low: 13000, high: 22000, notes: "Larger or steeper homes exceed this band" },
      { job: "Gutter replacement (standard home)", low: 1200, high: 3500 },
      { job: "Skylight flashing / seal repair", low: 400, high: 1400 },
    ],
  },
  {
    key: "electrical",
    title: "Electrical Costs in Georgetown TX",
    intro:
      "Most residential electrical work in Georgetown is scoped per-circuit or per-fixture, with panel upgrades and EV circuits being the common larger jobs. Permits and inspections are typical.",
    priceDrivers: [
      "City of Georgetown + Williamson County permit/inspection fees apply to panel work and new circuits.",
      "Newer Wolf Ranch construction often meets modern code already; older Serenada/Georgetown Village homes more likely to need panel or service upgrades during any major work.",
      "EV-charger installs vary widely based on panel capacity and run length from panel to garage.",
    ],
    rows: [
      { job: "Service call + diagnosis", low: 100, high: 175 },
      { job: "Outlet / switch replacement", low: 100, high: 250 },
      { job: "New circuit (dedicated 20A, short run)", low: 325, high: 950 },
      { job: "Ceiling fan install (existing box)", low: 200, high: 475 },
      { job: "EV charger circuit (Level 2, short run, panel has capacity)", low: 500, high: 1200 },
      { job: "EV charger circuit (long run or panel work needed)", low: 1200, high: 2400 },
      { job: "Panel upgrade / main breaker replacement", low: 1500, high: 4000 },
      { job: "Whole-home surge protector (panel-mounted)", low: 325, high: 750 },
    ],
  },
  {
    key: "foundation",
    title: "Foundation Repair Costs in Georgetown TX",
    intro:
      "Central Texas expansive clay soil makes foundation movement a common Georgetown concern. Most quotes are scoped per pier or per linear foot, with engineer reports often required.",
    priceDrivers: [
      "Expansive clay soil swells and shrinks with moisture — most Georgetown foundation issues trace back to drainage, not failure.",
      "Engineer reports ($350–$950) are often the first step and sometimes required by lenders or HOAs.",
      "Pressed concrete piers vs. steel piers vs. slab-crack injection have very different scope and price.",
    ],
    rows: [
      { job: "Foundation inspection (evaluator / engineer report)", low: 0, high: 300, notes: "$0 offers common; full engineer letter often $350–$950" },
      { job: "Engineer inspection + written report", low: 350, high: 950 },
      { job: "Interior slab crack injection (epoxy/poly)", low: 500, high: 1800 },
      { job: "Pressed concrete pier (per pier, installed)", low: 325, high: 600 },
      { job: "Steel / helical pier (per pier, typical range)", low: 1500, high: 3000 },
      { job: "Typical residential stabilization (multi-pier lift)", low: 4000, high: 15000 },
      { job: "Drainage correction (french drain, regrade)", low: 1800, high: 7500 },
    ],
  },
  {
    key: "pest",
    title: "Pest Control Costs in Georgetown TX",
    intro:
      "Most pest-control work in Georgetown is scoped as an initial treatment + a maintenance plan. Rodent exclusion and termite jobs price separately.",
    priceDrivers: [
      "Fire-ant pressure in spring/summer and scorpion activity in rockier sub-areas (Berry Creek, parts of Serenada) affect treatment frequency.",
      "Rodent exclusion — sealing entry points, not just trapping — is the part most homeowners under-budget for.",
      "Termite inspections are often free with a plan but remediation is scoped separately.",
    ],
    rows: [
      { job: "Initial general pest treatment", low: 150, high: 300 },
      { job: "Quarterly maintenance plan (per visit)", low: 75, high: 150 },
      { job: "Rodent exclusion (basic seal + trapping setup)", low: 300, high: 700 },
      { job: "Rodent exclusion (larger home / extensive sealing)", low: 700, high: 1800 },
      { job: "Termite inspection", low: 0, high: 250, notes: "Free with many plans" },
      { job: "Termite treatment (localized)", low: 500, high: 2500 },
    ],
  },
  {
    key: "landscaping",
    title: "Landscaping Costs in Georgetown TX",
    intro:
      "Landscape and lawn-care quotes in Georgetown are driven more by frequency and scope than by job type. Irrigation tuning is the highest-ROI project for most homes in a drought cycle.",
    priceDrivers: [
      "Water restrictions during drought cycles affect scope and plant choices more than price per visit.",
      "Mulch refresh + shrub trim paired together is the most common \"reset\" project and more economical than either alone.",
      "Sod replacement and new-bed installs are the most weather-dependent — spring and fall windows are cheaper than mid-summer.",
    ],
    rows: [
      { job: "Lawn mowing (average lot, per visit)", low: 40, high: 80 },
      { job: "Weekly lawn maintenance (mow + edge package)", low: 45, high: 95 },
      { job: "Seasonal yard cleanup (no major mulch)", low: 200, high: 500 },
      { job: "Seasonal cleanup + mulch refresh", low: 350, high: 1200 },
      { job: "Shrub trim + bed weed control", low: 200, high: 650 },
      { job: "Irrigation check / basic tune-up", low: 75, high: 150 },
      { job: "Irrigation repair / valve + zone diagnostics", low: 125, high: 350 },
      {
        job: "Sod install (per 500 sqft section)",
        low: 750,
        high: 1500,
        notes: "All-in often $1.50–$3.00/sq ft including prep; minimums apply on small jobs",
      },
      { job: "Tree trim (mid-size, from ground)", low: 275, high: 850 },
    ],
  },
  {
    key: "cleaning",
    title: "House Cleaning Costs in Georgetown TX",
    intro:
      "Recurring cleans are the most common product; deep and move-out cleans are scoped separately because they are labor-heavy. Ranges are for typical 3-bed / 2-bath Georgetown homes.",
    priceDrivers: [
      "Recurring frequency (weekly vs biweekly vs monthly) moves the per-visit price more than square footage for most homes.",
      "Move-out cleans are priced on condition, not square footage — empty + vacant cleans cheaper than furnished.",
      "Pet households often see a small add-on charge per visit for fur / paw-print surfaces.",
    ],
    rows: [
      { job: "Standard clean (average home)", low: 120, high: 200 },
      { job: "Deep clean", low: 200, high: 350 },
      { job: "Move-out clean", low: 250, high: 400 },
      {
        job: "Recurring weekly clean (same scope)",
        low: 120,
        high: 200,
        notes: "Many providers discount recurring visits 15–20% vs one-time pricing",
      },
      { job: "Recurring biweekly clean (same scope)", low: 150, high: 260 },
    ],
  },
];

/** Format a PricingRow range for display: `$150–$400` or `From $1,650`. */
export function formatPricingRange(row: PricingRow): string {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  if (row.low === 0) return `Up to ${fmt(row.high)}`;
  if (row.low === row.high) return fmt(row.low);
  return `${fmt(row.low)}–${fmt(row.high)}`;
}

export function findCategory(key: PricingCategory["key"]): PricingCategory {
  const c = PRICING_CATEGORIES.find((cat) => cat.key === key);
  if (!c) throw new Error(`[pricing-data] Unknown category: ${key}`);
  return c;
}

/** Represents a supplemental pricing block injected into a cost-guide blog post. */
export type CostPostSupplement = {
  category: PricingCategory["key"];
  /** Short label above the table. */
  heading: string;
  /** Lede sentence introducing the table. */
  lede: string;
  /** Rows to show (subset of the category's rows). */
  rowJobs: string[];
  /** A short repair-vs-replace decision frame shown below the table. */
  decisionFrame?: ReactNode;
};

/**
 * Which cost-guide blog posts get an automatic pricing-table + Georgetown
 * pricing-drivers section injected after their first section.
 *
 * Driven by slug so we can evolve the post HTML in generatedPages.json
 * without resyncing data locations.
 */
export const COST_POST_SUPPLEMENTS: Record<string, CostPostSupplement> = {
  "cost-to-replace-hvac-georgetown": {
    category: "hvac",
    heading: "Georgetown HVAC replacement cost ranges",
    lede:
      "Most Georgetown HVAC replacements land in the ranges below. Your actual quote depends on tonnage, efficiency tier, and any ductwork work discovered at removal. Use these as a sanity-check, not a quote.",
    rowJobs: [
      "AC-only replacement (2–3 ton, standard SEER2)",
      "Full system replacement (AC + furnace/air handler, 3–5 ton)",
      "Evaporator coil replacement",
      "Compressor replacement (older system)",
      "Service call + diagnosis",
    ],
  },
  "ac-repair-cost-georgetown-tx": {
    category: "hvac",
    heading: "Georgetown AC repair cost ranges",
    lede:
      "Most AC repair calls in Georgetown resolve for under $1,000. Compressor and coil work climb quickly and typically prompt a repair-vs-replace conversation. Diagnostic fees are usually credited toward approved repairs.",
    rowJobs: [
      "Service call + diagnosis",
      "Capacitor or contactor replacement",
      "Refrigerant recharge (plan on leak repair)",
      "Condensate drain clear + safety switch reset",
      "Blower motor replacement",
      "Compressor replacement (older system)",
    ],
  },
  "roof-replacement-cost-georgetown-tx": {
    category: "roofing",
    heading: "Georgetown roof replacement cost ranges",
    lede:
      "Roof replacement pricing in Georgetown is driven by square footage, shingle tier, decking condition at tear-off, and whether ventilation or flashing detail is in scope. Insurance-scope roofs (hail/wind) follow a different pricing path than cash-pay.",
    rowJobs: [
      "Full roof replacement (~2,000 sqft, architectural shingle)",
      "Roof replacement (2,500–3,200 sqft, mid-tier shingle + ventilation upgrade)",
      "Mid-scope repair (valley, larger flashing section, small area)",
      "Gutter replacement (standard home)",
    ],
  },
};
