"use client";

import AffiliateOutboundCta from "./AffiliateOutboundCta";
import { angiGeorgetownListUrl } from "../lib/affiliates";

/**
 * Tracked Angi directory CTAs for neighborhood home-services hubs (plumbing, HVAC, roofing lists).
 */
export default function NeighborhoodHomeServicesAngiRow({ neighborhoodName }: { neighborhoodName: string }) {
  return (
    <div className="not-prose mt-6">
      <p className="mb-3 text-xs leading-relaxed text-gray-600">
        Partner links below may earn us a fee if you hire through Angi—it does not change what you pay.
      </p>
      <div
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        aria-label={`Angi directory links for ${neighborhoodName} homeowners`}
      >
      <AffiliateOutboundCta
        href={angiGeorgetownListUrl("plumbing")}
        affiliateName="Angi"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
      >
        Compare plumbers on Angi →
      </AffiliateOutboundCta>
      <AffiliateOutboundCta
        href={angiGeorgetownListUrl("hvac")}
        affiliateName="Angi"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
      >
        Compare HVAC on Angi →
      </AffiliateOutboundCta>
      <AffiliateOutboundCta
        href={angiGeorgetownListUrl("roofing")}
        affiliateName="Angi"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
      >
        Compare roofers on Angi →
      </AffiliateOutboundCta>
      </div>
    </div>
  );
}
