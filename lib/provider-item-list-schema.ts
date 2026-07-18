import type { Provider } from "../data/providers";
import { buildLocalBusiness, buildLocalBusinessNode } from "./schema";

/** LocalBusiness JSON-LD for a single provider profile page. */
export function buildProviderLocalBusinessJsonLd(
  provider: Provider,
  pageUrl?: string,
): Record<string, unknown> {
  return buildLocalBusiness(provider, pageUrl);
}

/** ItemList JSON-LD with LocalBusiness entries for /best/[slug] provider cards. */
export function buildProviderItemListJsonLd(listName: string, providers: Provider[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: providers.map((provider, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: buildLocalBusinessNode(provider),
    })),
  };
}
