import { getNeighborhoodServiceStaticParams } from "@/data/neighborhoods";
import { dynamicOgImageExports } from "../../../../lib/og-image-dynamic";
import { resolveNeighborhoodServiceOgImage } from "../../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNeighborhoodServiceStaticParams();
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX neighborhood home services | Georgetown Home Services";

export default async function Image({
  params,
}: {
  params: Promise<{ neighborhood: string; service: string }>;
}) {
  const { neighborhood, service } = await params;
  return dynamicOgImageExports(resolveNeighborhoodServiceOgImage(neighborhood, service)).Image();
}
