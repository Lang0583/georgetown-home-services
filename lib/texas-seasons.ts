/**
 * Central Texas season calendar for Georgetown / Williamson County homeowners.
 * Months are inclusive; prep window = final ~3 weeks before the next season starts.
 */

export type TexasSeason = "spring" | "summer" | "fall" | "winter";

export const TEXAS_SEASON_ORDER: readonly TexasSeason[] = ["spring", "summer", "fall", "winter"] as const;

const SEASON_MONTHS: Record<TexasSeason, readonly number[]> = {
  spring: [2, 3, 4], // Mar–May (0-indexed)
  summer: [5, 6, 7], // Jun–Aug
  fall: [8, 9, 10], // Sep–Nov
  winter: [11, 0, 1], // Dec–Feb
};

/** Resolve season from a calendar date (defaults to server/build “today”). */
export function getTexasSeason(date: Date = new Date()): TexasSeason {
  const month = date.getMonth();
  if (SEASON_MONTHS.spring.includes(month)) return "spring";
  if (SEASON_MONTHS.summer.includes(month)) return "summer";
  if (SEASON_MONTHS.fall.includes(month)) return "fall";
  return "winter";
}

export function getNextSeason(season: TexasSeason): TexasSeason {
  const i = TEXAS_SEASON_ORDER.indexOf(season);
  return TEXAS_SEASON_ORDER[(i + 1) % TEXAS_SEASON_ORDER.length]!;
}

export function getPreviousSeason(season: TexasSeason): TexasSeason {
  const i = TEXAS_SEASON_ORDER.indexOf(season);
  return TEXAS_SEASON_ORDER[(i + TEXAS_SEASON_ORDER.length - 1) % TEXAS_SEASON_ORDER.length]!;
}

export function isTexasSeasonSlug(value: string): value is TexasSeason {
  return (TEXAS_SEASON_ORDER as readonly string[]).includes(value);
}

/** True during the last ~3 weeks before the next Central Texas season. */
export function isSeasonPrepWindow(date: Date = new Date()): boolean {
  const m = date.getMonth();
  const d = date.getDate();
  if (m === 4 && d >= 11) return true; // late May → summer
  if (m === 7 && d >= 11) return true; // late Aug → fall
  if (m === 10 && d >= 10) return true; // late Nov → winter
  if (m === 1 && d >= 8) return true; // late Feb → spring
  return false;
}

export type SeasonSchedule = {
  current: TexasSeason;
  next: TexasSeason;
  prepWindow: boolean;
  /** Human label for “now” block on pages */
  nowLabel: string;
};

export function getSeasonSchedule(date: Date = new Date()): SeasonSchedule {
  const current = getTexasSeason(date);
  const next = getNextSeason(current);
  const prepWindow = isSeasonPrepWindow(date);
  const nowLabel = prepWindow
    ? `${capitalize(current)} in Georgetown — prep for ${capitalize(next)}`
    : `${capitalize(current)} in Georgetown`;
  return { current, next, prepWindow, nowLabel };
}

function capitalize(s: TexasSeason): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
