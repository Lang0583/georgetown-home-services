import Link from "next/link";
import AuthorByline from "./AuthorByline";
import Breadcrumbs from "./Breadcrumbs";
import FAQList from "./FAQList";
import FAQSchema from "./FAQSchema";
import JsonLd from "./JsonLd";
import LastUpdated from "./LastUpdated";
import AffiliateCTA from "./AffiliateCTA";
import { affiliateCategoryFromServiceSlug } from "@/lib/affiliate-category";
import PageShell from "./templates/PageShell";
import type { SubServicePage } from "../data/sub-services";
import { absolutePageUrl } from "../lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "../lib/last-updated";
import { buildArticle } from "../lib/schema";
import type { Faq } from "../lib/site-content";
import { localDepthParagraphs } from "../lib/sub-service-local-depth";

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

type SubServicePageTemplateProps = {
  page: SubServicePage;
};

export default function SubServicePageTemplate({ page }: SubServicePageTemplateProps) {
  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const pathname = `/${page.serviceSlug}/${page.slug}`;
  const faqs: Faq[] = page.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const depth = localDepthParagraphs(page.serviceSlug, page.slug);

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
            url: absolutePageUrl(pathname),
            datePublished: page.lastUpdated,
            dateModified: page.lastUpdated,
          })}
        />
        <FAQSchema
          pageUrl={absolutePageUrl(pathname)}
          name={`${page.subServiceName} in Georgetown, TX — FAQ`}
          faqs={faqs}
        />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: page.parentHubPath, label: page.serviceLabel },
            { href: pathname, label: page.subServiceName },
          ]}
        />

        <p className="text-sm font-semibold uppercase tracking-wide text-muted">{page.serviceLabel} • Georgetown, TX</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{page.h1}</h1>
        <LastUpdated lastUpdated={page.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <div className="prose prose-gray mt-8 max-w-3xl prose-p:leading-relaxed prose-p:text-muted">
          {page.bodyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {depth.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-surface p-6 shadow-md md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {page.subServiceName} cost in Georgetown, TX ({page.pricing.year})
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{page.pricing.notes}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">Price tier</th>
                  <th className="py-2">Typical range</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                <tr className="border-b border-ink/10">
                  <td className="py-3 pr-4 font-medium">Lower end</td>
                  <td className="py-3 tabular-nums">
                    {formatUsd(page.pricing.low)}
                    {page.pricing.unit ? ` ${page.pricing.unit}` : ""}
                  </td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-3 pr-4 font-medium">Average</td>
                  <td className="py-3 tabular-nums">
                    {formatUsd(page.pricing.average)}
                    {page.pricing.unit ? ` ${page.pricing.unit}` : ""}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Higher end</td>
                  <td className="py-3 tabular-nums">
                    {formatUsd(page.pricing.high)}
                    {page.pricing.unit ? ` ${page.pricing.unit}` : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">
            Ranges reflect Williamson County labor and material costs—not a quote. Get written scopes before you commit.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <FAQList faqs={faqs} variant="bordered" title={`FAQ: ${page.subServiceName} in Georgetown`} className="!mt-0" />
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Related Georgetown pages</h2>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <Link
                href={page.parentHubPath}
                className="font-medium text-brand underline-offset-4 hover:text-brand hover:underline"
              >
                {page.serviceLabel} services hub (Georgetown, TX)
              </Link>
            </li>
            {page.neighborhoodLinks.map((link) => (
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

        <AffiliateCTA
          affiliateCategory={affiliateCategoryFromServiceSlug(page.serviceSlug, page.slug)}
        />
      </article>
    </PageShell>
  );
}
