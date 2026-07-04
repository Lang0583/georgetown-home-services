import { Resend } from "resend";
import { SITE_URL } from "./page-seo";

/**
 * Notify site operator of a roof inspection lead via Resend.
 * Uses `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL` (same verified sender as newsletter).
 */
export async function sendRoofInspectionLeadEmail(params: {
  to: string;
  name: string;
  phone: string;
  neighborhood: string;
  source: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return { ok: false, error: "Email not configured" };
  }

  const subject = `[Lead] Roof inspection — ${params.source} — ${params.name}`.slice(0, 998);
  const text = [
    "New roof inspection lead (Georgetown Home Services)",
    "",
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Neighborhood: ${params.neighborhood}`,
    `Source: ${params.source}`,
    `Submitted: ${new Date().toISOString()}`,
    "",
    `Site: ${SITE_URL}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.55; color: #1f2937; max-width: 560px;">
  <p><strong>New roof inspection lead</strong></p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; font-weight: 600;">Name</td><td>${escapeHtml(params.name)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Phone</td><td>${escapeHtml(params.phone)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Neighborhood</td><td>${escapeHtml(params.neighborhood)}</td></tr>
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
