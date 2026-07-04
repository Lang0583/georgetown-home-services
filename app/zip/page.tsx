import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import LinkCard from "../../components/LinkCard";
import PageShell from "../../components/templates/PageShell";
import { ZIP_INDEX_INTRO, getAllZipCodePages } from "../../data/zip-codes";
import { pageSeoMetadata } from "../../lib/page-seo";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Georgetown TX ZIP Codes | Browse Home Services by Area",
  description:
    "Browse Georgetown TX home services by ZIP code: 78626 downtown, 78628 Wolf Ranch, 78633 Sun City, and 78634 east side. Local guides and provider lists.",
  pathname: "/zip",
  ogType: "website",
});

export default function ZipIndexPage() {
  const zipPages = getAllZipCodePages();

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/zip", label: "Browse by ZIP" },
            ]}
          />

          <header className="mt-6">
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Georgetown TX Home Services by ZIP Code
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{ZIP_INDEX_INTRO}</p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {zipPages.map((page) => (
              <LinkCard
                key={page.zip}
                href={`/zip/${page.zip}`}
                title={`Georgetown TX ${page.zip}`}
                description={`${page.shortLabel}. ${page.neighborhoods}.`}
                badge={page.housingProfile}
                categoryTopHover
              />
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">
            Also browse{" "}
            <Link href="/service-areas" className="font-semibold text-brand hover:underline">
              Georgetown service areas
            </Link>{" "}
            or the{" "}
            <Link href="/best" className="font-semibold text-brand hover:underline">
              provider directory
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
