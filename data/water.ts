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
    proseLabel: "Lake Georgetown and the Southlake plant",
    mglLow: 176,
    mglHigh: 178,
    gpgLow: 10,
    gpgHigh: 11,
    usgsClass: "Hard",
  },
  park: {
    slug: "georgetown-park-plant",
    label: "Park Plant and Southside WTP",
    proseLabel: "the Park plant and the Southside plant",
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

export const WATER_SPEC = {
  priceUsd: 79,
  refreshUsd: 49,
} as const;

export const SIZING_EXAMPLES = {
  peopleFour: 4,
  peopleTwo: 2,
  regenDaysLow: 3,
  regenDaysHigh: 4,
} as const;

export const WATER_SITEMAP_PATHS = [
  "/water",
  "/water/georgetown-southlake",
  "/water/georgetown-park-plant",
  "/water/how-we-source",
  "/water/chloramine-and-resin",
  "/water/spec-what-you-get",
  "/water/spec",
] as const;

function usgsBand(label: UsgsBand["label"]): UsgsBand {
  const band = USGS_BANDS.find((b) => b.label === label);
  if (!band) throw new Error(`missing USGS band: ${label}`);
  return band;
}

export function formatToRange(low: number, high: number): string {
  if (low === high) return String(low);
  return `${low} to ${high}`;
}

export function formatMgLTo(low: number, high: number): string {
  return `${formatToRange(low, high)} mg/L`;
}

export function formatGpgTo(low: number, high: number): string {
  const n = formatToRange(low, high);
  const grain = low === high && high === 1 ? "grain" : "grains";
  return `${n} ${grain} per gallon`;
}

export function plantMgL(plant: WaterPlant): string {
  return formatMgLTo(plant.mglLow, plant.mglHigh);
}

export function plantGpg(plant: WaterPlant): string {
  return formatGpgTo(plant.gpgLow, plant.gpgHigh);
}

export function usgsHardRange(): string {
  const band = usgsBand("Hard");
  if (band.high === null) throw new Error("Hard band missing high");
  return formatMgLTo(band.low, band.high);
}

export function usgsVeryHardThreshold(): string {
  return `${usgsBand("Very hard").low} mg/L`;
}

export function formatMglPerGrain(): string {
  return `${MGL_PER_GRAIN} mg/L`;
}

export function formatArticleId(): string {
  return String(WATER_SOURCE.articleId);
}

export function formatUsd(amount: number): string {
  return `$${amount}`;
}

export function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

export function grainsPerDay(gpg: number, people: number): number {
  return gpg * people * GALLONS_PER_PERSON_PER_DAY;
}

export function grainCapacity(gpg: number, people: number, days: number): number {
  return grainsPerDay(gpg, people) * days;
}
