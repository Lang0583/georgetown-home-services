import { costGuidePages } from "@/data/cost-guides";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "@/lib/pageContentRegistry";
import { absolutePageUrl } from "@/lib/page-seo";

/**
 * Top URLs for manual Google Search Console URL Inspection (highest business priority).
 * Regenerate `public/sitemap-priority.txt` when core hubs change.
 */
export function topGscInspectionUrls(limit = 30): string[] {
  const urls: string[] = [absolutePageUrl("/")];

  for (const slug of CORE_SERVICE_SLUGS) {
    urls.push(absolutePageUrl(`/services/${slug}`));
  }
  for (const slug of CORE_BEST_SLUGS) {
    urls.push(absolutePageUrl(`/best/${slug}`));
  }

  urls.push(
    absolutePageUrl("/services"),
    absolutePageUrl("/best"),
    absolutePageUrl("/costs"),
    absolutePageUrl("/blog"),
    absolutePageUrl("/pricing"),
    absolutePageUrl("/seasonal"),
  );

  for (const guide of costGuidePages.slice(0, 6)) {
    urls.push(absolutePageUrl(`/costs/${guide.slug}`));
  }

  const highIntentBlog = [
    "water-heater-not-working-georgetown-tx",
    "ac-not-cooling-georgetown-tx",
    "emergency-plumber-cost-georgetown-tx",
    "how-to-choose-a-reliable-plumber-georgetown-tx",
    "signs-you-may-need-a-new-roof-georgetown-tx",
  ];
  for (const slug of highIntentBlog) {
    urls.push(absolutePageUrl(`/blog/${slug}`));
  }

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const u of urls) {
    if (seen.has(u)) continue;
    seen.add(u);
    unique.push(u);
    if (unique.length >= limit) break;
  }
  return unique;
}
