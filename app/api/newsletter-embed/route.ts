import { NextResponse } from "next/server";
import { runNewsletterEmbedSignup } from "../../../lib/newsletter-embed-core";
import { sendLeadMagnetWelcomeEmail } from "../../../lib/send-lead-magnet-welcome-email";

type Body = {
  email?: string;
  website?: string;
  source?: string;
  tags?: string[];
};

/**
 * Forwards to Mailchimp / ConvertKit / Loops-style embed endpoints.
 *
 * Env: see `lib/newsletter-embed-core.ts`
 * - `NEWSLETTER_EMBED_TAGS_FIELD_NAME` — JSON key / form field for tags (default `tags`). Form mode sends comma-separated values.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const result = await runNewsletterEmbedSignup({
    email: body.email ?? "",
    website: body.website,
    source: body.source ?? "newsletter-embed",
    tags: body.tags,
  });

  if (!result.ok) {
    let status = 400;
    if (result.error.includes("configuration")) status = 500;
    else if (result.error.includes("Provider") || result.error.includes("reach")) status = 502;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  if (result.recorded) {
    const to = (body.email ?? "").replace(/\s+/g, " ").trim();
    try {
      await sendLeadMagnetWelcomeEmail({ to });
    } catch {
      /* signup already succeeded */
    }
  }

  return NextResponse.json({ ok: true });
}
