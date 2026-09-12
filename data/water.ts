/**
 * Georgetown water hardness — single source of numeric figures for /water.
 * No other file may hardcode hardness, mineral, conversion, or USGS-band numbers.
 */

export const WATER_SOURCE = {
  articleUrl: "https://georgetowntexas.qscend.com/askgtx/knowledgebase/article/20398",
  articleId: 20398,
  updated: "2026-05-08",
  reportsUrl: "https://georgetowntexas.gov/utilities/water/resources/water_utility_reports/",
} as const;

export const PLANTS = {
  southlake: {
    slug: "georgetown-southlake",
    label: "Lake Georgetown and Southlake WTP",
    mglLow: 176,
    mglHigh: 178,
    gpgLow: 10,
    gpgHigh: 11,
    usgsClass: "Hard",
  },
  park: {
    slug: "georgetown-park-plant",
    label: "Park Plant and Southside WTP",
    mglLow: 309,
    mglHigh: 320,
    gpgLow: 19,
    gpgHigh: 19,
    usgsClass: "Very hard",
  },
} as const;

export type WaterPlantKey = keyof typeof PLANTS;
export type WaterPlant = (typeof PLANTS)[WaterPlantKey];

export const USGS_BANDS = [
  { label: "Soft", low: 0, high: 60 },
  { label: "Moderately hard", low: 61, high: 120 },
  { label: "Hard", low: 121, high: 180 },
  { label: "Very hard", low: 181, high: null },
] as const;

export type UsgsBand = (typeof USGS_BANDS)[number];

export const SYSTEM_RANGES = {
  calcium: "44.8 to 95.5 mg/L",
  magnesium: "11.5 to 19.7 mg/L",
  sodium: "20.4 to 30.4 mg/L",
  sulfate: "29 to 38 mg/L",
  tds: "284 to 419 mg/L",
  alkalinity: "133 to 270 mg/L",
} as const;

export const MGL_PER_GRAIN = 17.1;
export const GALLONS_PER_PERSON_PER_DAY = 75;

export const WATER_HUB_PATH = "/water";

export const WATER_SITEMAP_PATHS = [
  "/water",
  "/water/georgetown-southlake",
  "/water/georgetown-park-plant",
  "/water/how-we-source",
  "/water/chloramine-and-resin",
  "/water/spec-what-you-get",
  "/water/spec",
] as const;

export function getPlantByKey(key: WaterPlantKey): WaterPlant {
  return PLANTS[key];
}

export function getPlantBySlug(slug: string): WaterPlant | undefined {
  return (Object.values(PLANTS) as WaterPlant[]).find((p) => p.slug === slug);
}

export function formatMgLRange(low: number, high: number): string {
  return `${low}\u2013${high} mg/L as CaCO3`;
}

export function formatGpgRange(low: number, high: number): string {
  if (low === high) return `${low} gpg`;
  return `${low}\u2013${high} gpg`;
}

export function plantMgL(plant: WaterPlant): string {
  return formatMgLRange(plant.mglLow, plant.mglHigh);
}

export function plantGpg(plant: WaterPlant): string {
  return formatGpgRange(plant.gpgLow, plant.gpgHigh);
}

export function formatUsgsBand(band: UsgsBand): string {
  if (band.high === null) {
    return `${band.label}: greater than ${band.low} mg/L as CaCO3`;
  }
  return `${band.label}: ${band.low}\u2013${band.high} mg/L as CaCO3`;
}

export function formatMglPerGrain(): string {
  return `${MGL_PER_GRAIN} mg/L`;
}

export function formatGallonsPerPersonPerDay(): string {
  return `${GALLONS_PER_PERSON_PER_DAY} gallons`;
}

export function formatArticleId(): string {
  return String(WATER_SOURCE.articleId);
}
