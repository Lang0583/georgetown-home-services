/**
 * Email summary via Resend.
 *
 * Env: RESEND_API_KEY, RECIPIENT_EMAIL
 *      NEWSLETTER_FROM_EMAIL or EMAIL_FROM optional — validated sender domain in Resend
 */
import { Resend } from "resend";

export type ReportRow = {
  url: string;
  oldH1: string;
  newH1: string;
  indexingLabel: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rowsTable(rows: ReportRow[]): string {
  if (!rows.length) {
    return "<p>No qualifying pages processed this run.</p>";
  }
  const thead = `
<thead><tr>
  <th align="left">URL</th>
  <th align="left">Previous H1</th>
  <th align="left">Suggested H1</th>
  <th align="left">Indexing</th>
</tr></thead>`;
  const tbody = rows
    .map(
      (r) => `
<tr>
  <td><a href="${escapeHtml(r.url)}">${escapeHtml(r.url)}</a></td>
  <td>${escapeHtml(r.oldH1)}</td>
  <td>${escapeHtml(r.newH1)}</td>
  <td>${escapeHtml(r.indexingLabel)}</td>
</tr>`,
    )
    .join("");
  return `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">${thead}<tbody>${tbody}</tbody></table>`;
}

function formatReportDate(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function sendAgentReport(rows: ReportRow[]): Promise<{ id?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("[agent/reporter] RESEND_API_KEY is required.");

  const to = process.env.RECIPIENT_EMAIL?.trim();
  if (!to) throw new Error("[agent/reporter] RECIPIENT_EMAIL is required.");

  const from =
    process.env.NEWSLETTER_FROM_EMAIL?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    "Georgetown Home Services <noreply@resend.dev>";

  const subject = `GHS Weekly Agent Report - ${formatReportDate()}`;
  const resend = new Resend(apiKey);

  const html = `
<html><body>
<p>SEO agent run summary (suggested copies + indexing pings). Deploy content changes separately if you automate file writes later.</p>
${rowsTable(rows)}
<p style="margin-top:24px;color:#64748b;font-size:12px;">Generated ${new Date().toISOString()}</p>
</body></html>`;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
  });

  if (error) throw new Error(`[agent/reporter] Resend error: ${JSON.stringify(error)}`);
  return { id: data?.id };
}
