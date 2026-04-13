import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "./pageContentRegistry";
import { getBestBySlug, getBlog, getBlogBySlug, getBlogsForBestSlug, getBlogsForServiceSlug, getLocations, getServices, type BlogPage, type BestPage, type LocationPage, type ServicePage } from "./site-content";

export type InternalLink = { href: string; label: string; description?: string };

function uniqByHref(links: InternalLink[]) {
  const seen = new Set<string>();
  const out: InternalLink[] = [];
  for (const l of links) {
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    out.push(l);
  }
  return out;
}

function pick<T>(items: T[], n: number): T[] {
  return items.slice(0, Math.min(n, items.length));
}

function siblingCoreServices(currentSlug: string): InternalLink[] {
  const core = CORE_SERVICE_SLUGS as readonly string[];
  const siblings = core.filter((s) => s !== currentSlug).slice(0, 2);
  const services = getServices();
  return siblings
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s))
    .map((s) => ({ href: `/services/${s.slug}`, label: s.title, description: s.description }));
}

function bestOfForService(service: ServicePage): InternalLink | null {
  const slug = service.bestSlugs[0];
  if (!slug) return null;
  const b = getBestBySlug(slug);
  if (!b) return null;
  return { href: `/best/${b.slug}`, label: b.title, description: b.description };
}

function neighborhoodForService(service: ServicePage): InternalLink | null {
  // Prefer a neighborhood/location page (not the generic Georgetown location) that contains this service slug.
  const locations = getLocations();
  const neighborhood = locations.find((l) => l.slug !== "georgetown-tx" && l.serviceSlugs.includes(service.slug));
  const fallback = locations.find((l) => l.slug !== "georgetown-tx" && l.serviceSlugs.some((s) => service.relatedServiceSlugs.includes(s)));
  const chosen = neighborhood ?? fallback ?? locations.find((l) => l.slug !== "georgetown-tx") ?? null;
  if (!chosen) return null;
  return { href: `/locations/${chosen.slug}`, label: chosen.title, description: chosen.description };
}

function blogLinksForService(serviceSlug: string): InternalLink[] {
  const posts = getBlogsForServiceSlug(serviceSlug);
  const picked = pick(posts, 2);
  if (picked.length >= 2) {
    return picked.map((p) => ({ href: `/blog/${p.slug}`, label: p.title, description: p.description }));
  }
  // Fallback: fill from global blog list.
  const all = getBlog().filter((p) => p.slug && !picked.some((x) => x.slug === p.slug));
  return uniqByHref(
    [...picked, ...pick(all, 2 - picked.length)].map((p) => ({ href: `/blog/${p.slug}`, label: p.title, description: p.description }))
  );
}

export function servicePageInternalLinks(serviceSlug: string) {
  const service = getServices().find((s) => s.slug === serviceSlug) ?? null;
  if (!service) return null;

  const parentHub: InternalLink = {
    href: "/services",
    label: "Services hub",
    description: "Browse electrical, landscaping, pest control, foundation, cleaning, plumbing, HVAC, and roofing guides.",
  };
  const siblings = siblingCoreServices(service.slug);
  const bestOf = bestOfForService(service);
  const neighborhood = neighborhoodForService(service);
  const blogs = blogLinksForService(service.slug);

  return {
    parentHub,
    siblings,
    bestOf,
    neighborhood,
    blogs,
  };
}

function relatedPostsForBlog(post: BlogPage): InternalLink[] {
  const all = getBlog().filter((p) => p.slug !== post.slug);
  const byService = all.filter((p) => p.relatedServiceSlugs.some((s) => post.relatedServiceSlugs.includes(s)));
  const byBest = all.filter((p) => p.relatedBestSlugs.some((b) => post.relatedBestSlugs.includes(b)));
  const combined = uniqByHref(
    [...byService, ...byBest, ...all].map((p) => ({ href: `/blog/${p.slug}`, label: p.title, description: p.description }))
  );
  return pick(combined, 2);
}

export function blogPageInternalLinks(blogSlug: string) {
  const post = getBlogBySlug(blogSlug);
  if (!post) return null;

  const services = getServices();
  const service = services.find((s) => post.relatedServiceSlugs.includes(s.slug)) ?? services.find((s) => s.slug === "plumber-georgetown-tx") ?? null;
  const best = post.relatedBestSlugs.length ? getBestBySlug(post.relatedBestSlugs[0]!) : null;
  const relatedPosts = relatedPostsForBlog(post);

  return {
    service: service ? { href: `/services/${service.slug}`, label: service.title, description: service.description } : null,
    bestOf: best ? { href: `/best/${best.slug}`, label: best.title, description: best.description } : { href: "/best", label: "Best Of hub" },
    relatedPosts,
  };
}

export function bestPageInternalLinks(bestSlug: string) {
  const best = getBestBySlug(bestSlug) as BestPage | null;
  if (!best) return null;

  const services = getServices();
  const coreServiceSlugs = CORE_SERVICE_SLUGS as readonly string[];
  const twoCore = pick(
    coreServiceSlugs
      .map((s) => services.find((x) => x.slug === s))
      .filter((s): s is ServicePage => Boolean(s)),
    2
  ).map((s) => ({ href: `/services/${s.slug}`, label: s.title, description: s.description }));

  const methodology: InternalLink = {
    href: "/methodology",
    label: "How we rank providers (methodology)",
    description: "What we measure, what we don’t, and how to use rankings responsibly.",
  };

  const guides = pick(getBlogsForBestSlug(best.slug), 2).map((p) => ({ href: `/blog/${p.slug}`, label: p.title, description: p.description }));

  return { twoCoreServices: twoCore, methodology, guides };
}

