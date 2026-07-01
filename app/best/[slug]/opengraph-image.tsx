import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveBestOgImage } from "../../../lib/og-image-resolvers";
import { getBestSlugs } from "../../../lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBestSlugs().map((slug) => ({ slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Best home service providers in Georgetown, TX | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveBestOgImage(slug)).Image();
}
