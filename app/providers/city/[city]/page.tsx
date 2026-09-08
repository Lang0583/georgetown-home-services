import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import {
  PROVIDERS_GENERATED_ON,
  PROVIDERS_SOURCE,
  formatVerifiedOnPlain,
  getCityBySlug,
  getCitiesWithMinProviders,
  getProvidersByCity,
} from "@/lib/providers";
import { buildLicensedProviderItemListJsonLd } from "@/lib/licensed-provider-schema";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { buildBreadcrumbList } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCitiesWithMinProviders(3).map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityInfo = getCityBySlug(citySlug);
  if (!cityInfo) return {};
  return pageSeoMetadata({
    titleSegment: `Licensed Plumbers in ${cityInfo.city}, TX`,
    description: `${cityInfo.count} licensed plumbing contractors in ${cityInfo.city}, TX from the Texas State Board of Plumbing Examiners public licensee file.`,
    pathname: `/providers/city/${citySlug}`,
    ogType: "website",
  });
}

export default async function ProvidersCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const cityInfo = getCityBySlug(citySlug);
  if (!cityInfo) notFound();

  const providers = getProvidersByCity(cityInfo.city);
  const checked = formatVerifiedOnPlain(PROVIDERS_GENERATED_ON);
  const answer = `${providers.length} licensed plumbing contractors in ${cityInfo.city}, TX are listed here from the ${PROVIDERS_SOURCE.registry} public ${PROVIDERS_SOURCE.file}. License and insurance fields were checked ${checked}. Georgetown Home Services is an independent directory and does not sell leads.`;

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={buildBreadcrumbList([
            { name: "Home", url: absolutePageUrl("/") },
            { name: "Providers", url: absolutePageUrl("/providers") },
            {
              name: cityInfo.city,
              url: absolutePageUrl(`/providers/city/${citySlug}`),
            },
          ])}
        />
        <JsonLd
          data={buildLicensedProviderItemListJsonLd(providers, {
            name: `Licensed plumbers in ${cityInfo.city}, TX`,
          })}
        />

        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/providers", label: "Providers" },
              { href: `/providers/city/${citySlug}`, label: cityInfo.city },
            ]}
          />

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Licensed plumbers in {cityInfo.city}, TX
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{answer}</p>
          <p className="mt-3 text-sm text-muted">
            <Link href="/providers" className="font-semibold text-brand hover:underline">
              All licensed providers
            </Link>
            {" · "}
            <Link href="/methodology" className="font-semibold text-brand hover:underline">
              How we verify
            </Link>
          </p>

          <ul className="mt-8 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface">
            {providers.map((p) => (
              <li key={p.slug} className="px-4 py-4">
                <Link
                  href={`/providers/${p.slug}`}
                  className="font-semibold text-ink hover:text-brand hover:underline"
                >
                  {p.company}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  License {p.licenseNumber}
                  {p.county.trim() ? ` · ${p.county} County` : ""}
                  {p.verified ? " · License verified" : " · Insurance expired on state file"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
