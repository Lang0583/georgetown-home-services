import Link from "next/link";

const BULLETS = [
  "Verified active service in Georgetown, TX and surrounding areas",
  "Minimum 4.5 stars based on Google Business Profile ratings",
  "At least 75 verified reviews at time of listing",
  "No paid placements — rankings use the methodology below, not sponsorships",
  "Sponsored quote links (Angi, Thumbtack, etc.) on other pages do not change this list order",
] as const;

/**
 * Compact trust / methodology strip above provider listings on `/best` routes.
 */
export default function BestProvidersMethodologyCallout() {
  return (
    <div className="rounded-lg border border-white/20 bg-[#01696F] px-5 py-4 shadow-sm">
      <h3 className="text-sm font-semibold text-white">How we selected these providers</h3>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-snug text-white/95 marker:text-white/90 sm:text-sm">
        {BULLETS.map((text) => (
          <li key={text} className="pl-0.5">
            {text}
          </li>
        ))}
      </ul>
      <p className="mt-2">
        <Link
          href="/methodology"
          className="text-sm font-semibold text-white underline underline-offset-2 decoration-white/80 hover:text-white hover:decoration-white"
        >
          Read our full methodology →
        </Link>
      </p>
    </div>
  );
}
