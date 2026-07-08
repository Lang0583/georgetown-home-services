import BestProviderDirectory from "./BestProviderDirectory";
import BestProvidersMethodologyCallout from "./BestProvidersMethodologyCallout";
import AffiliateDisclosure from "./AffiliateDisclosure";
import type { Provider } from "../data/providers";

export default function ProviderCardSection({ providers }: { providers: Provider[] }) {
  if (!providers.length) return null;

  return (
    <div id="providers" className="scroll-mt-24 mt-12">
      <BestProvidersMethodologyCallout />
      <AffiliateDisclosure className="mb-3 max-w-3xl" />
      <BestProviderDirectory providers={providers} category={providers[0]?.category} />
    </div>
  );
}
