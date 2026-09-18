import type { CostGuidePage } from "@/data/cost-guides";
import {
  PROVIDERS_LAST_VERIFIED,
  PROVIDER_CATEGORY_LABELS,
  type Provider,
  type ProviderCategory,
} from "@/data/providers";
import { LISTING_MIN_GOOGLE_RATING, LISTING_MIN_GOOGLE_REVIEWS } from "@/lib/listing-methodology";
import { verifiedLicenseInfo } from "@/lib/verified-license";

function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Key takeaways derived from a cost guide’s price table + local framing. */
export function costGuideTakeaways(page: CostGuidePage): string[] {
  const rows = page.priceRows;
  if (!rows.length) {
    return [
      `${page.serviceName} planning ranges are for Georgetown / Williamson County homeowners (${page.year}).`,
      "Get at least two written estimates and confirm Texas licensing where the trade requires it.",
    ];
  }

  const lows = rows.map((r) => r.low);
  const highs = rows.map((r) => r.high);
  const avgs = rows.map((r) => r.average);
  const bandLow = Math.min(...lows);
  const bandHigh = Math.max(...highs);
  const mid =
    avgs.reduce((a, b) => a + b, 0) / avgs.length;

  const items = [
    `Typical ${page.serviceName.toLowerCase()} jobs in Georgetown, TX plan between ${formatUsd(bandLow)} and ${formatUsd(bandHigh)} in ${page.year} (line-item midpoints near ${formatUsd(Math.round(mid))}).`,
    "Bands are Williamson County planning estimates—not quotes. After-hours, storm work, and access issues can push any line higher.",
    "Compare two written scopes that list trip/diagnostic fees, labor, parts, permits, and what restoration is excluded.",
  ];

  const local = LOCAL_FACTS_BY_COST_SLUG[page.slug];
  if (local) items.push(local);

  return items;
}

/** Best Of takeaways from the live provider shortlist. */
export function bestOfTakeaways(
  category: ProviderCategory,
  providers: Provider[],
): string[] {
  const label = PROVIDER_CATEGORY_LABELS[category];
  const licensed = providers.filter((p) => verifiedLicenseInfo(p) != null).length;
  const items = [
    `${providers.length} ${label.toLowerCase()} listings currently meet Georgetown Home Services inclusion criteria (active local service, working phone, ${LISTING_MIN_GOOGLE_RATING}+ Google rating, ${LISTING_MIN_GOOGLE_REVIEWS}+ reviews).`,
    licensed > 0
      ? `${licensed} of ${providers.length} show a primary-source Texas license number checked against TSBPE, TDLR, or TDA SPCS (batch ${PROVIDERS_LAST_VERIFIED}).`
      : `Texas does not issue a statewide license for every trade in this category—confirm insurance and written scopes before hiring.`,
    "Directory order is not sold. Confirm current licensing, pricing, and availability directly with each company.",
  ];
  const local = LOCAL_FACTS_BY_CATEGORY[category];
  if (local) items.push(local);
  return items;
}

export function hailTakeaways(neighborhoodLabel: string): string[] {
  return [
    `After hail in ${neighborhoodLabel}, do a ground-level review once lightning risk drops—then book a documented roof inspection before the next heavy rain.`,
    "Keep each contractor’s photo gallery separate for insurance; pair HVAC condenser photos if outdoor units were dented.",
    "Compare written scopes (squares, underlayment, vents/boots)—not door-hanger slogans. Texas does not require a state roofing license.",
    "See the May 2026 Williamson County hail guide and neighborhood hubs for claim timing context.",
  ];
}

export type TradeHubKey =
  | "plumbing"
  | "hvac"
  | "roofing"
  | "electrical"
  | "landscaping"
  | "pest-control"
  | "foundation"
  | "house-cleaning";

const TRADE_HUB_COPY: Record<
  TradeHubKey,
  { label: string; bestPath: string; licenseBoard: string; localFact: string }
> = {
  plumbing: {
    label: "plumbing",
    bestPath: "/best/best-plumbers-georgetown-tx",
    licenseBoard: "Texas State Board of Plumbing Examiners (TSBPE)",
    localFact:
      "Georgetown water hardness differs by treatment plant (Southlake ~10–11 gpg vs Park Plant ~19 gpg)—size softeners and heaters for the correct band.",
  },
  hvac: {
    label: "HVAC",
    bestPath: "/best/top-hvac-companies-georgetown-tx",
    licenseBoard: "Texas Department of Licensing and Regulation (TDLR) ACR",
    localFact:
      "Georgetown summers regularly push triple-digit heat; attic equipment and peak-season capacitor/coil failures dominate local call volume May–September.",
  },
  roofing: {
    label: "roofing",
    bestPath: "/best/best-roofers-georgetown-tx",
    licenseBoard: "Texas does not issue a statewide roofing license—verify insurance and written scopes",
    localFact:
      "Williamson County hail and wind seasons drive most roof inspections; compare photo-documented scopes, not door-hanger slogans.",
  },
  electrical: {
    label: "electrical",
    bestPath: "/best/best-electricians-georgetown-tx",
    licenseBoard: "Texas Department of Licensing and Regulation (TDLR)",
    localFact:
      "EV chargers and heat-pump loads are pushing older 100–150A panels past comfort in renovated Georgetown homes.",
  },
  landscaping: {
    label: "landscaping",
    bestPath: "/best/best-landscaping-companies-georgetown-tx",
    licenseBoard: "irrigation and pesticide work may require TCEQ / TDA credentials where applicable",
    localFact:
      "Central Texas drought rules and oak wilt–aware pruning change summer maintenance scopes more than a generic lawn-care checklist.",
  },
  "pest-control": {
    label: "pest control",
    bestPath: "/best/best-pest-control-georgetown-tx",
    licenseBoard: "Texas Department of Agriculture Structural Pest Control Service (TDA SPCS)",
    localFact:
      "Subterranean termite pressure around expansive clay and slab edges is a recurring Georgetown inspection theme.",
  },
  foundation: {
    label: "foundation repair",
    bestPath: "/best/best-foundation-repair-georgetown-tx",
    licenseBoard: "confirm engineering reports and written pier scopes—Texas does not use a single consumer foundation license badge",
    localFact:
      "Expansive clay shrink–swell cycles after drought-to-rain swings commonly open stair-step and horizontal cracks across Sun City and older slabs.",
  },
  "house-cleaning": {
    label: "house cleaning",
    bestPath: "/best/best-house-cleaning-services-georgetown-tx",
    licenseBoard: "Texas does not license residential cleaners statewide—verify insurance and written service scopes",
    localFact:
      "Hard-water film and pollen loads differ by neighborhood; ask whether quotes include appliances, baseboards, and hard-water fixtures.",
  },
};

/** Key takeaways for `/services/{trade}` hubs. */
export function tradeHubTakeaways(trade: TradeHubKey): string[] {
  const t = TRADE_HUB_COPY[trade];
  return [
    `Georgetown Home Services ${t.label} guides help homeowners compare local providers using public ratings and Texas license checks where the trade requires them.`,
    `License verification for listed companies uses ${t.licenseBoard}.`,
    t.localFact,
    `Start with the Best Of shortlist at ${t.bestPath}, then compare written scopes—not paid rankings.`,
  ];
}

/** Key takeaways for the water hardness hub and plant pages. */
export function waterHubTakeaways(): string[] {
  return [
    "Georgetown has no single hardness number—finished water differs by treatment plant.",
    "Lake Georgetown / Southlake plant water runs about 176–178 mg/L as CaCO₃ (~10–11 grains per gallon).",
    "Park Plant / Southside plant water runs about 309–320 mg/L as CaCO₃ (~19 grains per gallon).",
    "USGS calls 121–180 mg/L hard and above 180 mg/L very hard—so one side of town is hard and the other is very hard.",
    "Softener sizing is arithmetic on grains per gallon; using the wrong plant band wastes salt or shortens resin life.",
  ];
}

export function waterPlantTakeaways(plant: "southlake" | "park"): string[] {
  if (plant === "southlake") {
    return [
      "If your street is on Lake Georgetown / Southlake plant water, plan around ~10–11 grains per gallon (176–178 mg/L as CaCO₃).",
      "USGS classifies this band as hard—scale still builds, but capacity needs differ from Park Plant homes.",
      "Ask any softener quote which plant band they assumed; most door-to-door scripts do not.",
      "Figures come from the City of Georgetown published Ask GTX article—not a sink demo.",
    ];
  }
  return [
    "If your street is on Park Plant / Southside plant water, plan around ~19 grains per gallon (309–320 mg/L as CaCO₃).",
    "USGS classifies this band as very hard—nearly double the mineral load of Southlake plant water.",
    "Undersizing for ~10 gpg when you are actually near 19 gpg drives excess regenerations and salt use.",
    "Figures come from the City of Georgetown published Ask GTX article—not a sink demo.",
  ];
}

export function homepageTakeaways(): string[] {
  return [
    "Georgetown Home Services is an independent local directory—providers do not pay for ranking or placement.",
    "Where Texas licenses a trade, listed companies are checked against TSBPE, TDLR, or TDA SPCS public records.",
    "Cost guides publish Williamson County planning bands, not contractor quotes—compare two written scopes before you hire.",
    "Georgetown water hardness differs by treatment plant; check /water before sizing a softener or blaming a plumber for scale.",
  ];
}

export function seasonalTakeaways(seasonLabel: string): string[] {
  return [
    `${seasonLabel} maintenance in Georgetown should prioritize HVAC, roofing after storms, and irrigation/drought rules—not a generic national checklist.`,
    "Use the seasonal task list as a planning aid, then open the matching trade hub for provider shortlists and cost bands.",
    "License-checked providers appear on Best Of pages; directory placement cannot be bought.",
  ];
}

export function neighborhoodHomeServicesTakeaways(neighborhoodLabel: string): string[] {
  return [
    `${neighborhoodLabel} homeowners should compare plumbers, HVAC, and roofers using Georgetown-specific cost bands and license checks—not national lead forms.`,
    "Housing age, HOA rules, and storm exposure differ by neighborhood; ask contractors about local scope assumptions in writing.",
    "Start from the trade hubs and Best Of shortlists, then confirm current licensing and availability directly.",
  ];
}

export function zipTakeaways(zipcode: string): string[] {
  return [
    `ZIP ${zipcode} sits inside Georgetown / Williamson County home-service markets covered by this directory.`,
    "Use ZIP context for housing-stock clues, then open trade hubs and Best Of pages for license-checked providers.",
    "Cost bands are planning estimates for the metro—get address-specific written quotes before you hire.",
  ];
}

/** Unique local facts AI engines can’t invent from national templates. */
export const LOCAL_FACTS_BY_COST_SLUG: Record<string, string> = {
  "plumber-cost-georgetown-tx":
    "Edwards Aquifer hard water and slab-on-grade homes in Sun City commonly drive scale, heater, and slab-leak scopes beyond simple fixture repairs.",
  "hvac-repair-cost-georgetown-tx":
    "Georgetown summers regularly push triple-digit heat; peak-season emergency premiums spike when Round Rock and Georgetown hit concurrent no-cool demand.",
  "ac-installation-cost-georgetown-tx":
    "Manual J sizing should reflect Sun City single-story loads vs two-story Teravista envelopes—not a one-size metro quote.",
  "roof-replacement-cost-georgetown-tx":
    "Williamson County hail seasons make adjuster-ready photos and itemized scopes more important than the lowest cash offer.",
  "roof-repair-cost-georgetown-tx":
    "Live-oak debris and nail pops differ from widespread hail bruising—scopes should say which failure mode they’re pricing.",
  "drain-cleaning-cost-georgetown-tx":
    "Mature trees near Berry Creek and older clay laterals make recurring backups a camera/root issue, not always a simple cable cleanout.",
  "water-heater-installation-cost-georgetown-tx":
    "Hard water shortens tank life across 78633/78628; many closed municipal systems expect expansion tanks on replacements.",
  "electrician-cost-georgetown-tx":
    "Panel upgrades often pair with EV chargers and heat-pump loads in renovated Georgetown homes—quotes should include permit and load calc language.",
  "panel-upgrade-cost-georgetown-tx":
    "Older 100–150A services in central Georgetown frequently need upgrades before whole-home heat pumps or Level 2 EV circuits.",
  "landscaping-cost-georgetown-tx":
    "Drought restrictions and oak wilt–aware pruning change Central Texas landscaping scopes more than a national lawn package.",
  "lawn-care-cost-georgetown-tx":
    "St. Augustine and Bermuda stress under Georgetown summer heat and watering rules—recurring mow quotes should state irrigation handling.",
  "pest-control-cost-georgetown-tx":
    "Slab-edge termite pressure on expansive clay is a common Georgetown add-on beyond general pest routes.",
  "termite-treatment-cost-georgetown-tx":
    "Confirm TDA SPCS licensing and whether the quote is bait, liquid barrier, or wood treatment—scopes differ widely on Georgetown slabs.",
  "foundation-repair-cost-georgetown-tx":
    "Drought-to-rain clay cycles around Sun City and older slabs drive pier counts and drainage scopes more than cosmetic crack filler.",
  "house-cleaning-cost-georgetown-tx":
    "Hard-water film and pollen loads vary by plant band and neighborhood—clarify whether quotes include fixtures and baseboards.",
  "hvac-maintenance-cost-georgetown-tx":
    "Twice-yearly tune-ups matter more here because cooling season runs long; filters and coils foul faster under Georgetown pollen and attic heat.",
};

export const LOCAL_FACTS_BY_CATEGORY: Partial<Record<ProviderCategory, string>> = {
  plumbing:
    "Local plumbing risk factors include Edwards Aquifer mineral scale and long horizontal drains in 1990s slab subdivisions.",
  hvac:
    "Central Texas cooling season stress (filters, coils, capacitors) dominates Georgetown HVAC call volume May–September.",
  roofing:
    "Hail and wind events in Williamson County are the main driver of roof inspections and replacements—not just shingle age.",
  electrical:
    "EV chargers and heat-pump loads are pushing older 100–150A panels past comfort in renovated Georgetown homes.",
  landscaping:
    "Drought rules and oak wilt–aware pruning change Georgetown landscaping scopes more than generic metro packages.",
  "pest-control":
    "Subterranean termite pressure around expansive clay and slab edges is a recurring Georgetown inspection theme.",
  foundation:
    "Expansive clay shrink–swell cycles after drought-to-rain swings commonly open stair-step and horizontal cracks.",
  cleaning:
    "Hard-water film and seasonal pollen loads differ by neighborhood and treatment plant band.",
};
