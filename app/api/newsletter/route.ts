import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type NewsletterPayload = {
  email?: string;
  firstName?: string;
  leadMagnet?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeText(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

export async function POST(req: Request) {
  let payload: NewsletterPayload;
  try {
    payload = (await req.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = sanitizeText(payload.email ?? "", 120);
  const firstNameRaw = sanitizeText(payload.firstName ?? "", 60);
  const firstName = firstNameRaw.length ? firstNameRaw : undefined;
  const leadMagnetRaw = sanitizeText(payload.leadMagnet ?? "", 60);
  const leadMagnet = leadMagnetRaw.length ? leadMagnetRaw : undefined;
  const source = sanitizeText(payload.source ?? "site", 80);

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });

  const signup = {
    email,
    firstName,
    leadMagnet,
    source,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(signup),
      });
    } catch {
      // Ignore transient webhook errors.
    }
  }

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "newsletter-signups.jsonl");
    fs.appendFileSync(filePath, JSON.stringify(signup) + "\n", "utf8");
  } catch {
    // Ignore local persistence failures.
  }

  return NextResponse.json({ ok: true });
}

