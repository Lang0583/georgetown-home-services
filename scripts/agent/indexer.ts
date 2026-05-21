/**
 * Google Indexing API — URL_UPDATED notification.
 *
 * Env: GOOGLE_INDEXING_KEY — service account JSON string (same shape as GSC SA),
 *                             with indexing scope and Indexing API enabled in GCP,
 *                             and SA added as Owner in Search Console.
 */
import { JWT } from "google-auth-library";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const INDEXING_PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

export type Credentials = {
  client_email: string;
  private_key: string;
  [k: string]: unknown;
};

export type PublishResult =
  | { ok: true; url: string; status: number; body: unknown }
  | { ok: false; url: string; status: number; body: unknown; error?: string };

function readIndexingCredentials(): Credentials {
  const raw = process.env.GOOGLE_INDEXING_KEY?.trim();
  if (!raw) {
    throw new Error("[agent/indexer] Set GOOGLE_INDEXING_KEY to indexing service-account JSON.");
  }
  let parsed: Credentials;
  try {
    parsed = JSON.parse(raw) as Credentials;
  } catch (e) {
    throw new Error(`[agent/indexer] GOOGLE_INDEXING_KEY is not valid JSON: ${(e as Error).message}`);
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("[agent/indexer] indexing key missing client_email or private_key.");
  }
  parsed.private_key = String(parsed.private_key).replace(/\\n/g, "\n");
  return parsed;
}

async function accessToken(): Promise<string> {
  const creds = readIndexingCredentials();
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [INDEXING_SCOPE],
  });
  const { token } = await jwt.getAccessToken();
  if (!token) throw new Error("[agent/indexer] No access token (enable Indexing API; check key).");
  return token;
}

export async function publishUrlUpdated(url: string): Promise<PublishResult> {
  try {
    const bearer = await accessToken();
    const res = await fetch(INDEXING_PUBLISH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });
    const text = await res.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      /* plain text body */
    }
    if (!res.ok) {
      return { ok: false, url, status: res.status, body, error: `HTTP ${res.status}` };
    }
    return { ok: true, url, status: res.status, body };
  } catch (e) {
    return {
      ok: false,
      url,
      status: 0,
      body: null,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
