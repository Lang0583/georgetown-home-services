"use client";

import { AFFILIATE_THUMBTACK_URL } from "../lib/affiliate-config";
import AffiliateTrackedAnchor from "./AffiliateTrackedAnchor";

export default function BlogThumbtackInlineCta({
  serviceLabel,
}: {
  /** e.g. "plumbing", "HVAC", "roofing" */
  serviceLabel: string;
}) {
  return (
    <p className="my-6 border-l-4 border-primary bg-gray-50 py-3 pl-4 pr-3 text-sm leading-relaxed text-gray-800">
      Looking for a Georgetown TX {serviceLabel} pro?{" "}
      <AffiliateTrackedAnchor
        href={AFFILIATE_THUMBTACK_URL}
        affiliate="thumbtack"
        placement="blog-inline-every-3"
        className="inline font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
      >
        Get free quotes on Thumbtack →
      </AffiliateTrackedAnchor>
    </p>
  );
}
