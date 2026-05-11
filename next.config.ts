import type { NextConfig } from "next";
import { REDIRECTED_SERVICE_TO_HUB } from "./lib/public-site-scope";

const serviceHubRedirects = Object.entries(REDIRECTED_SERVICE_TO_HUB).map(([slug, hub]) => ({
  source: `/services/${slug}`,
  destination: `/services/${hub}`,
  permanent: true as const,
}));

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/sitemap.xml", destination: "/api/sitemap-xml" }],
    };
  },
  /** Default false: Next also normalizes trailing slashes on matched routes; we still 301 common alias paths below. */
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // —— Duplicate / alias paths → canonical (301) ——
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/blog/hail-damage-georgetown-tx-may-2026",
        destination: "/blog/hail-damage-georgetown-williamson-may-2026",
        permanent: true,
      },
      // Short CTAs from blog / campaigns → trade hub canonical URLs.
      {
        source: "/roofing",
        destination: "/services/roofing",
        permanent: false,
      },
      {
        source: "/hvac",
        destination: "/services/hvac",
        permanent: false,
      },
      // Harmless `?page=1` on non-paginated hubs equals the bare URL — strip the param.
      {
        source: "/blog",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/services",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/services",
        permanent: true,
      },
      {
        source: "/best",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/best",
        permanent: true,
      },
      {
        source: "/pricing",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/service-areas",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        has: [{ type: "query", key: "page", value: "1" }],
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      // Legacy next-sitemap URLs (pre-aa6f22e). Google Search Console and any
      // stale external references may still hit these; redirect to the single
      // flat sitemap so crawlers self-heal instead of getting a 404 HTML page.
      {
        source: "/sitemap-:index(\\d+).xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      ...serviceHubRedirects,

      // Old plumber blog URLs → single canonical post (one hop each — avoids GSC redirect chains)
      {
        source: "/blog/how-to-find-a-good-plumber-georgetown-tx",
        destination: "/blog/how-to-choose-a-reliable-plumber-georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/how-to-find-a-good-plumber-georgetown",
        destination: "/blog/how-to-choose-a-reliable-plumber-georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/roof-repair-cost-georgetown",
        destination: "/blog/roof-repair-cost-georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/how-to-choose-plumber-georgetown-tx",
        destination: "/blog/how-to-choose-a-reliable-plumber-georgetown-tx",
        permanent: true,
      },
      // Author byline moved from a single-name slug to the full pen-name slug
      // when the bio was expanded with full E-E-A-T context. Keep this 308 in
      // place permanently — Article schema and any external links still
      // reference the old path.
      {
        source: "/authors/matt",
        destination: "/authors/cole-reinhardt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
