"use client";

import { BusinessListingDescription } from "./BusinessListingDescription";
import { BusinessPhoneRow } from "./BusinessPhoneRow";
import ExitInterstitial from "./ExitInterstitial";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  hasGeorgetownOfficeSignal,
  isMapOnlyProviderProfile,
  hasBusinessRatingData,
  normalizeBusinessGroup,
  type Business,
} from "../lib/businesses";
import { exitInterstitialLabels } from "../lib/exit-interstitial";
import { trackMapsClick, trackOutboundClick } from "../lib/analytics";

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

function formatRating(rating: number) {
  return rating.toFixed(1);
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

/**
 * Provider listings sourced from public business data, same category rules as homepage / best pages.
 * Sorted by rating desc, then reviews desc (via `getBusinessesByCategory`).
 */
export default function ServiceTopProvidersSection({ businesses }: { businesses: Business[] }) {
  if (!businesses.length) return null;

  const featured = businesses.slice(0, Math.min(3, businesses.length));
  const remainder = businesses.length > 3 ? businesses.slice(3) : [];

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-semibold tracking-tight text-ink">Top Providers Serving Georgetown</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Local businesses from public listing data, sorted by rating (highest first), then by review count. Confirm
        licensing and availability before hiring.
      </p>

      <div className="mt-6 rounded-xl border border-brand/25 bg-surface-alt/60 p-4 shadow-sm md:p-5">
        <div className="text-sm font-semibold uppercase tracking-wide text-brand">Featured Providers</div>
        <ul className="mt-3 divide-y divide-brand/20 rounded-xl border border-brand/25 bg-surface shadow-sm">
          {featured.map((b, i) => {
            const website = getBusinessWebsiteUrl(b);
            const maps = getBusinessMapsUrl(b);
            const href = getBusinessOutboundUrl(b);
            const { serviceCategory, angiCategorySlug } = exitInterstitialLabels(normalizeBusinessGroup(b));
            return (
              <li key={`featured-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                    {href ? (
                      <a
                        href={href}
                        {...externalBusinessLinkProps}
                        className="text-base font-semibold text-ink hover:text-brand hover:underline"
                        onClick={() => trackOutboundClick(b.name, serviceCategory, href)}
                      >
                        {b.name}
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-ink">{b.name}</span>
                    )}
                    <span className="text-sm text-muted">
                      {hasBusinessRatingData(b) ? (
                        <>
                          <span className="font-semibold text-ink">{formatRating(b.rating)}</span> stars •{" "}
                          <span className="font-semibold text-ink">{b.reviews.toLocaleString()}</span> reviews
                        </>
                      ) : (
                        <span className="text-muted">Rating not available</span>
                      )}
                    </span>
                  </div>
                  <BusinessListingDescription text={b.description} className="" />
                  <p className="text-sm text-muted">{serviceAreaNote(b)}</p>
                  <BusinessPhoneRow phone={b.phone} providerName={b.name} wrapperClassName="" />
                  <div className="flex flex-wrap gap-2 pt-0.5">
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {remainder.length ? (
        <ul className="mt-6 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface shadow-md">
          {remainder.map((b, i) => {
            const website = getBusinessWebsiteUrl(b);
            const maps = getBusinessMapsUrl(b);
            const href = getBusinessOutboundUrl(b);
            const { serviceCategory, angiCategorySlug } = exitInterstitialLabels(normalizeBusinessGroup(b));
            return (
              <li key={`${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                    {href ? (
                      <a
                        href={href}
                        {...externalBusinessLinkProps}
                        className="text-base font-semibold text-ink hover:text-brand hover:underline"
                        onClick={() => trackOutboundClick(b.name, serviceCategory, href)}
                      >
                        {b.name}
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-ink">{b.name}</span>
                    )}
                    <span className="text-sm text-muted">
                      {hasBusinessRatingData(b) ? (
                        <>
                          <span className="font-semibold text-ink">{formatRating(b.rating)}</span> stars •{" "}
                          <span className="font-semibold text-ink">{b.reviews.toLocaleString()}</span> reviews
                        </>
                      ) : (
                        <span className="text-muted">Rating not available</span>
                      )}
                    </span>
                  </div>
                  <BusinessListingDescription text={b.description} className="" />
                  <p className="text-sm text-muted">{serviceAreaNote(b)}</p>
                  <BusinessPhoneRow phone={b.phone} providerName={b.name} wrapperClassName="" />
                  <div className="flex flex-wrap gap-2 pt-0.5">
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
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
