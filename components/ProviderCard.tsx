import Link from "next/link";
import { RatingStarsRow, formatRatingOneDecimal } from "./BusinessRatingStars";
import type { Provider } from "../data/providers";
import { getProviderBySlug, getProviderSlug } from "../data/providers";
import { providerUnlicensedTradeNote } from "@/lib/provider-license";
import { providerReviewCountLabel } from "@/lib/provider-card-display";
import { getProviderWebsiteUrl } from "../lib/provider-website";
import { externalBusinessLinkProps } from "../lib/businesses";
import ProviderAffiliateQuoteButton from "./ProviderAffiliateQuoteButton";
import VerifiedLicenseBadge from "./VerifiedLicenseBadge";

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
  const telHref = `tel:${provider.phone.replace(/\D/g, "")}`;
  const providerSlug = getProviderSlug(provider);
  const hasProfile = Boolean(getProviderBySlug(providerSlug));
  const profileHref = hasProfile ? `/providers/${providerSlug}` : null;
  const websiteUrl = getProviderWebsiteUrl(provider.name);
  const tradeNote = providerUnlicensedTradeNote(provider);
  const reviewLabel = providerReviewCountLabel(provider);
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
          {reviewLabel ? (
            <span className="text-sm text-muted">{reviewLabel}</span>
          ) : null}
        </div>

        {provider.address ? (
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">Address:</span> {provider.address}
          </p>
        ) : null}

        <VerifiedLicenseBadge provider={provider} className="mt-1" />

        {tradeNote ? (
          <p className="text-xs text-muted">{tradeNote}</p>
        ) : null}

        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">Service area:</span> {provider.serviceArea}
        </p>

        {provider.specialties.length > 0 ? (
          <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted">
            {provider.specialties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

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
        <ProviderAffiliateQuoteButton provider={provider} />
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
