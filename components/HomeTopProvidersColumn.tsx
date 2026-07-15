"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BusinessListingDescription } from "./BusinessListingDescription";
import { BusinessPhoneRow } from "./BusinessPhoneRow";
import ExitInterstitial from "./ExitInterstitial";
import VerifiedLicenseBadge from "./VerifiedLicenseBadge";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  PROVIDER_GROUP_LINKS,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  type Business,
  type ProviderGroup,
} from "../lib/businesses";
import { EXIT_INTERSTITIAL_ANGI_SLUG, EXIT_INTERSTITIAL_SERVICE_LABEL } from "../lib/exit-interstitial";
import { trackMapsClick, trackOutboundClick } from "../lib/analytics";

const ROTATE_MS = 5000;

function chunkBusinesses(list: Business[], size: number): Business[][] {
  if (list.length === 0) return [];
  const chunks: Business[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

type Props = {
  title: string;
  providerGroupKey: ProviderGroup;
  businesses: Business[];
};

export default function HomeTopProvidersColumn({ title, providerGroupKey, businesses }: Props) {
  const { best: bestHref, service: serviceHref } = PROVIDER_GROUP_LINKS[providerGroupKey];
  const chunks = useMemo(() => chunkBusinesses(businesses, 3), [businesses]);
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
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md ring-1 ring-gray-950/[0.06]">
      <div className="flex items-baseline justify-between gap-3 border-b border-gray-200 bg-slate-100 px-4 py-3 sm:px-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">{title}</h3>
        <Link href={bestHref} className="shrink-0 text-xs font-semibold text-primary hover:underline">
          Top Providers
        </Link>
      </div>
      <ul className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
        {visible.map((business) => {
          const outbound = getBusinessOutboundUrl(business);
          const website = getBusinessWebsiteUrl(business);
          const maps = getBusinessMapsUrl(business);
          const serviceCategory = EXIT_INTERSTITIAL_SERVICE_LABEL[providerGroupKey];
          return (
            <li
              key={`${providerGroupKey}-${business.name}`}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm ring-1 ring-gray-950/[0.04]"
            >
              <div className="font-medium text-gray-900">
                {outbound ? (
                  <a
                    href={outbound}
                    {...externalBusinessLinkProps}
                    className="text-gray-900 hover:text-primary-hover hover:underline"
                    onClick={() => trackOutboundClick(business.name, serviceCategory, outbound)}
                  >
                    {business.name}
                  </a>
                ) : (
                  business.name
                )}
              </div>
              <div className="mt-2 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-md border border-amber-200/80 bg-amber-50/90 px-2 py-1 text-xs font-medium text-amber-950 tabular-nums">
                <span className="text-[#b45309]" aria-hidden>
                  ★
                </span>
                <span>{business.rating.toFixed(1)} Google rating</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-800">{business.reviews.toLocaleString()} reviews</span>
              </div>
              <BusinessPhoneRow phone={business.phone} providerName={business.name} />
              <VerifiedLicenseBadge business={business} className="mt-2" />
              <BusinessListingDescription text={business.description} className="mt-2" />
              {website || maps ? (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-0.5 border-t border-gray-200/80 pt-3 text-xs">
                  {website ? (
                    <ExitInterstitial
                      providerName={business.name}
                      providerUrl={website}
                      serviceCategory={EXIT_INTERSTITIAL_SERVICE_LABEL[providerGroupKey]}
                      angiCategorySlug={EXIT_INTERSTITIAL_ANGI_SLUG[providerGroupKey]}
                      className="font-semibold text-primary hover:text-primary-hover"
                    >
                      {BUSINESS_LINK_VISIT_WEBSITE}
                    </ExitInterstitial>
                  ) : null}
                  {maps ? (
                    <a
                      href={maps}
                      {...externalBusinessLinkProps}
                      className="font-semibold text-primary hover:text-primary-hover"
                      onClick={() => trackMapsClick(business.name)}
                    >
                      {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-gray-200 bg-slate-50 px-4 py-3 text-xs sm:px-5">
        <Link href={serviceHref} className="font-semibold text-gray-900 hover:underline">
          View service page
        </Link>
        <span className="text-[#6b7280]" aria-hidden>·</span>
        <Link href={bestHref} className="font-semibold text-gray-900 hover:underline">
          Compare top providers
        </Link>
      </div>
    </div>
  );
}
