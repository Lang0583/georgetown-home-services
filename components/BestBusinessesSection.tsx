"use client";

import { BusinessListingDescription } from "./BusinessListingDescription";
import { BusinessPhoneRow } from "./BusinessPhoneRow";
import ExitInterstitial from "./ExitInterstitial";
import { trackMapsClick, trackOutboundClick } from "../lib/analytics";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  hasBusinessRatingData,
  hasGeorgetownOfficeSignal,
  isMapOnlyProviderProfile,
  normalizeBusinessGroup,
  type Business,
} from "../lib/businesses";
import { exitInterstitialLabels } from "../lib/exit-interstitial";

/** Detailed cards for the top of the list; remaining rows use a compact list. */
const FEATURED_MAX = 3;

function formatRating(rating: number) {
  return rating.toFixed(1);
}

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

const linkButtonClass =
  "inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50";

function serviceAreaNote(b: Business) {
  if (hasGeorgetownOfficeSignal(b)) return "Service area: Georgetown, TX and nearby.";
  const city = trim(b.city);
  const state = trim(b.state) || "TX";
  if (city) return `Service area: ${city}, ${state} (serves the Georgetown area).`;
  return "Service area: Georgetown, TX area.";
}

function BusinessNameHeading({ b }: { b: Business }) {
  const href = getBusinessOutboundUrl(b);
  const { serviceCategory } = exitInterstitialLabels(normalizeBusinessGroup(b));
  if (href) {
    return (
      <h4 className="text-lg font-semibold text-gray-900">
        <a
          href={href}
          {...externalBusinessLinkProps}
          className="text-gray-900 hover:text-primary-hover hover:underline"
          onClick={() => trackOutboundClick(b.name, serviceCategory, href)}
        >
          {b.name}
        </a>
      </h4>
    );
  }
  return <h4 className="text-lg font-semibold text-gray-900">{b.name}</h4>;
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
        <span className="inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
          Map listing only.
        </span>
      ) : null}
    </div>
  );
}

export default function BestBusinessesSection({ businesses }: { businesses: Business[] }) {
  if (!businesses.length) {
    return (
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md">
        No businesses were found for this category in the current data.
      </div>
    );
  }

  const featured = businesses.slice(0, Math.min(FEATURED_MAX, businesses.length));
  const remainder = businesses.length > FEATURED_MAX ? businesses.slice(FEATURED_MAX) : [];

  return (
    <div className="mt-8 space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Featured Providers</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Top {Math.min(FEATURED_MAX, businesses.length)} by rating, then review count
          {businesses.length > FEATURED_MAX ? ` (${businesses.length} total in this category)` : ""}.
        </p>
        <div className="mt-6 rounded-xl border border-gray-200 border-l-[3px] border-l-primary bg-slate-50 p-4 shadow-md ring-1 ring-gray-950/[0.04] md:p-5">
          <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
            {featured.map((b, i) => {
              const href = getBusinessOutboundUrl(b);
              const { serviceCategory } = exitInterstitialLabels(normalizeBusinessGroup(b));
              return (
                <li key={`feat-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {href ? (
                        <a
                          href={href}
                          {...externalBusinessLinkProps}
                          className="text-sm font-semibold text-gray-900 hover:text-primary-hover hover:underline"
                          onClick={() => trackOutboundClick(b.name, serviceCategory, href)}
                        >
                          {b.name}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">{b.name}</span>
                      )}
                      <span className="text-sm text-gray-600">
                        {hasBusinessRatingData(b) ? (
                          <>
                            {formatRating(b.rating)} stars • {b.reviews.toLocaleString()} reviews
                          </>
                        ) : (
                          <span className="text-gray-500">Rating not available</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    <p className="text-sm text-gray-700">{serviceAreaNote(b)}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">More listings</h3>
          <ul className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md">
            {remainder.map((b, i) => {
              const href = getBusinessOutboundUrl(b);
              const { serviceCategory } = exitInterstitialLabels(normalizeBusinessGroup(b));
              return (
                <li key={`more-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {href ? (
                        <a
                          href={href}
                          {...externalBusinessLinkProps}
                          className="text-sm font-semibold text-gray-900 hover:text-primary-hover hover:underline"
                          onClick={() => trackOutboundClick(b.name, serviceCategory, href)}
                        >
                          {b.name}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">{b.name}</span>
                      )}
                      <span className="text-sm text-gray-600">
                        {hasBusinessRatingData(b) ? (
                          <>
                            {formatRating(b.rating)} stars • {b.reviews.toLocaleString()} reviews
                          </>
                        ) : (
                          <span className="text-gray-500">Rating not available</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    <p className="text-sm text-gray-700">{serviceAreaNote(b)}</p>
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
