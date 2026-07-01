import type { Metadata } from "next";
import Link from "next/link";
import AuthorByline from "@/components/AuthorByline";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import PageShell from "@/components/templates/PageShell";
import { costGuidePages } from "@/data/cost-guides";
import { pageSeoMetadata } from "@/lib/page-seo";
import { showExtendedHomeServices } from "@/lib/public-site-scope";
import { getStaticPageLastUpdated } from "@/lib/static-pages-last-updated";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `Home Service Cost Guides for Georgetown, TX (${new Date().getFullYear()})`,
  description:
    "How much do plumbers, HVAC, roofers, and other pros cost in Georgetown TX? Compare 2026 low, average, and high price ranges with local hiring tips.",
  pathname: "/costs",
  ogType: "website",
});

export default function CostsIndexPage() {
  const lastUpdated = getStaticPageLastUpdated("/costs");
  const guides = costGuidePages.filter((p) => showExtendedHomeServices() || !p.extended);

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/costs", label: "Cost Guides" },
          ]}
        />

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Georgetown, TX Home Service Cost Guides
        </h1>
        <LastUpdated lastUpdated={lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
          Planning a repair or upgrade? These guides answer &ldquo;how much does it cost&rdquo; for common Georgetown jobs—with
          Williamson County price tables, red flags, and links to service hubs and neighborhood pages.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/costs/${guide.slug}`}
                className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-900">{guide.h1.replace(/\? \(.*\)$/, "?")}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{guide.indexBlurb}</p>
                <p className="mt-3 text-xs font-semibold text-primary">
                  ${guide.summaryRange.low.toLocaleString()}–${guide.summaryRange.high.toLocaleString()} typical range →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
