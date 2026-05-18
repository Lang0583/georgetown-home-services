import JsonLd from "./JsonLd";
import { buildGeorgetownHomeServicesLocalBusinessJsonLd } from "../lib/local-business-schema";

/** Publisher `LocalBusiness` JSON-LD (Georgetown Home Services — directory, single location context). */
export default function LocalBusinessSchema() {
  return <JsonLd data={buildGeorgetownHomeServicesLocalBusinessJsonLd()} />;
}
