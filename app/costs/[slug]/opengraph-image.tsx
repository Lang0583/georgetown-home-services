import { getCostGuideStaticParams } from "@/data/cost-guides";
import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveCostGuideOgImage } from "../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCostGuideStaticParams();
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX home service cost guide | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveCostGuideOgImage(slug)).Image();
}
