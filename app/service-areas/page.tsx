import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { isRedirectedLocationSlug } from "../../lib/public-site-scope";
import { getLocations } from "../../lib/site-content";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Service Areas",
  description: "Neighborhood and service area pages for Georgetown, TX homeowners.",
  pathname: "/service-areas",
  ogType: "website",
});

export default function ServiceAreasPage() {
  const locations = getLocations().filter((l) => !isRedirectedLocationSlug(l.slug));
  const core = locations.find((l) => l.slug === "georgetown-tx") ?? null;
  const neighborhoods = locations.filter((l) => l.slug !== "georgetown-tx");

  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/service-areas",
            name: "Georgetown, TX Service Areas",
            description:
              "Neighborhood and service area pages for Georgetown, TX homeowners.",
          })}
        />
      }
      eyebrow="Service areas"
      title="Georgetown, TX Service Areas"
      description={
        <>
          These pages help you browse guides and provider comparisons by neighborhood. This site is a directory and homeowner resource—contact
          providers directly for availability and estimates.
        </>
      }
    >
      {core ? (
        <section className="rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
          <div className="text-sm font-semibold text-ink">Core area</div>
          <div className="mt-3">
            <Link href={`/locations/${core.slug}`} className="text-lg font-semibold text-brand hover:underline">
              {core.title}
            </Link>
            <p className="mt-2 text-sm text-muted">{core.description}</p>
          </div>
        </section>
      ) : null}

      {neighborhoods.length ? (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Neighborhood pages</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neighborhoods.map((n) => (
              <div key={n.slug} className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                <Link href={`/locations/${n.slug}`} className="font-semibold text-ink hover:text-brand hover:underline">
                  {n.title}
                </Link>
                <p className="mt-2 text-sm text-muted">{n.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </TrustPage>
  );
}

