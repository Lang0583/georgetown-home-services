import Link from "next/link";
import JsonLd from "./JsonLd";
import {
  getCoreServiceEnrichment,
  neighborhoodLandingLinksForCoreService,
} from "../lib/core-service-enrichment";
import {
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  findCategory,
  formatPricingRange,
  serviceHubPricingItemListJsonLd,
} from "../lib/pricing-data";
import { absolutePageUrl } from "../lib/page-seo";

type Props = {
  serviceSlug: string;
};

/**
 * Shared editorial blocks for the eight core `/services/[slug]` guides:
 * "Why hire…", Georgetown pricing ranges, and neighborhood landing links.
 */
export default function CoreServiceGuideEnrichment({ serviceSlug }: Props) {
  const config = getCoreServiceEnrichment(serviceSlug);
  if (!config) return null;

  const cat = findCategory(config.pricingKey);
  const links = PRICING_CATEGORY_RELATED_LINKS[config.pricingKey];
  const pathname = `/services/${serviceSlug}`;
  const pageUrl = absolutePageUrl(pathname);
  const neighborhoodLinks = neighborhoodLandingLinksForCoreService(serviceSlug);

  return (
    <div className="mt-10 space-y-10">
      <section aria-labelledby={`why-hire-${serviceSlug}`}>
        <h2 id={`why-hire-${serviceSlug}`} className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          Why hire a {config.tradeNoun} in Georgetown TX
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
          {config.whyHireParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <JsonLd data={serviceHubPricingItemListJsonLd({ category: cat, pageUrl })} />
      <section
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8"
        aria-labelledby={`service-pricing-${serviceSlug}`}
      >
        <h2 id={`service-pricing-${serviceSlug}`} className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {cat.title} ({PRICING_YEAR})
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">{cat.localContext}</p>
        <p className="mt-2 text-xs text-gray-600">
          Ranges are planning estimates for the Georgetown / Williamson County market ({PRICING_LAST_REVIEWED_MONTH}
          ), not quotes. Access, equipment size, storm vs cash-pay work, and hidden conditions all move the final
          number—request written scopes before you decide.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-600">
                <th className="py-2 pr-4">Common job</th>
                <th className="py-2">Typical Georgetown range</th>
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

      {neighborhoodLinks.length >= 3 ? (
        <section aria-labelledby={`neighborhood-links-${serviceSlug}`}>
          <h2
            id={`neighborhood-links-${serviceSlug}`}
            className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
          >
            {config.tradeLabel} by Georgetown neighborhood
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
            Georgetown is not one housing stock—Sun City slab ranches, Wolf Ranch and Teravista master-planned builds,
            Berry Creek tree canopy, and downtown Georgetown Village homes each show different failure patterns. Start
            with the neighborhood landing that matches your area.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neighborhoodLinks.map((link) => (
              <li key={link.href} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <Link
                  href={link.href}
                  className="font-semibold text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  {link.label} →
                </Link>
                {link.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{link.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
