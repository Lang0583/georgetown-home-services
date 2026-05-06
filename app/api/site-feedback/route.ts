import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isSiteFeedbackTopic } from "../../../lib/site-feedback-topics";

type Body = {
  topic?: string;
  email?: string;
  message?: string;
  /** Honeypot */
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

/**
 * Site feedback and inquiries (not service dispatch). Appends to `data/site-feedback.jsonl`.
 * Optional forward: `SITE_FEEDBACK_WEBHOOK_URL` (same pattern as service requests).
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

  const topicRaw = sanitize(body.topic ?? "", 64);
  if (!isSiteFeedbackTopic(topicRaw)) {
    return NextResponse.json({ ok: false, error: "Choose a topic" }, { status: 400 });
  }

  const email = sanitize(body.email ?? "", 120);
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const message = sanitize(body.message ?? "", 8000);
  if (message.length < 12) {
    return NextResponse.json(
      { ok: false, error: "Please add a bit more detail (at least one sentence helps)" },
      { status: 400 },
    );
  }

  const record = {
    topic: topicRaw,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(path.join(dataDir, "site-feedback.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch {
    // ignore local persistence failures
  }

  const webhookUrl = process.env.SITE_FEEDBACK_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ ok: true });
}
