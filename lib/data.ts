/**
 * Data layer entrypoint. Source of truth: `data/site-content.json`.
 * Typed helpers: `lib/site-content.ts`.
 */
export type {
  BestPage,
  BlogPage,
  ContentBlock,
  Faq,
  LocationPage,
  ServicePage,
  SiteContent,
} from "./site-content";
export type { ResolvedBestPage, ResolvedServicePage } from "./pageContentRegistry";
export {
  CORE_BEST_SLUGS,
  CORE_SERVICE_SLUGS,
  resolveBestPage,
  resolveServicePage,
} from "./pageContentRegistry";
export {
  getAllSitemapRoutes,
  getBest,
  getBestBySlug,
  getBestSlugs,
  getBlog,
  getBlogBySlug,
  getBlogSlugs,
  getBlogsForBestSlug,
  getBlogsForServiceSlug,
  getBrandName,
  getContact,
  getLocationBySlug,
  getLocationSlugs,
  getLocations,
  getRecommendedServicesForSlug,
  getServiceBySlug,
  getServices,
  getServiceSlugs,
} from "./site-content";
