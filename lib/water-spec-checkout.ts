import { SITE_URL } from "@/lib/page-seo";

export const WATER_SPEC_PRODUCT = "spec_79" as const;
export const WATER_SPEC_VENTURE = "georgetown_home_services" as const;

export const WATER_SPEC_PLANT_BANDS = ["southlake", "park", "both"] as const;
export type WaterSpecPlantBand = (typeof WATER_SPEC_PLANT_BANDS)[number];

export const WATER_SPEC_REGEN_DAYS = ["3", "4", "3_and_4"] as const;
export type WaterSpecRegenDays = (typeof WATER_SPEC_REGEN_DAYS)[number];

export const WATER_SPEC_PEOPLE_MIN = 1;
export const WATER_SPEC_PEOPLE_MAX = 12;
export const WATER_SPEC_NAME_MIN = 2;
export const WATER_SPEC_NAME_MAX = 80;
export const WATER_SPEC_ADDRESS_MAX = 120;

export type WaterSpecCheckoutInput = {
  customer_name: string;
  customer_email: string;
  people: number;
  plant_band: WaterSpecPlantBand;
  regen_days: WaterSpecRegenDays;
  address_or_zip: string;
  product: typeof WATER_SPEC_PRODUCT;
  affiliate_disclosure_ack: boolean;
  city_disclosure_ack: boolean;
};

export function checkoutSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || SITE_URL;
  return raw.replace(/\/$/, "");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPlantBand(value: string): value is WaterSpecPlantBand {
  return (WATER_SPEC_PLANT_BANDS as readonly string[]).includes(value);
}

function isRegenDays(value: string): value is WaterSpecRegenDays {
  return (WATER_SPEC_REGEN_DAYS as readonly string[]).includes(value);
}

export function parseWaterSpecCheckout(body: unknown):
  | { ok: true; value: WaterSpecCheckoutInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Check the required fields and try again." };
  }

  const raw = body as Record<string, unknown>;
  const product = typeof raw.product === "string" ? raw.product.trim() : "";
  if (product === "refresh_49") {
    return { ok: false, error: "The annual refresh is not for sale yet. Use the written spec for now." };
  }
  if (product !== WATER_SPEC_PRODUCT) {
    return { ok: false, error: "Check the required fields and try again." };
  }

  const customer_name = typeof raw.customer_name === "string" ? raw.customer_name.replace(/\s+/g, " ").trim() : "";
  if (customer_name.length < WATER_SPEC_NAME_MIN || customer_name.length > WATER_SPEC_NAME_MAX) {
    return { ok: false, error: "Enter your name (2 to 80 characters)." };
  }

  const customer_email = typeof raw.customer_email === "string" ? raw.customer_email.trim() : "";
  if (!isEmail(customer_email)) {
    return { ok: false, error: "Enter a valid email for the PDF." };
  }

  const peopleRaw = typeof raw.people === "number" ? raw.people : Number(raw.people);
  if (!Number.isInteger(peopleRaw) || peopleRaw < WATER_SPEC_PEOPLE_MIN || peopleRaw > WATER_SPEC_PEOPLE_MAX) {
    return { ok: false, error: `People in the home must be an integer from ${WATER_SPEC_PEOPLE_MIN} to ${WATER_SPEC_PEOPLE_MAX}.` };
  }

  const plant_band = typeof raw.plant_band === "string" ? raw.plant_band.trim() : "";
  if (!isPlantBand(plant_band)) {
    return { ok: false, error: "Pick which plant band we should use." };
  }

  const regen_days = typeof raw.regen_days === "string" ? raw.regen_days.trim() : "";
  if (!isRegenDays(regen_days)) {
    return { ok: false, error: "Pick days between regenerations." };
  }

  const address_or_zip = typeof raw.address_or_zip === "string" ? raw.address_or_zip.replace(/\s+/g, " ").trim() : "";
  if (address_or_zip.length > WATER_SPEC_ADDRESS_MAX) {
    return { ok: false, error: `Street address or ZIP must be ${WATER_SPEC_ADDRESS_MAX} characters or fewer.` };
  }

  if (raw.affiliate_disclosure_ack !== true) {
    return { ok: false, error: "Confirm that Georgetown Home Services does not install equipment." };
  }
  if (raw.city_disclosure_ack !== true) {
    return { ok: false, error: "Confirm that Georgetown Home Services is not the City of Georgetown." };
  }

  return {
    ok: true,
    value: {
      customer_name,
      customer_email,
      people: peopleRaw,
      plant_band,
      regen_days,
      address_or_zip,
      product: WATER_SPEC_PRODUCT,
      affiliate_disclosure_ack: true,
      city_disclosure_ack: true,
    },
  };
}

export function integrationIdentifier(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const byte of bytes) {
    suffix += alphabet[byte % alphabet.length];
  }
  return `ghs_water_spec_${suffix}`;
}
