import { Resend } from "resend";
import { SITE_URL } from "./page-seo";
import { PROVIDER_CATEGORY_LABELS, type ProviderCategory } from "@/data/providers";
import type { ClaimTierValue } from "./claim-form";
import { CLAIM_TIERS } from "./claim-form";

export async function sendClaimFormEmail(params: {
  to: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: ProviderCategory;
  licenseNumber: string;
  tier: ClaimTierValue;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return { ok: false, error: "Email not configured" };
  }

  const tierLabel = CLAIM_TIERS.find((t) => t.value === params.tier)?.label ?? params.tier;
  const categoryLabel = PROVIDER_CATEGORY_LABELS[params.category];

  const subject = `[Claim] ${params.businessName} — ${tierLabel}`.slice(0, 998);
  const text = [
    "Contractor claim / listing request (Georgetown Home Services — /api/claim)",
    "",
    `Business name: ${params.businessName}`,
    `Contact name: ${params.contactName}`,
    `Email: ${params.email}`,
    `Phone: ${params.phone}`,
    `Trade category: ${categoryLabel}`,
    `License number: ${params.licenseNumber}`,
    `Tier of interest: ${tierLabel}`,
    `Submitted: ${new Date().toISOString()}`,
    "",
    `Site: ${SITE_URL}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.55; color: #1f2937; max-width: 560px;">
  <p><strong>Contractor claim / listing request</strong></p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 0; font-weight: 600;">Business</td><td>${escapeHtml(params.businessName)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Contact</td><td>${escapeHtml(params.contactName)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td>${escapeHtml(params.email)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Phone</td><td>${escapeHtml(params.phone)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Category</td><td>${escapeHtml(categoryLabel)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">License #</td><td>${escapeHtml(params.licenseNumber)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Tier</td><td>${escapeHtml(tierLabel)}</td></tr>
    <tr><td style="padding: 6px 0; font-weight: 600;">Time</td><td>${escapeHtml(new Date().toISOString())}</td></tr>
  </table>
  <p style="font-size: 12px; color: #5A6B74;"><a href="${SITE_URL}/for-contractors" style="color:#1E3A5F;">${SITE_URL.replace(/^https?:\/\//, "")}/for-contractors</a></p>
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
