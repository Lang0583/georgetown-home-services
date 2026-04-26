import type { NextConfig } from "next";

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
        permanent: false,
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
      // Neighborhood service pages had near-duplicate content with weak internal
      // linking — consolidated into their parent core-service pages to concentrate
      // authority signals and free crawl budget (see lib/public-site-scope.ts).
      {
        source: "/services/plumber-sun-city-georgetown-tx",
        destination: "/services/plumber-georgetown-tx",
        permanent: true,
      },
      {
        source: "/services/hvac-wolf-ranch-georgetown-tx",
        destination: "/services/hvac-georgetown-tx",
        permanent: true,
      },
      {
        source: "/services/roofer-berry-creek-georgetown-tx",
        destination: "/services/roofer-georgetown-tx",
        permanent: true,
      },

      // ──────────────────────────────────────────────────────────────────────
      // Phase 1 thin-content consolidation (April 2026).
      // 22 service pages with 87–142 word counts collapsed into the three
      // trade hubs to address (a) AdSense "Low value content" rejection and
      // (b) GSC "Discovered – currently not indexed" on ~67 URLs.
      // The hubs (`roofer`/`hvac`/`plumber`-georgetown-tx) absorb the topical
      // signal; the per-symptom variants are scheduled for substantive rewrite
      // and may return as full guides if/when they earn the word count.
      // Source slugs are mirrored in `lib/public-site-scope.ts`
      // `REDIRECTED_SERVICE_SLUGS` so sitemap/static-params/internal links
      // stay consistent. See `docs/seo-pipeline.md` and
      // `scripts/seo/propose-consolidation.ts`.
      // ──────────────────────────────────────────────────────────────────────

      // Roofing → /services/roofer-georgetown-tx
      { source: "/services/roof-repair-georgetown-tx",                 destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/roof-replacement-georgetown-tx",            destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/shingle-roof-repair-georgetown-tx",         destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/flashing-repair-georgetown-tx",             destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/gutter-installation-georgetown-tx",         destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/storm-damage-roof-repair-georgetown-tx",    destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/hail-damage-roof-repair-georgetown-tx",     destination: "/services/roofer-georgetown-tx", permanent: true },
      { source: "/services/emergency-roof-tarping-georgetown-tx",      destination: "/services/roofer-georgetown-tx", permanent: true },

      // HVAC → /services/hvac-georgetown-tx
      { source: "/services/ac-repair-georgetown-tx",                   destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/ac-replacement-georgetown-tx",              destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/furnace-repair-georgetown-tx",              destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/heater-repair-georgetown-tx",               destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/hvac-maintenance-georgetown-tx",            destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/ductwork-repair-georgetown-tx",             destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/thermostat-repair-georgetown-tx",           destination: "/services/hvac-georgetown-tx",   permanent: true },
      { source: "/services/indoor-air-quality-georgetown-tx",          destination: "/services/hvac-georgetown-tx",   permanent: true },

      // Plumbing → /services/plumber-georgetown-tx
      { source: "/services/water-heater-replacement-georgetown-tx",    destination: "/services/plumber-georgetown-tx", permanent: true },
      { source: "/services/leak-detection-georgetown-tx",              destination: "/services/plumber-georgetown-tx", permanent: true },
      { source: "/services/toilet-repair-georgetown-tx",               destination: "/services/plumber-georgetown-tx", permanent: true },
      { source: "/services/garbage-disposal-repair-georgetown-tx",     destination: "/services/plumber-georgetown-tx", permanent: true },
      { source: "/services/sewer-line-repair-georgetown-tx",           destination: "/services/plumber-georgetown-tx", permanent: true },
      { source: "/services/emergency-plumber-georgetown-tx",           destination: "/services/plumber-georgetown-tx", permanent: true },

      // Neighborhood location pages were thin (2 paragraphs of boilerplate);
      // redirect them to the primary Georgetown location hub.
      {
        source: "/locations/sun-city-georgetown-tx",
        destination: "/locations/georgetown-tx",
        permanent: true,
      },
      {
        source: "/locations/wolf-ranch-georgetown-tx",
        destination: "/locations/georgetown-tx",
        permanent: true,
      },
      {
        source: "/locations/berry-creek-georgetown-tx",
        destination: "/locations/georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/how-to-find-a-good-plumber-georgetown",
        destination: "/blog/how-to-find-a-good-plumber-georgetown-tx",
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
    ];
  },
};

export default nextConfig;
