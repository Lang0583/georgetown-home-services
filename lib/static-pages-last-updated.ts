import staticPages from "../data/static-pages-last-updated.json";
import type { LastUpdatedIso } from "./last-updated";

const pages = staticPages as Record<string, LastUpdatedIso>;

export function getStaticPageLastUpdated(pathname: string): LastUpdatedIso {
  const normalized = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const iso = pages[normalized];
  if (!iso) {
    throw new Error(`Missing lastUpdated for static page: ${pathname}`);
  }
  return iso;
}

export function getAllStaticPageLastUpdatedEntries(): { pathname: string; lastUpdated: LastUpdatedIso }[] {
  return Object.entries(pages).map(([pathname, lastUpdated]) => ({
    pathname,
    lastUpdated,
  }));
}
