import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { runNewsletterEmbedSignup } from "../../../lib/newsletter-embed-core";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Pre-checked on the form; when true, subscriber is tagged for seasonal tips separately. */
  seasonalTipsOptIn?: boolean;
  website?: string;
  serviceSlug?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

/**
 * Stores service inquiries and optionally forwards to `SERVICE_REQUEST_WEBHOOK_URL`.
 * When `seasonalTipsOptIn` is true, also runs `runNewsletterEmbedSignup` with tag from `NEWSLETTER_SEASONAL_TIPS_TAG` (default `seasonal-maintenance-georgetown`).
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website != null && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = sanitize(body.email ?? "", 120);
  const name = sanitize(body.name ?? "", 120);
  const phone = sanitize(body.phone ?? "", 40);
  const message = sanitize(body.message ?? "", 8000);
  const serviceSlug = sanitize(body.serviceSlug ?? "unknown", 160);

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }
  if (message.length < 4) {
    return NextResponse.json({ ok: false, error: "Please add a message (a few words is fine)" }, { status: 400 });
  }

  const seasonalTipsOptIn = Boolean(body.seasonalTipsOptIn);

  const record = {
    name: name.length ? name : undefined,
    email,
    phone: phone.length ? phone : undefined,
    message,
    seasonalTipsOptIn,
    serviceSlug,
    createdAt: new Date().toISOString(),
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "service-requests.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore
  }

  const webhookUrl = process.env.SERVICE_REQUEST_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      // ignore transient webhook errors
    }
  }

  if (seasonalTipsOptIn) {
    const tag = process.env.NEWSLETTER_SEASONAL_TIPS_TAG?.trim() || "seasonal-maintenance-georgetown";
    const sub = await runNewsletterEmbedSignup({
      email,
      source: `service-request-seasonal:${serviceSlug}`,
      tags: [tag],
    });
    if (!sub.ok) {
      console.warn("[service-request] Seasonal tips list signup failed:", sub.error);
    }
  }

  return NextResponse.json({ ok: true });
}
