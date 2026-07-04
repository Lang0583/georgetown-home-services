/**
 * Short business blurb under the name; clamped so cards and dense lists stay even.
 */
export function BusinessListingDescription({
  text,
  className = "mt-1.5",
}: {
  text?: string;
  className?: string;
}) {
  const raw = (text ?? "").replace(/\s+/g, " ").trim();
  if (!raw) return null;

  // Heuristic cleanup so blurbs read like concise editorial summaries.
  // We intentionally keep this simple and deterministic (no AI generation at runtime).
  const withoutCtas = raw
    .replace(/\b(call|text|email)\s+(now|today)\b/gi, "")
    .replace(/\bfree\s+estimates?\b/gi, "")
    .replace(/\bget\s+a\s+quote\b/gi, "")
    .replace(/\bcontact\s+us\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const firstSentence = withoutCtas.split(/(?<=[.!?])\s+/)[0] ?? withoutCtas;
  const t = firstSentence.length > 220 ? `${firstSentence.slice(0, 217).trimEnd()}…` : firstSentence;
  if (!t) return null;
  return (
    <p className={`text-sm leading-snug text-muted line-clamp-3 ${className}`} title={t}>
      {t}
    </p>
  );
}
