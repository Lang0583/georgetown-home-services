import Link from "next/link";
import { isNoindexSlug, showExtendedHomeServices } from "../lib/public-site-scope";
import { getBrandName } from "../lib/site-content";
import SiteNav, { type SiteNavLink } from "./SiteNav";
import StickyHeaderShell from "./StickyHeaderShell";

// Sitewide header links: only to indexable hubs. Noindex slugs are filtered
// here because the header renders on every request, multiplying any link
// equity drain across the entire site.

const PRIMARY_NAV: SiteNavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/best", label: "Best Of" },
  { href: "/costs", label: "Cost Guide" },
  { href: "/for-contractors", label: "For Contractors" },
];

function moreNavLinks(): SiteNavLink[] {
  const links: SiteNavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/search", label: "Search" },
    { href: "/compare", label: "Compare" },
    { href: "/pricing", label: "Pricing" },
    { href: "/seasonal", label: "Seasonal tips" },
    { href: "/blog", label: "Homeowner blog" },
    { href: "/services/plumber-georgetown-tx", label: "Plumbing" },
    { href: "/services/hvac-georgetown-tx", label: "HVAC" },
    { href: "/services/roofer-georgetown-tx", label: "Roofing" },
  ];

  if (showExtendedHomeServices() && !isNoindexSlug("electrician-georgetown-tx")) {
    links.push({ href: "/services/electrician-georgetown-tx", label: "Electrical" });
  }
  if (showExtendedHomeServices() && !isNoindexSlug("landscaping-georgetown-tx")) {
    links.push({ href: "/services/landscaping-georgetown-tx", label: "Landscaping" });
  }
  if (showExtendedHomeServices() && !isNoindexSlug("pest-control-georgetown-tx")) {
    links.push({ href: "/services/pest-control-georgetown-tx", label: "Pest" });
  }
  if (showExtendedHomeServices() && !isNoindexSlug("foundation-repair-georgetown-tx")) {
    links.push({ href: "/services/foundation-repair-georgetown-tx", label: "Foundation" });
  }
  if (showExtendedHomeServices() && !isNoindexSlug("house-cleaning-georgetown-tx")) {
    links.push({ href: "/services/house-cleaning-georgetown-tx", label: "Cleaning" });
  }

  return links;
}

export default function StickyHeader() {
  const brand = getBrandName();

  return (
    <StickyHeaderShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 md:min-h-20 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <Link
          href="/"
          className={
            brand.startsWith("Georgetown")
              ? "inline-flex shrink-0 items-baseline gap-x-1.5 text-lg font-bold text-ink"
              : "shrink-0 text-lg font-bold text-ink"
          }
          aria-label={`${brand} home`}
        >
          {brand.startsWith("Georgetown") ? (
            <>
              <span className="text-brand">Georgetown</span>
              <span className="text-ink">{brand.slice("Georgetown".length).trimStart()}</span>
            </>
          ) : (
            brand
          )}
        </Link>

        <SiteNav primary={PRIMARY_NAV} more={moreNavLinks()} />
      </div>
    </StickyHeaderShell>
  );
}
