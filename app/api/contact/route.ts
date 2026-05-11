import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { contactFormRateLimitOk } from "@/lib/contact-rate-limit";
import {
  sendContactFormEmail,
  type ContactFormServiceOption,
} from "@/lib/send-contact-form-email";
import { getContact } from "@/lib/site-content";

const SERVICE_OPTIONS = new Set<ContactFormServiceOption>([
  "Roof Inspection",
  "Roof Repair",
  "Full Roof Replacement",
  "HVAC Inspection",
  "Other",
]);

type Body = {
  fullName?: string;
  phone?: string;
  neighborhood?: string;
  serviceNeeded?: string;
  source?: string;
  /** Honeypot — must be empty */
  company?: string;
};

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.company != null && String(body.company).trim() !== "") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const fullName = sanitize(body.fullName ?? "", 120);
  const phoneRaw = sanitize(body.phone ?? "", 32);
  const neighborhood = sanitize(body.neighborhood ?? "", 120);
  const source = sanitize(body.source ?? "unknown", 120);
  const serviceRaw = sanitize(body.serviceNeeded ?? "", 80) as ContactFormServiceOption;

  if (fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your full name" }, { status: 400 });
  }
  const digits = phoneDigits(phoneRaw);
  if (digits.length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!SERVICE_OPTIONS.has(serviceRaw)) {
    return NextResponse.json({ ok: false, error: "Please select a service" }, { status: 400 });
  }

  const ip = clientIp(req);
  if (!contactFormRateLimitOk(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions" }, { status: 429 });
  }

  const record = {
    fullName,
    phone: phoneRaw,
    neighborhood,
    serviceNeeded: serviceRaw,
    source,
    createdAt: new Date().toISOString(),
    ip,
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "contact-form-leads.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore
  }

  const notifyTo =
    process.env.CONTACT_FORM_EMAIL?.trim() ||
    process.env.ROOF_LEAD_NOTIFY_EMAIL?.trim() ||
    getContact().email;

  const sendResult = await sendContactFormEmail({
    to: notifyTo,
    fullName,
    phone: phoneRaw,
    neighborhood,
    serviceNeeded: serviceRaw,
    source,
  });

  if (!sendResult.ok) {
    console.warn("[contact] Resend:", sendResult.error);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
