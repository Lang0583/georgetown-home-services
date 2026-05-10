"use client";

import { trackAffiliateCtaClick } from "../lib/analytics";

/** Featured listing / sponsored partner button — fires GA4 `affiliate_click` with `event_label` = affiliate name. */
export default function AffiliateOutboundCta({
  href,
  affiliateName,
  className,
  children,
}: {
  href: string;
  affiliateName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackAffiliateCtaClick(affiliateName)}
    >
      {children}
    </a>
  );
}
