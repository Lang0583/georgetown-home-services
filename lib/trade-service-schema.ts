import { findCategory, type PricingCategory } from "./pricing-data";
import { GEORGETOWN_HOME_SERVICES_BUSINESS_URL } from "./local-business-schema";

type TradeKey = PricingCategory["key"];

const TRADE_SERVICE_NAMES: Record<TradeKey, { name: string; serviceType: string }> = {
  plumbing: {
    name: "Residential plumbing services in Georgetown, TX",
    serviceType: "Plumbing",
  },
  hvac: {
    name: "Residential HVAC services in Georgetown, TX",
    serviceType: "HVAC",
  },
  roofing: {
    name: "Residential roofing services in Georgetown, TX",
    serviceType: "Roofing",
  },
  electrical: {
    name: "Residential electrical services in Georgetown, TX",
    serviceType: "Electrical",
  },
  landscaping: {
    name: "Residential landscaping & lawn care in Georgetown, TX",
    serviceType: "Landscaping",
  },
  pest: {
    name: "Residential pest control in Georgetown, TX",
    serviceType: "PestControl",
  },
  foundation: {
    name: "Residential foundation repair in Georgetown, TX",
    serviceType: "FoundationRepair",
  },
  cleaning: {
    name: "Residential house cleaning in Georgetown, TX",
    serviceType: "HouseCleaning",
  },
};

/** Min/max across category rows with positive numeric bounds (planning context, not quotes). */
function planningBoundsForCategory(cat: PricingCategory): { lowPrice: number; highPrice: number } {
  let low = Infinity;
  let high = -Infinity;
  for (const row of cat.rows) {
    if (row.low === 0 && row.high === 0) continue;
    const rowLow = row.low > 0 ? row.low : row.high;
    const rowHigh = row.high > 0 ? row.high : row.low;
    if (rowLow > 0) low = Math.min(low, rowLow);
    if (rowHigh > 0) high = Math.max(high, rowHigh);
  }
  if (!Number.isFinite(low) || !Number.isFinite(high)) return { lowPrice: 0, highPrice: 0 };
  return { lowPrice: low, highPrice: high };
}

/**
 * `Service` + `AggregateOffer` for core trade hub pages (/services/plumbing, hvac, roofing).
 */
export function buildGeorgetownTradeServiceJsonLd(
  categoryKey: TradeKey,
  /** Same URL as the hub page canonical (e.g. absolutePageUrl("/services/plumbing")). */
  serviceUrl: string,
): Record<string, unknown> {
  const cat = findCategory(categoryKey);
  const { name, serviceType } = TRADE_SERVICE_NAMES[categoryKey];
  const { lowPrice, highPrice } = planningBoundsForCategory(cat);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "Georgetown Home Services",
      url: GEORGETOWN_HOME_SERVICES_BUSINESS_URL,
    },
    areaServed: [
      "Georgetown TX",
      "Georgetown, TX",
      {
        "@type": "City",
        name: "Georgetown",
        containedInPlace: { "@type": "State", name: "Texas" },
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      ...(lowPrice > 0 && highPrice > 0 ? { lowPrice, highPrice } : {}),
      description:
        "Typical planning price ranges for common Georgetown, TX jobs from editorial tables—not binding quotes. Confirm scope with licensed contractors.",
    },
  };
}
