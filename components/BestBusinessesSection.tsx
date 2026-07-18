"use client";

import Link from "next/link";
import { BusinessListingDescription } from "./BusinessListingDescription";
import { BusinessPhoneRow } from "./BusinessPhoneRow";
import ExitInterstitial from "./ExitInterstitial";
import { trackMapsClick } from "../lib/analytics";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessWebsiteUrl,
  hasBusinessRatingData,
  hasGeorgetownOfficeSignal,
  isMapOnlyProviderProfile,
  normalizeBusinessGroup,
  type Business,
} from "../lib/businesses";
import { exitInterstitialLabels } from "../lib/exit-interstitial";
import { providerDetailHref } from "../lib/internalLinks";

/** Detailed cards for the top of the list; remaining rows use a compact list. */
const FEATURED_MAX = 3;

function formatRating(rating: number) {
  return rating.toFixed(1);
}

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

const linkButtonClass =
  "inline-flex items-center rounded-lg border border-ink/15 bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-alt";

function serviceAreaNote(b: Business) {
  if (hasGeorgetownOfficeSignal(b)) return "Service area: Georgetown, TX and nearby.";
  const city = trim(b.city);
  const state = trim(b.state) || "TX";
  if (city) return `Service area: ${city}, ${state} (serves the Georgetown area).`;
  return "Service area: Georgetown, TX area.";
}

function WebsiteAndMapLinks({ b }: { b: Business }) {
  const website = getBusinessWebsiteUrl(b);
  const maps = getBusinessMapsUrl(b);
  const { serviceCategory, angiCategorySlug } = exitInterstitialLabels(normalizeBusinessGroup(b));
  if (!website && !maps) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {website ? (
        <ExitInterstitial
          providerName={b.name}
          providerUrl={website}
          serviceCategory={serviceCategory}
          angiCategorySlug={angiCategorySlug}
          className={linkButtonClass}
        >
          {BUSINESS_LINK_VISIT_WEBSITE}
        </ExitInterstitial>
      ) : null}
      {maps ? (
        <a
          href={maps}
          {...externalBusinessLinkProps}
          className={linkButtonClass}
          onClick={() => trackMapsClick(b.name)}
        >
          {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
        </a>
      ) : null}
      {isMapOnlyProviderProfile(b) ? (
        <span className="inline-flex items-center rounded-lg border border-ink/15 bg-surface-alt px-3 py-1.5 text-xs font-semibold text-muted">
          Map listing only.
        </span>
      ) : null}
    </div>
  );
}

export default function BestBusinessesSection({ businesses }: { businesses: Business[] }) {
  if (!businesses.length) {
    return (
      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-6 text-sm text-muted shadow-md">
        No businesses were found for this category in the current data.
      </div>
    );
  }

  const featured = businesses.slice(0, Math.min(FEATURED_MAX, businesses.length));
  const remainder = businesses.length > FEATURED_MAX ? businesses.slice(FEATURED_MAX) : [];

  return (
    <div className="mt-8 space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-ink">Featured Providers</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Top {Math.min(FEATURED_MAX, businesses.length)} by rating, then review count
          {businesses.length > FEATURED_MAX ? ` (${businesses.length} total in this category)` : ""}.
        </p>
        <div className="mt-6 rounded-xl border border-brand/25 bg-surface-alt/60 p-4 shadow-sm md:p-5">
          <ul className="divide-y divide-brand/20 rounded-xl border border-brand/25 bg-surface shadow-sm">
            {featured.map((b, i) => {
              const detailHref = providerDetailHref(b.name);
              return (
                <li key={`feat-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {detailHref ? (
                        <Link
                          href={detailHref}
                          className="text-sm font-semibold text-ink hover:text-brand hover:underline"
                        >
                          {b.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold text-ink">{b.name}</span>
                      )}
                      <span className="text-sm text-muted">
                        {hasBusinessRatingData(b) ? (
                          <>
                            {formatRating(b.rating)} stars • {b.reviews.toLocaleString()} reviews
                          </>
                        ) : (
                          <span className="text-muted">Rating not available</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    <p className="text-sm text-muted">{serviceAreaNote(b)}</p>
                    <BusinessPhoneRow phone={b.phone} providerName={b.name} wrapperClassName="" />
                    <WebsiteAndMapLinks b={b} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {remainder.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-ink">More listings</h3>
          <ul className="mt-6 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface shadow-md">
            {remainder.map((b, i) => {
              const detailHref = providerDetailHref(b.name);
              return (
                <li key={`more-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {detailHref ? (
                        <Link
                          href={detailHref}
                          className="text-sm font-semibold text-ink hover:text-brand hover:underline"
                        >
                          {b.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold text-ink">{b.name}</span>
                      )}
                      <span className="text-sm text-muted">
                        {hasBusinessRatingData(b) ? (
                          <>
                            {formatRating(b.rating)} stars • {b.reviews.toLocaleString()} reviews
                          </>
                        ) : (
                          <span className="text-muted">Rating not available</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    <p className="text-sm text-muted">{serviceAreaNote(b)}</p>
                    <BusinessPhoneRow phone={b.phone} providerName={b.name} wrapperClassName="" />
                    <WebsiteAndMapLinks b={b} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
