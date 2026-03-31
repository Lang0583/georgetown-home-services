import Link from "next/link";
import { getBrandName } from "../lib/site-content";

const navLinkClass =
  "text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 whitespace-nowrap";

export default function StickyHeader() {
  const brand = getBrandName();

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-6 px-4">
        <Link href="/" className="shrink-0 text-lg font-semibold text-gray-900">
          {brand}
        </Link>

        <nav className="flex max-w-full items-center gap-6 overflow-x-auto" aria-label="Main navigation">
          <Link href="/" className={navLinkClass}>
            Home
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
          <Link href="/best/best-plumbers-georgetown-tx" className={navLinkClass}>
            Best Plumbers
          </Link>
          <Link href="/best/top-hvac-companies-georgetown-tx" className={navLinkClass}>
            Best HVAC
          </Link>
          <Link href="/best/best-roofers-georgetown-tx" className={navLinkClass}>
            Best Roofers
          </Link>
        </nav>
      </div>
    </header>
  );
}
