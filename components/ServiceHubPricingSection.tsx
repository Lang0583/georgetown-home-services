import Link from "next/link";
import JsonLd from "./JsonLd";
import {
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  findCategory,
  formatPricingRange,
  serviceHubPricingItemListJsonLd,
  type PricingCategory,
} from "../lib/pricing-data";
import { absolutePageUrl } from "../lib/page-seo";

type HubCategoryKey = Extract<PricingCategory["key"], "plumbing" | "hvac" | "roofing">;

const HUB_PATH: Record<HubCategoryKey, string> = {
  plumbing: "/services/plumbing",
  hvac: "/services/hvac",
  roofing: "/services/roofing",
};

export default function ServiceHubPricingSection({ categoryKey }: { categoryKey: HubCategoryKey }) {
  const cat = findCategory(categoryKey);
  const links = PRICING_CATEGORY_RELATED_LINKS[categoryKey];
  const pathname = HUB_PATH[categoryKey];
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
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8"
        aria-labelledby="hub-pricing-heading"
      >
        <h2 id="hub-pricing-heading" className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {cat.title.replace(" in Georgetown TX", "")} — typical Georgetown ranges ({PRICING_YEAR})
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">{cat.localContext}</p>
        <p className="mt-2 text-xs text-gray-600">
          Ranges are planning estimates for the Georgetown / Williamson County market ({PRICING_LAST_REVIEWED_MONTH}
          ), not quotes. Hard water, attic access, equipment size, and storm vs cash-pay roofs all move the number—get
          written scopes before you decide.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-600">
                <th className="py-2 pr-4">{categoryKey === "hvac" ? "Service" : "Common job"}</th>
                <th className="py-2">{categoryKey === "hvac" ? "Typical Georgetown Range" : "Typical range"}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {cat.rows.map((row) => (
                <tr key={row.job} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 align-top font-medium">{row.job}</td>
                  <td className="py-3 align-top tabular-nums text-gray-900">{formatPricingRange(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categoryKey === "hvac" ? (
          <>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-700">
              Prices reflect Georgetown TX market conditions as of 2026. Get written quotes from at least two local
              companies before approving any repair over $300.
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">
              <Link href="/blog/ac-repair-cost-georgetown-tx" className="hover:underline">
                See our full AC repair cost breakdown →
              </Link>
            </p>
          </>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-primary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
          <Link href="/pricing" className="hover:underline">
            Full pricing hub &amp; calculator →
          </Link>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
            ·
          </span>
          <Link href={links.guideHref} className="hover:underline">
            {links.guideLabel} →
          </Link>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
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
