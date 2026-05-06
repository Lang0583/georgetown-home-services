import { SITE_URL } from "@/lib/page-seo";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
/** Per IndexNow spec, max URLs per request. */
const MAX_URLS_PER_REQUEST = 10000;

function indexNowOriginAndHost(): { origin: string; host: string } {
  const base = SITE_URL.replace(/\/$/, "");
  const u = new URL(base.endsWith("/") ? base : `${base}/`);
  return { origin: u.origin, host: u.hostname };
}

export type IndexNowBatchResult = { status: number; ok: boolean; count: number };

/**
 * Submit absolute URLs to IndexNow. Chunks to stay within API limits.
 * No-op (returns []) when `INDEXNOW_KEY` is unset — logs a warning.
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowBatchResult[]> {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    console.warn("[indexnow] INDEXNOW_KEY not set — skipping IndexNow submission.");
    return [];
  }

  const { origin, host } = indexNowOriginAndHost();
  const keyLocation = `${origin}/${key}.txt`;
  const results: IndexNowBatchResult[] = [];

  const unique = [...new Set(urls.filter((u) => typeof u === "string" && u.startsWith("http")))];

  for (let i = 0; i < unique.length; i += MAX_URLS_PER_REQUEST) {
    const chunk = unique.slice(i, i + MAX_URLS_PER_REQUEST);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: chunk,
      }),
    });

    const ok = res.ok;
    results.push({ status: res.status, ok, count: chunk.length });

    if (!ok) {
      const body = await res.text().catch(() => "");
      console.warn(`[indexnow] IndexNow HTTP ${res.status} for ${chunk.length} URLs`, body.slice(0, 500));
    }
  }

  return results;
}
