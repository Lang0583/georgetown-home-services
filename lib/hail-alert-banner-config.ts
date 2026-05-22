/**
 * Env-driven hail / severe-weather alert bar (layout → HomeHailAlertBanner).
 * All NEXT_PUBLIC_* values are inlined at build time.
 */

/** Extend through recurrent early-summer convection; override per deployment in `.env.local` / CI. */
const DEFAULT_EXPIRY_YMD = "2026-06-30";
/** Bump when rotating copy/end dates so dismissed visitors see fresh urgency. */
const DEFAULT_DISMISS_SUFFIX = "may2026-surge-wave2";
const DEFAULT_ALERT_LABEL =
  "Storm alert — Williamson County (May/June ’26 surge): hail, wind & tree debris; document soft metals early";

/** June 1, 2026 local midnight — legacy default when env date is invalid. */
function legacyJuneFirst2026Ms(): number {
  return new Date(2026, 5, 1, 0, 0, 0, 0).getTime();
}

function bannerEndTimestampMs(): number {
  const raw = process.env.NEXT_PUBLIC_HAIL_BANNER_END_DATE?.trim() || DEFAULT_EXPIRY_YMD;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!m) return legacyJuneFirst2026Ms();
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return legacyJuneFirst2026Ms();
  return new Date(y, mo - 1, d, 0, 0, 0, 0).getTime();
}

/** After `NEXT_PUBLIC_HAIL_BANNER_END_DATE` (local midnight): banner must not render. */
export function isHailAlertBannerExpired(now = Date.now()): boolean {
  return now >= bannerEndTimestampMs();
}

/** Set `NEXT_PUBLIC_HAIL_BANNER_ENABLED=false` to hide the bar regardless of dates. */
export function isHailBannerGloballyDisabled(): boolean {
  return process.env.NEXT_PUBLIC_HAIL_BANNER_ENABLED?.trim().toLowerCase() === "false";
}

/** Bump when copy/campaign changes so dismiss state does not carry over unintentionally. */
export function getHailBannerDismissStorageKey(): string {
  const suffix = process.env.NEXT_PUBLIC_HAIL_BANNER_DISMISS_KEY?.trim() || DEFAULT_DISMISS_SUFFIX;
  return `hailBannerDismissed_${suffix}`;
}

/** Line shown before “Protect your home…” — override per season via env. */
export function getHailBannerAlertLabel(): string {
  return process.env.NEXT_PUBLIC_HAIL_BANNER_ALERT_LABEL?.trim() || DEFAULT_ALERT_LABEL;
}
