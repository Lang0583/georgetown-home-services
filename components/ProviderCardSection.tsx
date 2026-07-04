import ProviderCard from "./ProviderCard";
import BestProviderDirectory from "./BestProviderDirectory";
import BestProvidersMethodologyCallout from "./BestProvidersMethodologyCallout";
import { PROVIDER_DISCLAIMER, type Provider } from "../data/providers";

export default function ProviderCardSection({ providers }: { providers: Provider[] }) {
  if (!providers.length) return null;

  return (
    <div id="providers" className="scroll-mt-24">
      <div className="mt-6 rounded-lg border border-ink/10 bg-surface px-4 py-3 text-sm text-muted">
        <p>{PROVIDER_DISCLAIMER}</p>
      </div>

      <div className="mt-4">
        <BestProvidersMethodologyCallout />
      </div>

      <BestProviderDirectory providers={providers} />
    </div>
  );
}
