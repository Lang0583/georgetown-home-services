import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/page-seo";

/**
 * AI / GEO crawler policy (2026):
 * - Retrieval bots stay allowed so ChatGPT / Perplexity / Claude can cite us.
 * - Training bots are allowed (local directory wants model familiarity).
 * - Broad scrapers (CCBot, Bytespider) are disallowed.
 * - `/api/` and `/admin/` remain closed to everyone.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  const disallowApp = ["/api/", "/admin/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: disallowApp },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: disallowApp },
      { userAgent: "ChatGPT-User", allow: "/", disallow: disallowApp },
      { userAgent: "PerplexityBot", allow: "/", disallow: disallowApp },
      { userAgent: "Perplexity-User", allow: "/", disallow: disallowApp },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: disallowApp },
      { userAgent: "Claude-User", allow: "/", disallow: disallowApp },
      { userAgent: "Applebot", allow: "/", disallow: disallowApp },
      { userAgent: "Applebot-Extended", allow: "/", disallow: disallowApp },
      { userAgent: "GPTBot", allow: "/", disallow: disallowApp },
      { userAgent: "ClaudeBot", allow: "/", disallow: disallowApp },
      { userAgent: "Google-Extended", allow: "/", disallow: disallowApp },
      { userAgent: "anthropic-ai", allow: "/", disallow: disallowApp },
      { userAgent: "GoogleOther", allow: "/", disallow: disallowApp },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
