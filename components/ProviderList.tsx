import {
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  normalizeOutboundHref,
} from "../lib/businesses";
import type { Provider } from "../lib/providers";

function formatRating(rating: number) {
  return rating.toFixed(1);
}

export default function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    <div className="mt-5 space-y-6">
      {providers.map((p) => {
        const websiteHref = normalizeOutboundHref(p.websiteUrl);
        return (
          <div key={`${p.name}-${p.websiteUrl}`} className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {websiteHref ? (
                    <a
                      href={websiteHref}
                      {...externalBusinessLinkProps}
                      className="text-gray-900 hover:text-blue-700 hover:underline"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                <div className="mt-1 text-sm text-gray-600">
                  Rating: <span className="font-semibold text-gray-900">{formatRating(p.rating)}</span> •{" "}
                  <span className="font-semibold text-gray-900">{p.reviewCount.toLocaleString()}</span> reviews
                </div>
              </div>
              {websiteHref ? (
                <a
                  href={websiteHref}
                  {...externalBusinessLinkProps}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {BUSINESS_LINK_VISIT_WEBSITE}
                </a>
              ) : null}
            </div>
            <p className="mt-4 text-sm text-gray-700">{p.description}</p>
          </div>
        );
      })}
    </div>
  );
}

