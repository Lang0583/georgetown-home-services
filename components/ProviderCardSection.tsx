import BestProviderDirectory from "./BestProviderDirectory";
import BestProvidersMethodologyCallout from "./BestProvidersMethodologyCallout";
import type { Provider } from "../data/providers";

export default function ProviderCardSection({ providers }: { providers: Provider[] }) {
  if (!providers.length) return null;

  return (
    <div id="providers" className="scroll-mt-24 mt-12">
      <BestProvidersMethodologyCallout />
      <BestProviderDirectory providers={providers} category={providers[0]?.category} />
    </div>
  );
}
