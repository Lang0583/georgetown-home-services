import fs from "node:fs";
import { Resend } from "resend";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import {
  ALL_PDF_LEAD_KEYS,
  PDF_LEAD_ASSETS,
  pdfLeadKeyForSeason,
  type PdfLeadKey,
} from "@/lib/pdf-lead-assets";
import { leadMagnetPdfFilePath } from "@/lib/lead-magnet-pdf-path";
import { createEmailPdfDownloadUrl } from "@/lib/pdf-download-url";
import { SITE_URL } from "./page-seo";
import { getTexasSeason } from "./texas-seasons";

function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(p, SITE_URL).href;
}

function readPdfAttachment(pdfKey: PdfLeadKey) {
  const asset = PDF_LEAD_ASSETS[pdfKey];
  const filePath = leadMagnetPdfFilePath(asset.filename);
  if (!fs.existsSync(filePath)) return null;
  return { pdfKey, filename: asset.filename, content: fs.readFileSync(filePath), title: asset.title };
}

/**
 * Sends a thank-you email with all lead-magnet PDFs attached (and signed download links).
 * Requires `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL` (verified sender in Resend).
 * No-op if either is missing — signup still succeeds via `/api/newsletter`.
 */
export async function sendLeadMagnetWelcomeEmail(params: {
  to: string;
  firstName?: string;
  leadMagnet?: string;
  pdfKey?: PdfLeadKey;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) return false;

  const resend = new Resend(apiKey);
  const greet = params.firstName ? `Hi ${params.firstName},` : "Hi there,";

  const highlightedKey =
    params.pdfKey ??
    (params.leadMagnet === "monthly_reminder" ? "monthly" : pdfLeadKeyForSeason(getTexasSeason()));
  const highlighted = PDF_LEAD_ASSETS[highlightedKey];
  const seasonGuide = getSeasonalGuide(getTexasSeason());

  const attachments = ALL_PDF_LEAD_KEYS.map((key) => readPdfAttachment(key)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );

  if (!attachments.length) {
    console.warn("[newsletter] Lead magnet PDFs missing under private/lead-magnets — run npm run generate:lead-pdfs");
    return false;
  }

  const linkLines = attachments.map((a) => {
    const href = absoluteUrl(createEmailPdfDownloadUrl(a.pdfKey, params.to));
    return { title: a.title, href, highlighted: a.pdfKey === highlightedKey };
  });

  const textLinks = linkLines.map((l) => `- ${l.title}: ${l.href}`).join("\n");
  const htmlLinks = linkLines
    .map((l) => {
      const label = l.highlighted ? `<strong>${l.title}</strong> (your pick)` : l.title;
      return `<li><a href="${l.href}" style="color:#01696F;">${label}</a></li>`;
    })
    .join("");

  let choice: string;
  if (params.leadMagnet === "monthly_reminder") {
    choice = "You asked for monthly reminders—we’ve attached every Georgetown homeowner checklist PDF below.";
  } else if (params.leadMagnet === "seasonal_checklist" || params.pdfKey?.startsWith("season_")) {
    choice = `Thanks for grabbing the ${highlighted.title.toLowerCase()}. Every seasonal checklist plus the full-year and monthly guides are attached.`;
  } else {
    choice = `Here is the complete Georgetown homeowner PDF library—full-year, all four seasons, and the monthly reminder.`;
  }

  const text = [
    `${greet}`,
    "",
    `Thanks for joining Georgetown Home Services. ${choice}`,
    "",
    "Download links (same files are attached):",
    textLinks,
    "",
    "We’ll only send occasional homeowner tips. You can unsubscribe anytime from any email.",
    "",
    `— Georgetown Home Services`,
    SITE_URL,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.55; color: #1f2937; max-width: 560px;">
  <p>${greet}</p>
  <p>Thanks for joining <strong>Georgetown Home Services</strong>. ${choice}</p>
  <p><strong>Your PDF library (${attachments.length} checklists — also attached)</strong></p>
  <ul>${htmlLinks}</ul>
  <p style="font-size: 14px; color: #6b7280;">Current season in Georgetown: <strong>${seasonGuide.label}</strong>. Download links expire after seven days; attachments are yours to keep.</p>
  <p style="font-size: 12px; color: #9ca3af;">Georgetown Home Services · <a href="${SITE_URL}" style="color:#01696F;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject: "Your Georgetown homeowner PDF library",
      text,
      html,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
    });
    if (error) {
      console.warn("[newsletter] Resend:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[newsletter] Resend send failed:", e);
    return false;
  }
}
