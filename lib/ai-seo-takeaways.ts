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
  "pest-control":
    "Subterranean termite pressure around expansive clay and slab edges is a recurring Georgetown inspection theme.",
  foundation:
    "Expansive clay shrink–swell cycles after drought-to-rain swings commonly open stair-step and horizontal cracks.",
};
