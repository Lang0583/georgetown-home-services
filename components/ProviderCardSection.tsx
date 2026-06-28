import ProviderCard from "./ProviderCard";
import {
  PROVIDER_DISCLAIMER,
  PROVIDERS_LAST_VERIFIED,
  type Provider,
} from "../data/providers";

export default function ProviderCardSection({ providers }: { providers: Provider[] }) {
  if (!providers.length) return null;

  return (
    <div id="providers" className="scroll-mt-24">
      <div className="mt-6 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Last verified:</span> {PROVIDERS_LAST_VERIFIED}
        </p>
        <p className="mt-1 text-gray-600">{PROVIDER_DISCLAIMER}</p>
      </div>

      <div className="mt-5 space-y-6">
        {providers.map((provider) => (
          <ProviderCard key={`${provider.category}-${provider.name}`} provider={provider} />
        ))}
      </div>
    </div>
  );
}
