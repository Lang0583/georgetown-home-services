import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type LeadPayload = {
  email?: string;
  serviceType?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeText(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = sanitizeText(payload.email ?? "", 120);
  const serviceType = sanitizeText(payload.serviceType ?? "", 80);

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  if (!serviceType) return NextResponse.json({ ok: false, error: "Service type is required" }, { status: 400 });

  const lead = {
    email,
    serviceType,
    createdAt: new Date().toISOString(),
    source: "georgetown-home-services",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // Don't fail the request if the webhook has a transient error.
    }
  }

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "leads.jsonl");
    fs.appendFileSync(filePath, JSON.stringify(lead) + "\n", "utf8");
  } catch {
    // Ignore local persistence failures.
  }

  return NextResponse.json({ ok: true });
}
