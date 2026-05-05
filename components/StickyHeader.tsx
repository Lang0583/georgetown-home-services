import Link from "next/link";
import { isNoindexSlug, showExtendedHomeServices } from "../lib/public-site-scope";
import { getBrandName } from "../lib/site-content";

// Sitewide header links: only to indexable hubs. Noindex slugs are filtered
// here because the header renders on every request, multiplying any link
// equity drain across the entire site.

const navLinkClass =
  "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md px-2 text-sm font-semibold text-gray-700 underline-offset-4 transition-colors hover:bg-gray-50 hover:text-primary hover:underline hover:decoration-primary whitespace-nowrap sm:min-h-0 sm:min-w-0 sm:justify-start sm:px-0.5 sm:hover:bg-transparent";

export default function StickyHeader() {
  const brand = getBrandName();

  return (
    <header className="sticky top-0 z-50 h-20 border-b-[3px] border-primary bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className={
            brand.startsWith("Georgetown")
              ? "inline-flex shrink-0 items-baseline gap-x-1.5 text-lg font-bold text-gray-900"
              : "shrink-0 text-lg font-bold text-gray-900"
          }
          aria-label={`${brand} home`}
        >
          {brand.startsWith("Georgetown") ? (
            <>
              <span className="text-primary">Georgetown</span>
              <span className="text-gray-900">{brand.slice("Georgetown".length).trimStart()}</span>
            </>
          ) : (
            brand
          )}
        </Link>

        <nav className="flex max-w-full min-w-0 flex-1 items-center gap-3 overflow-x-auto sm:gap-4 md:gap-6" aria-label="Main navigation">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/services" className={navLinkClass}>
            Service guides
          </Link>
          <Link href="/best" className={navLinkClass}>
            Provider directory
          </Link>
          <Link href="/pricing" className={navLinkClass}>
            Pricing
          </Link>
          <Link href="/blog" className={navLinkClass}>
            Homeowner blog
          </Link>
          <Link href="/services/plumber-georgetown-tx" className={navLinkClass}>
            Plumbing
          </Link>
          <Link href="/services/hvac-georgetown-tx" className={navLinkClass}>
            HVAC
          </Link>
          <Link href="/services/roofer-georgetown-tx" className={navLinkClass}>
            Roofing
          </Link>
          {showExtendedHomeServices() && !isNoindexSlug("electrician-georgetown-tx") ? (
            <Link href="/services/electrician-georgetown-tx" className={navLinkClass}>
              Electrical
            </Link>
          ) : null}
          {showExtendedHomeServices() && !isNoindexSlug("landscaping-georgetown-tx") ? (
            <Link href="/services/landscaping-georgetown-tx" className={navLinkClass}>
              Landscaping
            </Link>
          ) : null}
          {showExtendedHomeServices() && !isNoindexSlug("pest-control-georgetown-tx") ? (
            <Link href="/services/pest-control-georgetown-tx" className={navLinkClass}>
              Pest
            </Link>
          ) : null}
          {showExtendedHomeServices() && !isNoindexSlug("foundation-repair-georgetown-tx") ? (
            <Link href="/services/foundation-repair-georgetown-tx" className={navLinkClass}>
              Foundation
            </Link>
          ) : null}
          {showExtendedHomeServices() && !isNoindexSlug("house-cleaning-georgetown-tx") ? (
            <Link href="/services/house-cleaning-georgetown-tx" className={navLinkClass}>
              Cleaning
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
