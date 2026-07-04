import Link from "next/link";
import JsonLd from "./JsonLd";
import ServicePricingCostTable from "./ServicePricingCostTable";
import {
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  findCategory,
  serviceHubPricingItemListJsonLd,
  type PricingCategory,
} from "../lib/pricing-data";
import { absolutePageUrl } from "../lib/page-seo";

type HubCategoryKey = PricingCategory["key"];

const HUB_PATH: Partial<Record<HubCategoryKey, string>> = {
  plumbing: "/services/plumbing",
  hvac: "/services/hvac",
  roofing: "/services/roofing",
  electrical: "/services/electrical",
  landscaping: "/services/landscaping",
  pest: "/services/pest-control",
  foundation: "/services/foundation",
  cleaning: "/services/house-cleaning",
};

export default function ServiceHubPricingSection({ categoryKey }: { categoryKey: HubCategoryKey }) {
  const cat = findCategory(categoryKey);
  const links = PRICING_CATEGORY_RELATED_LINKS[categoryKey];
  const pathname = HUB_PATH[categoryKey] ?? "/pricing";
  const pageUrl = absolutePageUrl(pathname);

  return (
    <>
      <JsonLd
        data={serviceHubPricingItemListJsonLd({
          category: cat,
          pageUrl,
        })}
      />
      <section
        className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-md md:p-8"
        aria-labelledby="hub-pricing-heading"
      >
        <h2 id="hub-pricing-heading" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {cat.title.replace(" Costs in Georgetown TX", "")} — typical Georgetown ranges ({PRICING_YEAR})
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{cat.servicePriceContext}</p>
        <p className="mt-2 text-xs text-muted">
          Ranges are planning estimates for the Georgetown / Williamson County market ({PRICING_LAST_REVIEWED_MONTH}
          ), not quotes. Hard water, attic access, equipment size, and storm vs cash-pay roofs all move the number—get
          written scopes before you decide.
        </p>

        <div className="mt-6">
          <ServicePricingCostTable rows={cat.rows} variant="bands" />
        </div>

        {categoryKey === "hvac" ? (
          <>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              Prices reflect Georgetown TX market conditions as of 2026. Get written quotes from at least two local
              companies before approving any repair over $300.
            </p>
            <p className="mt-3 text-sm font-semibold text-brand">
              <Link href="/blog/ac-repair-cost-georgetown-tx" className="hover:underline">
                See our full AC repair cost breakdown →
              </Link>
            </p>
          </>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-brand sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
          <Link href="/pricing" className="hover:underline">
            Full pricing hub &amp; calculator →
          </Link>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <Link href={links.guideHref} className="hover:underline">
            {links.guideLabel} →
          </Link>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <Link href={links.bestHref} className="hover:underline">
            {links.bestLabel} →
          </Link>
        </div>
      </section>
    </>
  );
}
