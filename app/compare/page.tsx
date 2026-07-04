import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import LinkCard from "../../components/LinkCard";
import PageShell from "../../components/templates/PageShell";
import { COMPARISON_CATEGORY_ORDER, getComparisonsByCategory } from "../../data/comparisons";
import { PROVIDER_CATEGORY_LABELS } from "../../data/providers";
import { pageSeoMetadata } from "../../lib/page-seo";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Compare Georgetown Home Service Providers | Head-to-Head Guides",
  description:
    "Head-to-head provider comparisons for Georgetown TX homeowners: HVAC, plumbing, roofing, electrical, landscaping, foundation, and cleaning. Ratings, specialties, and hiring tips.",
  pathname: "/compare",
  ogType: "website",
});

export default function CompareIndexPage() {
  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/compare", label: "Compare Providers" },
            ]}
          />

          <header className="mt-6">
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Compare Georgetown Home Service Providers
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              Narrowing your shortlist to two companies? These head-to-head guides compare ratings, specialties, response
              patterns, and pricing transparency for real Georgetown-area providers—then link you to full directories
              and service guides.
            </p>
          </header>

          {COMPARISON_CATEGORY_ORDER.map((category) => {
            const items = getComparisonsByCategory(category);
            if (!items.length) return null;
            const label = PROVIDER_CATEGORY_LABELS[category];
            return (
              <section key={category} className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">{label}</h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {items.map((c) => (
                    <LinkCard
                      key={c.slug}
                      href={`/compare/${c.slug}`}
                      title={`${c.providerA.name} vs ${c.providerB.name}`}
                      description={`Georgetown ${label.toLowerCase()} comparison: ratings, specialties, and which company fits your project.`}
                      badge="Head-to-head"
                    />
                  ))}
                </div>
              </section>
            );
          })}

          <p className="mt-10 text-sm text-muted">
            Browse full directories on{" "}
            <Link href="/best" className="font-semibold text-brand hover:underline">
              Best Of guides
            </Link>{" "}
            or explore{" "}
            <Link href="/zip" className="font-semibold text-brand hover:underline">
              Georgetown ZIP code pages
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
