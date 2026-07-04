import fs from "node:fs";
import { NextResponse } from "next/server";
import { subscribeEmailToBeehiiv } from "@/lib/beehiiv-subscribe";
import { HVAC_TEXAS_HEAT_GUIDE_PDF_PATH } from "@/lib/hvac-texas-heat-guide";
import { PDF_LEAD_ASSETS } from "@/lib/pdf-lead-assets";
import { leadMagnetPdfFilePath } from "@/lib/lead-magnet-pdf-path";
import { verifyPdfDownloadToken } from "@/lib/pdf-download-token";

type PostBody = {
  email?: string;
  source?: string;
  /** Honeypot */
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(input: string, maxLen: number) {
  return input.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

/** Email capture for the HVAC Texas Heat guide — returns a static PDF URL (no runtime PDF generation). */
export async function POST(req: Request) {
  let body: PostBody;
  try {
    body = (await req.json()) as PostBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = sanitize(body.email ?? "", 120);
  const source = sanitize(body.source ?? "lead-magnet-download", 80);
  const website = sanitize(body.website ?? "", 120);

  if (website) {
    return NextResponse.json({ ok: true, downloadUrl: HVAC_TEXAS_HEAT_GUIDE_PDF_PATH });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const subscribed = await subscribeEmailToBeehiiv({ email, source });
  if (!subscribed.ok) {
    return NextResponse.json({ ok: false, error: subscribed.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: HVAC_TEXAS_HEAT_GUIDE_PDF_PATH,
  });
}

/** Token-gated download for legacy seasonal PDFs stored under private/lead-magnets (no Puppeteer). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token")?.trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing download token" }, { status: 400 });
  }

  const verified = verifyPdfDownloadToken(token);
  if (!verified) {
    return NextResponse.json({ ok: false, error: "Invalid or expired download link" }, { status: 403 });
  }

  const asset = PDF_LEAD_ASSETS[verified.pdfKey];
  const filePath = leadMagnetPdfFilePath(asset.filename);
  if (!fs.existsSync(filePath)) {
    console.warn("[pdf-download] Missing file:", filePath);
    return NextResponse.json({ ok: false, error: "PDF not available" }, { status: 503 });
  }

  const bytes = fs.readFileSync(filePath);
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${asset.filename}"`,
      "cache-control": "private, no-store",
    },
  });
}
