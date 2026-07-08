"use client";

import AffiliateLink from "./AffiliateLink";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { affiliateCategoryFromProviderCategory } from "@/lib/affiliate-category";
import type { Provider } from "@/data/providers";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]";

export default function ProviderAffiliateQuoteButton({ provider }: { provider: Provider }) {
  const category = affiliateCategoryFromProviderCategory(provider.category);
  const href = getAffiliateLink(category);

  return (
    <AffiliateLink href={href} category={category} className={primaryBtnClass}>
      Get a Quote
    </AffiliateLink>
  );
}
