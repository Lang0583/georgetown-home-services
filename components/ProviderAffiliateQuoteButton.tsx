"use client";

import AffiliateLink from "./AffiliateLink";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { affiliateCategoryFromProviderCategory } from "@/lib/affiliate-category";
import type { ProviderCategory } from "@/data/providers";
import {
  AFFILIATE_PARTNER_CTA_LABEL,
  AFFILIATE_SPONSORED_DISCLOSURE,
} from "@/lib/affiliate-disclosure";

const primaryBtnClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] sm:w-auto";

/**
 * Partner-network CTA for use BELOW a provider list — never interleaved in cards.
 */
export default function ProviderAffiliateQuoteButton({
  category,
}: {
  category: ProviderCategory;
}) {
  const affiliateCategory = affiliateCategoryFromProviderCategory(category);
  const href = getAffiliateLink(affiliateCategory);

  return (
    <aside
      className="mt-6 rounded-xl border border-ink/10 bg-surface-alt p-5 md:p-6"
      aria-label="Partner network quotes"
    >
      <AffiliateLink href={href} category={affiliateCategory} className={primaryBtnClass}>
        {AFFILIATE_PARTNER_CTA_LABEL}
      </AffiliateLink>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
        {AFFILIATE_SPONSORED_DISCLOSURE}
      </p>
    </aside>
  );
}
