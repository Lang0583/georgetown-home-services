import Link from "next/link";
import { LISTING_INCLUSION_CRITERIA, LISTING_METHODOLOGY_PATH } from "@/lib/listing-methodology";

/**
 * Single selection-methodology block for `/best` routes — shown once above provider cards.
 */
export default function BestProvidersMethodologyCallout() {
  return (
    <div className="rounded-lg border border-white/20 bg-[var(--accent)] px-5 py-4 shadow-sm">
      <h3 className="text-sm font-semibold text-white">How We Selected These Companies</h3>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-snug text-white/95 marker:text-white/90 sm:text-sm">
        {LISTING_INCLUSION_CRITERIA.map((text) => (
          <li key={text} className="pl-0.5">
            {text}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-snug text-white/90 sm:text-sm">
        <Link href={LISTING_METHODOLOGY_PATH} className="font-semibold underline underline-offset-2 hover:text-white">
          Read full listing methodology →
        </Link>
      </p>
    </div>
  );
}
