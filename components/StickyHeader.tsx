import Link from "next/link";
import { showExtendedHomeServices } from "../lib/public-site-scope";
import { getBrandName } from "../lib/site-content";

const navLinkClass =
  "text-sm font-semibold text-gray-700 underline-offset-4 transition-colors hover:text-[#01696F] hover:underline hover:decoration-[#01696F] whitespace-nowrap";

export default function StickyHeader() {
  const brand = getBrandName();

  return (
    <header className="sticky top-0 z-50 h-20 border-b-[3px] border-[#01696F] bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-6 px-4">
        <Link href="/" className="shrink-0 text-lg font-bold text-gray-900">
          {brand.startsWith("Georgetown") ? (
            <>
              <span className="text-[#01696F]">Georgetown</span>
              <span className="text-gray-900">{brand.slice("Georgetown".length)}</span>
            </>
          ) : (
            brand
          )}
        </Link>

        <nav className="flex max-w-full items-center gap-6 overflow-x-auto" aria-label="Main navigation">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/services" className={navLinkClass}>
            Service guides
          </Link>
          <Link href="/best" className={navLinkClass}>
            Provider directory
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
          {showExtendedHomeServices() ? (
            <>
              <Link href="/services/electrician-georgetown-tx" className={navLinkClass}>
                Electrical
              </Link>
              <Link href="/services/landscaping-georgetown-tx" className={navLinkClass}>
                Landscaping
              </Link>
              <Link href="/services/pest-control-georgetown-tx" className={navLinkClass}>
                Pest
              </Link>
              <Link href="/services/foundation-repair-georgetown-tx" className={navLinkClass}>
                Foundation
              </Link>
              <Link href="/services/house-cleaning-georgetown-tx" className={navLinkClass}>
                Cleaning
              </Link>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
