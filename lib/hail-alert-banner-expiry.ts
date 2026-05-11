/** After May 31, 2026 (local): banner must not render. */
export function isHailAlertBannerExpired(now = Date.now()): boolean {
  const juneFirst2026Local = new Date(2026, 5, 1, 0, 0, 0, 0).getTime();
  return now >= juneFirst2026Local;
}
