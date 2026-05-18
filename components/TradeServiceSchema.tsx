import JsonLd from "./JsonLd";
import { buildGeorgetownTradeServiceJsonLd } from "../lib/trade-service-schema";

type CoreTradeHubKey = "plumbing" | "hvac" | "roofing";

type Props = {
  categoryKey: CoreTradeHubKey;
  /** Canonical absolute URL for the hub (must match page metadata). */
  pageUrl: string;
};

/**
 * `Service` + `AggregateOffer` JSON-LD for core trade hubs (pricing bands + `areaServed` Georgetown TX).
 */
export default function TradeServiceSchema({ categoryKey, pageUrl }: Props) {
  return <JsonLd data={buildGeorgetownTradeServiceJsonLd(categoryKey, pageUrl)} />;
}
