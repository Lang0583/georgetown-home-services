import Link from "next/link";

/**
 * County pillar navigation — in-page neighborhood sections plus matching hail hubs.
 */
export default function HailPillarNeighborhoodHub() {
  const neighborhoods = [
    {
      name: "Sun City",
      sectionId: "sun-city",
      hubPath: "/neighborhoods/sun-city/hail-damage",
    },
    {
      name: "Teravista",
      sectionId: "teravista",
      hubPath: "/neighborhoods/teravista/hail-damage",
    },
    {
      name: "Wolf Ranch",
      sectionId: "wolf-ranch",
      hubPath: "/neighborhoods/wolf-ranch/hail-damage",
    },
    {
      name: "Georgetown Village",
      sectionId: "georgetown-village",
      hubPath: "/neighborhoods/georgetown-village/hail-damage",
    },
  ] as const;

  return (
    <section
      className="not-prose mt-8 rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm"
      aria-labelledby="hail-neighborhood-hub-heading"
    >
      <h2 id="hail-neighborhood-hub-heading" className="text-lg font-semibold text-gray-900 md:text-xl">
        Neighborhood hail notes: May 2026 in Georgetown &amp; Williamson County
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">
        This article is the <strong>county-wide hail reference</strong> for May 9–10, 2026. Jump to neighborhood
        sections below or open each subdivision&apos;s hail hub for checklists on roof access, HOA timing, and inspection
        scheduling.
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
        {neighborhoods.map((n) => (
          <li key={n.sectionId}>
            <span className="font-semibold text-gray-900">{n.name}</span> —{" "}
            <Link
              href={`#${n.sectionId}`}
              className="font-medium text-primary hover:underline"
            >
              {n.name} section in this article
            </Link>
            {" · "}
            <Link href={n.hubPath} className="font-medium text-primary hover:underline">
              {n.name} neighborhood hail hub
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-snug text-gray-600">
        Older marketing URL{" "}
        <code className="rounded bg-amber-100/80 px-1">/blog/hail-damage-georgetown-tx-may-2026</code> redirects to this
        county pillar—bookmark this page for the full Williamson County write-up.
      </p>
    </section>
  );
}
