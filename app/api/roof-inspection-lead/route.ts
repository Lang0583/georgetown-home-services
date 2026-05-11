import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getContact } from "@/lib/site-content";
import { sendRoofInspectionLeadEmail } from "@/lib/send-roof-inspection-lead-email";

type Body = {
  name?: string;
  phone?: string;
  neighborhood?: string;
  /** Must be true — user confirms they want a roof inspection. */
  needRoofInspection?: boolean;
  /** e.g. blog:hail-may-2026, hub:services-roofing */
  source?: string;
  website?: string;
};

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website != null && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, emailed: false, recorded: false });
  }

  const name = sanitize(body.name ?? "", 120);
  const phoneRaw = sanitize(body.phone ?? "", 32);
  const neighborhood = sanitize(body.neighborhood ?? "", 120);
  const source = sanitize(body.source ?? "unknown", 80);
  const need = Boolean(body.needRoofInspection);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name" }, { status: 400 });
  }
  const digits = phoneDigits(phoneRaw);
  if (digits.length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (neighborhood.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your neighborhood" }, { status: 400 });
  }
  if (!need) {
    return NextResponse.json({ ok: false, error: "Please confirm you need a roof inspection" }, { status: 400 });
  }

  const record = {
    name,
    phone: phoneRaw,
    neighborhood,
    needRoofInspection: true,
    source,
    createdAt: new Date().toISOString(),
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "roof-inspection-leads.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore
  }

  const notifyTo =
    process.env.ROOF_LEAD_NOTIFY_EMAIL?.trim() || getContact().email;

  const sendResult = await sendRoofInspectionLeadEmail({
    to: notifyTo,
    name,
    phone: phoneRaw,
    neighborhood,
    source,
  });

  if (!sendResult.ok) {
    console.warn("[roof-inspection-lead] Resend:", sendResult.error);
  }

  return NextResponse.json({
    ok: true,
    emailed: sendResult.ok,
    recorded: true,
  });
}
