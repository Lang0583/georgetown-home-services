import { COMPARISON_SLUGS } from "@/data/comparisons";
import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveCompareOgImage } from "../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISON_SLUGS.map((slug) => ({ slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Compare Georgetown TX home service providers | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveCompareOgImage(slug)).Image();
}
