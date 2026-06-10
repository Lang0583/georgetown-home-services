"use client";

import AffiliateOutboundCta from "./AffiliateOutboundCta";
import { angiGeorgetownListUrl, HOMEADVISOR_GEORGETOWN_URL, thumbtackGeorgetownUrl } from "../lib/affiliates";

const btnClass =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:flex-none";

type AffiliateCTAProps = {
  /** Angi list category slug (e.g. `plumbing`, `hvac`, `house-cleaning`). */
  angiCategorySlug: string;
  /** Thumbtack category path segment (e.g. `plumbers`, `hvac-contractors`). */
  thumbtackCategory: string;
  serviceLabel: string;
  /** Optional H2 override (default: "Get quotes from Georgetown-area …"). */
  heading?: string;
};

/**
 * Angi, Thumbtack, and HomeAdvisor outbound buttons for sub-service landing pages.
 */
export default function AffiliateCTA({
  angiCategorySlug,
  thumbtackCategory,
  serviceLabel,
  heading,
}: AffiliateCTAProps) {
  const title = heading ?? `Get quotes from Georgetown-area ${serviceLabel.toLowerCase()}`;
  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
      aria-label={`Compare ${serviceLabel} pros in Georgetown, TX`}
    >
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
        Compare licensed pros with public reviews before you book. We may earn a fee when you use these partner links—it
        does not change what you pay.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AffiliateOutboundCta href={angiGeorgetownListUrl(angiCategorySlug)} affiliateName="Angi" className={btnClass}>
          Compare on Angi →
        </AffiliateOutboundCta>
        <AffiliateOutboundCta
          href={thumbtackGeorgetownUrl(thumbtackCategory)}
          affiliateName="Thumbtack"
          className={btnClass}
        >
          Find pros on Thumbtack →
        </AffiliateOutboundCta>
        <AffiliateOutboundCta href={HOMEADVISOR_GEORGETOWN_URL} affiliateName="HomeAdvisor" className={btnClass}>
          Browse on HomeAdvisor →
        </AffiliateOutboundCta>
      </div>
    </section>
  );
}
