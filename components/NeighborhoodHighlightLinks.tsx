import Link from "next/link";
import type { PricingCategory } from "../lib/pricing-data";

type ServiceKey = PricingCategory["key"];

/**
 * Maps trade hub pricing keys to the `serviceSlug` used by
 * `/neighborhoods/[neighborhood]/[service]` routes.
 */
const SERVICE_SLUG_BY_KEY: Record<ServiceKey, string> = {
  plumbing: "plumber",
  hvac: "hvac",
  roofing: "roofer",
  electrical: "electrician",
  landscaping: "landscaping",
  pest: "pest-control",
  foundation: "foundation-repair",
  cleaning: "house-cleaning",
};

type NeighborhoodCard = {
  slug: string;
  name: string;
  blurb: string;
};

/**
 * Three highlighted Georgetown neighborhoods we always link out to from a
 * service hub. Each blurb captures a real reason the neighborhood matters for
 * homeowners deciding which contractor to call.
 */
const NEIGHBORHOODS: NeighborhoodCard[] = [
  {
    slug: "sun-city",
    name: "Sun City",
    blurb:
      "Active-adult 55+ community with slab homes, accessibility-aware retrofits, and high guest-week service demand.",
  },
  {
    slug: "wolf-ranch",
    name: "Wolf Ranch",
    blurb:
      "Fast-growth master-planned community with newer slabs, EV-ready electrical, and HOA design rules to navigate.",
  },
  {
    slug: "georgetown-village",
    name: "Georgetown Village",
    blurb:
      "Established neighborhood with 1990s-era panels, mature trees, and clay-soil foundation patterns worth knowing.",
  },
];

export default function NeighborhoodHighlightLinks({
  categoryKey,
  serviceLabel,
}: {
  categoryKey: ServiceKey;
  /** Lowercase noun used in body copy, e.g. "plumber", "HVAC company", "roofer". */
  serviceLabel: string;
}) {
  const serviceSlug = SERVICE_SLUG_BY_KEY[categoryKey];

  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
      aria-labelledby={`neighborhood-links-${categoryKey}-heading`}
    >
      <h2
        id={`neighborhood-links-${categoryKey}-heading`}
        className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
      >
        {serviceLabel.charAt(0).toUpperCase() + serviceLabel.slice(1)} guides by Georgetown neighborhood
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
        Each Georgetown neighborhood has its own housing stock, soil conditions, HOA rules, and service-call rhythm.
        These three are the most-trafficked guides on the site — start with the one closest to your home for the
        most relevant local context before you compare quotes.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {NEIGHBORHOODS.map((n) => {
          const href = `/neighborhoods/${n.slug}/${serviceSlug}`;
          return (
            <Link
              key={n.slug}
              href={href}
              className="group block rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-primary hover:bg-white hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">{n.name}</div>
              <div className="mt-1 text-base font-semibold text-gray-900 group-hover:underline">
                {serviceLabel.charAt(0).toUpperCase() + serviceLabel.slice(1)} in {n.name} →
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{n.blurb}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
