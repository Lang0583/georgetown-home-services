import { Resend } from "resend";
import { SITE_URL } from "./page-seo";

export async function sendGeneralContactEmail(params: {
  to: string;
  name: string;
  email: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return { ok: false, error: "Email not configured" };
  }

  const subject = `[Contact] ${params.name} — georgetownhomeservices.com`.slice(0, 998);
  const text = [
    "General contact (Georgetown Home Services — /api/contact-general)",
    "",
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    "",
    params.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
    `Site: ${SITE_URL}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.55; color: #1f2937; max-width: 560px;">
  <p><strong>Contact form</strong> — Georgetown Home Services</p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; font-weight: 600;">Name</td><td>${escapeHtml(params.name)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Reply to</td><td>${escapeHtml(params.email)}</td></tr>
  </table>
  <p style="margin-top: 16px; white-space: pre-wrap;">${escapeHtml(params.message)}</p>
  <p style="font-size: 12px; color: #6b7280;"><a href="${SITE_URL}" style="color:#01696F;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
</body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      replyTo: params.email,
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
