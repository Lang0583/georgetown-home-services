import Link from "next/link";
import AuthorByline from "./AuthorByline";
import Breadcrumbs from "./Breadcrumbs";
import FAQList from "./FAQList";
import FAQSchema from "./FAQSchema";
import JsonLd from "./JsonLd";
import LastUpdated from "./LastUpdated";
import AffiliateCTA from "./AffiliateCTA";
import AffiliateDisclosure from "./AffiliateDisclosure";
import CostGuideAffiliateCallouts from "./CostGuideAffiliateCallouts";
import AdUnit from "./AdUnit";
import { affiliateCategoryFromServiceSlug } from "@/lib/affiliate-category";
import CostGuidePriceTable from "./CostGuidePriceTable";
import PageShell from "./templates/PageShell";
import type { CostGuidePage } from "../data/cost-guides";
import { absolutePageUrl } from "../lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "../lib/last-updated";
import { linksForCostGuide, routeExists } from "../lib/internalLinks";
import type { Faq } from "../lib/site-content";
import { buildArticle } from "../lib/schema";
import { costGuideAdSlot } from "../lib/adConfig";

type CostGuideTemplateProps = {
  page: CostGuidePage;
};

export default function CostGuideTemplate({ page }: CostGuideTemplateProps) {
  const pathname = `/costs/${page.slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const faqs: Faq[] = page.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const clusterLinks = linksForCostGuide(page.slug);
  const relatedLinks = (() => {
    const seen = new Set(clusterLinks.map((l) => l.href));
    const extras = page.internalLinks.filter((l) => routeExists(l.href) && !seen.has(l.href));
    return [
      ...clusterLinks.map((l) => ({ href: l.href, label: l.label })),
      ...extras,
    ];
  })();

  return (
    <PageShell>
      <article className="py-8 md:py-12">
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: page.h1,
            description: page.metaDescription,
            lastUpdated: page.lastUpdated,
          })}
        />
        <JsonLd
          data={buildArticle({
            headline: page.h1,
            description: page.metaDescription,
            url: pageUrl,
            datePublished: page.lastUpdated,
            dateModified: page.lastUpdated,
          })}
        />
        <FAQSchema pageUrl={pageUrl} name={`${page.serviceName} cost in Georgetown, TX — FAQ`} faqs={faqs} />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/costs", label: "Cost Guides" },
            { href: pathname, label: page.serviceName },
          ]}
        />

        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Cost guide • Georgetown, TX</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{page.h1}</h1>
        <LastUpdated lastUpdated={page.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <div className="prose prose-gray mt-8 max-w-3xl prose-p:leading-relaxed prose-p:text-muted">
          {page.bodyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <AffiliateDisclosure className="mt-8 max-w-3xl" />
        <CostGuideAffiliateCallouts slug={page.slug} />

        {costGuideAdSlot ? (
          <div className="mx-auto mt-10 max-w-3xl">
            <AdUnit slotId={costGuideAdSlot} className="mx-auto" />
          </div>
        ) : null}

        <section className="mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-surface p-6 shadow-md md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Georgetown, TX {page.serviceName.toLowerCase()} price ranges ({page.year})
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{page.pricingIntro}</p>
          <CostGuidePriceTable
            rows={page.priceRows}
            year={page.year}
            caption={`${page.serviceName} cost ranges in Georgetown TX`}
          />
          <p className="mt-4 text-xs text-muted">
            Planning estimates for Williamson County—not quotes. Storm work, after-hours calls, and access issues can move
            any line item above these bands.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <FAQList faqs={faqs} variant="bordered" title={`Common questions: ${page.serviceName} costs`} className="!mt-0" />
        </section>

        {relatedLinks.length ? (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Related Georgetown resources</h2>
            <ul className="mt-4 space-y-2 text-base">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-brand underline-offset-4 hover:text-brand hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <AffiliateCTA affiliateCategory={affiliateCategoryFromServiceSlug(page.slug)} />
      </article>
    </PageShell>
  );
}
