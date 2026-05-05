import Link from "next/link";
import type { Metadata } from "next";
import Container from "../../components/Container";
import LinkCard from "../../components/LinkCard";
import CTASection from "../../components/CTASection";
import JsonLd from "../../components/JsonLd";
import { pageSeoMetadata } from "../../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../lib/service-best-pages-meta";
import { CORE_SERVICE_SLUGS } from "../../lib/pageContentRegistry";
import {
  isExtendedServiceSlug,
  isNoindexSlug,
  isRedirectedLocationSlug,
  isRedirectedServiceSlug,
  showExtendedHomeServices,
} from "../../lib/public-site-scope";
import { NEIGHBORHOOD_BROWSE_ENTRIES } from "../../lib/neighborhood-browse";
import { getBlog, getLocations, getServices } from "../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Service Guides for Georgetown, TX Homeowners",
  description:
    "Browse Georgetown service guides for electrical, landscaping, pest control, foundation repair, house cleaning, plumbing, HVAC, and roofing—including common problems and neighborhood-specific pages.",
  pathname: "/services",
  ogType: "website",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this a service company?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "This site is a local research hub. Use the service pages and best-of guides to compare providers and decide who to contact. Always confirm licensing, pricing, and availability directly with any company before hiring.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if the problem is urgent?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "If there is active water damage, no cooling in extreme heat, or a roof leak during storms, start with the relevant problem-based service page and then contact a provider from the best-of guide.",
        },
      },
      {
        "@type": "Question",
        name: "Do you cover neighborhoods like Sun City or Wolf Ranch?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We publish neighborhood and location pages to help Georgetown homeowners find the right service category and next steps.",
        },
      },
    ],
  };
}

export default function ServicesIndexPage() {
  const allServices = getServices();
  // Hide service rows whose pages 308 to a hub or render with noindex — both
  // would funnel link equity into URLs that crawlers either redirect or skip.
  const services = allServices.filter(
    (s) => !isRedirectedServiceSlug(s.slug) && !isNoindexSlug(s.slug),
  );
  const locations = getLocations().filter((l) => !isRedirectedLocationSlug(l.slug));
  const blog = getBlog();

  const core = services.filter(
    (s) =>
      (CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug) &&
      (showExtendedHomeServices() || !isExtendedServiceSlug(s.slug)),
  );
  // Group transactional service pages by their best-of association (more stable than serviceType strings).
  const plumbing = services.filter(
    (s) => s.bestSlugs?.includes("best-plumbers-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const hvac = services.filter(
    (s) => s.bestSlugs?.includes("top-hvac-companies-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const roofing = services.filter(
    (s) => s.bestSlugs?.includes("best-roofers-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const electrician = services.filter(
    (s) => s.bestSlugs?.includes("best-electricians-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const landscaping = services.filter(
    (s) => s.bestSlugs?.includes("best-landscaping-companies-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const pest = services.filter(
    (s) => s.bestSlugs?.includes("best-pest-control-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const foundation = services.filter(
    (s) => s.bestSlugs?.includes("best-foundation-repair-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );
  const houseCleaning = services.filter(
    (s) => s.bestSlugs?.includes("best-house-cleaning-services-georgetown-tx") && !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );

  const problemBased = services.filter(
    (s) =>
      (s.slug.includes("ac-not-cooling") || s.slug.includes("clogged-drain") || s.slug.includes("roof-leak")) &&
      !(CORE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
  );

  // Ensure every service is linked somewhere, even if it doesn't match the heuristics above.
  const groupedSlugs = new Set<string>([
    ...core.map((s) => s.slug),
    ...plumbing.map((s) => s.slug),
    ...hvac.map((s) => s.slug),
    ...roofing.map((s) => s.slug),
    ...electrician.map((s) => s.slug),
    ...landscaping.map((s) => s.slug),
    ...pest.map((s) => s.slug),
    ...foundation.map((s) => s.slug),
    ...houseCleaning.map((s) => s.slug),
    ...problemBased.map((s) => s.slug),
  ]);
  const otherServices = services.filter(
    (s) =>
      !groupedSlugs.has(s.slug) && (showExtendedHomeServices() || !isExtendedServiceSlug(s.slug)),
  );

  const featuredGuides = blog.slice(0, Math.min(4, blog.length));

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services",
              name: "Home Services in Georgetown, TX",
              description:
                "Browse Georgetown service guides for electrical, landscaping, pest control, foundation repair, house cleaning, plumbing, HVAC, and roofing—including common problems and neighborhood-specific pages.",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Home Services in Georgetown, TX
              </h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Start with a core service category, then narrow down to problem-based pages (like “AC not cooling” or “roof leak repair”) or
                neighborhood-specific guides. Each page links to related comparisons and articles so you can go from research to a confident next step.
              </p>
            </div>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Core service categories</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                The best starting point if you’re not sure which specific page fits your situation.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {core.map((s) => (
                  <LinkCard
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    title={s.title}
                    description={s.description}
                    badge={s.serviceType}
                    categoryTopHover
                  />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <LinkCard
                  href="/services/plumbing"
                  title="Plumbing hub"
                  description="Plumbing guide + supporting pages + cost and checklist posts."
                  badge="Category hub"
                />
                <LinkCard
                  href="/services/hvac"
                  title="HVAC hub"
                  description="HVAC guide + supporting pages + costs, maintenance, and warning signs."
                  badge="Category hub"
                />
                <LinkCard
                  href="/services/roofing"
                  title="Roofing hub"
                  description="Roofing guide + supporting pages + after-storm steps and replacement planning."
                  badge="Category hub"
                />
                {showExtendedHomeServices() ? (
                  <>
                    <LinkCard
                      href="/services/electrical"
                      title="Electrical hub"
                      description="Electrician guide + Best Electricians directory + safety-focused hiring tips."
                      badge="Category hub"
                    />
                    <LinkCard
                      href="/services/landscaping"
                      title="Landscaping hub"
                      description="Lawn and landscape guide + irrigation and seasonal maintenance context."
                      badge="Category hub"
                    />
                    <LinkCard
                      href="/services/pest-control"
                      title="Pest control hub"
                      description="Pest guide + treatment plans, warranties, and local directory links."
                      badge="Category hub"
                    />
                    <LinkCard
                      href="/services/foundation"
                      title="Foundation hub"
                      description="Clay soil context + repair guide + foundation contractor directory."
                      badge="Category hub"
                    />
                    <LinkCard
                      href="/services/house-cleaning"
                      title="House cleaning hub"
                      description="Recurring and deep-clean guide + local cleaning service directory."
                      badge="Category hub"
                    />
                  </>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Browse by Georgetown Neighborhood</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                Each neighborhood has different home ages, soil types, and common service needs.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {NEIGHBORHOOD_BROWSE_ENTRIES.map((n) => (
                  <LinkCard
                    key={n.href}
                    href={n.href}
                    title={n.name}
                    description={n.description}
                    badge={n.badge}
                  />
                ))}
              </div>
            </section>

            {problemBased.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Problem-based pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  If you’re dealing with a specific symptom, start here for a clearer diagnosis path and what to ask when you call.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {problemBased.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {plumbing.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Plumbing</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {plumbing.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {hvac.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">HVAC</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {hvac.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {roofing.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Roofing</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {roofing.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {showExtendedHomeServices() && electrician.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Electrical</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {electrician.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {showExtendedHomeServices() && landscaping.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Landscaping &amp; lawn care</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {landscaping.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {showExtendedHomeServices() && pest.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Pest control</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {pest.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {showExtendedHomeServices() && foundation.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Foundation repair</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {foundation.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {showExtendedHomeServices() && houseCleaning.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">House cleaning</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {houseCleaning.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {otherServices.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">More service pages</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {otherServices.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {locations.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Neighborhood and location pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Browse service guides tailored to Georgetown neighborhoods and nearby areas.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {locations.map((l) => (
                    <LinkCard
                      key={l.slug}
                      href={`/locations/${l.slug}`}
                      title={l.title}
                      description={l.description}
                      badge="Location"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {featuredGuides.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Featured articles</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Research-first reads to set cost expectations and avoid common mistakes.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {featuredGuides.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="pt-4">
              <CTASection
                eyebrow="Compare providers"
                title="See top local companies"
                description="Open a best-of guide for ranked providers by category, or use the optional email signup on the homepage."
                primaryHref="/best"
                emailFormHref="/#email-capture"
                secondary={
                  <div className="text-sm text-gray-600">
                    Explore hubs:{" "}
                    <Link href="/best" className="font-semibold underline underline-offset-4">
                      Best Of
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

