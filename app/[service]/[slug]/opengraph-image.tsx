import { getSubServiceStaticParams } from "@/data/sub-services";
import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveSubServiceOgImage } from "../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSubServiceStaticParams().map(({ service, slug }) => ({ service, slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX home service guide | Georgetown Home Services";

export default async function Image({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  return dynamicOgImageExports(resolveSubServiceOgImage(service, slug)).Image();
}
