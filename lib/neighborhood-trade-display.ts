import type { NeighborhoodServicePage } from "@/data/neighborhoods";

/** H1 pattern: "Plumbers Serving Sun City — Georgetown, TX" */
export function neighborhoodTradeH1(page: NeighborhoodServicePage): string {
  return `${page.serviceName} Serving ${page.neighborhoodName} — Georgetown, TX`;
}
