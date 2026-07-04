import Link from "next/link";
import { RatingStarsRow, formatRatingOneDecimal } from "./BusinessRatingStars";
import { angiGeorgetownListUrl } from "../lib/affiliates";
import type { Provider } from "../data/providers";
import { PROVIDER_CATEGORY_ANGI_SLUG, getProviderSlug } from "../data/providers";
import { providerLicenseVerifiedLine } from "@/lib/provider-license";
import { getProviderWebsiteUrl } from "../lib/provider-website";
import { externalBusinessLinkProps } from "../lib/businesses";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-[#01696F] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C4E54]";
const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-lg border border-[#01696F] bg-white px-3 py-1.5 text-sm font-semibold text-[#01696F] transition-colors hover:bg-[#01696F]/5";

export default function ProviderCard({
  provider,
  showTopPick = false,
  compact = false,
}: {
  provider: Provider;
  showTopPick?: boolean;
  compact?: boolean;
}) {
  const angiUrl = angiGeorgetownListUrl(PROVIDER_CATEGORY_ANGI_SLUG[provider.category]);
  const telHref = `tel:${provider.phone.replace(/\D/g, "")}`;
  const profileHref = `/providers/${getProviderSlug(provider)}`;
  const websiteUrl = getProviderWebsiteUrl(provider.name);
  const licenseLine = providerLicenseVerifiedLine(provider);
  const padding = compact ? "p-4" : "p-6";

  return (
    <article
      className={[
        "h-full rounded-xl border border-gray-200 bg-white shadow-md",
        padding,
        provider.featured ? "border-l-4 border-l-amber-500" : "border-l-4 border-l-[#01696F]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
            <Link href={profileHref} className="hover:text-primary-hover hover:underline">
              {provider.name}
            </Link>
          </h3>
          {showTopPick ? (
            <span className="rounded-full bg-[#01696F] px-2.5 py-0.5 text-xs font-semibold text-white">
              Top Pick
            </span>
          ) : null}
          {provider.featured ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              Featured
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <RatingStarsRow rating={provider.rating} />
          <span className="text-sm font-semibold text-gray-900">
            {formatRatingOneDecimal(provider.rating)} ★
          </span>
          <span className="text-sm text-gray-500">
            {provider.reviewCount.toLocaleString()} Google reviews
          </span>
        </div>

        {typeof provider.yearsInBusiness === "number" ? (
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{provider.yearsInBusiness} years</span> in business
          </p>
        ) : null}

        {licenseLine ? (
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{licenseLine}</span>
          </p>
        ) : null}

        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Service area:</span> {provider.serviceArea}
        </p>

        {provider.neighborhoodsServed?.length ? (
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Neighborhoods served:</span>{" "}
            {provider.neighborhoodsServed.join(", ")}
          </p>
        ) : null}

        <ul className="list-disc space-y-0.5 pl-5 text-sm text-gray-700">
          {provider.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Phone:</span>{" "}
          <a href={telHref} className="font-semibold text-primary hover:text-primary-hover hover:underline">
            {provider.phone}
          </a>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={profileHref} className={secondaryBtnClass}>
          View profile
        </Link>
        {websiteUrl ? (
          <a href={websiteUrl} {...externalBusinessLinkProps} className={secondaryBtnClass}>
            Visit website
          </a>
        ) : null}
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
