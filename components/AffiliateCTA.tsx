"use client";

import { trackAffiliateCtaClick } from "../lib/analytics";
import {
  AFFILIATE_CTA_ANGI_URL,
  AFFILIATE_CTA_HOMEADVISOR_URL,
  AFFILIATE_CTA_THUMBTACK_URL,
} from "../lib/affiliates";

const btnClass =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:flex-none";

const affiliateLinks = [
  { href: AFFILIATE_CTA_ANGI_URL, label: "Get Quotes on Angi", affiliateName: "Angi" },
  { href: AFFILIATE_CTA_THUMBTACK_URL, label: "Find Pros on Thumbtack", affiliateName: "Thumbtack" },
  { href: AFFILIATE_CTA_HOMEADVISOR_URL, label: "Browse HomeAdvisor", affiliateName: "HomeAdvisor" },
] as const;

/**
 * Angi, Thumbtack, and HomeAdvisor outbound buttons for core service guides and related pages.
 */
export default function AffiliateCTA() {
  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
      aria-label="Compare free quotes from Georgetown contractors"
    >
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
        Compare Free Quotes from Georgetown Contractors
      </h2>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {affiliateLinks.map(({ href, label, affiliateName }) => (
          <a
            key={affiliateName}
            href={href}
            target="_blank"
            rel="nofollow sponsored"
            className={btnClass}
            onClick={() => trackAffiliateCtaClick(affiliateName)}
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-gray-600">
        These are affiliate links. We may earn a commission if you use them — it doesn&apos;t affect our rankings or
        editorial content.
      </p>
    </section>
  );
}
