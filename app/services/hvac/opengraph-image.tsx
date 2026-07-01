import { staticOgImage } from "../../../lib/og-image";
import { resolveTradeHubOgImage } from "../../../lib/og-image-resolvers";

const content = resolveTradeHubOgImage("hvac");
const og = staticOgImage(content ?? { title: "hvac", category: "Services" });

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
