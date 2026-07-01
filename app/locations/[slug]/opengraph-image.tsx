import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveLocationOgImage } from "../../../lib/og-image-resolvers";
import { getLocations } from "../../../lib/site-content";
import { isRedirectedLocationSlug } from "../../../lib/public-site-scope";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocations()
    .filter((l) => !isRedirectedLocationSlug(l.slug))
    .map((l) => ({ slug: l.slug }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX home services by location | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return dynamicOgImageExports(resolveLocationOgImage(slug)).Image();
}
