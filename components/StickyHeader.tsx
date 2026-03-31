import Link from "next/link";
import { getBrandName, getBlogSlugs, getBestSlugs, getServiceSlugs } from "../lib/site-content";

const navLinkClass =
  "text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 whitespace-nowrap";

export default function StickyHeader() {
  const brand = getBrandName();

  const serviceSlugs = getServiceSlugs();
  const bestSlugs = getBestSlugs();
  const blogSlugs = getBlogSlugs();

  const primaryService = serviceSlugs[0] ?? "plumber-georgetown-tx";
  const primaryBest = bestSlugs[0] ?? "best-plumbers-georgetown-tx";
  const primaryBlog = blogSlugs[0] ?? "how-to-find-a-good-plumber-georgetown-tx";

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-6 px-4">
        <Link href="/" className="shrink-0 text-lg font-semibold text-gray-900">
          {brand}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href={`/services/${primaryService}`} className={navLinkClass}>
            Services
          </Link>
          <Link href={`/best/${primaryBest}`} className={navLinkClass}>
            Top Providers
          </Link>
          <Link href={`/blog/${primaryBlog}`} className={navLinkClass}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
