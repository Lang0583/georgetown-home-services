/**
 * Approximate visible editorial word counts (excludes sitewide nav/footer shell).
 * Methodology documented in stdout footer.
 */
import fs from "node:fs";
import path from "node:path";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "../data/neighborhood-home-services-hubs";
import { NEIGHBORHOOD_HAIL_PAGES } from "../data/neighborhood-hail-pages";
import { neighborhoodServicePages } from "../data/neighborhoods";
import generated from "../lib/generatedPages.json";
import { COST_POST_SUPPLEMENTS, findCategory } from "../lib/pricing-data";
import { resolveBestPage, resolveServicePage } from "../lib/pageContentRegistry";
import { buildSitemapEntries } from "../lib/sitemap-entries";
import type { ContentBlock, Faq } from "../lib/site-content";
import { getBlogBySlug, getLocationBySlug } from "../lib/site-content";
import { resolveServiceGuideFaqs } from "../lib/georgetown-page-faqs";

const ROOT = path.join(process.cwd());

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

function countFaqs(faqs: Faq[] | undefined): number {
  if (!faqs?.length) return 0;
  return faqs.reduce((n, f) => n + countWords(`${f.q} ${f.a}`), 0);
}

function countBlocks(blocks: ContentBlock[]): number {
  let n = 0;
  for (const b of blocks) {
    if (b.kind === "p" && "text" in b) n += countWords(b.text);
    if (b.kind === "p" && "parts" in b) {
      for (const p of b.parts) {
        if (p.type === "text") n += countWords(p.text);
        if (p.type === "link") n += countWords(p.label);
      }
    }
    if (b.kind === "h2" || b.kind === "h3") n += countWords(b.text);
    if (b.kind === "ul") n += b.items.reduce((s, i) => s + countWords(i), 0);
    if (b.kind === "affiliateDisclosure") n += countWords(b.text);
  }
  return n;
}

function tsxVisibleStrings(filePath: string): number {
  const abs = path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) return 0;
  const src = fs.readFileSync(abs, "utf8");
  const noImport = src.replace(/^import\s.+?;$/gm, "");
  let words = 0;
  const re = />([^<]{3,})</g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(noImport))) {
    const t = m[1].trim();
    if (t.includes("{") || t.startsWith("/")) continue;
    words += countWords(t.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  }
  // Quoted UI strings in objects / arrays / props (min length 20)
  const qre = /["']([A-Za-z][^"'{}]{20,850})["']/g;
  while ((m = qre.exec(noImport))) {
    const t = m[1].trim();
    if (/\$\{/.test(t) || /className/.test(t) || /http/.test(t)) continue;
    words += countWords(t);
  }
  return words;
}

function frameworkTradeWords(trade: "plumber" | "hvac" | "roofer"): number {
  const abs = path.join(ROOT, "components/CoreServiceGuideDecisionFramework.tsx");
  const t = fs.readFileSync(abs, "utf8");
  const keys = { plumber: "plumber:", hvac: "hvac:", roofer: "roofer:" } as const;
  const next = { plumber: "hvac:", hvac: "roofer:", roofer: "};" } as const;
  const start = t.indexOf(keys[trade]);
  const end = t.indexOf(next[trade], start + 5);
  if (start < 0 || end < 0) return 0;
  const chunk = t.slice(start, end);
  const plain = chunk.replace(/<[^>]+>/g, " ").replace(/\{[^}]+\}/g, " ");
  return countWords(plain);
}

function serviceIntroTemplateWords(slug: string): number {
  /** Opening <p> + trade-specific sections in app/services/[slug]/page.tsx (excludes GeneratedArticleBody HTML — counted via resolved.html). */
  const abs = path.join(ROOT, "app/services/[slug]/page.tsx");
  const full = fs.readFileSync(abs, "utf8");
  const slugToFlag: Record<string, string> = {
    "plumber-georgetown-tx": "isPlumberService",
    "hvac-georgetown-tx": "isHvacService",
    "roofer-georgetown-tx": "isRooferService",
  };
  const flag = slugToFlag[slug];
  if (!flag) {
    const m = full.match(/<p className="mt-4 text-lg leading-relaxed text-gray-700">\{service\.description\}<\/p>/);
    return m ? countWords("fallback uses service.description — already counted") : 0;
  }
  const idx = full.indexOf(`{${flag} ? (`);
  if (idx < 0) return 0;
  // Grab a large window after first conditional block inside main article (nested blocks)
  const window = full.slice(idx, idx + 120_000);
  // Stop before next top-level `) : is` chain at same depth is fragile; cap at "GeneratedArticleBody" anchor
  const stop = window.indexOf("<GeneratedArticleBody");
  const chunk = stop > 0 ? window.slice(0, stop) : window.slice(0, 45_000);
  const plain = chunk.replace(/<[^>]+>/g, " ").replace(/\{[^}]+\}/g, " ");
  return countWords(plain);
}

function blogSupplementWords(slug: string): number {
  const sup = COST_POST_SUPPLEMENTS[slug];
  if (!sup) return 0;
  const cat = findCategory(sup.category);
  let n = countWords(`${sup.heading} ${sup.lede}`);
  for (const job of sup.rowJobs) {
    const row = cat.rows.find((r) => r.job === job);
    if (row) n += countWords(`${row.job} ${row.displayRange ?? `${row.low} ${row.high}`}`);
  }
  return n;
}

function wordCountBlogPost(slug: string): number {
  const post = getBlogBySlug(slug);
  if (!post) return 0;
  const gen = (generated as Record<string, { html: string }>)[slug];
  let n =
    countWords(`${post.h1} ${post.description}`) + countBlocks(post.content) + (gen ? countWords(stripHtml(gen.html)) : 0);
  n += blogSupplementWords(slug);
  return n;
}

function wordCountService(slug: string): number {
  const r = resolveServicePage(slug);
  if (!r) return 0;
  const faqs = resolveServiceGuideFaqs(r.record);
  let n =
    countWords(`${r.record.h1 ?? ""} ${r.record.description}`) +
    r.record.heroBullets.reduce((s, b) => s + countWords(b), 0) +
    countBlocks(r.content) +
    (r.html ? countWords(stripHtml(r.html)) : 0) +
    countFaqs(faqs);
  if (slug === "plumber-georgetown-tx" || slug === "hvac-georgetown-tx" || slug === "roofer-georgetown-tx") {
    n += frameworkTradeWords(slug === "plumber-georgetown-tx" ? "plumber" : slug === "hvac-georgetown-tx" ? "hvac" : "roofer");
    n += serviceIntroTemplateWords(slug);
  }
  return n;
}

function wordCountBest(slug: string): number {
  const r = resolveBestPage(slug);
  if (!r) return 0;
  let n =
    countWords(`${r.record.h1 ?? ""} ${r.record.description}`) + countBlocks(r.content) + (r.html ? countWords(stripHtml(r.html)) : 0);
  if (r.record.featuredPartner) {
    n += countWords(
      `${r.record.featuredPartner.name} ${r.record.featuredPartner.description} ${r.record.featuredPartner.disclosureLabel ?? ""}`,
    );
  }
  return n;
}

function wordCountLocation(slug: string): number {
  const loc = getLocationBySlug(slug);
  if (!loc) return 0;
  return (
    countWords(`${loc.h1} ${loc.description}`) +
    loc.heroBullets.reduce((s, b) => s + countWords(b), 0) +
    countBlocks(loc.content) +
    countFaqs(loc.faqs)
  );
}

function neighborhoodServiceWords(neighborhood: string, service: string): number {
  const p = neighborhoodServicePages.find((x) => x.neighborhoodSlug === neighborhood && x.serviceSlug === service);
  if (!p) return 0;
  const issues = p.commonIssues.reduce((s, i) => s + countWords(i), 0);
  const links = p.internalLinks.reduce((s, l) => s + countWords(l.label), 0);
  return (
    countWords(`${p.h1} ${p.metaDescription} ${p.intro} ${p.whyLocal}`) +
    issues +
    links +
    countWords(`${p.serviceName} ${p.serviceCategory}`)
  );
}

function neighborhoodHubWords(neighborhoodSlug: string): number {
  const h = NEIGHBORHOOD_HOME_SERVICES_HUBS.find((x) => x.neighborhoodSlug === neighborhoodSlug);
  if (!h) return 0;
  return countWords(`${h.h1} ${h.metaDescription}`) + countWords(stripHtml(h.introHtml));
}

function neighborhoodHailWords(neighborhoodSlug: string): number {
  const p = NEIGHBORHOOD_HAIL_PAGES.find((x) => x.neighborhoodSlug === neighborhoodSlug);
  if (!p) return 0;
  return countWords(`${p.h1} ${p.metaDescription}`) + countWords(stripHtml(p.bodyHtml)) + countFaqs(p.faqs);
}

/** Trade hubs that include `ServiceHubPricingSection` (pricing table + extra copy). */
function tradeHubWords(trade: "plumbing" | "hvac" | "roofing"): number {
  const cat = findCategory(trade);
  let n =
    countWords(cat.intro + cat.localContext) + cat.rows.reduce((s, r) => s + countWords(r.job + (r.displayRange ?? "")), 0);
  const dir = trade === "plumbing" ? "plumbing" : trade === "hvac" ? "hvac" : "roofing";
  n += tsxVisibleStrings(`app/services/${dir}/page.tsx`);
  return n;
}

const EXTENDED_TRADE_HUB_FILES: Record<string, string> = {
  electrical: "app/services/electrical/page.tsx",
  landscaping: "app/services/landscaping/page.tsx",
  "pest-control": "app/services/pest-control/page.tsx",
  foundation: "app/services/foundation/page.tsx",
  "house-cleaning": "app/services/house-cleaning/page.tsx",
};

function extendedTradeHubWords(segment: string): number {
  const file = EXTENDED_TRADE_HUB_FILES[segment];
  if (!file) return 0;
  let n = tsxVisibleStrings(file);
  const pricingKey = (
    {
      electrical: "electrical",
      landscaping: "landscaping",
      "pest-control": "pest",
      foundation: "foundation",
      "house-cleaning": "cleaning",
    } as const
  )[segment as keyof typeof EXTENDED_TRADE_HUB_FILES];
  if (pricingKey) {
    const cat = findCategory(pricingKey);
    n += countWords(cat.intro + cat.localContext);
    n += cat.rows.reduce((s, r) => s + countWords(r.job + (r.displayRange ?? "")), 0);
  }
  return n;
}

function staticPageWords(route: string): number {
  const map: Record<string, string> = {
    "/": "app/page.tsx",
    "/services": "app/services/page.tsx",
    "/best": "app/best/page.tsx",
    "/blog": "app/blog/page.tsx",
    "/pricing": "app/pricing/page.tsx",
    "/pricing/calculator": "app/pricing/calculator/page.tsx",
    "/methodology": "app/methodology/page.tsx",
    "/editorial-policy": "app/editorial-policy/page.tsx",
    "/service-areas": "app/service-areas/page.tsx",
    "/contact": "app/contact/page.tsx",
    "/about": "app/about/page.tsx",
    "/privacy-policy": "app/privacy-policy/page.tsx",
    "/terms": "app/terms/page.tsx",
    "/authors/cole-reinhardt": "app/authors/cole-reinhardt/page.tsx",
  };
  const file = map[route];
  if (!file) return 0;
  let w = tsxVisibleStrings(file);
  if (route === "/") {
    w += tsxVisibleStrings("components/HomeHowItWorks.tsx") + tsxVisibleStrings("components/HomeTrustBar.tsx");
    /** Homepage FAQs — duplicated from app/page.tsx */
    const home = fs.readFileSync(path.join(ROOT, "app/page.tsx"), "utf8");
    const faqMatch = home.match(/const HOME_PAGE_FAQS[^[]+\[([\s\S]*?)\];\s*function homeFaqPageJsonLd/);
    if (faqMatch) w += countWords(faqMatch[1].replace(/q:|a:|"/g, " "));
  }
  return w;
}

function pathnameWordCount(pathname: string): number {
  const segments = pathname.split("/").filter(Boolean);
  if (pathname === "/") return staticPageWords("/");
  if (segments[0] === "services" && segments.length === 1) return staticPageWords("/services");
  if (segments[0] === "services" && segments.length === 2) {
    const seg = segments[1]!;
    if (seg === "plumbing") return tradeHubWords("plumbing");
    if (seg === "hvac") return tradeHubWords("hvac");
    if (seg === "roofing") return tradeHubWords("roofing");
    if (EXTENDED_TRADE_HUB_FILES[seg]) return extendedTradeHubWords(seg);
    return wordCountService(seg);
  }
  if (segments[0] === "best" && segments.length === 1) return staticPageWords("/best");
  if (segments[0] === "best" && segments.length === 2) return wordCountBest(segments[1]!);
  if (segments[0] === "blog" && segments.length === 1) return staticPageWords("/blog");
  if (segments[0] === "blog" && segments.length === 2) return wordCountBlogPost(segments[1]!);
  if (segments[0] === "locations" && segments.length === 2) return wordCountLocation(segments[1]!);
  if (segments[0] === "neighborhoods" && segments.length === 3 && segments[2] === "home-services")
    return neighborhoodHubWords(segments[1]!);
  if (segments[0] === "neighborhoods" && segments.length === 3 && segments[2] === "hail-damage")
    return neighborhoodHailWords(segments[1]!);
  if (segments[0] === "neighborhoods" && segments.length === 3) return neighborhoodServiceWords(segments[1]!, segments[2]!);
  if (segments[0] === "pricing" && segments[1] === "calculator") return staticPageWords("/pricing/calculator");
  if (segments[0] === "pricing") return staticPageWords("/pricing");
  if (pathname === "/methodology") return staticPageWords("/methodology");
  if (pathname === "/editorial-policy") return staticPageWords("/editorial-policy");
  if (pathname === "/service-areas") return staticPageWords("/service-areas");
  if (pathname === "/contact") return staticPageWords("/contact");
  if (pathname === "/about") return staticPageWords("/about");
  if (pathname === "/privacy-policy") return staticPageWords("/privacy-policy");
  if (pathname === "/terms") return staticPageWords("/terms");
  if (pathname.startsWith("/authors/")) return staticPageWords("/authors/cole-reinhardt");
  return 0;
}

function urlToPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.endsWith("/") && u.pathname !== "/" ? u.pathname.slice(0, -1) : u.pathname;
  } catch {
    return "/";
  }
}

const entries = buildSitemapEntries();
const THRESHOLD = 400;

const results: { path: string; words: number; thin: boolean }[] = [];
for (const e of entries) {
  const p = urlToPath(e.url);
  const words = pathnameWordCount(p);
  results.push({ path: p, words, thin: words < THRESHOLD });
}

results.sort((a, b) => a.words - b.words);
const thin = results.filter((r) => r.thin);

console.log(JSON.stringify({ threshold: THRESHOLD, total: results.length, thinCount: thin.length, thin, all: results }, null, 0));
console.error(
  "\nMethodology: Blog/service/best/location/neighborhood counts use article HTML + structured blocks + on-page FAQs. " +
    "Core trade service guides add decision-framework copy + estimated template sections before GeneratedArticleBody. " +
    "Trade hubs add pricing table jobs/ranges + TSX-visible strings. " +
    "Other static routes use TSX text extraction (strings between JSX tags + long quoted literals) + homepage FAQ source. " +
    "Excluded sitewide: header nav, footer, repeated chrome, and JSON-LD. " +
    "Directory listing grids (many business names on /best index or homepage provider columns) are not fully counted—actual visible tokens may be higher there.",
);
