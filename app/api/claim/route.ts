import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { contactFormRateLimitOk } from "@/lib/contact-rate-limit";
import { isClaimCategory, isClaimTier } from "@/lib/claim-form";
import { sendClaimFormEmail } from "@/lib/send-claim-form-email";
import { getContact } from "@/lib/site-content";

type Body = {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  category?: string;
  licenseNumber?: string;
  tier?: string;
  /** Honeypot — must be empty */
  website?: string;
};

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

  if (body.website != null && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const businessName = sanitize(body.businessName ?? "", 160);
  const contactName = sanitize(body.contactName ?? "", 120);
  const email = sanitize(body.email ?? "", 120);
  const phoneRaw = sanitize(body.phone ?? "", 32);
  const categoryRaw = sanitize(body.category ?? "", 40);
  const licenseNumber = sanitize(body.licenseNumber ?? "", 80);
  const tierRaw = sanitize(body.tier ?? "", 40);

  if (businessName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your business name" }, { status: 400 });
  }
  if (contactName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter a contact name" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }
  const digits = phoneDigits(phoneRaw);
  if (digits.length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!isClaimCategory(categoryRaw)) {
    return NextResponse.json({ ok: false, error: "Please select a trade category" }, { status: 400 });
  }
  if (licenseNumber.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter a license number" }, { status: 400 });
  }
  if (!isClaimTier(tierRaw)) {
    return NextResponse.json({ ok: false, error: "Please select a tier of interest" }, { status: 400 });
  }

  const ip = clientIp(req);
  if (!contactFormRateLimitOk(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions" }, { status: 429 });
  }

  const record = {
    businessName,
    contactName,
    email,
    phone: phoneRaw,
    category: categoryRaw,
    licenseNumber,
    tier: tierRaw,
    createdAt: new Date().toISOString(),
    ip,
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "claim-requests.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore local persistence failures
  }

  const notifyTo =
    process.env.CLAIM_FORM_EMAIL?.trim() ||
    process.env.CONTACT_FORM_EMAIL?.trim() ||
    getContact().email;

  const sendResult = await sendClaimFormEmail({
    to: notifyTo,
    businessName,
    contactName,
    email,
    phone: phoneRaw,
    category: categoryRaw,
    licenseNumber,
    tier: tierRaw,
  });

  if (!sendResult.ok) {
    console.warn("[claim] Resend:", sendResult.error);
    // Still succeed if persisted — matches site-feedback resilience when email unset in local/dev.
    if (sendResult.error === "Email not configured") {
      return NextResponse.json({ ok: true, emailSkipped: true });
    }
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
