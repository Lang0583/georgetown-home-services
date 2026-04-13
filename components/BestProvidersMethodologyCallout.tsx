import Link from "next/link";

const BULLETS = [
  "Verified active service in Georgetown, TX and surrounding areas",
  "Minimum 4.5 stars based on Google Business Profile ratings",
  "At least 75 verified reviews at time of listing",
  "No paid placements - rankings based solely on review data",
] as const;

/**
 * Compact trust / methodology strip above provider listings on `/best` routes.
 */
export default function BestProvidersMethodologyCallout() {
  return (
    <div className="rounded-lg border border-[#01696F]/30 bg-[#E6F2F2] px-5 py-4">
      <h3 className="text-sm font-semibold text-[#01696F]">How we selected these providers</h3>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-snug text-gray-800 sm:text-sm">
        {BULLETS.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      <p className="mt-2">
        <Link
          href="/methodology"
          className="text-sm font-semibold text-[#01696F] underline underline-offset-2 hover:text-[#0C4E54]"
        >
          Read our full methodology →
        </Link>
      </p>
    </div>
  );
}
