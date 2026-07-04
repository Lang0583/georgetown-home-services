import { formatLicenseLookupDate, PROVIDER_LICENSE_LOOKUP_DATE } from "@/lib/provider-license";

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
  const verifiedLabel = formatLicenseLookupDate(PROVIDER_LICENSE_LOOKUP_DATE);

  return (
    <div className="space-y-3">
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
      <p className="text-xs leading-relaxed text-gray-600">
        <span className="font-semibold text-gray-800">How we verify licenses:</span> Where shown on a card, license
        numbers were checked against public Texas registries—TSBPE for plumbing, TDLR for electrical and HVAC/ACR, and
        TDA SPCS for pest control—on {verifiedLabel}. Roofing, landscaping, foundation, and cleaning listings rely on
        insurance and public business documentation instead; Texas does not license all of those trades at the state
        level.
      </p>
    </div>
  );
}
