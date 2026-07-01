import { neighborhoodHailDamageStaticParams } from "@/data/neighborhood-hail-pages";
import { dynamicOgImageExports } from "../../../../lib/og-image-dynamic";
import { resolveNeighborhoodHailOgImage } from "../../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return neighborhoodHailDamageStaticParams();
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Hail damage home services in Georgetown, TX | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params;
  return dynamicOgImageExports(resolveNeighborhoodHailOgImage(neighborhood)).Image();
}
