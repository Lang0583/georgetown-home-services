import type { FeaturedListingRecord } from "../data/featured-listings";

const visitBtnClass =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-amber-50";

/**
 * Paid featured slot above organic provider lists on /best/* pages.
 * Labeled per FTC / editorial-policy disclosure rules.
 */
export default function FeaturedListing({ listing }: { listing: FeaturedListingRecord }) {
  const telHref = listing.phone ? `tel:${listing.phone.replace(/\D/g, "")}` : null;

  return (
    <section
      className="mt-6 rounded-xl border-2 border-amber-300 bg-amber-50/60 p-5 shadow-md"
      aria-label={`Featured listing: ${listing.name}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
          Featured
        </span>
        <span className="text-xs font-medium text-amber-900">Paid placement</span>
      </div>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{listing.description}</p>

          {listing.serviceArea ? (
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Service area:</span> {listing.serviceArea}
            </p>
          ) : null}

          {listing.specialties?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              {listing.specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {listing.phone ? (
            <p className="mt-3 text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Phone:</span>{" "}
              <a href={telHref!} className="font-semibold text-primary hover:text-primary-hover hover:underline">
                {listing.phone}
              </a>
            </p>
          ) : null}
        </div>

        <a
          href={listing.websiteUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={visitBtnClass}
        >
          Visit website
        </a>
      </div>

      <p className="mt-4 border-t border-amber-200 pt-3 text-xs leading-relaxed text-amber-950/80">
        This business pays for this featured position. Links go directly to their site — we do not collect leads or
        quote requests on their behalf.
      </p>
    </section>
  );
}
