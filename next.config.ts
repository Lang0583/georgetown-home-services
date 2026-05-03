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
