"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Provider } from "@/data/providers";
import { getProviderSlug } from "@/data/providers";
import { BusinessPhoneRow } from "./BusinessPhoneRow";
import ExitInterstitial from "./ExitInterstitial";
import VerifiedLicenseBadge from "./VerifiedLicenseBadge";
import { RatingStarsRow, formatRatingOneDecimal } from "./BusinessRatingStars";
import { PROVIDER_GROUP_LINKS, type ProviderGroup } from "../lib/businesses";
import { EXIT_INTERSTITIAL_ANGI_SLUG, EXIT_INTERSTITIAL_SERVICE_LABEL } from "../lib/exit-interstitial";
import { trackMapsClick } from "../lib/analytics";
import { providerHasPublishedReviewCount } from "../lib/provider-card-display";

const ROTATE_MS = 5000;

function chunkProviders(list: Provider[], size: number): Provider[][] {
  if (list.length === 0) return [];
  const chunks: Provider[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

type Props = {
  title: string;
  providerGroupKey: ProviderGroup;
  providers: Provider[];
};

export default function HomeTopProvidersColumn({
  title,
  providerGroupKey,
  providers,
}: Props) {
  const { best: bestHref, service: serviceHref } = PROVIDER_GROUP_LINKS[providerGroupKey];
  const chunks = useMemo(() => chunkProviders(providers, 3), [providers]);
  const [chunkIndex, setChunkIndex] = useState(0);

  useEffect(() => {
    if (chunks.length <= 1) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setChunkIndex((i) => (i + 1) % chunks.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [chunks.length]);

  const visible = chunks.length ? chunks[chunkIndex % chunks.length] : [];

  return (
    <div className="rounded-lg bg-surface-alt p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{title}</h3>
        <Link href={bestHref} className="text-xs font-semibold text-brand hover:underline">
          Top Providers
        </Link>
      </div>
      <ul className="mt-3 space-y-3">
        {visible.map((provider) => {
          const detailHref = `/providers/${getProviderSlug(provider)}`;
          const website = provider.websiteUrl?.trim();
          const maps = provider.googleMapsUrl?.trim();
          const showRating =
            typeof provider.rating === "number" && providerHasPublishedReviewCount(provider);
          return (
            <li key={`${providerGroupKey}-${provider.name}`} className="text-sm text-muted">
              <div className="font-medium text-ink">
                <Link href={detailHref} className="text-ink hover:text-brand hover:underline">
                  {provider.name}
                </Link>
              </div>
              {showRating ? (
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <RatingStarsRow rating={provider.rating} />
                  <span className="text-ink">
                    {formatRatingOneDecimal(provider.rating)} ★ ·{" "}
                    {provider.reviewCount.toLocaleString()} reviews
                  </span>
                </div>
              ) : null}
              <VerifiedLicenseBadge provider={provider} className="mt-1.5" />
              <BusinessPhoneRow phone={provider.phone} providerName={provider.name} />
              {provider.description ? (
                <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">{provider.description}</p>
              ) : null}
              {website || maps ? (
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                  {website ? (
                    <ExitInterstitial
                      providerName={provider.name}
                      providerUrl={website}
                      serviceCategory={EXIT_INTERSTITIAL_SERVICE_LABEL[providerGroupKey]}
                      angiCategorySlug={EXIT_INTERSTITIAL_ANGI_SLUG[providerGroupKey]}
                      className="text-brand hover:text-brand"
                    >
                      Visit website
                    </ExitInterstitial>
                  ) : null}
                  {maps ? (
                    <a
                      href={maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:text-brand"
                      onClick={() => trackMapsClick(provider.name)}
                    >
                      View on Google Maps
                    </a>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        <Link href={serviceHref} className="font-semibold text-ink hover:underline">
          View service page
        </Link>
        <span className="text-muted">·</span>
        <Link href={bestHref} className="font-semibold text-ink hover:underline">
          Compare top providers
        </Link>
      </div>
    </div>
  );
}
