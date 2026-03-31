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
  const t = (text ?? "").trim();
  if (!t) return null;
  return (
    <p className={`text-sm leading-snug text-gray-600 line-clamp-3 ${className}`} title={t}>
      {t}
    </p>
  );
}
