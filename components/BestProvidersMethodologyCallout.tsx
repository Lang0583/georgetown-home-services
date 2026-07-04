const BULLETS = [
  "Active service in Georgetown, TX",
  "Minimum 4.5-star Google rating",
  "Minimum 50 reviews at time of listing",
  "Working phone and website",
  "No paid placement",
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
    </div>
  );
}
