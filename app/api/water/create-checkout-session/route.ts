import { NextResponse } from "next/server";
import Stripe from "stripe";
import { waterSpecCheckoutRateLimitOk } from "@/lib/contact-rate-limit";
import {
  WATER_SPEC_PRODUCT,
  WATER_SPEC_VENTURE,
  checkoutSiteUrl,
  integrationIdentifier,
  parseWaterSpecCheckout,
} from "@/lib/water-spec-checkout";

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function POST(req: Request) {
  if (!waterSpecCheckoutRateLimitOk(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many checkout attempts. Wait a bit and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body && typeof body === "object" && "website" in body) {
    const honeypot = (body as { website?: unknown }).website;
    if (honeypot != null && String(honeypot).trim() !== "") {
      return NextResponse.json({ ok: true });
    }
  }

  const parsed = parseWaterSpecCheckout(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  const priceId = process.env.STRIPE_PRICE_SPEC_79?.trim();
  if (!secretKey || !priceId) {
    return NextResponse.json(
      { ok: false, error: "Checkout is not configured yet. Email us and we will send a payment link." },
      { status: 503 },
    );
  }

  const site = checkoutSiteUrl();
  const stripe = new Stripe(secretKey);
  const value = parsed.value;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: value.customer_email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/water/spec/thank-you`,
      cancel_url: `${site}/water/spec?canceled=1`,
      integration_identifier: integrationIdentifier(),
      metadata: {
        product: WATER_SPEC_PRODUCT,
        plant_band: value.plant_band,
        people: String(value.people),
        regen_days: value.regen_days,
        customer_email: value.customer_email,
        customer_name: value.customer_name,
        address_or_zip: value.address_or_zip,
        venture: WATER_SPEC_VENTURE,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "Checkout did not return a payment URL. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Checkout could not start. Try again, or email us if this keeps failing." },
      { status: 502 },
    );
  }
}
