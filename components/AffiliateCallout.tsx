"use client";

import Link from "next/link";
import { trackAffiliateCtaClick } from "../lib/analytics";
import type { AffiliateOffer } from "../data/affiliates";

type AffiliateCalloutProps = {
  offer: AffiliateOffer;
  justification: string;
  className?: string;
};

export default function AffiliateCallout({ offer, justification, className }: AffiliateCalloutProps) {
  const linkLabel = offer.linkLabel ?? offer.productName;

  return (
    <aside
      className={[
        "not-prose rounded-xl border border-ink/10 bg-surface p-5 shadow-sm md:p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Recommended: ${offer.productName}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">Recommended</p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{offer.productName}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{justification}</p>
      <p className="mt-4">
        <a
          href={offer.href}
          target="_blank"
          rel="sponsored noopener"
          className="inline-flex min-h-11 items-center rounded-lg border border-ink/15 bg-surface-alt px-4 py-2.5 text-sm font-semibold text-ink shadow-sm hover:bg-surface"
          onClick={() => trackAffiliateCtaClick(offer.affiliateName)}
        >
          {linkLabel}
        </a>
      </p>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        We may earn a commission — see our{" "}
        <Link href="/editorial-policy" className="font-medium text-brand underline-offset-4 hover:underline">
          Editorial Policy
        </Link>
        .
      </p>
    </aside>
  );
}
