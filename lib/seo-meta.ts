/**
 * Shared helpers for SERP-oriented copy (length limits, clipping).
 */

/** Google typically displays ~155–160 characters; we target 155. */
export function clipMetaDescription(text: string, max = 155): string {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = cut.lastIndexOf(" ");
  const base = (i > 48 ? cut.slice(0, i) : cut.slice(0, max - 1)).trim();
  return `${base}…`;
}
