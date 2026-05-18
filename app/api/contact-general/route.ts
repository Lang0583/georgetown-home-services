import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { contactFormRateLimitOk } from "@/lib/contact-rate-limit";
import { sendGeneralContactEmail } from "@/lib/send-general-contact-email";
import { getContact } from "@/lib/site-content";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot — must be empty */
  company?: string;
};

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

  const name = sanitize(body.name ?? "", 160);
  const email = sanitize(body.email ?? "", 120);
  const message = sanitize(body.message ?? "", 8000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email" }, { status: 400 });
  }
  if (message.length < 12) {
    return NextResponse.json(
      { ok: false, error: "Please add a short message (at least one sentence)" },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  if (!contactFormRateLimitOk(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions" }, { status: 429 });
  }

  const record = { name, email, message, createdAt: new Date().toISOString(), ip };
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "contact-general.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore
  }

  const notifyTo =
    process.env.CONTACT_FORM_EMAIL?.trim() || process.env.ROOF_LEAD_NOTIFY_EMAIL?.trim() || getContact().email;

  const sendResult = await sendGeneralContactEmail({
    to: notifyTo,
    name,
    email,
    message,
  });

  if (!sendResult.ok) {
    console.warn("[contact-general] Resend:", sendResult.error);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
