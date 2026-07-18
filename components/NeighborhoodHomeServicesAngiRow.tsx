"use client";

import AffiliateLink from "./AffiliateLink";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import {
  AFFILIATE_PARTNER_CTA_LABEL,
  AFFILIATE_SPONSORED_DISCLOSURE,
} from "@/lib/affiliate-disclosure";

/**
 * Tracked Angi directory CTAs for neighborhood home-services hubs.
 * Separate bordered sponsored block — not interleaved with editorial provider lists.
 */
export default function NeighborhoodHomeServicesAngiRow({ neighborhoodName }: { neighborhoodName: string }) {
  const btnClass =
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover";

  const links = [
    { category: "plumbing", href: getAffiliateLink("plumbing"), trade: "plumbing" },
    { category: "hvac", href: getAffiliateLink("hvac"), trade: "HVAC" },
    { category: "roofing", href: getAffiliateLink("roofing"), trade: "roofing" },
  ] as const;

  return (
    <aside
      className="not-prose mt-6 rounded-xl border border-ink/10 bg-surface-alt p-5 md:p-6"
      aria-label={`Partner network quotes for ${neighborhoodName} homeowners`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {links.map(({ category, href, trade }) => (
          <AffiliateLink
            key={category}
            href={href}
            category={category}
            className={btnClass}
          >
            <span className="sr-only">{trade} — </span>
            {AFFILIATE_PARTNER_CTA_LABEL}
          </AffiliateLink>
        ))}
      </div>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
        {AFFILIATE_SPONSORED_DISCLOSURE}
      </p>
    </aside>
  );
}
