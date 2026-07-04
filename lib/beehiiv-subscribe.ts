/**
 * Subscribe an email to Beehiiv (v2 API).
 * https://developers.beehiiv.com/docs/v2
 */
export type BeehiivSubscribeResult =
  | { ok: true }
  | { ok: false; error: string };

export async function subscribeEmailToBeehiiv(params: {
  email: string;
  source?: string;
}): Promise<BeehiivSubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();

  if (!apiKey || !publicationId) {
    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      return { ok: false, error: "Beehiiv is not configured on this server" };
    }

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: params.email,
          guideChoice: "hvac_texas_heat",
          source: params.source ?? "lead-magnet-download",
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return { ok: false, error: "Signup provider rejected the request" };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Could not reach signup provider" };
    }
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicationId)}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: params.source ?? "georgetown-home-services",
          utm_medium: "lead_magnet",
          utm_campaign: "hvac-texas-heat-guide",
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("[beehiiv] subscription failed:", res.status, text.slice(0, 200));
      return { ok: false, error: "Beehiiv rejected the subscription" };
    }

    return { ok: true };
  } catch (err) {
    console.warn("[beehiiv] request error:", err);
    return { ok: false, error: "Could not reach Beehiiv" };
  }
}
