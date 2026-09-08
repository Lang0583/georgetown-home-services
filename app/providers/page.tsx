import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import ProvidersDirectoryFilters from "@/components/ProvidersDirectoryFilters";
import {
  PROVIDERS_COUNTS,
  PROVIDERS_GENERATED_ON,
  PROVIDERS_SOURCE,
  formatVerifiedOnPlain,
  getAllProviders,
  getCitiesWithMinProviders,
} from "@/lib/providers";
import { buildLicensedProviderItemListJsonLd } from "@/lib/licensed-provider-schema";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Licensed Providers Directory",
  description:
    "Browse licensed plumbing contractors from the Texas State Board of Plumbing Examiners public licensee file for Williamson, Travis, and Bell counties.",
  pathname: "/providers",
  ogType: "website",
});

export default function ProvidersIndexPage() {
  const providers = getAllProviders();
  const checked = formatVerifiedOnPlain(PROVIDERS_GENERATED_ON);
  const trades = [...new Set(providers.map((p) => p.trade).filter(Boolean))].sort();
  const cities = [...new Set(providers.map((p) => p.city.trim()).filter(Boolean))].sort();
  const counties = [...new Set(providers.map((p) => p.county.trim()).filter(Boolean))].sort();
  const cityPages = getCitiesWithMinProviders(3);

  const answer = `${PROVIDERS_COUNTS.total} licensed plumbing contractors are listed here from the ${PROVIDERS_SOURCE.registry} public ${PROVIDERS_SOURCE.file}. Records cover Williamson, Travis, and Bell counties. License and insurance fields were checked ${checked}. Georgetown Home Services is an independent directory and does not sell leads.`;

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={buildBreadcrumbList([
            { name: "Home", url: absolutePageUrl("/") },
            { name: "Providers", url: absolutePageUrl("/providers") },
          ])}
        />
        <JsonLd
          data={buildLicensedProviderItemListJsonLd(providers, {
            name: "Licensed plumbing providers",
          })}
        />

        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/providers", label: "Providers" },
            ]}
          />

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Licensed providers
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{answer}</p>
          <p className="mt-3 text-sm text-muted">
            Source file refresh note from the board: {PROVIDERS_SOURCE.refresh}.{" "}
            <Link href="/methodology" className="font-semibold text-brand hover:underline">
              How we verify
            </Link>
            .
          </p>

          {cityPages.length ? (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-ink">Browse by city</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cityPages.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/providers/city/${c.slug}`}
                      className="inline-flex rounded-lg border border-ink/15 bg-surface px-3 py-1.5 text-sm font-medium text-ink hover:border-brand/40 hover:text-brand"
                    >
                      {c.city} ({c.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ProvidersDirectoryFilters
            providers={providers}
            trades={trades}
            cities={cities}
            counties={counties}
            cityPageSlugs={cityPages.map((c) => c.slug)}
          />
        </div>
      </section>
    </PageShell>
  );
}
