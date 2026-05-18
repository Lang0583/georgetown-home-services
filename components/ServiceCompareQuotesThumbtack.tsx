import { AFFILIATE_THUMBTACK_URL } from "../lib/affiliate-config";
import AffiliateTrackedAnchor from "./AffiliateTrackedAnchor";

/** Shown after pricing-oriented sections on service guides. */
export default function ServiceCompareQuotesThumbtack() {
  return (
    <div className="mt-10 rounded-xl border border-primary/25 bg-primary/5 px-6 py-5 md:px-8">
      <AffiliateTrackedAnchor
        href={AFFILIATE_THUMBTACK_URL}
        affiliate="thumbtack"
        placement="service-after-pricing"
        buttonVariant="secondary"
        className="w-full sm:w-auto"
      >
        Compare Quotes from Georgetown TX Pros
      </AffiliateTrackedAnchor>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">
        Sponsored: request estimates from local pros. We may earn a commission from Thumbtack when you use this link.
      </p>
    </div>
  );
}
