import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { NEIGHBORHOOD_HAIL_PAGES } from "@/data/neighborhood-hail-pages";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "@/data/neighborhood-home-services-hubs";
import { neighborhoodServicePages } from "@/data/neighborhoods";
import { pageSeoMetadata } from "../../lib/page-seo";
import { isRedirectedLocationSlug } from "../../lib/public-site-scope";
import { SEVERE_WEATHER_LINKS } from "@/lib/severe-weather-links";
import { getBlogBySlug, getLocations } from "../../lib/site-content";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

const linkClass =
  "font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline";

const DIRECTORY_BLOG_SLUGS = [
  "hail-damage-georgetown-williamson-may-2026",
  "after-hail-roof-checklist-georgetown-tx",
  "hail-damage-sun-city-georgetown-tx",
  "hail-damage-teravista-georgetown-tx",
  "hail-damage-wolf-ranch-georgetown-tx",
  "hail-damage-georgetown-village-tx",
  "cost-to-replace-hvac-georgetown",
  "hvac-making-noise-georgetown-tx",
] as const;

type DirectoryPost = {
  slug: (typeof DIRECTORY_BLOG_SLUGS)[number];
  title: string;
  href: string;
};

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Service Areas & Site Index",
  description:
    "Crawl-friendly map of Georgetown Home Services: city and neighborhood guides, Williamson hail resources, plumbing HVAC and roofing hubs, neighborhood-by-trade pages, pricing tool, and blog picks.",
  pathname: "/service-areas",
  ogType: "website",
});

export default function ServiceAreasPage() {
  const locations = getLocations().filter((l) => !isRedirectedLocationSlug(l.slug));
  const core = locations.find((l) => l.slug === "georgetown-tx") ?? null;
  const neighborhoods = locations.filter((l) => l.slug !== "georgetown-tx");

  const serviceByNeighborhood = neighborhoodServicePages.reduce<
    Record<string, typeof neighborhoodServicePages>
  >((acc, row) => {
    (acc[row.neighborhoodSlug] ??= []).push(row);
    return acc;
  }, {});
  for (const k of Object.keys(serviceByNeighborhood)) {
    serviceByNeighborhood[k]!.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
  }
  const neighborhoodKeys = Object.keys(serviceByNeighborhood).sort();

  const directoryPosts: DirectoryPost[] = DIRECTORY_BLOG_SLUGS.flatMap((slug) => {
    const post = getBlogBySlug(slug);
    return post ? [{ slug, title: post.title, href: `/blog/${slug}` }] : [];
  });

  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/service-areas",
            name: "Georgetown TX service areas and HTML index",
            description:
              "Links to location guides, storm posts, trade hubs, neighborhood landings, pricing tool, and curated blogs.",
          })}
        />
      }
      eyebrow="Service areas"
      title="Georgetown guides: full internal map"
      description={
        <>
          Use this page when you want <strong>every major URL cluster</strong> in one place—after storms when Search
          Console crawls lag or when you are comparing neighborhood context side by side. Providers are listed on their
          respective guides; this index is editorial navigation only.
        </>
      }
    >
      <section className="rounded-xl border border-blue-100 bg-blue-50/80 p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">Storm and hail resources</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Start with documentation-heavy posts then branch into neighborhood microsites. Nothing here promises
          insurance outcomes—it lines up independent reading before you sign scopes.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <Link href={SEVERE_WEATHER_LINKS.hailGuideBlog} className={linkClass}>
              Williamson hail playbook (pillar)
            </Link>
          </li>
          <li>
            <Link href={SEVERE_WEATHER_LINKS.roofingHub} className={linkClass}>
              Roofing service hub
            </Link>
          </li>
          <li>
            <Link href="/pricing/calculator" className={linkClass}>
              Interactive pricing tool
            </Link>
          </li>
        </ul>
      </section>

      {core ? (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Citywide guide</div>
          <div className="mt-3">
            <Link href={`/locations/${core.slug}`} className="text-lg font-semibold text-primary hover:underline">
              {core.title}
            </Link>
            <p className="mt-2 text-sm text-gray-700">{core.description}</p>
          </div>
        </section>
      ) : null}

      {neighborhoods.length ? (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Neighborhood location guides</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neighborhoods.map((n) => (
              <div key={n.slug} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <Link
                  href={`/locations/${n.slug}`}
                  className="font-semibold text-gray-900 hover:text-primary-hover hover:underline"
                >
                  {n.title}
                </Link>
                <p className="mt-2 text-sm text-gray-700">{n.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Trade hubs (Georgetown-wide)</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <li>
            <Link href="/services/plumber-georgetown-tx" className={linkClass}>
              Plumbing service guide
            </Link>
          </li>
          <li>
            <Link href="/services/hvac-georgetown-tx" className={linkClass}>
              HVAC service guide
            </Link>
          </li>
          <li>
            <Link href="/services/roofer-georgetown-tx" className={linkClass}>
              Roofing service guide
            </Link>
          </li>
          <li>
            <Link href="/services" className={linkClass}>
              All service guides
            </Link>
          </li>
          <li>
            <Link href="/best" className={linkClass}>
              Best-of directories
            </Link>
          </li>
          <li>
            <Link href="/pricing" className={linkClass}>
              Editorial pricing overview
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Neighborhood home-service hubs</h2>
        <p className="mt-2 text-sm text-gray-700">
          Tri-trade landing pages that bundle plumbing, HVAC, and roofing context per master plan.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {NEIGHBORHOOD_HOME_SERVICES_HUBS.map((h) => (
            <li key={h.neighborhoodSlug}>
              <Link href={`/neighborhoods/${h.neighborhoodSlug}/home-services`} className={linkClass}>
                {h.neighborhoodName} — plumber, HVAC, roofer hub
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Neighborhood hail microsites</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {NEIGHBORHOOD_HAIL_PAGES.map((p) => (
            <li key={p.neighborhoodSlug}>
              <Link href={`/neighborhoods/${p.neighborhoodSlug}/hail-damage`} className={linkClass}>
                {p.neighborhoodName} hail documentation hub
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Neighborhood × trade landings</h2>
        <p className="mt-2 text-sm text-gray-700">
          Editorial combinations per subdivision and trade. Each page links back to its Georgetown-wide hub for deeper
          pricing and hiring notes.
        </p>
        <div className="mt-6 space-y-8">
          {neighborhoodKeys.map((slug) => {
            const rows = serviceByNeighborhood[slug]!;
            const neighborhoodLabel = rows[0]!.neighborhoodName;
            return (
              <div key={slug}>
                <h3 className="text-lg font-semibold text-gray-900">{neighborhoodLabel}</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rows.map((p) => (
                    <li key={`${p.neighborhoodSlug}-${p.serviceSlug}`}>
                      <Link
                        href={`/neighborhoods/${p.neighborhoodSlug}/${p.serviceSlug}`}
                        className={`text-sm ${linkClass}`}
                      >
                        {p.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Curated blogs (storm + mechanical)</h2>
        <ul className="mt-4 space-y-2">
          {directoryPosts.map((post) => (
            <li key={post.slug}>
              <Link href={post.href} className={linkClass}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </TrustPage>
  );
}
