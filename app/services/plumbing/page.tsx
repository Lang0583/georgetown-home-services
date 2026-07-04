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

const hubSeo = buildTradeHubSeo({ label: "Plumbing", pricingKey: "plumbing" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/plumbing",
  ogType: "website",
});

export default function PlumbingHubPage() {
  const lastUpdated = getStaticPageLastUpdated("/services/plumbing");
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
    <div className="bg-surface type-service-best">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/plumbing",
              name: "Plumbing in Georgetown, TX",
              description:
                "Practical plumbing guides for Georgetown homeowners: common issues, when to call a pro, cost drivers, and a directory of plumbers to compare.",
              lastUpdated,
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-muted">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">Plumbing in Georgetown, TX</h1>
              <LastUpdated lastUpdated={lastUpdated} />
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
                Use these pages to understand common Georgetown plumbing issues (clogs, leaks, water heaters), what affects cost, and what to ask
                before you hire. When you’re ready, compare companies in the directory and contact providers directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-plumbers-georgetown-tx" className="text-brand hover:underline">
                  Compare Georgetown Plumbers
                </Link>
                <span className="text-muted" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-muted hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <ServiceHubPricingSection categoryKey="plumbing" />

            <TradeHubSubServiceLinks parentHubPath="/services/plumbing" />

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Start here</h2>
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
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Supporting plumbing pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
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
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Cost and homeowner guides</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
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
    </div>
  );
}

