import { GEORGETOWN_ZIP_CODES } from "@/data/zip-codes";
import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveZipOgImage } from "../../../lib/og-image-resolvers";

export const dynamicParams = false;

export function generateStaticParams() {
  return GEORGETOWN_ZIP_CODES.map((zipcode) => ({ zipcode }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX home services by ZIP code | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ zipcode: string }> }) {
  const { zipcode } = await params;
  return dynamicOgImageExports(resolveZipOgImage(zipcode)).Image();
}
