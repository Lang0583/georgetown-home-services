"use client";

import AffiliateDisclosure from "./AffiliateDisclosure";
import AffiliateLink from "./AffiliateLink";
import { getAffiliateLink } from "@/lib/affiliateLinks";

/**
 * Tracked Angi directory CTAs for neighborhood home-services hubs (plumbing, HVAC, roofing lists).
 */
export default function NeighborhoodHomeServicesAngiRow({ neighborhoodName }: { neighborhoodName: string }) {
  const btnClass =
    "inline-flex min-h-11 items-center justify-center rounded-lg border border-ink/15 bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-sm hover:bg-surface-alt";

  return (
    <div className="not-prose mt-6">
      <AffiliateDisclosure className="mb-3" />
      <div
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        aria-label={`Angi directory links for ${neighborhoodName} homeowners`}
      >
        <AffiliateLink href={getAffiliateLink("plumbing")} category="plumbing" className={btnClass}>
          Compare plumbers on Angi →
        </AffiliateLink>
        <AffiliateLink href={getAffiliateLink("hvac")} category="hvac" className={btnClass}>
          Compare HVAC on Angi →
        </AffiliateLink>
        <AffiliateLink href={getAffiliateLink("roofing")} category="roofing" className={btnClass}>
          Compare roofers on Angi →
        </AffiliateLink>
      </div>
    </div>
  );
}
