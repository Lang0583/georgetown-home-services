import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { LeadMagnetKey } from "@/lib/lead-magnets";
import { isPdfLeadKey, pdfLeadAssetForLeadMagnet, type PdfLeadKey } from "@/lib/pdf-lead-assets";
import { createImmediatePdfDownloadUrl } from "@/lib/pdf-download-url";
import { sendLeadMagnetWelcomeEmail } from "../../../lib/send-lead-magnet-welcome-email";

type NewsletterPayload = {
  email?: string;
  firstName?: string;
  leadMagnet?: string;
  pdfKey?: string;
  source?: string;
  /** Honeypot field used by some forms to catch bots. */
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeText(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

export async function POST(req: Request) {
  // TODO: Connect to Beehiiv API — endpoint: https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions
  // Replace current form action/handler with Beehiiv API call once publication ID is available
  // Beehiiv docs: https://developers.beehiiv.com/
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
  const pdfKeyRaw = sanitizeText(payload.pdfKey ?? "", 40);
  const pdfKey: PdfLeadKey | undefined =
    pdfKeyRaw.length && isPdfLeadKey(pdfKeyRaw) ? pdfKeyRaw : undefined;
  const source = sanitizeText(payload.source ?? "site", 80);
  const website = sanitizeText(payload.website ?? "", 120);

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });

  // Honeypot: if filled, treat as bot submission. Pretend success but do nothing.
  if (website) return NextResponse.json({ ok: true, emailed: false, recorded: false });

  const signup = {
    email,
    firstName,
    leadMagnet,
    pdfKey,
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

  const resolvedPdfKey =
    pdfKey ??
    (leadMagnet ? pdfLeadAssetForLeadMagnet(leadMagnet as LeadMagnetKey)?.key : undefined);
  const downloadUrl = resolvedPdfKey
    ? createImmediatePdfDownloadUrl(resolvedPdfKey, email)
    : undefined;

  try {
    await sendLeadMagnetWelcomeEmail({
      to: email,
      firstName,
      leadMagnet,
      pdfKey: resolvedPdfKey,
    });
    return NextResponse.json({ ok: true, emailed: true, recorded: true, downloadUrl });
  } catch {
    // Never fail signup if transactional email errors, but surface status to the client.
  }

  return NextResponse.json({ ok: true, emailed: false, recorded: true, downloadUrl });
}

