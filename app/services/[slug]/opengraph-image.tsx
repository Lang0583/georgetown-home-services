import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveServiceOgImage } from "../../../lib/og-image-resolvers";
import { getServiceSlugs } from "../../../lib/site-content";
import { isRedirectedServiceSlug } from "../../../lib/public-site-scope";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs()
    .filter((slug) => !isRedirectedServiceSlug(slug))
    .map((slug) => ({ slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX home service guide | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveServiceOgImage(slug)).Image();
}
