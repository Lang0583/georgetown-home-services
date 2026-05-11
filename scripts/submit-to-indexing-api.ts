/**
 * Submit hard-coded URLs to Google Indexing API (URL_UPDATED).
 *
 * Prerequisites:
 * - Google Cloud project with "Web Search Indexing API" enabled
 * - Service account JSON key; owner must add the SA email in Google Search Console
 *
 * Local:
 *   export GOOGLE_SERVICE_ACCOUNT_KEY_PATH=/path/to/key.json
 *   npx ts-node scripts/submit-to-indexing-api.ts
 *
 * CI writes the JSON to a file and sets the same env var (see `.github/workflows/post-deploy-indexing.yml`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { GoogleAuth } from "google-auth-library";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const INDEXING_PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

/** Canonical marketing URLs to notify Google about after publishes. */
const URLS_TO_SUBMIT: readonly string[] = [
  "https://georgetownhomeservices.com/blog/hail-damage-georgetown-tx-may-2026",
  "https://georgetownhomeservices.com/blog/hail-damage-sun-city-georgetown-tx",
  "https://georgetownhomeservices.com/blog/hail-damage-teravista-georgetown-tx",
  "https://georgetownhomeservices.com/blog/hail-damage-wolf-ranch-georgetown-tx",
  "https://georgetownhomeservices.com/blog/hail-damage-georgetown-village-tx",
];

function resolveKeyPath(): string {
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim();
  if (!keyPath) {
    console.error("[indexing-api] Set GOOGLE_SERVICE_ACCOUNT_KEY_PATH to your service account JSON file.");
    process.exit(1);
  }
  const resolved = path.isAbsolute(keyPath) ? keyPath : path.resolve(process.cwd(), keyPath);
  if (!fs.existsSync(resolved)) {
    console.error(`[indexing-api] Service account file not found: ${resolved}`);
    process.exit(1);
  }
  return resolved;
}

async function getAccessToken(keyFile: string): Promise<string> {
  const auth = new GoogleAuth({
    keyFile,
    scopes: [INDEXING_SCOPE],
  });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) {
    throw new Error("No access token returned (check key file and Indexing API enablement).");
  }
  return token;
}

async function publishUrl(accessToken: string, url: string) {
  const res = await fetch(INDEXING_PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      type: "URL_UPDATED",
    }),
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text) as unknown;
  } catch {
    body = text;
  }

  return { ok: res.ok, status: res.status, body };
}

async function main() {
  const keyFile = resolveKeyPath();
  const accessToken = await getAccessToken(keyFile);

  let anyFailed = false;
  for (const url of URLS_TO_SUBMIT) {
    try {
      const result = await publishUrl(accessToken, url);
      if (result.ok) {
        console.log(`[indexing-api] OK ${url} (${result.status})`, result.body);
      } else {
        anyFailed = true;
        console.error(`[indexing-api] FAIL ${url} (${result.status})`, result.body);
      }
    } catch (e) {
      anyFailed = true;
      console.error(`[indexing-api] FAIL ${url}`, e instanceof Error ? e.message : e);
    }
  }

  if (anyFailed) {
    console.error("[indexing-api] One or more submissions failed.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[indexing-api]", err);
  process.exit(1);
});
