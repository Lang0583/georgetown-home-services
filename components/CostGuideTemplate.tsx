import Link from "next/link";
import AuthorByline from "./AuthorByline";
import Breadcrumbs from "./Breadcrumbs";
import FAQList from "./FAQList";
import FAQSchema from "./FAQSchema";
import JsonLd from "./JsonLd";
import AffiliateCTA from "./AffiliateCTA";
import CostGuidePriceTable from "./CostGuidePriceTable";
import PageShell from "./templates/PageShell";
import type { CostGuidePage } from "../data/cost-guides";
import { absolutePageUrl } from "../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_ISO,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../lib/service-best-pages-meta";
import { hubArticleJsonLd } from "../lib/site-author";
import type { Faq } from "../lib/site-content";
import { breadcrumbSchemaForCostGuide } from "../lib/schema";

type CostGuideTemplateProps = {
  page: CostGuidePage;
};

export default function CostGuideTemplate({ page }: CostGuideTemplateProps) {
  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const pathname = `/costs/${page.slug}`;
  const faqs: Faq[] = page.faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <PageShell>
      <article className="py-8 md:py-12">
        <JsonLd data={breadcrumbSchemaForCostGuide(page.serviceName, pathname)} />
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: page.h1,
            description: page.metaDescription,
          })}
        />
        <JsonLd
          data={hubArticleJsonLd({
            pathname,
            headline: page.h1,
            description: page.metaDescription,
            datePublished: SERVICE_BEST_LAST_UPDATED_ISO,
            dateModified: SERVICE_BEST_LAST_UPDATED_ISO,
          })}
        />
        <FAQSchema pageUrl={absolutePageUrl(pathname)} name={`${page.serviceName} cost in Georgetown, TX — FAQ`} faqs={faqs} />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/costs", label: "Cost Guides" },
            { href: pathname, label: page.serviceName },
          ]}
        />

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">Cost guide • Georgetown, TX</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{page.h1}</h1>
        <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
        <AuthorByline className="mt-3" compact />

        <div className="prose prose-gray mt-8 max-w-3xl prose-p:leading-relaxed prose-p:text-gray-700">
          {page.bodyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Georgetown, TX {page.serviceName.toLowerCase()} price ranges ({page.year})
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{page.pricingIntro}</p>
          <CostGuidePriceTable
            rows={page.priceRows}
            year={page.year}
            caption={`${page.serviceName} cost ranges in Georgetown TX`}
          />
          <p className="mt-4 text-xs text-gray-600">
            Planning estimates for Williamson County—not quotes. Storm work, after-hours calls, and access issues can move
            any line item above these bands.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <FAQList faqs={faqs} variant="bordered" title={`Common questions: ${page.serviceName} costs`} className="!mt-0" />
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Related Georgetown resources</h2>
          <ul className="mt-4 space-y-2 text-base">
            {page.internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <AffiliateCTA />
      </article>
    </PageShell>
  );
}
