import fs from "node:fs";
import path from "node:path";

export type NewsletterEmbedInput = {
  email: string;
  /** Attribution (e.g. `blog-mid:slug`, `service-request-seasonal:slug`). */
  source: string;
  /** Honeypot — if non-empty, signup is skipped silently. */
  website?: string;
  /** Merged into JSON payloads (json mode) and optional form field (form mode). */
  tags?: string[];
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeEmail(input: string) {
  return input.replace(/\s+/g, " ").trim().slice(0, 120);
}

function sanitizeSource(input: string) {
  return input.replace(/\s+/g, " ").trim().slice(0, 120) || "newsletter-embed";
}

/**
 * Shared signup forward for `/api/newsletter-embed` and internal callers (e.g. service-request seasonal opt-in).
 */
export async function runNewsletterEmbedSignup(
  input: NewsletterEmbedInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (input.website != null && String(input.website).trim() !== "") {
    return { ok: true };
  }

  const email = sanitizeEmail(input.email);
  const source = sanitizeSource(input.source);
  if (!isValidEmail(email)) {
    return { ok: false, error: "Valid email is required" };
  }

  const action = process.env.NEWSLETTER_EMBED_FORM_ACTION?.trim();
  const emailField = process.env.NEWSLETTER_EMBED_EMAIL_FIELD?.trim() || "email";
  const mode = (process.env.NEWSLETTER_EMBED_BODY_MODE?.trim().toLowerCase() || "form") as "form" | "json";
  const tagsFieldName = process.env.NEWSLETTER_EMBED_TAGS_FIELD_NAME?.trim() || "tags";

  let extra: Record<string, string> = {};
  const rawExtra = process.env.NEWSLETTER_EMBED_EXTRA_FIELDS_JSON?.trim();
  if (rawExtra) {
    try {
      const parsed = JSON.parse(rawExtra) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        extra = Object.fromEntries(
          Object.entries(parsed as Record<string, unknown>).map(([k, v]) => [k, String(v ?? "")])
        );
      }
    } catch {
      return { ok: false, error: "Server misconfiguration: extra fields JSON" };
    }
  }

  const tags = input.tags?.filter(Boolean) ?? [];

  if (action) {
    try {
      if (mode === "json") {
        const payload: Record<string, unknown> = { ...extra, [emailField]: email };
        if (tags.length) {
          payload[tagsFieldName] = tags;
        }
        const res = await fetch(action, {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          return { ok: false, error: "Provider rejected the request" };
        }
      } else {
        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(extra)) {
          params.set(k, v);
        }
        params.set(emailField, email);
        if (tags.length) {
          params.set(tagsFieldName, tags.join(","));
        }
        const res = await fetch(action, {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });
        if (!res.ok) {
          return { ok: false, error: "Provider rejected the request" };
        }
      }
    } catch {
      return { ok: false, error: "Could not reach signup provider" };
    }
  } else {
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "newsletter-signups.jsonl");
      fs.appendFileSync(
        filePath,
        JSON.stringify({
          email,
          source,
          tags: tags.length ? tags : undefined,
          createdAt: new Date().toISOString(),
          note: "NEWSLETTER_EMBED_FORM_ACTION not set — configure for Mailchimp/ConvertKit/Loops",
        }) + "\n",
        "utf8"
      );
    } catch {
      // ignore
    }
  }

  return { ok: true };
}
