import type { ProviderComparison } from "../lib/providers";

export default function ComparisonSection({ comparison }: { comparison: ProviderComparison }) {
  return (
    <section className="mt-12 rounded-xl border border-ink/10 bg-surface p-6 shadow-md md:p-8">
      <h2 className="text-2xl font-semibold text-ink">Comparison</h2>
      <p className="mt-2 text-sm text-muted">
        Pricing and response time vary by job scope, season, and availability. Use this section as a practical baseline for planning.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Pricing expectations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {comparison.pricingExpectations.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Response time</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {comparison.responseTime.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">Services offered</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {comparison.servicesOffered.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

