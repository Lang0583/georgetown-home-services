"use client";

import Link from "next/link";
import type { Provider } from "@/data/providers";
import {
  PROVIDER_CATEGORY_LABELS,
  getBestSlugForCategory,
} from "@/data/providers";
import { formatLicenseLookupDate } from "@/lib/provider-license";
import { trackPhoneClick } from "@/lib/analytics";
import { businessPhoneTel } from "@/lib/phone";
import { providerHasPublishedReviewCount } from "@/lib/provider-card-display";
import { RatingStarsRow, formatRatingOneDecimal } from "@/components/BusinessRatingStars";
import { NEIGHBORHOOD_AREA_SLUGS } from "@/lib/neighborhood-redirects";
import { isGeorgetownZipCode } from "@/data/zip-codes";

const NEIGHBORHOOD_SLUG_SET: ReadonlySet<string> = new Set(NEIGHBORHOOD_AREA_SLUGS);

const INSURANCE_STATUS_LABEL: Record<
  NonNullable<Provider["insuranceStatus"]>,
  string
> = {
  verified: "Insurance verified",
  "self-attested": "Insurance self-attested",
  "not-verified": "Insurance not verified",
};

function slugifyLabel(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function neighborhoodHref(value: string): string | null {
  const slug = slugifyLabel(value);
  if (!slug || !NEIGHBORHOOD_SLUG_SET.has(slug)) return null;
  return `/neighborhoods/${slug}/home-services`;
}

function zipHref(value: string): string | null {
  const zip = value.trim();
  if (!isGeorgetownZipCode(zip)) return null;
  return `/zip/${zip}`;
}

export default function VerifiedProfileCard({
  provider,
  headingLevel = "h1",
}: {
  provider: Provider;
  /** `h1` on dedicated profile pages; `h3` when embedded in another page. */
  headingLevel?: "h1" | "h3";
}) {
  const categoryLabel = PROVIDER_CATEGORY_LABELS[provider.category];
  const bestSlug = getBestSlugForCategory(provider.category);
  const Heading = headingLevel;

  const tel = businessPhoneTel(provider.phone);
  const licenseNumber = provider.licenseNumber?.trim();
  const licenseBody = provider.licenseBody;
  const showLicenseBadge = Boolean(licenseNumber && licenseBody);
  const licenseDateLabel = provider.licenseVerifiedDate?.trim()
    ? formatLicenseLookupDate(provider.licenseVerifiedDate.trim())
    : null;

  const insuranceStatus = provider.insuranceStatus;
  const websiteUrl = provider.websiteUrl?.trim();
  const googleMapsUrl = provider.googleMapsUrl?.trim();
  const specialties = Array.isArray(provider.specialties) ? provider.specialties : [];
  const hours = Array.isArray(provider.hours) ? provider.hours : [];
  const neighborhoods = Array.isArray(provider.neighborhoodsServed)
    ? provider.neighborhoodsServed
    : [];
  const zips = Array.isArray(provider.zipsServed) ? provider.zipsServed : [];
  const reviewExcerpts = Array.isArray(provider.reviewExcerpts)
    ? provider.reviewExcerpts
    : [];
  const lastVerified = provider.lastVerified?.trim();
  const showRating =
    typeof provider.rating === "number" && providerHasPublishedReviewCount(provider);

  const licenseBadgeInner = showLicenseBadge ? (
    <span
      className="inline-flex max-w-full flex-col gap-0.5 rounded-md border border-verified/25 bg-verified/5 px-3 py-2 text-sm leading-snug text-verified"
      role="status"
    >
      <span className="font-semibold tracking-tight">
        License verified · {licenseBody} #{licenseNumber}
        {licenseDateLabel ? ` · verified ${licenseDateLabel}` : null}
      </span>
    </span>
  ) : null;

  return (
    <article className="space-y-6">
      <header>
        <Heading
          className={
            headingLevel === "h1"
              ? "text-3xl font-bold tracking-tight text-ink md:text-4xl"
              : "text-xl font-semibold tracking-tight text-ink md:text-2xl"
          }
        >
          {provider.name}
        </Heading>
        <p className="mt-2 text-sm font-medium text-[var(--accent)]">
          <Link href={`/best/${bestSlug}`} className="hover:underline">
            {categoryLabel}
          </Link>
        </p>
      </header>

      {showLicenseBadge ? (
        <div>
          {provider.licenseRegistryUrl?.trim() ? (
            <a
              href={provider.licenseRegistryUrl.trim()}
              target="_blank"
              rel="noopener"
              className="inline-block hover:opacity-90"
            >
              {licenseBadgeInner}
            </a>
          ) : (
            licenseBadgeInner
          )}
        </div>
      ) : null}

      {insuranceStatus ? (
        <p className="text-sm font-medium text-ink">{INSURANCE_STATUS_LABEL[insuranceStatus]}</p>
      ) : null}

      {tel ? (
        <a
          href={tel.href}
          onClick={() => trackPhoneClick(provider.name, provider.category)}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover sm:w-auto sm:min-w-[16rem]"
        >
          Call {tel.display}
        </a>
      ) : null}

      {websiteUrl || googleMapsUrl ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener"
              className="text-brand hover:underline"
            >
              Website
            </a>
          ) : null}
          {googleMapsUrl ? (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="text-brand hover:underline"
            >
              View on Google
            </a>
          ) : null}
        </div>
      ) : null}

      {specialties.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Specialties">
          {specialties.map((item) => (
            <li
              key={item}
              className="inline-flex items-center rounded-full border border-ink/10 bg-surface-alt px-2.5 py-1 text-xs font-semibold text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {provider.emergencyAvailable === true ? (
        <p className="text-sm font-semibold text-accent">Emergency / after-hours available</p>
      ) : null}

      {hours.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-ink">Hours</h2>
          <table className="mt-2 w-full max-w-md text-left text-sm text-muted">
            <thead>
              <tr className="border-b border-ink/10 text-ink">
                <th className="py-1.5 pr-4 font-semibold">Day</th>
                <th className="py-1.5 pr-4 font-semibold">Open</th>
                <th className="py-1.5 font-semibold">Close</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((row) => (
                <tr key={`${row.day}-${row.open}-${row.close}`} className="border-b border-ink/5">
                  <td className="py-1.5 pr-4 text-ink">{row.day}</td>
                  <td className="py-1.5 pr-4">{row.open}</td>
                  <td className="py-1.5">{row.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {neighborhoods.length > 0 || zips.length > 0 ? (
        <div className="space-y-3 text-sm text-muted">
          {neighborhoods.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-ink">Neighborhoods served</h2>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {neighborhoods.map((name) => {
                  const href = neighborhoodHref(name);
                  return (
                    <li key={name}>
                      {href ? (
                        <Link href={href} className="font-semibold text-brand hover:underline">
                          {name}
                        </Link>
                      ) : (
                        <span className="text-ink">{name}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {zips.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-ink">ZIP codes served</h2>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {zips.map((zip) => {
                  const href = zipHref(zip);
                  return (
                    <li key={zip}>
                      {href ? (
                        <Link href={href} className="font-semibold text-brand hover:underline">
                          {zip}
                        </Link>
                      ) : (
                        <span className="text-ink">{zip}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {showRating ? (
        <div className="flex flex-wrap items-center gap-2">
          <RatingStarsRow rating={provider.rating} />
          <span className="text-sm font-semibold text-ink">
            {formatRatingOneDecimal(provider.rating)} ★
          </span>
          <span className="text-sm text-muted">
            {provider.reviewCount.toLocaleString()} Google reviews
          </span>
        </div>
      ) : null}

      {reviewExcerpts.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-ink">Reviews</h2>
          <ul className="mt-3 space-y-4">
            {reviewExcerpts.map((excerpt) => (
              <li
                key={`${excerpt.author}-${excerpt.sourceUrl}`}
                className="rounded-lg border border-ink/10 bg-surface-alt p-4"
              >
                <blockquote className="text-sm text-ink">&ldquo;{excerpt.text}&rdquo;</blockquote>
                <p className="mt-2 text-xs text-muted">
                  — {excerpt.author}
                  {excerpt.sourceUrl?.trim() ? (
                    <>
                      {" · "}
                      <a
                        href={excerpt.sourceUrl.trim()}
                        target="_blank"
                        rel="noopener"
                        className="font-semibold text-brand hover:underline"
                      >
                        Source
                      </a>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {lastVerified ? (
        <p className="text-xs text-muted">
          Last verified {formatLicenseLookupDate(lastVerified)}
        </p>
      ) : null}

      <p className="text-sm text-muted">
        <Link href="/for-contractors" className="font-semibold text-brand hover:underline">
          Claim this profile
        </Link>
      </p>
    </article>
  );
}
