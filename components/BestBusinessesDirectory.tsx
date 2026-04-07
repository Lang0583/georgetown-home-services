"use client";

import { useMemo, useState } from "react";
import { BusinessListingDescription } from "./BusinessListingDescription";
import Link from "next/link";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  getProviderBadges,
  getProviderQualityTier,
  hasBusinessRatingData,
  hasGeorgetownOfficeSignal,
  isMapOnlyProviderProfile,
  type Business,
  type ProviderBadge,
} from "../lib/businesses";

type SortKey = "recommended" | "reviews" | "rating";

function formatRating(rating: number) {
  return rating.toFixed(1);
}

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

function includesAny(haystack: string, needles: string[]) {
  const h = (haystack ?? "").toLowerCase();
  return needles.some((n) => h.includes(n));
}

function supportsFinancing(b: Business) {
  return includesAny(b.description ?? "", ["financ", "0%"]);
}

function residentialFocus(b: Business) {
  return includesAny(b.description ?? "", ["residential", "homeowner", "homes", "house"]);
}

function badgeTone(b: ProviderBadge["key"]) {
  if (b === "sponsored") return "border-amber-200 bg-amber-50 text-amber-900";
  if (b === "featured") return "border-amber-200 bg-amber-50 text-amber-900";
  if (b === "map_only_profile") return "border-gray-300 bg-gray-50 text-gray-700";
  if (b === "emergency_availability") return "border-rose-200 bg-rose-50 text-rose-900";
  if (b === "high_review_volume") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  if (b === "georgetown_office") return "border-blue-200 bg-blue-50 text-blue-900";
  return "border-amber-200 bg-amber-50 text-amber-900";
}

function BadgeRow({ badges }: { badges: ProviderBadge[] }) {
  if (!badges.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b.key}
          className={[
            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
            badgeTone(b.key),
          ].join(" ")}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

function ProviderMeta({
  b,
  guideHref,
  guideLabel,
}: {
  b: Business;
  guideHref?: string | null;
  guideLabel?: string;
}) {
  const website = getBusinessWebsiteUrl(b);
  const maps = getBusinessMapsUrl(b);

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {website ? (
        <a href={website} {...externalBusinessLinkProps} className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50">
          {BUSINESS_LINK_VISIT_WEBSITE}
        </a>
      ) : null}
      {maps ? (
        <a href={maps} {...externalBusinessLinkProps} className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50">
          {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
        </a>
      ) : null}
      {guideHref ? (
        <Link
          href={guideHref}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50"
        >
          {guideLabel}
        </Link>
      ) : null}
      {isMapOnlyProviderProfile(b) ? (
        <span className="inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
          Map listing only.
        </span>
      ) : null}
    </div>
  );
}

function serviceAreaNote(b: Business) {
  if (hasGeorgetownOfficeSignal(b)) return "Service area: Georgetown, TX and nearby.";
  const city = trim(b.city);
  const state = trim(b.state) || "TX";
  if (city) return `Service area: ${city}, ${state} (serves the Georgetown area).`;
  return "Service area: Georgetown, TX area.";
}

function ProviderCard({
  b,
  guideHref,
  guideLabel,
}: {
  b: Business;
  guideHref?: string | null;
  guideLabel?: string;
}) {
  const href = getBusinessOutboundUrl(b);
  const badges = getProviderBadges(b);

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
          <div className="text-lg font-semibold text-gray-900">
            {href ? (
              <a href={href} {...externalBusinessLinkProps} className="text-gray-900 hover:text-blue-700 hover:underline">
                {b.name}
              </a>
            ) : (
              b.name
            )}
          </div>
          <div className="text-sm text-gray-600">
            {hasBusinessRatingData(b) ? (
              <>
                <span className="font-semibold text-gray-900">{formatRating(b.rating)}</span> stars •{" "}
                <span className="font-semibold text-gray-900">{b.reviews.toLocaleString()}</span> reviews
              </>
            ) : (
              <span className="text-gray-500">Rating not available</span>
            )}
          </div>
        </div>

        <BadgeRow badges={badges} />

        <BusinessListingDescription text={b.description} className="mt-1" />
        <p className="text-sm text-gray-700">{serviceAreaNote(b)}</p>

        <ProviderMeta b={b} guideHref={guideHref} guideLabel={guideLabel} />
        {b.directory?.sponsored || b.directory?.featured ? (
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {b.directory?.sponsorDisclosureText?.trim() ||
              "This listing is a paid placement and is labeled for transparency."}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export default function BestBusinessesDirectory({
  businesses,
  guideHref,
  guideLabel = "Read our guide",
}: {
  businesses: Business[];
  guideHref?: string | null;
  guideLabel?: string;
}) {
  const [sort, setSort] = useState<SortKey>("recommended");
  const [showLowerSignal, setShowLowerSignal] = useState(false);
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [filterFinancing, setFilterFinancing] = useState(false);
  const [filterResidential, setFilterResidential] = useState(false);
  const [filterRepair, setFilterRepair] = useState(false);
  const [filterReplacement, setFilterReplacement] = useState(false);
  const [filterGeorgetown, setFilterGeorgetown] = useState(false);

  const { sponsored, established, lowerSignal } = useMemo(() => {
    const sponsor: Business[] = [];
    const est: Business[] = [];
    const low: Business[] = [];
    for (const b of businesses) {
      if (b.directory?.sponsored || b.directory?.featured) {
        sponsor.push(b);
      } else {
        (getProviderQualityTier(b) === "established" ? est : low).push(b);
      }
    }
    return { sponsored: sponsor, established: est, lowerSignal: low };
  }, [businesses]);

  const filteredEstablished = useMemo(() => {
    const base = [...established];

    const filtered = base.filter((b) => {
      const badges = getProviderBadges(b);
      if (filterEmergency && !badges.some((x) => x.key === "emergency_availability")) return false;
      if (filterRepair && !badges.some((x) => x.key === "repair_focused")) return false;
      if (filterReplacement && !badges.some((x) => x.key === "replacement_focused")) return false;
      if (filterFinancing && !supportsFinancing(b)) return false;
      if (filterResidential && !residentialFocus(b)) return false;
      if (filterGeorgetown && !hasGeorgetownOfficeSignal(b)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (sort === "reviews") return b.reviews - a.reviews;
      if (sort === "rating") return b.rating !== a.rating ? b.rating - a.rating : b.reviews - a.reviews;
      // recommended
      return b.rating !== a.rating ? b.rating - a.rating : b.reviews - a.reviews;
    });

    return filtered;
  }, [
    established,
    filterEmergency,
    filterFinancing,
    filterGeorgetown,
    filterRepair,
    filterReplacement,
    filterResidential,
    sort,
  ]);

  return (
    <div className="mt-8 space-y-10">
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-md">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Filters</div>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterEmergency} onChange={(e) => setFilterEmergency(e.target.checked)} />
              Emergency
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterRepair} onChange={(e) => setFilterRepair(e.target.checked)} />
              Repair focus
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterReplacement} onChange={(e) => setFilterReplacement(e.target.checked)} />
              Replacement focus
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterGeorgetown} onChange={(e) => setFilterGeorgetown(e.target.checked)} />
              Georgetown proximity
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterResidential} onChange={(e) => setFilterResidential(e.target.checked)} />
              Residential focus
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filterFinancing} onChange={(e) => setFilterFinancing(e.target.checked)} />
              Financing
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900">
              Sort
              <select
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-900"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                <option value="recommended">Recommended (rating, then reviews)</option>
                <option value="reviews">Most reviews</option>
                <option value="rating">Highest rating</option>
              </select>
            </label>
            <label className="mt-1 inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={showLowerSignal} onChange={(e) => setShowLowerSignal(e.target.checked)} />
              Show newer / lower-signal options ({lowerSignal.length})
            </label>
            <div className="text-sm text-gray-700">
              Showing <span className="font-semibold text-gray-900">{filteredEstablished.length}</span> established picks
              {businesses.length ? (
                <>
                  {" "}
                  out of <span className="font-semibold text-gray-900">{businesses.length}</span> listings.
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {sponsored.length ? (
        <section>
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900">Featured / Sponsored</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
            Paid placements are labeled. Organic listings are ranked separately.
          </p>
          <ul className="mt-6 space-y-5">
            {sponsored.map((b, idx) => (
              <ProviderCard key={`${b.name}-${idx}-sponsor`} b={b} guideHref={guideHref} guideLabel={guideLabel} />
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h3 className="text-2xl font-semibold tracking-tight text-gray-900">Established picks</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
          These listings meet a basic signal threshold (for example, sufficient review volume and better documentation).
          Always confirm licensing, insurance, pricing, and availability directly with any provider before hiring.
        </p>
        {filteredEstablished.length ? (
          <ul className="mt-6 space-y-5">
            {filteredEstablished.map((b, idx) => (
              <ProviderCard key={`${b.name}-${idx}`} b={b} guideHref={guideHref} guideLabel={guideLabel} />
            ))}
          </ul>
        ) : (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md">
            No established picks match the current filters.
          </div>
        )}
      </section>

      {showLowerSignal ? (
        <section>
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900">Newer or lower-signal options</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
            These providers have weaker signals (for example, low review volume or map-only documentation). They may still be
            good options, but you should verify details more carefully and prioritize written scopes.
          </p>
          <ul className="mt-6 space-y-5">
            {lowerSignal.map((b, idx) => (
              <ProviderCard key={`${b.name}-${idx}-low`} b={b} guideHref={guideHref} guideLabel={guideLabel} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

