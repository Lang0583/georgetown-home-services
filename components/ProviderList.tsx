import { RatingStarsWithCaption } from "./BusinessRatingStars";
import {
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  normalizeOutboundHref,
} from "../lib/businesses";
import type { Provider } from "../lib/providers";

const websiteCtaClass =
  "inline-flex items-center justify-center rounded-lg bg-[#01696F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0C4E54]";

export default function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    <div className="mt-5 space-y-6">
      {providers.map((p, index) => {
        const websiteHref = normalizeOutboundHref(p.websiteUrl);
        return (
          <div
            key={`${p.name}-${p.websiteUrl}`}
            className="rounded-xl border border-gray-200 border-l-4 border-l-[#01696F] bg-white p-6 shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 gap-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {websiteHref ? (
                      <a
                        href={websiteHref}
                        {...externalBusinessLinkProps}
                        className="text-gray-900 hover:text-primary-hover hover:underline"
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  {index === 0 ? (
                    <span className="shrink-0 rounded-full bg-[#01696F] px-2.5 py-1 text-xs font-semibold text-white">
                      Top Pick
                    </span>
                  ) : null}
                </div>
                <div className="mt-2">
                  <RatingStarsWithCaption rating={p.rating} reviewCount={p.reviewCount} />
                </div>
              </div>
              {websiteHref ? (
                <a href={websiteHref} {...externalBusinessLinkProps} className={`${websiteCtaClass} shrink-0 self-start`}>
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

