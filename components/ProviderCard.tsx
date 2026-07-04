import Link from "next/link";
import { RatingStarsRow, formatRatingOneDecimal } from "./BusinessRatingStars";
import { angiGeorgetownListUrl } from "../lib/affiliates";
import type { Provider } from "../data/providers";
import { PROVIDER_CATEGORY_ANGI_SLUG, getProviderBySlug, getProviderSlug } from "../data/providers";
import { providerLicenseVerifiedLine } from "@/lib/provider-license";
import { getProviderWebsiteUrl } from "../lib/provider-website";
import { externalBusinessLinkProps } from "../lib/businesses";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]";
const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover";

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
  const providerSlug = getProviderSlug(provider);
  const hasProfile = Boolean(getProviderBySlug(providerSlug));
  const profileHref = hasProfile ? `/providers/${providerSlug}` : null;
  const websiteUrl = getProviderWebsiteUrl(provider.name);
  const licenseLine = providerLicenseVerifiedLine(provider);
  const padding = compact ? "p-4" : "p-6";

  return (
    <article
      className={[
        "h-full rounded-xl border border-ink/10 bg-surface shadow-md",
        padding,
        provider.featured ? "border-l-4 border-l-rating" : "border-l-4 border-l-[var(--accent)]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-ink sm:text-lg">
            {profileHref ? (
              <Link href={profileHref} className="hover:text-brand hover:underline">
                {provider.name}
              </Link>
            ) : (
              provider.name
            )}
          </h3>
          {showTopPick ? (
            <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-white">
              Top Pick
            </span>
          ) : null}
          {provider.featured ? (
            <span className="rounded-full border border-rating/25 bg-rating/10 px-2.5 py-0.5 text-xs font-semibold text-rating">
              Featured
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <RatingStarsRow rating={provider.rating} />
          <span className="text-sm font-semibold text-rating">
            {formatRatingOneDecimal(provider.rating)} ★
          </span>
          <span className="text-sm text-muted">
            {provider.reviewCount.toLocaleString()} Google reviews
          </span>
        </div>

        {typeof provider.yearsInBusiness === "number" ? (
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{provider.yearsInBusiness} years</span> in business
          </p>
        ) : null}

        {licenseLine ? (
          <p className="text-sm font-semibold text-verified">{licenseLine}</p>
        ) : null}

        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">Service area:</span> {provider.serviceArea}
        </p>

        {provider.neighborhoodsServed?.length ? (
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">Neighborhoods served:</span>{" "}
            {provider.neighborhoodsServed.join(", ")}
          </p>
        ) : null}

        <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted">
          {provider.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">Phone:</span>{" "}
          <a href={telHref} className="font-semibold text-brand hover:text-brand hover:underline">
            {provider.phone}
          </a>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {profileHref ? (
          <Link href={profileHref} className={secondaryBtnClass}>
            View profile
          </Link>
        ) : null}
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
