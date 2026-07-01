import { neighborhoodHomeServicesHubStaticParams } from "@/data/neighborhood-home-services-hubs";
import { dynamicOgImageExports } from "../../../../lib/og-image-dynamic";
import { resolveNeighborhoodHubOgImage } from "../../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return neighborhoodHomeServicesHubStaticParams();
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Neighborhood home services in Georgetown, TX | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params;
  return dynamicOgImageExports(resolveNeighborhoodHubOgImage(neighborhood)).Image();
}
