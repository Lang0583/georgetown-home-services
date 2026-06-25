import JsonLd from "./JsonLd";
import { buildGeorgetownTradeServiceJsonLd } from "../lib/trade-service-schema";
import type { PricingCategory } from "../lib/pricing-data";

type TradeHubKey = PricingCategory["key"];

type Props = {
  categoryKey: TradeHubKey;
  /** Canonical absolute URL for the hub (must match page metadata). */
  pageUrl: string;
};

/**
 * `Service` + `AggregateOffer` JSON-LD for core trade hubs (pricing bands + `areaServed` Georgetown TX).
 */
export default function TradeServiceSchema({ categoryKey, pageUrl }: Props) {
  return <JsonLd data={buildGeorgetownTradeServiceJsonLd(categoryKey, pageUrl)} />;
}
