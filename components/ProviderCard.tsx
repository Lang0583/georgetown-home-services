import { RatingStarsRow, formatRatingOneDecimal } from "./BusinessRatingStars";
import { angiGeorgetownListUrl } from "../lib/affiliates";
import type { Provider } from "../data/providers";
import { PROVIDER_CATEGORY_ANGI_SLUG } from "../data/providers";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-[#01696F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0C4E54]";
const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-lg border border-[#01696F] bg-white px-4 py-2 text-sm font-semibold text-[#01696F] transition-colors hover:bg-[#01696F]/5";

export default function ProviderCard({ provider }: { provider: Provider }) {
  const angiUrl = angiGeorgetownListUrl(PROVIDER_CATEGORY_ANGI_SLUG[provider.category]);
  const telHref = `tel:${provider.phone.replace(/\D/g, "")}`;

  return (
    <article
      className={[
        "rounded-xl border border-gray-200 bg-white p-6 shadow-md",
        provider.featured ? "border-l-4 border-l-amber-500" : "border-l-4 border-l-[#01696F]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
            {provider.featured ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                Featured
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RatingStarsRow rating={provider.rating} />
            <span className="text-sm font-semibold text-gray-900">
              {formatRatingOneDecimal(provider.rating)} ★
            </span>
            <span className="text-sm text-gray-500">
              {provider.reviewCount.toLocaleString()} Google reviews
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{provider.yearsInBusiness} years</span> in business
          </p>
          <p className="mt-1 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Service area:</span> {provider.serviceArea}
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {provider.specialties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Phone:</span>{" "}
            <a href={telHref} className="font-semibold text-primary hover:text-primary-hover hover:underline">
              {provider.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href={angiUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className={primaryBtnClass}>
          Get a Quote
        </a>
        <a
          href={provider.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryBtnClass}
        >
          View on Google
        </a>
      </div>
    </article>
  );
}
