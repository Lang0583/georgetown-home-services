/**
 * Google Search Console — fetch underperforming URLs (high impressions, low clicks).
 *
 * Env (spec):
 *   GSC_SERVICE_ACCOUNT_JSON — full service account JSON (string).
 * Fallback (repo convention):
 *   GSC_SERVICE_ACCOUNT_KEY — same as above.
 *
 * Site property:
 *   GSC_SITE_URL — exact property id (recommended), e.g. https://www.example.com/ or sc-domain:example.com
 *   If unset, derives from SITE_URL (adds trailing slash for URL-prefix style).
 *
 * Requires Search Console API + service account invited to the property.
 */
import { google, type searchconsole_v1 } from "googleapis";

const MAX_ROWS = 10;

export type UnderperformingPage = {
  url: string;
  clicks: number;
  impressions: number;
};

export type Credentials = {
  client_email: string;
  private_key: string;
  [k: string]: unknown;
};

function readServiceAccountJson(): Credentials {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON?.trim() || process.env.GSC_SERVICE_ACCOUNT_KEY?.trim();
  if (!raw) {
    throw new Error(
      "[agent/gsc] Set GSC_SERVICE_ACCOUNT_JSON (or GSC_SERVICE_ACCOUNT_KEY) to the service-account JSON string.",
    );
  }
  let parsed: Credentials;
  try {
    parsed = JSON.parse(raw) as Credentials;
  } catch (e) {
    throw new Error(`[agent/gsc] Invalid service account JSON: ${(e as Error).message}`);
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("[agent/gsc] Service account JSON missing client_email or private_key.");
  }
  parsed.private_key = String(parsed.private_key).replace(/\\n/g, "\n");
  return parsed;
}

function formatYmd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function resolveSiteUrl(): string {
  const explicit = process.env.GSC_SITE_URL?.trim();
  if (explicit) return explicit;
  const base = process.env.SITE_URL?.trim();
  if (!base) {
    throw new Error("[agent/gsc] Set GSC_SITE_URL or SITE_URL for the Search Console property.");
  }
  const withSlash = base.endsWith("/") ? base : `${base}/`;
  return withSlash;
}

/** Authenticated Search Console client (read-only). */
export async function getSearchConsole(): Promise<searchconsole_v1.Searchconsole> {
  const creds = readServiceAccountJson();
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  await auth.authorize();
  return google.searchconsole({ version: "v1", auth });
}

/** Last complete 28-day window ending yesterday (GSC latency). */
function defaultDateRange(): { startDate: string; endDate: string } {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1); // yesterday
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27); // inclusive 28 days when span is 27 back + end
  return { startDate: formatYmd(start), endDate: formatYmd(end) };
}

function rowPageUrl(keys: string[] | undefined): string | undefined {
  if (!keys?.length) return undefined;
  const page = keys[0];
  return page || undefined;
}

/**
 * URLs with impressions > 50 AND clicks < 5, sorted by impressions desc, capped at `limit` (default 10).
 */
export async function fetchUnderperformingPages(options?: {
  rowLimit?: number;
  /** Override default relative end date window */
  days?: number;
}): Promise<UnderperformingPage[]> {
  const siteUrl = resolveSiteUrl();
  const sc = await getSearchConsole();
  const { startDate, endDate } =
    options?.days != null && options.days > 0
      ? (() => {
          const end = new Date();
          end.setUTCDate(end.getUTCDate() - 1);
          const start = new Date(end);
          start.setUTCDate(start.getUTCDate() - (options.days! - 1));
          return { startDate: formatYmd(start), endDate: formatYmd(end) };
        })()
      : defaultDateRange();

  const resp = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["page"],
      rowLimit: 1000,
      type: "web",
      dataState: "final",
    },
  });

  const rows = resp.data.rows ?? [];

  const filtered: UnderperformingPage[] = [];
  for (const row of rows) {
    const url = rowPageUrl(row.keys ?? []);
    if (!url) continue;
    const impressions = Number(row.impressions ?? 0);
    const clicks = Number(row.clicks ?? 0);
    if (impressions > 50 && clicks < 5) {
      filtered.push({ url, clicks, impressions });
    }
  }

  filtered.sort((a, b) => b.impressions - a.impressions);
  const limit = options?.rowLimit ?? MAX_ROWS;
  return filtered.slice(0, limit);
}
