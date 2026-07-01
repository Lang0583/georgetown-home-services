import { TEXAS_SEASON_ORDER } from "@/lib/texas-seasons";
import { dynamicOgImageExports } from "../../../lib/og-image-dynamic";
import { resolveSeasonalOgImage } from "../../../lib/og-image-resolvers";

export function generateStaticParams() {
  return TEXAS_SEASON_ORDER.map((season) => ({ season }));
}

const _defaults = dynamicOgImageExports(null);
export const size = _defaults.size;
export const contentType = _defaults.contentType;
export const alt = "Georgetown TX seasonal home maintenance | Georgetown Home Services";

export default async function Image({ params }: { params: Promise<{ season: string }> }) {
  const { season } = await params;
  return dynamicOgImageExports(resolveSeasonalOgImage(season)).Image();
}
