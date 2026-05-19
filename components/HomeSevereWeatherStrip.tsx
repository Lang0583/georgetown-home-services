import Link from "next/link";
import { SEVERE_WEATHER_LINKS } from "../lib/severe-weather-links";

const links = [
  {
    href: SEVERE_WEATHER_LINKS.roofingHub,
    title: "Roofing hub",
    description: "Inspection checklist, hub video, and roof inspection request.",
  },
  {
    href: SEVERE_WEATHER_LINKS.hailGuideBlog,
    title: "Williamson County hail guide",
    description: "Timeline, FAQs, and what to document after a storm.",
  },
  {
    href: SEVERE_WEATHER_LINKS.bestRoofers,
    title: "Best roofers shortlist",
    description: "Compare vetted Georgetown roofers before you book inspections.",
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
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
            Central Texas storm season swings fast—document damage early, compare written scopes, and line up reputable
            inspectors. These hubs stay live year-round (not only during breaking alerts).
          </p>
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
    </section>
  );
}
