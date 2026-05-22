import Link from "next/link";
import { NEIGHBORHOOD_HAIL_HUB_ROUTES, SEVERE_WEATHER_LINKS } from "../lib/severe-weather-links";

const links = [
  {
    href: SEVERE_WEATHER_LINKS.roofingHub,
    title: "Roofing hub",
    description: "Tarp-vs-monitor framing, HOA/insurance pacing, inspection lead form & video checklist.",
  },
  {
    href: SEVERE_WEATHER_LINKS.hailGuideBlog,
    title: "Williamson County hail guide",
    description: "Active May 2026 storm-cycle notes plus deep FAQs—start here before neighborhood drill-downs.",
  },
  {
    href: SEVERE_WEATHER_LINKS.bestRoofers,
    title: "Best roofers shortlist",
    description: "Vetted inspectors for apples-to-apples scopes—not drive-by canvassers chasing renewals.",
  },
] as const;

export default function HomeSevereWeatherStrip() {
  return (
    <section
      className="mt-10 scroll-mt-28 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-white p-6 shadow-md sm:p-8"
      aria-labelledby="severe-weather-heading"
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          ⛈️
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="severe-weather-heading" className="text-xl font-semibold tracking-tight text-gray-900">
            Severe weather & hail in Georgetown
          </h2>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-gray-700">
            <p>
              The last few nights of <strong>May 2026</strong> have stacked damaging hail, straight-line wind, and saturated
              ground across Williamson County—especially where mature tree canopies shed debris into valleys, scuppers, and
              gutters faster than homeowners can clear them. That combination turns “small” hail into chronic moisture contact
              on shingle butts, flashing terminations, and ridge vent lips even before the next cell trains overhead.
            </p>
            <p>
              Use the county guide for narrative context, the roofing hub for planning language, then drop into the
              neighborhood hail pages that match your microclimate—Sun City’s oak load, Teravista’s fairway wind channeling,
              Wolf Ranch’s ARC cadence, or Georgetown Village’s tight setbacks—so documentation and HOA packets stay accurate.
            </p>
          </div>
        </div>
      </div>
      <ul className="mt-6 grid list-none gap-3 sm:grid-cols-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full rounded-lg border border-sky-100 border-t-[3px] border-t-sky-500 bg-white p-4 shadow-sm transition hover:border-x-sky-200 hover:border-b-sky-200 hover:bg-sky-50/80"
            >
              <span className="text-sm font-semibold text-gray-900">{item.title}</span>
              <span className="mt-1 block text-sm text-gray-700">{item.description}</span>
              <span className="mt-2 inline-block text-xs font-semibold text-primary">Open guide →</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-sky-200/80 pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">Neighborhood hail hubs</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
          Each page layers microclimate notes (trees, wind fetch, HOA logistics) on top of the county narrative—read the guide
          first, then pick your neighborhood for street-level nuance.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {NEIGHBORHOOD_HAIL_HUB_ROUTES.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm transition hover:border-primary/40 hover:bg-sky-50"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
