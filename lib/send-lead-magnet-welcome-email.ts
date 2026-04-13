import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { LEAD_MAGNET_DOWNLOAD_PATHS, LEAD_MAGNET_PDF_FILENAMES } from "./lead-magnet-downloads";
import { SITE_URL } from "./page-seo";

function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(p, SITE_URL).href;
}

/**
 * Sends a thank-you email with both PDFs attached (and download links in the body).
 * Requires `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL` (verified sender in Resend).
 * No-op if either is missing — signup still succeeds via `/api/newsletter`.
 */
export async function sendLeadMagnetWelcomeEmail(params: {
  to: string;
  firstName?: string;
  leadMagnet?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) return;

  const resend = new Resend(apiKey);
  const greet = params.firstName ? `Hi ${params.firstName},` : "Hi there,";
  const seasonalUrl = absoluteUrl(LEAD_MAGNET_DOWNLOAD_PATHS.seasonal);
  const monthlyUrl = absoluteUrl(LEAD_MAGNET_DOWNLOAD_PATHS.monthly);

  let choice: string;
  if (params.leadMagnet === "monthly_reminder") {
    choice =
      "You chose the monthly reminder track—we’ve attached both PDFs so you also have the full seasonal checklist.";
  } else if (params.leadMagnet === "seasonal_checklist") {
    choice =
      "You chose the seasonal checklist—we’ve attached the monthly reminder sheet too for quick monthly tune-ups.";
  } else {
    choice = "Here are the two free guides for Georgetown homeowners:";
  }

  const text = [
    `${greet}`,
    "",
    `Thanks for joining Georgetown Home Services. ${choice}`,
    "",
    "Download your PDFs (also attached):",
    `- Seasonal: ${seasonalUrl}`,
    `- Monthly reminder: ${monthlyUrl}`,
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
  <ul>
    <li><a href="${seasonalUrl}" style="color:#01696F;">Seasonal maintenance checklist</a></li>
    <li><a href="${monthlyUrl}" style="color:#01696F;">Monthly home maintenance reminder</a></li>
  </ul>
  <p style="font-size: 14px; color: #6b7280;">Print them or save to your phone. We’ll only send occasional tips you can unsubscribe from anytime.</p>
  <p style="font-size: 12px; color: #9ca3af;">Georgetown Home Services · <a href="${SITE_URL}" style="color:#01696F;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
</body>
</html>`;

  const root = process.cwd();
  const seasonalPath = path.join(root, "public", "downloads", LEAD_MAGNET_PDF_FILENAMES.seasonal);
  const monthlyPath = path.join(root, "public", "downloads", LEAD_MAGNET_PDF_FILENAMES.monthly);

  if (!fs.existsSync(seasonalPath) || !fs.existsSync(monthlyPath)) {
    console.warn("[newsletter] Lead magnet PDFs missing under public/downloads — run npm run generate:lead-pdfs");
    return;
  }

  const attachments = [
    {
      filename: LEAD_MAGNET_PDF_FILENAMES.seasonal,
      content: fs.readFileSync(seasonalPath),
    },
    {
      filename: LEAD_MAGNET_PDF_FILENAMES.monthly,
      content: fs.readFileSync(monthlyPath),
    },
  ];

  try {
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject: "Your free Georgetown homeowner guides (PDFs inside)",
      text,
      html,
      attachments,
    });
    if (error) console.warn("[newsletter] Resend:", error.message);
  } catch (e) {
    console.warn("[newsletter] Resend send failed:", e);
  }
}
