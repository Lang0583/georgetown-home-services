import { staticOgImage } from "../../../lib/og-image";
import { resolveTradeHubOgImage } from "../../../lib/og-image-resolvers";

const content = resolveTradeHubOgImage("electrical");
const og = staticOgImage(content ?? { title: "electrical", category: "Services" });

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
