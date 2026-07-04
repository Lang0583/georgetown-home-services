import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import TradeHubSubServiceLinks from "../../../components/TradeHubSubServiceLinks";
import ServiceHubPricingSection from "../../../components/ServiceHubPricingSection";
import JsonLd from "../../../components/JsonLd";
import { pageSeoMetadata } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import LastUpdated from "../../../components/LastUpdated";
import { webPageWithDateModifiedJsonLd } from "../../../lib/last-updated";
import { getStaticPageLastUpdated } from "../../../lib/static-pages-last-updated";
import { isNoindexSlug, isRedirectedServiceSlug } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "HVAC", pricingKey: "hvac" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/hvac",
  ogType: "website",
});

export default function HvacHubPage() {
  const lastUpdated = getStaticPageLastUpdated("/services/hvac");
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "hvac-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) =>
      s.bestSlugs?.includes("top-hvac-companies-georgetown-tx") &&
      s.slug !== "hvac-georgetown-tx" &&
      !isRedirectedServiceSlug(s.slug) &&
      !isNoindexSlug(s.slug),
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("top-hvac-companies-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/hvac",
              name: "HVAC in Georgetown, TX",
              description:
                "Practical HVAC guides for Georgetown homeowners: AC not cooling, repair vs replacement, cost drivers, and how to compare local HVAC companies.",
              lastUpdated,
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">HVAC in Georgetown, TX</h1>
              <LastUpdated lastUpdated={lastUpdated} />
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Use these pages to diagnose common HVAC problems (AC not cooling, uneven temperatures), understand cost drivers, and choose who to call.
                When you’re ready, compare local HVAC companies and contact providers directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/top-hvac-companies-georgetown-tx" className="text-primary hover:underline">
                  See Top HVAC Companies
                </Link>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <ServiceHubPricingSection categoryKey="hvac" />

            <TradeHubSubServiceLinks parentHubPath="/services/hvac" />

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/top-hvac-companies-georgetown-tx"
                    title="Top HVAC Companies in Georgetown, TX"
                    description="Directory landing page with provider cards, red flags, and how to compare quotes."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting HVAC pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Symptom and scenario pages that help you clarify the likely cause and what to ask when you call.
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
                  Repeat-use content: maintenance, costs, and warning signs. Each post links back to service guides and the provider directory.
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

