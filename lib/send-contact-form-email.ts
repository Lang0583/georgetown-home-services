import { Resend } from "resend";
import { SITE_URL } from "./page-seo";

export type ContactFormServiceOption =
  | "Roof Inspection"
  | "Roof Repair"
  | "Full Roof Replacement"
  | "HVAC Inspection"
  | "Other";

export async function sendContactFormEmail(params: {
  to: string;
  fullName: string;
  phone: string;
  neighborhood: string;
  serviceNeeded: ContactFormServiceOption;
  source: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return { ok: false, error: "Email not configured" };
  }

  const subject = `[Contact] Storm inspection lead — ${params.source} — ${params.fullName}`.slice(0, 998);
  const n = params.neighborhood.trim() || "—";
  const text = [
    "Storm inspection lead (Georgetown Home Services — /api/contact)",
    "",
    `Full name: ${params.fullName}`,
    `Phone: ${params.phone}`,
    `Neighborhood / area: ${n}`,
    `Service needed: ${params.serviceNeeded}`,
    `Source page: ${params.source}`,
    `Submitted: ${new Date().toISOString()}`,
    "",
    `Site: ${SITE_URL}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.55; color: #1f2937; max-width: 560px;">
  <p><strong>Storm inspection lead</strong></p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; font-weight: 600;">Full name</td><td>${escapeHtml(params.fullName)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Phone</td><td>${escapeHtml(params.phone)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Neighborhood / area</td><td>${escapeHtml(n)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Service needed</td><td>${escapeHtml(params.serviceNeeded)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Source</td><td>${escapeHtml(params.source)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Time</td><td>${escapeHtml(new Date().toISOString())}</td></tr>
  </table>
  <p style="font-size: 12px; color: #5A6B74;"><a href="${SITE_URL}" style="color:#1E3A5F;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
</body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject,
      text,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Send failed" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
