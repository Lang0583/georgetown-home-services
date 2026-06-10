import fs from "node:fs";
import { Resend } from "resend";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import { PDF_LEAD_ASSETS, pdfLeadKeyForSeason, type PdfLeadKey } from "@/lib/pdf-lead-assets";
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
  return { filename: asset.filename, content: fs.readFileSync(filePath), title: asset.title };
}

/**
 * Sends a thank-you email with PDFs attached (and signed download links in the body).
 * Requires `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL` (verified sender in Resend).
 * No-op if either is missing — signup still succeeds via `/api/newsletter`.
 */
export async function sendLeadMagnetWelcomeEmail(params: {
  to: string;
  firstName?: string;
  leadMagnet?: string;
  pdfKey?: PdfLeadKey;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) return;

  const resend = new Resend(apiKey);
  const greet = params.firstName ? `Hi ${params.firstName},` : "Hi there,";

  const seasonPdfKey =
    params.pdfKey?.startsWith("season_") === true
      ? params.pdfKey
      : pdfLeadKeyForSeason(getTexasSeason());
  const seasonGuide = getSeasonalGuide(getTexasSeason());

  const attachmentKeys: PdfLeadKey[] = ["seasonal_full", seasonPdfKey, "monthly"];
  const uniqueKeys = Array.from(new Set(attachmentKeys));

  const attachments = uniqueKeys
    .map((key) => readPdfAttachment(key))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (!attachments.length) {
    console.warn("[newsletter] Lead magnet PDFs missing under private/lead-magnets — run npm run generate:lead-pdfs");
    return;
  }

  const linkLines = uniqueKeys.map((key) => {
    const asset = PDF_LEAD_ASSETS[key];
    const href = absoluteUrl(createEmailPdfDownloadUrl(key, params.to));
    return { title: asset.title, href };
  });

  const textLinks = linkLines.map((l) => `- ${l.title}: ${l.href}`).join("\n");
  const htmlLinks = linkLines
    .map((l) => `<li><a href="${l.href}" style="color:#01696F;">${l.title}</a></li>`)
    .join("");

  let choice: string;
  if (params.leadMagnet === "monthly_reminder") {
    choice =
      "You chose the monthly reminder track—we’ve attached the monthly sheet plus seasonal checklists.";
  } else if (params.leadMagnet === "seasonal_checklist") {
    choice = `You chose the seasonal checklist—we’ve attached the full-year guide, ${seasonGuide.label.toLowerCase()} checklist, and monthly reminder.`;
  } else {
    choice = "Here are your Georgetown homeowner guides:";
  }

  const text = [
    `${greet}`,
    "",
    `Thanks for joining Georgetown Home Services. ${choice}`,
    "",
    "Download your PDFs (also attached):",
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
  <p><strong>Your PDFs (also attached to this email)</strong></p>
  <ul>${htmlLinks}</ul>
  <p style="font-size: 14px; color: #6b7280;">Print them or save to your phone. Download links expire after seven days; attachments are yours to keep.</p>
  <p style="font-size: 12px; color: #9ca3af;">Georgetown Home Services · <a href="${SITE_URL}" style="color:#01696F;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject: "Your Georgetown homeowner guides (PDFs inside)",
      text,
      html,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
    });
    if (error) console.warn("[newsletter] Resend:", error.message);
  } catch (e) {
    console.warn("[newsletter] Resend send failed:", e);
  }
}
