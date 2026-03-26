import Link from "next/link";
import { getBrandName, getBlogSlugs, getBestSlugs, getLocationSlugs, getServiceSlugs } from "../lib/site-content";

export default function StickyHeader() {
  const brand = getBrandName();

  // Keep top-level nav focused; link to indexes and let pages handle "related" internal linking.
  const serviceSlugs = getServiceSlugs();
  const locationSlugs = getLocationSlugs();
  const bestSlugs = getBestSlugs();
  const blogSlugs = getBlogSlugs();

  const primaryService = serviceSlugs[0];
  const primaryLocation = locationSlugs[0];
  const primaryBest = bestSlugs[0];
  const primaryBlog = blogSlugs[0];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          {brand}
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <Link href={`/services/${primaryService}`} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
            Services
          </Link>
          <Link
            href={`/locations/${primaryLocation}`}
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
          >
            Locations
          </Link>
          <Link href={`/best/${primaryBest}`} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
            Best Of
          </Link>
          <Link href={`/blog/${primaryBlog}`} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
            Blog
          </Link>
        </nav>

        <div className="flex items-center">
          <Link
            href={`/services/${primaryService}`}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Request Service
          </Link>
        </div>
      </div>
    </header>
  );
}

