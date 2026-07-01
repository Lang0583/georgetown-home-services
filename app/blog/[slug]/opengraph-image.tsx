import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveBlogOgImage } from "../../../lib/og-image-resolvers";
import { getBlogSlugs } from "../../../lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX homeowner blog | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveBlogOgImage(slug)).Image();
}
