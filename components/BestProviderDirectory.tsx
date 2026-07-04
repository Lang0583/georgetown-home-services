"use client";

import { useMemo, useState } from "react";
import type { Provider } from "@/data/providers";
import { partitionDirectoryProviders } from "@/lib/provider-directory";
import ProviderCard from "./ProviderCard";

export default function BestProviderDirectory({ providers }: { providers: Provider[] }) {
  const [showLowerSignal, setShowLowerSignal] = useState(false);

  const { established, lowerSignal } = useMemo(
    () => partitionDirectoryProviders(providers),
    [providers],
  );

  const topPickName = established[0]?.name ?? lowerSignal[0]?.name ?? null;

  return (
    <div className="mt-5 space-y-8">
      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">Established picks</h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-gray-700">
              Listings with stronger public review volume and documentation. Confirm licensing, insurance, and scope
              directly with any company before hiring.
            </p>
          </div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">{established.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{providers.length}</span>
          </p>
        </div>
        {established.length ? (
          <ul className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
            {established.map((provider) => (
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
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 shadow-sm">
            No established picks are listed for this category yet.
          </div>
        )}
      </section>

      {lowerSignal.length ? (
        <section>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showLowerSignal}
              onChange={(e) => setShowLowerSignal(e.target.checked)}
              className="rounded border-gray-300"
            />
            Show newer / lower-signal options ({lowerSignal.length})
          </label>
          {showLowerSignal ? (
            <>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                These providers have weaker public signals (for example, fewer reviews). Verify details carefully and
                prioritize written scopes.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {lowerSignal.map((provider) => (
                  <li key={`${provider.category}-${provider.name}-low`}>
                    <ProviderCard
                      provider={provider}
                      showTopPick={!topPickName && provider.name === lowerSignal[0]?.name}
                      compact
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
