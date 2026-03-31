import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  location?: string;
  message?: string;
  honeypot?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
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

  // Honeypot bot protection.
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: false, error: "Request blocked" }, { status: 400 });
  }

  const name = sanitizeText(payload.name ?? "", 80);
  const email = sanitizeText(payload.email ?? "", 120);
  const phone = normalizePhone(payload.phone ?? "");
  const serviceType = sanitizeText(payload.serviceType ?? "", 80);
  const location = sanitizeText(payload.location ?? "", 80);
  const message = sanitizeText(payload.message ?? "", 1500);

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  if (!serviceType) return NextResponse.json({ ok: false, error: "Service is required" }, { status: 400 });
  const safeName = name || "Website lead";
  const safeLocation = location || "Georgetown, TX";

  const lead = {
    ...payload,
    name: safeName,
    email,
    phone: phone.length >= 10 ? phone : undefined,
    serviceType,
    location: safeLocation,
    message,
    createdAt: new Date().toISOString(),
    source: "georgetown-home-services",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    // Production integration point: send to your CRM/email automation service.
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // Don't fail the lead request if the webhook has a transient error.
    }
  }

  // Local persistence for development.
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

