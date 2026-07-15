import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import ServiceHubPricingSection from "../../../components/ServiceHubPricingSection";
import FAQSchema from "../../../components/FAQSchema";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import TradeServiceSchema from "../../../components/TradeServiceSchema";
import WhyHireServiceSection from "../../../components/WhyHireServiceSection";
import NeighborhoodHighlightLinks from "../../../components/NeighborhoodHighlightLinks";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import { ELECTRICAL_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  breadcrumbListJsonLd,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { showExtendedHomeServices } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Electrical", pricingKey: "electrical" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/electrical",
  ogType: "website",
});

export default function ElectricalHubPage() {
  if (!showExtendedHomeServices()) redirect("/services");

  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "electrician-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-electricians-georgetown-tx") && s.slug !== "electrician-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-electricians-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/electrical")}
            name="Electrical in Georgetown TX — FAQ"
            faqs={ELECTRICAL_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="electrical" pageUrl={absolutePageUrl("/services/electrical")} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/electrical",
              name: "Electrical in Georgetown, TX",
              description:
                "Electrical safety and hiring guidance for Georgetown homeowners: panels, circuits, EV prep, and a directory of electricians to compare.",
            })}
          />
          <JsonLd
            data={breadcrumbListJsonLd({
              pathname: "/services/electrical",
              name: "Electrical in Georgetown, TX",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Electrical in Georgetown, TX</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Use these pages to understand when electrical work is safety-critical, what belongs in a written scope, and how to compare licensed
                electricians serving Georgetown. Older Sun City and Georgetown Village panels handle today&apos;s EV, induction, and solar loads very
                differently than newer Wolf Ranch and Teravista builds — knowing your starting point matters before you call.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-electricians-georgetown-tx" className="text-primary hover:underline">
                  Best Electricians in Georgetown, TX
                </Link>
                <span className="text-[#6b7280]" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <WhyHireServiceSection categoryKey="electrical" />

            <ServiceHubPricingSection categoryKey="electrical" />

            <NeighborhoodHighlightLinks categoryKey="electrical" serviceLabel="electrician" />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory — we do not dispatch electricians. The answers below mirror common
                Google &ldquo;People also ask&rdquo; topics for Georgetown / Williamson County and are intended to support
                budgeting, permit conversations, and interview questions before you hire a licensed TDLR contractor.
              </p>
              <FAQList faqs={ELECTRICAL_TRADE_HUB_FAQS} title="Electrical in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/best-electricians-georgetown-tx"
                    title="Best Electricians in Georgetown, TX"
                    description="Directory with provider cards, licensing questions, and how to compare written estimates."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting electrical pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Related guides that pair with the core electrician page.
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
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Homeowner guides</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Related blog posts that link back to service guides and the provider directory.
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
    </div>
  );
}
