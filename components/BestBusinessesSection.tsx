import { BusinessListingDescription } from "./BusinessListingDescription";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  hasBusinessRatingData,
  type Business,
} from "../lib/businesses";

/** Detailed cards for the top of the list; remaining rows use a compact list. */
const FEATURED_MAX = 3;

function formatRating(rating: number) {
  return rating.toFixed(1);
}

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

function toTelHref(phoneRaw: string | undefined) {
  const t = (phoneRaw ?? "").trim();
  if (!t) return null;
  const normalized = t.replace(/[^\d+]/g, "");
  if (normalized.replace(/[^\d]/g, "").length < 10) return null;
  return `tel:${normalized}`;
}

const linkButtonClass =
  "inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50";

function BusinessNameHeading({ b }: { b: Business }) {
  const href = getBusinessOutboundUrl(b);
  if (href) {
    return (
      <h4 className="text-lg font-semibold text-gray-900">
        <a href={href} {...externalBusinessLinkProps} className="text-gray-900 hover:text-blue-700 hover:underline">
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
  const tel = toTelHref(b.phone);
  if (!website && !maps && !tel) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {website ? (
        <a href={website} {...externalBusinessLinkProps} className={linkButtonClass}>
          {BUSINESS_LINK_VISIT_WEBSITE}
        </a>
      ) : null}
      {tel ? (
        <a href={tel} className={linkButtonClass}>
          Phone
        </a>
      ) : null}
      {maps ? (
        <a href={maps} {...externalBusinessLinkProps} className={linkButtonClass}>
          {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
        </a>
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
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/40 p-4 shadow-sm md:p-5">
          <ul className="divide-y divide-blue-200/60 rounded-xl border border-blue-200 bg-white shadow-sm">
            {featured.map((b, i) => {
              const website = getBusinessWebsiteUrl(b);
              const maps = getBusinessMapsUrl(b);
              const href = getBusinessOutboundUrl(b);
              const tel = toTelHref(b.phone);
              return (
                <li key={`feat-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {href ? (
                        <a
                          href={href}
                          {...externalBusinessLinkProps}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline"
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
                          <span className="text-gray-500">Rating not listed in source data</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    {trim(b.address) ? <p className="text-sm text-gray-700">{trim(b.address)}</p> : null}
                    {tel ? (
                      <div className="text-sm text-gray-700">
                        Phone:{" "}
                        <a href={tel} className="font-semibold text-blue-700 hover:underline">
                          {b.phone}
                        </a>
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {website ? (
                        <a href={website} {...externalBusinessLinkProps} className={linkButtonClass}>
                          {BUSINESS_LINK_VISIT_WEBSITE}
                        </a>
                      ) : null}
                      {tel ? (
                        <a href={tel} className={linkButtonClass}>
                          Phone
                        </a>
                      ) : null}
                      {maps ? (
                        <a href={maps} {...externalBusinessLinkProps} className={linkButtonClass}>
                          {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
                        </a>
                      ) : null}
                    </div>
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
              const website = getBusinessWebsiteUrl(b);
              const maps = getBusinessMapsUrl(b);
              const href = getBusinessOutboundUrl(b);
              const tel = toTelHref(b.phone);
              return (
                <li key={`more-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      {href ? (
                        <a
                          href={href}
                          {...externalBusinessLinkProps}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline"
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
                          <span className="text-gray-500">Rating not listed in source data</span>
                        )}
                      </span>
                    </div>
                    <BusinessListingDescription text={b.description} className="" />
                    {trim(b.address) ? <p className="text-sm text-gray-700">{trim(b.address)}</p> : null}
                    {tel ? (
                      <div className="text-sm text-gray-700">
                        Phone:{" "}
                        <a href={tel} className="font-semibold text-blue-700 hover:underline">
                          {b.phone}
                        </a>
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {website ? (
                        <a href={website} {...externalBusinessLinkProps} className={linkButtonClass}>
                          {BUSINESS_LINK_VISIT_WEBSITE}
                        </a>
                      ) : null}
                      {tel ? (
                        <a href={tel} className={linkButtonClass}>
                          Phone
                        </a>
                      ) : null}
                      {maps ? (
                        <a href={maps} {...externalBusinessLinkProps} className={linkButtonClass}>
                          {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
                        </a>
                      ) : null}
                    </div>
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
