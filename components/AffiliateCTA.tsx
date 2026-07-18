"use client";

import AffiliateLink from "./AffiliateLink";
import { affiliateCategoryFromAngiSlug } from "@/lib/affiliate-category";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { AFFILIATE_CTA_HOMEADVISOR_URL } from "../lib/affiliates";
import {
  AFFILIATE_PARTNER_CTA_LABEL,
  AFFILIATE_SPONSORED_DISCLOSURE,
} from "@/lib/affiliate-disclosure";

const btnClass =
  "btn-accent inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover sm:flex-none";

interface AffiliateCTAProps {
  angiCategorySlug?: string;
  affiliateCategory?: string;
  thumbtackCategory?: string;
  serviceLabel?: string;
  heading?: string;
}

export default function AffiliateCTA({
  angiCategorySlug,
  affiliateCategory,
  thumbtackCategory,
  serviceLabel,
  heading = "Compare Free Quotes from Georgetown Contractors",
}: AffiliateCTAProps = {}) {
  const angiCategory =
    affiliateCategory ?? (angiCategorySlug ? affiliateCategoryFromAngiSlug(angiCategorySlug) : "default");

  const partnerHref = getAffiliateLink(angiCategory);

  const secondaryLinks = [
    {
      href: thumbtackCategory
        ? `https://www.thumbtack.com/tx/georgetown/${thumbtackCategory}`
        : "https://www.thumbtack.com/tx/georgetown/",
      label: "Find Pros on Thumbtack",
      category: "thumbtack",
    },
    {
      href: AFFILIATE_CTA_HOMEADVISOR_URL,
      label: "Browse HomeAdvisor",
      category: "homeadvisor",
    },
  ] as const;

  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-ink/10 bg-surface-alt p-6 md:p-8"
      aria-label={
        serviceLabel
          ? `Partner network quotes for Georgetown ${serviceLabel}`
          : "Partner network quotes for Georgetown contractors"
      }
    >
      <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{heading}</h2>
      <div className="mt-5">
        <AffiliateLink href={partnerHref} category={angiCategory} className={btnClass}>
          {AFFILIATE_PARTNER_CTA_LABEL}
        </AffiliateLink>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          {AFFILIATE_SPONSORED_DISCLOSURE}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {secondaryLinks.map(({ href, label, category }) => (
          <AffiliateLink key={category} href={href} category={category} className={btnClass}>
            {label}
          </AffiliateLink>
        ))}
      </div>
    </section>
  );
}
