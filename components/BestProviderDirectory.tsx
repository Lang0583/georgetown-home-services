import type { Provider, ProviderCategory } from "@/data/providers";
import { SHORT_VERIFIED_LIST_NOTES } from "@/data/providers";
import ProviderCard from "./ProviderCard";
import LicenseVerificationMethodology from "./LicenseVerificationMethodology";

export default function BestProviderDirectory({
  providers,
  category,
}: {
  providers: Provider[];
  category?: ProviderCategory;
}) {
  const topPickName = providers[0]?.name ?? null;
  const shortListNote = category ? SHORT_VERIFIED_LIST_NOTES[category] : undefined;

  return (
    <div className="mt-5 space-y-4">
      {shortListNote ? (
        <p className="max-w-3xl text-sm leading-relaxed text-muted">{shortListNote}</p>
      ) : null}
      <LicenseVerificationMethodology providers={providers} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Google-verified listings for Georgetown and Williamson County. Confirm licensing, insurance, and scope
          directly with any company before hiring.
        </p>
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{providers.length}</span> listed
        </p>
      </div>
      {providers.length ? (
        <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {providers.map((provider) => (
            <li key={`${provider.category}-${provider.name}`}>
              <ProviderCard
                provider={provider}
                showTopPick={provider.name === topPickName}
                compact
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-ink/10 bg-surface p-5 text-sm text-muted shadow-sm">
          No verified providers are listed for this category yet.
        </div>
      )}
    </div>
  );
}
