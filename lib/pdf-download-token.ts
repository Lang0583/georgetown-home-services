import { createHmac, timingSafeEqual } from "node:crypto";
import { isPdfLeadKey, type PdfLeadKey } from "@/lib/pdf-lead-assets";

function signingSecret(): string {
  return (
    process.env.PDF_DOWNLOAD_SECRET?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    "georgetown-pdf-download-dev-secret"
  );
}

/** Default: 7 days for email links; 1 hour for immediate post-signup download. */
export function createPdfDownloadToken(
  pdfKey: PdfLeadKey,
  email: string,
  ttlMs = 3_600_000,
): string {
  const exp = Date.now() + ttlMs;
  const body = `${pdfKey}:${email.trim().toLowerCase()}:${exp}`;
  const sig = createHmac("sha256", signingSecret()).update(body).digest("base64url");
  return `${Buffer.from(body, "utf8").toString("base64url")}.${sig}`;
}

export function verifyPdfDownloadToken(token: string): { pdfKey: PdfLeadKey; email: string } | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const bodyB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let body: string;
  try {
    body = Buffer.from(bodyB64, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = createHmac("sha256", signingSecret()).update(body).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const parts = body.split(":");
  if (parts.length !== 3) return null;
  const [pdfKey, email, expStr] = parts as [string, string, string];
  if (!isPdfLeadKey(pdfKey)) return null;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return { pdfKey, email };
}

export function pdfDownloadApiUrl(token: string): string {
  return `/api/lead-magnet-download?token=${encodeURIComponent(token)}`;
}
