import Link from "next/link";
import JsonLd from "./JsonLd";
import ServicePricingCostTable from "./ServicePricingCostTable";
import {
  getCoreServiceEnrichment,
  neighborhoodLandingLinksForCoreService,
} from "../lib/core-service-enrichment";
import {
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  findCategory,
  getServicePagePricingRows,
  serviceHubPricingItemListJsonLd,
  servicePricingSectionTitle,
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
  const pricingRows = getServicePagePricingRows(cat);
  const links = PRICING_CATEGORY_RELATED_LINKS[config.pricingKey];
  const pathname = `/services/${serviceSlug}`;
  const pageUrl = absolutePageUrl(pathname);
  const neighborhoodLinks = neighborhoodLandingLinksForCoreService(serviceSlug);

  return (
    <div className="mt-10 space-y-10">
      <section aria-labelledby={`why-hire-${serviceSlug}`}>
        <h2 id={`why-hire-${serviceSlug}`} className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Why hire a {config.tradeNoun} in Georgetown TX
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          {config.whyHireParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <JsonLd data={serviceHubPricingItemListJsonLd({ category: cat, pageUrl })} />
      <section
        className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-md md:p-8"
        aria-labelledby={`service-pricing-${serviceSlug}`}
      >
        <h2 id={`service-pricing-${serviceSlug}`} className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {servicePricingSectionTitle(config.tradeLabel)} ({PRICING_YEAR})
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{cat.servicePriceContext}</p>
        <p className="mt-2 text-xs text-muted">
          Low, typical, and high columns are planning bands for the Georgetown / Williamson County market (
          {PRICING_LAST_REVIEWED_MONTH}), not quotes. Access, equipment size, storm vs cash-pay work, and hidden
          conditions all move the final number—request written scopes before you decide.
        </p>

        <div className="mt-6">
          <ServicePricingCostTable rows={pricingRows} variant="bands" />
        </div>

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

      {neighborhoodLinks.length >= 3 ? (
        <section aria-labelledby={`neighborhood-links-${serviceSlug}`}>
          <h2
            id={`neighborhood-links-${serviceSlug}`}
            className="text-2xl font-semibold tracking-tight text-ink md:text-3xl"
          >
            {config.tradeLabel} by Georgetown neighborhood
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Georgetown is not one housing stock—Sun City slab ranches, Wolf Ranch and Teravista master-planned builds,
            Berry Creek tree canopy, and downtown Georgetown Village homes each show different failure patterns. Start
            with the neighborhood landing that matches your area.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neighborhoodLinks.map((link) => (
              <li key={link.href} className="rounded-lg border border-ink/10 bg-surface p-4 shadow-sm">
                <Link
                  href={link.href}
                  className="font-semibold text-brand underline-offset-4 hover:text-brand hover:underline"
                >
                  {link.label} →
                </Link>
                {link.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{link.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
