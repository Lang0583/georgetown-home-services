import type { Metadata } from "next";
import Link from "next/link";
import BestProvidersMethodologyCallout from "../../components/BestProvidersMethodologyCallout";
import Container from "../../components/Container";
import LinkCard from "../../components/LinkCard";
import CTASection from "../../components/CTASection";
import JsonLd from "../../components/JsonLd";
import LastUpdated from "../../components/LastUpdated";
import { pageSeoMetadata } from "../../lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "../../lib/last-updated";
import { getStaticPageLastUpdated } from "../../lib/static-pages-last-updated";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "../../lib/pageContentRegistry";
import { isExtendedBestSlug, isExtendedServiceSlug, showExtendedHomeServices } from "../../lib/public-site-scope";
import { getBest, getBlog, getServices } from "../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Provider Directory: Top Home Service Companies in Georgetown, TX",
  description:
    "Browse provider directory and comparison pages for electricians, landscapers, pest control, foundation repair, house cleaners, plumbers, HVAC companies, and roofers serving Georgetown, Texas.",
  pathname: "/best",
  ogType: "website",
});

export default function BestIndexPage() {
  const lastUpdated = getStaticPageLastUpdated("/best");
  const bestPages = getBest();
  const services = getServices();
  const blog = getBlog();

  const core = bestPages.filter(
    (b) =>
      (CORE_BEST_SLUGS as readonly string[]).includes(b.slug) &&
      (showExtendedHomeServices() || !isExtendedBestSlug(b.slug)),
  );
  const other = bestPages.filter((b) => !(CORE_BEST_SLUGS as readonly string[]).includes(b.slug));

  const featuredServices = services.filter(
    (s) =>
      (CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug) &&
      (showExtendedHomeServices() || !isExtendedServiceSlug(s.slug)),
  );
  const featuredPosts = blog.slice(0, Math.min(4, blog.length));

  return (
    <div className="bg-surface type-service-best">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/best",
              name: "Best Home Service Providers in Georgetown, TX",
              description:
                "Browse provider directory and comparison pages for electricians, landscapers, pest control, foundation repair, house cleaners, plumbers, HVAC companies, and roofers serving Georgetown, Texas.",
              lastUpdated,
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-muted">Top Providers</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
                Best Home Service Providers in Georgetown, TX
              </h1>
              <LastUpdated lastUpdated={lastUpdated} />
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                Use these comparison guides to shortlist providers you can contact directly. Inclusion criteria and data
                sources are on our{" "}
                <Link href="/methodology" className="font-semibold text-brand hover:underline">
                  listing methodology
                </Link>{" "}
                page—the same five rules shown on every directory below. For the latest computed license counts, read the{" "}
                <Link
                  href="/reports/williamson-county-license-check"
                  className="font-semibold text-brand hover:underline"
                >
                  Williamson County license check report
                </Link>
                .
              </p>
            </div>

            <section id="top-providers" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Compare by category</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Pick the trade you need, then open the guide to compare real local companies.
              </p>
              <div className="mt-4 max-w-2xl">
                <BestProvidersMethodologyCallout />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {core.map((b) => (
                  <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} badge="Best Of" />
                ))}
              </div>
              <p className="mt-5 text-sm text-muted">
                <Link href="/compare" className="font-semibold text-brand hover:underline">
                  See head-to-head comparisons →
                </Link>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Compare by intent</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                Different projects need different evaluation criteria. Use the category guide, then jump to a service or
                article that matches what’s happening in your home.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
                  <div className="text-sm font-semibold text-ink">Urgent problems</div>
                  <p className="mt-2 text-sm text-muted">
                    Start with symptom pages, then return here to compare providers for the right trade.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-brand">
                    <Link href="/services/hvac-georgetown-tx" className="hover:underline">
                      AC &amp; HVAC issues
                    </Link>
                    <span className="text-muted" aria-hidden>
                      ·
                    </span>
                    <Link href="/services/plumber-georgetown-tx" className="hover:underline">
                      Plumbing issues
                    </Link>
                    <span className="text-muted" aria-hidden>
                      ·
                    </span>
                    <Link href="/services/roofer-georgetown-tx" className="hover:underline">
                      Roof leaks &amp; storm damage
                    </Link>
                  </div>
                </div>
                <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
                  <div className="text-sm font-semibold text-ink">Planning & budgeting</div>
                  <p className="mt-2 text-sm text-muted">
                    Use cost and replacement guides to set expectations before collecting estimates.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-brand">
                    <Link href="/blog/cost-to-replace-hvac-georgetown" className="hover:underline">
                      HVAC replacement cost
                    </Link>
                    <span className="text-muted" aria-hidden>
                      ·
                    </span>
                    <Link href="/blog/how-to-choose-a-reliable-plumber-georgetown-tx" className="hover:underline">
                      Hiring checklist (plumber)
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Featured service pages</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Service guides explain what’s typical, what’s urgent, and what to ask before you hire.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredServices.map((s) => (
                  <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                ))}
              </div>
            </section>

            {featuredPosts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Featured articles</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  Use these to compare quotes more effectively and avoid common traps.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {featuredPosts.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null
            }

            {other.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-ink">More comparison guides</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {other.map((b) => (
                    <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} badge="Best Of" />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
              <h2 className="text-xl font-semibold text-ink">FAQ</h2>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
                <div>
                  <div className="font-semibold text-ink">How should I use these guides?</div>
                  <p>
                    Start with the category you need, shortlist providers, then request written scopes you can compare line-by-line.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-ink">Do you include every company?</div>
                  <p>
                    No. The goal is a practical shortlist based on publicly available business information. Confirm licensing, insurance, and availability.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-ink">What if I’m not sure what I need?</div>
                  <p>
                    Start on the Services hub for symptom-based pages, then return here to compare providers for that category.
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <CTASection
                eyebrow="More ways to browse"
                title="Service guides and email signup"
                description="Read category guides on the services hub, or browse articles by topic on the blog."
                primaryHref="/services"
                emailFormHref="/#email-capture"
                secondary={
                  <div className="text-sm text-muted">
                    Explore hubs:{" "}
                    <Link href="/services" className="font-semibold underline underline-offset-4">
                      Services
                    </Link>
                    ,{" "}
                    <Link href="/blog" className="font-semibold underline underline-offset-4">
                      Blog
                    </Link>
                    . Or go back to{" "}
                    <Link href="/" className="font-semibold underline underline-offset-4">
                      the homepage
                    </Link>
                    .
                  </div>
                }
                showDisclaimer
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

