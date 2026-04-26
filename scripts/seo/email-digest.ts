/**
 * Optional: email the weekly digest via Resend, in addition to the GitHub issue.
 *
 * No-ops cleanly (exits 0) when `RESEND_API_KEY` or `REPORT_EMAIL` is missing,
 * so this step is safe to include unconditionally in the GitHub Actions
 * workflow. Lets users opt in to email delivery by just adding the two secrets.
 *
 * Converts the markdown digest to a minimal, pre-wrapped text email (no HTML
 * rendering step needed — the digest is readable as plain text) and sends it
 * from whatever `REPORT_FROM` is configured, defaulting to
 * `onboarding@resend.dev` which works out-of-the-box without domain
 * verification.
 *
 * Env:
 *   RESEND_API_KEY   Resend API key (required to send).
 *   REPORT_EMAIL     Destination address (required to send).
 *   REPORT_FROM      Optional sender; defaults to `onboarding@resend.dev`.
 *                    Set to your own verified sender once you've verified a
 *                    domain at resend.com.
 */
import { readFile } from "node:fs/promises";
import { Resend } from "resend";

const DIGEST_PATH = ".reports/weekly-digest.md";
const DEFAULT_FROM = "onboarding@resend.dev";

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Extract the first h2 subjects and summary stats from a markdown digest so we
 * can build a short email subject that signals "is it worth opening?".
 */
function buildSubject(md: string): string {
  const today = todayIsoDate();
  const clicks = md.match(/\| Clicks \| ([\d,]+) \|/);
  const flagged = md.match(/flagged \*\*(\d+)\*\*/);
  const stale = md.match(/Stale pages: \*\*(\d+)\*\*/);
  const parts: string[] = [`SEO digest ${today}`];
  if (clicks?.[1]) parts.push(`${clicks[1]} clicks`);
  if (flagged?.[1] && Number(flagged[1]) > 0) parts.push(`${flagged[1]} flagged`);
  if (stale?.[1] && Number(stale[1]) > 0) parts.push(`${stale[1]} stale`);
  return parts.join(" — ");
}

/** Very light markdown → plain-text pass. Keeps tables legible. */
function mdToText(md: string): string {
  return md
    // Remove `code` back-ticks; emails don't render them nicely.
    .replace(/`([^`]+)`/g, "$1")
    // Strip bold/italic markers.
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
    // Collapse markdown blockquote prefix to "> " (already fine).
    ;
}

async function main(): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REPORT_EMAIL;
  const from = process.env.REPORT_FROM || DEFAULT_FROM;

  if (!apiKey) {
    console.log("[seo/email] RESEND_API_KEY not set — skipping email (no error).");
    return;
  }
  if (!to) {
    console.log("[seo/email] REPORT_EMAIL not set — skipping email (no error).");
    return;
  }

  let md: string;
  try {
    md = await readFile(DIGEST_PATH, "utf8");
  } catch (err) {
    console.error(
      `[seo/email] Could not read ${DIGEST_PATH} — did build-weekly-digest run first? (${(err as Error).message})`,
    );
    process.exit(1);
  }

  const subject = buildSubject(md);
  const text = mdToText(md);

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
  });

  if (result.error) {
    console.error(`[seo/email] Resend failed: ${JSON.stringify(result.error)}`);
    process.exit(1);
  }
  console.log(`[seo/email] sent to ${to} (id=${result.data?.id ?? "?"})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
