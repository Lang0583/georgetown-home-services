/**
 * impact.com Publisher Tag from Content → Ad Tools → Publisher Tag (“Copy Tag”).
 * Paste the full snippet or only the JavaScript inside the script tags.
 */
export function getImpactPublisherTagInnerHtml(): string | null {
  const raw = process.env.IMPACT_PUBLISHER_TAG?.trim();
  if (!raw) return null;
  const body = raw
    .replace(/^\s*<script[^>]*>/i, "")
    .replace(/<\/script>\s*$/i, "")
    .trim();
  return body || null;
}
