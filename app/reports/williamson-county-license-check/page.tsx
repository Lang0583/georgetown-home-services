import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import {
  computeLicenseReportStats,
  LICENSE_REPORT_PATH,
} from "@/lib/license-report-stats";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import {
  AUTHOR_FIRST_NAME,
  AUTHOR_PROFILE_PATH,
  authorPersonSchema,
  PUBLISHER_NAME,
} from "@/lib/site-author";
import { formatLicenseLookupDate } from "@/lib/provider-license";

const PATH = LICENSE_REPORT_PATH;

export function generateMetadata(): Metadata {
  const stats = computeLicenseReportStats();
  const title = `Williamson County License Check: ${stats.withLicenseNumberAndVerifiedDate} of ${stats.totalProviders} Contractors Primary-Source Confirmed`;
  const description = `Of ${stats.totalProviders} home-services contractors in our Georgetown / Williamson County directory, ${stats.withLicenseNumberAndVerifiedDate} have a license number we confirmed against TSBPE, TDLR, or TDA SPCS public records. Methodology and category breakdown.`;
  return pageSeoMetadata({
    absoluteTitle: `${title} | ${PUBLISHER_NAME}`,
    description,
    pathname: PATH,
    ogType: "article",
  });
}

function boardLinks() {
  return [
    {
      name: "TSBPE (plumbing)",
      href: "https://www.tsbpe.texas.gov/",
      note: "Texas State Board of Plumbing Examiners — look up Responsible Master Plumber (RMP) licenses.",
    },
    {
      name: "TDLR (electrical & HVAC)",
      href: "https://www.tdlr.texas.gov/",
      note: "Texas Department of Licensing and Regulation — electrical contractor (TECL) and air conditioning / refrigeration contractor licenses.",
    },
    {
      name: "TDA SPCS (pest control)",
      href: "https://www.texasagriculture.gov/Regulatory-Programs/Structural-Pest-Control",
      note: "Texas Department of Agriculture Structural Pest Control Service — business (TPCL) licenses.",
    },
  ] as const;
}

export default function WilliamsonCountyLicenseCheckPage() {
  const stats = computeLicenseReportStats();
  const pageUrl = absolutePageUrl(PATH);
  const siteUrl = absolutePageUrl("/").replace(/\/$/, "");
  const publishedLabel = formatLicenseLookupDate(stats.reportDatePublished);
  const verifiedDateLabels =
    stats.uniqueVerifiedDateLabels.length > 0
      ? stats.uniqueVerifiedDateLabels.join("; ")
      : null;

  const headline = `Of ${stats.totalProviders} contractors in our Williamson County directory, ${stats.withLicenseNumberAndVerifiedDate} have a Texas license number we confirmed against a state board public record.`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    name: `Williamson County home-services license check (${stats.withLicenseNumberAndVerifiedDate} of ${stats.totalProviders} primary-source confirmed)`,
    description: `Directory license audit for Georgetown / Williamson County home services: ${stats.withLicenseNumber} providers have a licenseNumber in our data; ${stats.withLicenseNumberAndVerifiedDate} also have a non-empty licenseVerifiedDate from TSBPE, TDLR, or TDA SPCS lookups.`,
    datePublished: stats.reportDatePublished,
    dateModified: stats.reportDatePublished,
    author: authorPersonSchema(siteUrl),
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: siteUrl,
    },
    mainEntityOfPage: pageUrl,
    about: {
      "@type": "Thing",
      name: "Texas contractor license verification (TSBPE, TDLR, TDA SPCS)",
    },
  };

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Georgetown Home Services directory — Texas license field snapshot",
    description: `Computed counts from the site provider dataset: total=${stats.totalProviders}, withLicenseNumber=${stats.withLicenseNumber}, withLicenseNumberAndVerifiedDate=${stats.withLicenseNumberAndVerifiedDate}, withLicenseNumberWithoutVerifiedDate=${stats.withLicenseNumberWithoutVerifiedDate}. Authorities: TSBPE (plumbing), TDLR (electrical and HVAC), TDA SPCS (pest control).`,
    url: pageUrl,
    creator: authorPersonSchema(siteUrl),
    datePublished: stats.reportDatePublished,
    license: "https://creativecommons.org/licenses/by/4.0/",
    variableMeasured: [
      "totalProviders",
      "withLicenseNumber",
      "withLicenseNumberAndVerifiedDate",
      "withLicenseNumberWithoutVerifiedDate",
      "withoutLicenseNumber",
    ],
  };

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <JsonLd data={articleJsonLd} />
        <JsonLd data={datasetJsonLd} />

        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="text-brand underline hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/best" className="text-brand underline hover:text-brand">
                Provider directory
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink" aria-current="page">
              License check report
            </li>
          </ol>
        </nav>

        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Data report</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Williamson County License Check: {stats.withLicenseNumberAndVerifiedDate} of{" "}
          {stats.totalProviders} Contractors Primary-Source Confirmed
        </h1>

        <p className="mt-4 text-sm text-muted">
          By{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-ink underline-offset-2 hover:underline">
            {AUTHOR_FIRST_NAME}
          </Link>
          , a Georgetown homeowner · Published {publishedLabel}
        </p>

        <p className="mt-6 text-lg leading-relaxed text-ink">{headline}</p>
        <p className="mt-4 leading-relaxed text-muted">
          Another {stats.withLicenseNumberWithoutVerifiedDate} provider
          {stats.withLicenseNumberWithoutVerifiedDate === 1 ? " has" : "s have"} a license number
          on file without a confirmation date in our data. {stats.withoutLicenseNumber} providers
          have no license number recorded — including {stats.inUnlicensedTrades} in trades Texas
          does not license at the state level, and {stats.licensedTradeMissingNumber} in licensed
          trades where we have not yet populated a number.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Methodology</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Counts on this page are computed from the same provider dataset that powers our
            directory cards. For each record we read only what is stored in the data file:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
            <li>
              <strong className="text-ink">licenseNumber</strong> — non-empty string means a
              license identifier is present in our file.
            </li>
            <li>
              <strong className="text-ink">licenseVerifiedDate</strong> — non-empty ISO date means
              we recorded a primary-source check against a Texas board public database for that
              number. Empty means we do not claim primary-source confirmation here.
            </li>
            <li>
              <strong className="text-ink">Issuing authority by category</strong> — plumbing →
              TSBPE; electrical and HVAC → TDLR; pest control → TDA SPCS. Roofing, landscaping,
              foundation repair, and house cleaning are treated as trades Texas does not license
              at the state level.
            </li>
          </ul>
          {verifiedDateLabels ? (
            <p className="mt-4 leading-relaxed text-muted">
              Primary-source confirmation dates present in the data:{" "}
              <strong className="text-ink">{verifiedDateLabels}</strong>. Directory batch metadata
              date: <strong className="text-ink">{stats.batchMetaVerifiedDateLabel}</strong>.
            </p>
          ) : (
            <p className="mt-4 leading-relaxed text-muted">
              {/* No licenseVerifiedDate values were present when this page was rendered. */}
              No primary-source confirmation dates are present in the current dataset.
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {/* TODO (Matt): Add licenseStatus if you want lapsed vs unchecked vs not_required. */}
            This dataset does not include a field for whether a previously verified license has
            since lapsed. Empty <code className="text-ink">licenseNumber</code> can mean “not yet
            looked up,” “could not confirm,” or “not required for this trade” — we do not invent a
            finer split.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Snapshot totals (computed)
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-ink/10 bg-surface-alt p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Total providers
              </dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums text-ink">
                {stats.totalProviders}
              </dd>
            </div>
            <div className="rounded-lg border border-ink/10 bg-surface-alt p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                With license number
              </dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums text-ink">
                {stats.withLicenseNumber}
              </dd>
            </div>
            <div className="rounded-lg border border-verified/25 bg-verified/5 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-verified">
                Number + verified date
              </dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums text-verified">
                {stats.withLicenseNumberAndVerifiedDate}
              </dd>
            </div>
            <div className="rounded-lg border border-ink/10 bg-surface-alt p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Number, no verified date
              </dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums text-ink">
                {stats.withLicenseNumberWithoutVerifiedDate}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Findings by category
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink/15 text-muted">
                  <th className="py-2 pr-3 font-semibold">Category</th>
                  <th className="py-2 pr-3 font-semibold">Authority</th>
                  <th className="py-2 pr-3 font-semibold tabular-nums">Total</th>
                  <th className="py-2 pr-3 font-semibold tabular-nums">With number</th>
                  <th className="py-2 pr-3 font-semibold tabular-nums">Number + date</th>
                  <th className="py-2 font-semibold tabular-nums">No number</th>
                </tr>
              </thead>
              <tbody>
                {stats.byCategory.map((row) => (
                  <tr key={row.category} className="border-b border-ink/10 text-ink">
                    <td className="py-2.5 pr-3 font-medium">
                      {row.label}
                      {row.stateLicenseNotRequired ? (
                        <span className="mt-0.5 block text-xs font-normal text-muted">
                          No Texas state trade license required
                        </span>
                      ) : null}
                    </td>
                    <td className="py-2.5 pr-3 text-muted">
                      {row.authority ?? "—"}
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums">{row.total}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{row.withLicenseNumber}</td>
                    <td className="py-2.5 pr-3 tabular-nums">
                      {row.withLicenseNumberAndVerifiedDate}
                    </td>
                    <td className="py-2.5 tabular-nums">{row.withoutLicenseNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Findings by issuing authority
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Authority totals count only records that already have a non-empty{" "}
            <code className="text-ink">licenseNumber</code>. Categories without a state board
            mapping are excluded from this table.
          </p>
          <ul className="mt-4 space-y-3">
            {stats.byAuthority.map((row) => (
              <li
                key={row.authority}
                className="rounded-lg border border-ink/10 bg-surface-alt px-4 py-3 text-sm"
              >
                <span className="font-semibold text-ink">{row.authority}</span>
                <span className="text-muted">
                  {" "}
                  — {row.withLicenseNumber} with a license number;{" "}
                  {row.withLicenseNumberAndVerifiedDate} also have a verified date
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            What this means for homeowners
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            A license badge on our directory means the number was present in our data and — when
            a date is shown — that we checked it against the matching Texas board. Absence of a
            badge is not proof someone is unlicensed; it often means we have not yet completed a
            primary-source lookup, or that Texas does not issue a state license for that trade.
            Always confirm licensing and insurance yourself before hiring.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">
            <li>
              <Link href="/best" className="font-semibold text-brand underline hover:text-brand">
                Provider directory (Best Of)
              </Link>{" "}
              — compare local companies by trade.
            </li>
            <li>
              <Link
                href="/services/plumber-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Plumbing guide
              </Link>{" "}
              ·{" "}
              <Link
                href="/best/best-plumbers-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Best plumbers
              </Link>
            </li>
            <li>
              <Link
                href="/services/hvac-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                HVAC guide
              </Link>{" "}
              ·{" "}
              <Link
                href="/best/top-hvac-companies-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Top HVAC companies
              </Link>
            </li>
            <li>
              <Link
                href="/services/electrician-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Electrical guide
              </Link>{" "}
              ·{" "}
              <Link
                href="/best/best-electricians-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Best electricians
              </Link>
            </li>
            <li>
              <Link
                href="/services/pest-control-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Pest control guide
              </Link>{" "}
              ·{" "}
              <Link
                href="/best/best-pest-control-georgetown-tx"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Best pest control
              </Link>
            </li>
            <li>
              <Link
                href="/methodology"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Full listing methodology
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            How to check a license yourself
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Ask the company for its license number, then look it up on the board that regulates
            that trade. Do not rely solely on a website badge or directory page.
          </p>
          <ul className="mt-4 space-y-4">
            {boardLinks().map((b) => (
              <li key={b.href} className="rounded-lg border border-ink/10 p-4">
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline hover:text-brand"
                >
                  {b.name}
                </a>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 border-t border-ink/10 pt-6 text-sm leading-relaxed text-muted">
          — {AUTHOR_FIRST_NAME}, a Georgetown homeowner. This report is an independent directory
          audit, not a state inspection, endorsement, or guarantee of any company&rsquo;s work.
        </p>
      </article>
    </PageShell>
  );
}
