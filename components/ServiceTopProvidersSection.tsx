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

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

function formatRating(rating: number) {
  return rating.toFixed(1);
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

/**
 * Real listings from `@/lib/businesses.json`, same category rules as homepage / best pages.
 * Sorted by rating desc, then reviews desc (via `getBusinessesByCategory`).
 */
export default function ServiceTopProvidersSection({ businesses }: { businesses: Business[] }) {
  if (!businesses.length) return null;

  const featured = businesses.slice(0, Math.min(3, businesses.length));
  const remainder = businesses.length > 3 ? businesses.slice(3) : [];

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Top Providers Serving Georgetown</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
        Local businesses from public listing data, sorted by rating (highest first), then by review count. Confirm
        licensing and availability before hiring.
      </p>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/40 p-4 shadow-sm md:p-5">
        <div className="text-sm font-semibold uppercase tracking-wide text-blue-900">Featured Providers</div>
        <ul className="mt-3 divide-y divide-blue-200/60 rounded-xl border border-blue-200 bg-white shadow-sm">
          {featured.map((b, i) => {
            const website = getBusinessWebsiteUrl(b);
            const maps = getBusinessMapsUrl(b);
            const href = getBusinessOutboundUrl(b);
            const addr = trim(b.address);
            const tel = toTelHref(b.phone);
            return (
              <li key={`featured-${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                    {href ? (
                      <a
                        href={href}
                        {...externalBusinessLinkProps}
                        className="text-base font-semibold text-gray-900 hover:text-blue-700 hover:underline"
                      >
                        {b.name}
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-gray-900">{b.name}</span>
                    )}
                    <span className="text-sm text-gray-600">
                      {hasBusinessRatingData(b) ? (
                        <>
                          <span className="font-semibold text-gray-900">{formatRating(b.rating)}</span> stars •{" "}
                          <span className="font-semibold text-gray-900">{b.reviews.toLocaleString()}</span> reviews
                        </>
                      ) : (
                        <span className="text-gray-500">Rating not listed in source data</span>
                      )}
                    </span>
                  </div>
                  <BusinessListingDescription text={b.description} className="" />
                  {addr ? <p className="text-sm text-gray-700">{addr}</p> : null}
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
                        Call Now
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

      {remainder.length ? (
        <ul className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md">
          {remainder.map((b, i) => {
            const website = getBusinessWebsiteUrl(b);
            const maps = getBusinessMapsUrl(b);
            const href = getBusinessOutboundUrl(b);
            const addr = trim(b.address);
            const tel = toTelHref(b.phone);
            return (
              <li key={`${b.name}-${i}`} className="px-4 py-5 first:rounded-t-xl last:rounded-b-xl md:px-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                    {href ? (
                      <a
                        href={href}
                        {...externalBusinessLinkProps}
                        className="text-base font-semibold text-gray-900 hover:text-blue-700 hover:underline"
                      >
                        {b.name}
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-gray-900">{b.name}</span>
                    )}
                    <span className="text-sm text-gray-600">
                      {hasBusinessRatingData(b) ? (
                        <>
                          <span className="font-semibold text-gray-900">{formatRating(b.rating)}</span> stars •{" "}
                          <span className="font-semibold text-gray-900">{b.reviews.toLocaleString()}</span> reviews
                        </>
                      ) : (
                        <span className="text-gray-500">Rating not listed in source data</span>
                      )}
                    </span>
                  </div>
                  <BusinessListingDescription text={b.description} className="" />
                  {addr ? <p className="text-sm text-gray-700">{addr}</p> : null}
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
                        Call Now
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
      ) : null}
    </section>
  );
}
