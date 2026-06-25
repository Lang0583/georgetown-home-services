import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import ServiceHubPricingSection from "../../../components/ServiceHubPricingSection";
import FAQSchema from "../../../components/FAQSchema";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import TradeServiceSchema from "../../../components/TradeServiceSchema";
import AffiliateTrackedAnchor from "../../../components/AffiliateTrackedAnchor";
import ServiceAffiliateEngagement from "../../../components/ServiceAffiliateEngagement";
import ServiceCompareQuotesThumbtack from "../../../components/ServiceCompareQuotesThumbtack";
import WhyHireServiceSection from "../../../components/WhyHireServiceSection";
import NeighborhoodHighlightLinks from "../../../components/NeighborhoodHighlightLinks";
import { AFFILIATE_ANGI_URL } from "../../../lib/affiliate-config";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import { PLUMBING_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { isNoindexSlug, isRedirectedServiceSlug } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Plumbing", pricingKey: "plumbing" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/plumbing",
  ogType: "website",
});
export default function PlumbingHubPage() {
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "plumber-georgetown-tx") ?? null;
  // Exclude redirected and noindex slugs so the hub doesn't link into 308s or
  // pages Google has been told not to index.
  const supporting = services.filter(
    (s) =>
      s.bestSlugs?.includes("best-plumbers-georgetown-tx") &&
      s.slug !== "plumber-georgetown-tx" &&
      !isRedirectedServiceSlug(s.slug) &&
      !isNoindexSlug(s.slug),
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-plumbers-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/plumbing")}
            name="Plumbing in Georgetown TX — FAQ"
            faqs={PLUMBING_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="plumbing" pageUrl={absolutePageUrl("/services/plumbing")} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/plumbing",
              name: "Plumbing in Georgetown, TX",
              description:
                "Practical plumbing guides for Georgetown homeowners: common issues, when to call a pro, cost drivers, and a directory of plumbers to compare.",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Plumbing in Georgetown, TX</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Use these pages to understand common Georgetown plumbing issues (clogs, leaks, water heaters), what affects cost, and what to ask
                before you hire. When you’re ready, compare companies in the directory and contact providers directly.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <AffiliateTrackedAnchor
                  href={AFFILIATE_ANGI_URL}
                  affiliate="angi"
                  placement="hub-plumbing-hero"
                  buttonVariant="primary"
                >
                  Get 3 Free Quotes
                </AffiliateTrackedAnchor>
                <span className="max-w-xl text-xs leading-relaxed text-gray-500">
                  Sponsored — compare local pros on Angi. We may earn a commission when you request quotes.
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-plumbers-georgetown-tx" className="text-primary hover:underline">
                  Compare Georgetown Plumbers
                </Link>
                <span className="text-[#6b7280]" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <WhyHireServiceSection categoryKey="plumbing" />

            <ServiceHubPricingSection categoryKey="plumbing" />

            <NeighborhoodHighlightLinks categoryKey="plumbing" serviceLabel="plumber" />

            <ServiceCompareQuotesThumbtack />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory—we do not book plumbers. The quick answers below mirror common
                Google “People also ask” topics for Georgetown / Williamson County; they support budgeting and interview
                questions, not on-site diagnosis.
              </p>
              <FAQList faqs={PLUMBING_TRADE_HUB_FAQS} title="Plumbing in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/best-plumbers-georgetown-tx"
                    title="Best Plumbers in Georgetown, TX"
                    description="Directory landing page with provider cards, red flags, and how to compare quotes."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting plumbing pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Symptom and scenario pages that help you narrow down likely causes and the right questions to ask.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {supporting.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {posts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Cost and homeowner guides</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Repeat-use content: cost drivers, checklists, and decision support. Each post links back to service guides and the provider directory.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {posts.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </Container>
      <ServiceAffiliateEngagement />
    </div>
  );
}

