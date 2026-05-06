import { NextResponse } from "next/server";
import { submitUrlsToIndexNow } from "@/lib/indexnow-submit";

const MAX_BODY_URLS = 10000;

/**
 * POST JSON `{ "urls": string[] }` to submit URLs to IndexNow.
 * When `INDEXNOW_SUBMIT_SECRET` is set, require header `Authorization: Bearer <secret>`.
 */
export async function POST(req: Request) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("urls" in body)) {
    return NextResponse.json({ error: "Expected { urls: string[] }" }, { status: 400 });
  }

  const urls = (body as { urls: unknown }).urls;
  if (!Array.isArray(urls) || !urls.every((u) => typeof u === "string")) {
    return NextResponse.json({ error: "urls must be an array of strings" }, { status: 400 });
  }

  if (urls.length > MAX_BODY_URLS) {
    return NextResponse.json({ error: `At most ${MAX_BODY_URLS} URLs per request` }, { status: 400 });
  }

  if (!process.env.INDEXNOW_KEY?.trim()) {
    return NextResponse.json({ error: "INDEXNOW_KEY is not configured" }, { status: 503 });
  }

  const batches = await submitUrlsToIndexNow(urls);
  return NextResponse.json({
    ok: batches.every((b) => b.ok),
    batches: batches.map((b) => ({ status: b.status, count: b.count })),
  });
}
