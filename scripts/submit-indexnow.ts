/**
 * Submit every URL from `buildSitemapEntries()` to IndexNow.
 *
 * Usage (after deploy or locally with INDEXNOW_KEY + SITE_URL):
 *   npx tsx scripts/submit-indexnow.ts
 *
 * Optional: post to your deployed API instead (requires INDEXNOW_SUBMIT_SECRET on server):
 *   INDEXNOW_SUBMIT_URL=https://www.example.com INDEXNOW_SUBMIT_SECRET=... npx tsx scripts/submit-indexnow.ts
 */
import { buildSitemapEntries } from "@/lib/sitemap-entries";
import { submitUrlsToIndexNow } from "@/lib/indexnow-submit";

async function main() {
  const viaApi = process.env.INDEXNOW_SUBMIT_URL?.trim();
  const urls = buildSitemapEntries().map((e) => e.url);

  console.log(`[indexnow] URLs to submit: ${urls.length}`);

  if (viaApi) {
    const secret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();
    if (!secret) {
      console.error("[indexnow] INDEXNOW_SUBMIT_SECRET is required when INDEXNOW_SUBMIT_URL is set.");
      process.exit(1);
    }
    const res = await fetch(`${viaApi.replace(/\/$/, "")}/api/indexnow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ urls }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; batches?: unknown };
    console.log("[indexnow] API response", res.status, data);
    process.exit(res.ok ? 0 : 1);
    return;
  }

  const batches = await submitUrlsToIndexNow(urls);
  if (batches.length === 0) {
    process.exit(0);
    return;
  }

  const failed = batches.filter((b) => !b.ok);
  if (failed.length) {
    console.error("[indexnow] One or more batches failed:", failed);
    process.exit(1);
  }

  console.log("[indexnow] All batches OK:", batches);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
