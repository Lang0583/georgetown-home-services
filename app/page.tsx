import { BusinessListingDescription } from "../components/BusinessListingDescription";
import CTASection, { SiteCTAButtons } from "../components/CTASection";
import Container from "../components/Container";
import LeadForm from "../components/LeadForm";
import LinkCard from "../components/LinkCard";
import { ButtonLink } from "../components/Button";
import Link from "next/link";
import { getBlog, getBest, getLocations, getServices } from "../lib/site-content";
import businesses from "@/lib/businesses.json";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  normalizeBusinessGroup,
  type Business,
  type ProviderGroup,
} from "@/lib/businesses";

function topProvidersForGroup(list: Business[], group: ProviderGroup, limit: number) {
  return list
    .filter((b) => normalizeBusinessGroup(b) === group)
    .sort((a, b) => (b.rating !== a.rating ? b.rating - a.rating : b.reviews - a.reviews))
    .slice(0, limit);
}

export default function Home() {
  const services = getServices();
  const locations = getLocations();
  const best = getBest();
  const blog = getBlog();
  const allBusinesses = businesses as Business[];
  const topLocalGroups: { title: string; key: ProviderGroup }[] = [
    { title: "Plumbers", key: "plumber" },
    { title: "HVAC", key: "hvac" },
    { title: "Roofers", key: "roofer" },
  ];

  const bestHrefByGroup: Record<ProviderGroup, string> = {
    plumber: "/best/best-plumbers-georgetown-tx",
    hvac: "/best/top-hvac-companies-georgetown-tx",
    roofer: "/best/best-roofers-georgetown-tx",
  };

  const serviceHrefByGroup: Record<ProviderGroup, string> = {
    plumber: "/services/plumber-georgetown-tx",
    hvac: "/services/hvac-georgetown-tx",
    roofer: "/services/roofer-georgetown-tx",
  };

  const defaultPlumbing = services.find((s) => s.slug === "plumber-georgetown-tx")?.title ?? "Plumbing";

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-10 md:gap-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Local plumbing, HVAC, and roofing
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Find Trusted Home Services in Georgetown, TX
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-700">
                Compare top-rated plumbers, HVAC companies, and roofers based on real data and local performance.
              </p>

              <ul className="mt-5 max-w-xl space-y-2 text-sm leading-relaxed text-gray-700">
                <li>
                  <span className="font-semibold text-gray-900">Verified local businesses</span>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Ratings and reviews</span>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Fast service options</span>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Direct links to local businesses</span>
                </li>
              </ul>

              <div className="mt-6">
                <SiteCTAButtons primaryHref="#providers" emailFormHref="#email-capture" />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">Compare listings</div>
                  <div className="mt-1 text-sm text-gray-700">Open provider pages and contact companies yourself.</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">Clear estimates</div>
                  <div className="mt-1 text-sm text-gray-700">Upfront pricing before work begins.</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">Quality repairs</div>
                  <div className="mt-1 text-sm text-gray-700">Fix the root cause, not just symptoms.</div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Quick links</div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ButtonLink href="/services/ac-not-cooling-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    AC not cooling
                  </ButtonLink>
                  <ButtonLink href="/services/clogged-drain-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    Clogged drain
                  </ButtonLink>
                  <ButtonLink href="/services/roof-leak-repair-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    Roof leak repair
                  </ButtonLink>
                  <ButtonLink href="/blog/how-to-find-a-good-plumber-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    How to find a good plumber
                  </ButtonLink>
                </div>
              </div>
            </div>

            <LeadForm defaultService={defaultPlumbing} />

            <div id="providers" className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Top Local Providers</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {topLocalGroups.map(({ title, key }) => (
                  <div key={key} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">{title}</h3>
                      <Link href={bestHrefByGroup[key]} className="text-xs font-semibold text-blue-700 hover:underline">
                        Top Providers
                      </Link>
                    </div>
                    <ul className="mt-3 space-y-3">
                      {topProvidersForGroup(allBusinesses, key, 3).map((business) => {
                        const outbound = getBusinessOutboundUrl(business);
                        const website = getBusinessWebsiteUrl(business);
                        const maps = getBusinessMapsUrl(business);
                        return (
                          <li key={`${key}-${business.name}`} className="text-sm text-gray-700">
                            <div className="font-medium text-gray-900">
                              {outbound ? (
                                <a
                                  href={outbound}
                                  {...externalBusinessLinkProps}
                                  className="text-gray-900 hover:text-blue-700 hover:underline"
                                >
                                  {business.name}
                                </a>
                              ) : (
                                business.name
                              )}
                            </div>
                            <BusinessListingDescription text={business.description} className="mt-1" />
                            <div className="mt-1">
                              {business.rating.toFixed(1)} stars • {business.reviews.toLocaleString()} reviews
                            </div>
                            {website || maps ? (
                              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                                {website ? (
                                  <a
                                    href={website}
                                    {...externalBusinessLinkProps}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {BUSINESS_LINK_VISIT_WEBSITE}
                                  </a>
                                ) : null}
                                {maps ? (
                                  <a
                                    href={maps}
                                    {...externalBusinessLinkProps}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <Link href={serviceHrefByGroup[key]} className="font-semibold text-gray-900 hover:underline">
                        View service page
                      </Link>
                      <span className="text-gray-400">·</span>
                      <Link href={bestHrefByGroup[key]} className="font-semibold text-gray-900 hover:underline">
                        Compare top providers
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Popular Services</h2>
            <ButtonLink href="/services" variant="secondary" className="shrink-0 px-4 py-2 text-sm">
              View all services
            </ButtonLink>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <LinkCard
              href="/services/plumber-georgetown-tx"
              title="Plumber in Georgetown, TX"
              description="Repairs for leaks, clogs, fixtures, and replacements across Georgetown."
              badge="Plumbing"
            />
            <LinkCard
              href="/services/hvac-georgetown-tx"
              title="HVAC in Georgetown, TX"
              description="AC and heating diagnostics, repairs, and maintenance for consistent comfort."
              badge="HVAC"
            />
            <LinkCard
              href="/services/roofer-georgetown-tx"
              title="Roofer in Georgetown, TX"
              description="Roof repairs, leak identification, and replacement planning."
              badge="Roofing"
            />
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Top Rated Services</h2>
            <ButtonLink href="/best" variant="secondary" className="shrink-0 px-4 py-2 text-sm">
              See best-of guides
            </ButtonLink>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <LinkCard
              href="/best/best-plumbers-georgetown-tx"
              title="Best Plumbers in Georgetown, TX"
              description="A practical guide to choosing a plumber, with service comparisons and what to ask."
              badge="Best Of"
            />
            <LinkCard
              href="/best/top-hvac-companies-georgetown-tx"
              title="Top HVAC Companies in Georgetown, TX"
              description="How to evaluate HVAC companies, plus a comparison table and pricing guidance."
              badge="Best Of"
            />
          </div>
        </section>

        <section className="py-10 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Best Of</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {best.map((b) => (
              <LinkCard
                key={b.slug}
                href={`/best/${b.slug}`}
                title={b.title}
                description={b.description}
                badge={l10nLocation(b.locationSlug, locations)}
              />
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">From the Blog</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {blog.map((p) => (
              <LinkCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                badge={p.readTime}
              />
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <CTASection
            eyebrow="Find providers"
            title="Browse rankings or get ideas by email"
            description="Jump to the listings on this page, or use the email form above for optional provider ideas."
            primaryHref="#providers"
            emailFormHref="#email-capture"
            showDisclaimer
          />
        </section>
      </Container>
    </div>
  );
}

function l10nLocation(locationSlug: string, locations: ReturnType<typeof getLocations>) {
  return locations.find((l) => l.slug === locationSlug)?.title ?? locationSlug;
}
