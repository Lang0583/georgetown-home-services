/**
 * Autonomous SEO agent — orchestrates GSC targeting, Claude rewrites,
 * Indexing API ping, and Resend summary.
 *
 * Run from repo root (uses root node_modules):
 *   npx tsx --env-file=.env.local scripts/agent/index.ts
 *
 * Env:
 *   ANTHROPIC_API_KEY
 *   GSC_SERVICE_ACCOUNT_JSON  (or GSC_SERVICE_ACCOUNT_KEY)
 *   GSC_SITE_URL              (recommended) or SITE_URL + derived property
 *   GOOGLE_INDEXING_KEY       SA JSON string with indexing enabled
 *   RESEND_API_KEY
 *   RECIPIENT_EMAIL
 *   SITE_URL                  fetch pages from this origin (e.g. https://www.georgetownhomeservices.com)
 *   NEWSLETTER_FROM_EMAIL     optional validated Resend sender
 */
import process from "node:process";

import { fetchUnderperformingPages } from "./gsc";
import { rewritePageContent, type PageContentInput } from "./rewriter";
import { publishUrlUpdated } from "./indexer";
import { sendAgentReport, type ReportRow } from "./reporter";

function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)));
}

/** Inner text of first tag matched (no recursion). */
function innerTextRough(raw: string): string {
  return decodeEntities(raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractMetaDescription(html: string): string {
  const m =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  return m?.[1] ? decodeEntities(innerTextRough(m[1])) : "";
}

function extractTitle(html: string): string {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  if (og?.[1]) return decodeEntities(innerTextRough(og[1]));
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return t?.[1] ? decodeEntities(innerTextRough(t[1])) : "";
}

function extractH1(html: string): string {
  const h = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return h?.[1] ? decodeEntities(innerTextRough(h[1])) : "";
}

/** Main landmark-ish body excerpt; coarse but avoids pulling nav/footer in many layouts */
function extractBodyPlain(htmlClean: string): string {
  const main = htmlClean.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const article = htmlClean.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  const body = htmlClean.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const blob = main?.[1] ?? article?.[1] ?? body?.[1] ?? htmlClean;
  let text = blob.replace(/<[^>]+>/g, " ");
  text = decodeEntities(text);
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

function firstWords(text: string, n: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.slice(0, n).join(" ");
}

export async function fetchPageSnapshot(absUrl: string): Promise<PageContentInput> {
  const res = await fetch(absUrl, {
    headers: { "user-agent": "GHS-SEO-Agent/1.0 (editorial prefetch)" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`[agent] Fetch failed ${res.status} ${absUrl}`);
  }
  const html = await res.text();
  const lean = stripScriptsAndStyles(html);
  let h1 = extractH1(lean);
  const title = extractTitle(lean);
  if (!h1) h1 = title;
  let metaDescription = extractMetaDescription(lean);
  if (!metaDescription) metaDescription = firstWords(extractBodyPlain(lean).slice(0, 500), 24);

  const bodyPlain = extractBodyPlain(lean);
  let bodyStart = bodyPlain;
  if (h1 && bodyPlain.toLowerCase().startsWith(h1.toLowerCase())) {
    bodyStart = bodyPlain.slice(h1.length).trim();
  }
  const excerpt = firstWords(bodyStart || bodyPlain, 200);

  return {
    url: absUrl,
    h1: h1 || title || absUrl,
    metaDescription,
    firstWords: excerpt || firstWords(bodyPlain, 200) || "(no extractable body text)",
  };
}

export function normalizeSiteOrigin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) {
    throw new Error("[agent] SITE_URL required (e.g. https://www.georgetownhomeservices.com)");
  }
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function ensureAbsoluteUrl(hrefOrAbs: string): string {
  if (hrefOrAbs.startsWith("http://") || hrefOrAbs.startsWith("https://")) return hrefOrAbs;
  const base = normalizeSiteOrigin();
  const pathOnly = hrefOrAbs.startsWith("/") ? hrefOrAbs : `/${hrefOrAbs}`;
  return `${base}${pathOnly}`;
}

async function main() {
  const pages = await fetchUnderperformingPages();
  console.log(`[agent] Found ${pages.length} underperforming URLs (≤10).`);

  const reportRows: ReportRow[] = [];

  for (const p of pages) {
    const absUrl = ensureAbsoluteUrl(p.url);
    let snapshot: PageContentInput;
    try {
      snapshot = await fetchPageSnapshot(absUrl);
    } catch (e) {
      console.warn(`[agent] Skip fetch ${absUrl}:`, e instanceof Error ? e.message : e);
      reportRows.push({
        url: absUrl,
        oldH1: "",
        newH1: "",
        indexingLabel: `Skipped (fetch): ${e instanceof Error ? e.message : String(e)}`,
      });
      continue;
    }

    let rewritten;
    try {
      rewritten = await rewritePageContent(snapshot);
    } catch (e) {
      console.warn(`[agent] Rewrite failed ${absUrl}:`, e instanceof Error ? e.message : e);
      reportRows.push({
        url: absUrl,
        oldH1: snapshot.h1,
        newH1: "(rewrite failed)",
        indexingLabel: "Not submitted",
      });
      continue;
    }

    const indexResult = await publishUrlUpdated(absUrl);
    const indexingLabel =
      indexResult.ok && "status" in indexResult ? `Submitted (${indexResult.status})` : `Failed: ${JSON.stringify(indexResult)}`;

    reportRows.push({
      url: absUrl,
      oldH1: snapshot.h1,
      newH1: rewritten.h1,
      indexingLabel,
    });

    console.log(`[agent] OK ${absUrl}`);
  }

  await sendAgentReport(reportRows);
  console.log("[agent] Report emailed.");
}

main().catch((err) => {
  console.error("[agent]", err);
  process.exit(1);
});
