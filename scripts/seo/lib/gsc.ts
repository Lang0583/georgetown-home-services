/**
 * Google Search Console client for the SEO pipeline.
 *
 * Authenticates via a service-account JSON key stored in the
 * `GSC_SERVICE_ACCOUNT_KEY` environment variable. The site URL is read from
 * `GSC_SITE_URL` (e.g. `sc-domain:georgetownhomeservices.com` for a Domain
 * property, or `https://www.georgetownhomeservices.com/` for a URL-prefix
 * property — GSC returns different result sets for each).
 *
 * All calls are read-only (`webmasters.readonly` scope). This file never
 * writes to GSC.
 *
 * Setup (one-time):
 *   1. In GCP: create a service account, enable the Google Search Console API,
 *      download a JSON key.
 *   2. In GSC: grant that service-account email "Full" (or "Restricted" with
 *      read access) permissions on the property.
 *   3. Locally/CI: set `GSC_SERVICE_ACCOUNT_KEY` to the full JSON key contents
 *      and `GSC_SITE_URL` to the property identifier.
 */
import { google, type searchconsole_v1 } from "googleapis";

const SEARCHANALYTICS_MAX_ROW_LIMIT = 25_000;

export type Credentials = {
  client_email: string;
  private_key: string;
  [k: string]: unknown;
};

function readServiceAccountKey(): Credentials {
  const raw = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "[seo/gsc] GSC_SERVICE_ACCOUNT_KEY env var missing. Set it to the JSON contents of a Google Cloud service-account key that has access to your Search Console property.",
    );
  }
  let parsed: Credentials;
  try {
    parsed = JSON.parse(raw) as Credentials;
  } catch (err) {
    throw new Error(
      `[seo/gsc] GSC_SERVICE_ACCOUNT_KEY is not valid JSON: ${(err as Error).message}`,
    );
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error(
      "[seo/gsc] Service-account key missing `client_email` or `private_key`.",
    );
  }
  // GitHub Actions secrets often strip newlines from the private_key. Restore.
  parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  return parsed;
}

export function getSiteUrl(): string {
  const url = process.env.GSC_SITE_URL;
  if (!url) {
    throw new Error(
      "[seo/gsc] GSC_SITE_URL env var missing. Examples: `sc-domain:georgetownhomeservices.com` (Domain property) or `https://www.georgetownhomeservices.com/` (URL-prefix property).",
    );
  }
  return url;
}

/** Authenticated Search Console client. */
export async function getSearchConsole(): Promise<searchconsole_v1.Searchconsole> {
  const creds = readServiceAccountKey();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  await auth.authorize();
  return google.searchconsole({ version: "v1", auth });
}

/**
 * Run a Search Analytics query against the configured property. Automatically
 * paginates when results exceed `rowLimit` so we don't silently drop data.
 */
export async function searchAnalyticsQuery(
  sc: searchconsole_v1.Searchconsole,
  siteUrl: string,
  params: {
    startDate: string;
    endDate: string;
    dimensions: Array<"page" | "query" | "country" | "device" | "date">;
    rowLimit?: number;
    /** Optional search-type filter (web, image, video). Defaults to web. */
    searchType?: "web" | "image" | "video" | "news";
  },
): Promise<searchconsole_v1.Schema$ApiDataRow[]> {
  const pageSize = Math.min(params.rowLimit ?? 5000, SEARCHANALYTICS_MAX_ROW_LIMIT);
  let startRow = 0;
  const all: searchconsole_v1.Schema$ApiDataRow[] = [];
  // Hard cap defensively at 40k rows — we should never actually hit this for
  // a directory site of this size, but it prevents runaway CI costs.
  const HARD_CAP = 40_000;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const resp = await sc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: params.startDate,
        endDate: params.endDate,
        dimensions: params.dimensions,
        rowLimit: pageSize,
        startRow,
        type: params.searchType ?? "web",
      },
    });
    const rows = resp.data.rows ?? [];
    all.push(...rows);
    if (rows.length < pageSize) break;
    startRow += rows.length;
    if (all.length >= HARD_CAP) {
      console.warn(
        `[seo/gsc] Hit hard cap of ${HARD_CAP} rows — truncating further pagination.`,
      );
      break;
    }
  }
  return all;
}

/** Format a date as YYYY-MM-DD (GSC-compatible). */
export function formatGscDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
