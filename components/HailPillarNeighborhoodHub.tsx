import Link from "next/link";

/**
 * County pillar navigation — neighborhood hail blogs plus matching neighborhood hubs.
 */
export default function HailPillarNeighborhoodHub() {
  const neighborhoods = [
    {
      name: "Sun City",
      blogSlug: "hail-damage-sun-city-georgetown-tx",
      hubPath: "/neighborhoods/sun-city/hail-damage",
    },
    {
      name: "Teravista",
      blogSlug: "hail-damage-teravista-georgetown-tx",
      hubPath: "/neighborhoods/teravista/hail-damage",
    },
    {
      name: "Wolf Ranch",
      blogSlug: "hail-damage-wolf-ranch-georgetown-tx",
      hubPath: "/neighborhoods/wolf-ranch/hail-damage",
    },
    {
      name: "Georgetown Village",
      blogSlug: "hail-damage-georgetown-village-tx",
      hubPath: "/neighborhoods/georgetown-village/hail-damage",
    },
  ] as const;

  return (
    <section
      className="not-prose mt-8 rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm"
      aria-labelledby="hail-neighborhood-hub-heading"
    >
      <h2 id="hail-neighborhood-hub-heading" className="text-lg font-semibold text-gray-900 md:text-xl">
        Neighborhood hail guides: May 2026 in Georgetown &amp; Williamson County
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">
        This article is the <strong>county-wide hail reference</strong> for May 9–10, 2026. Each neighborhood below has a
        dedicated blog write-up and a matching neighborhood hub with checklists for roof access, HOA timing, and
        inspection scheduling.
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
        {neighborhoods.map((n) => (
          <li key={n.blogSlug}>
            <span className="font-semibold text-gray-900">{n.name}</span> —{" "}
            <Link href={`/blog/${n.blogSlug}`} className="font-medium text-primary hover:underline">
              {n.name} hail blog
            </Link>
            {" · "}
            <Link href={n.hubPath} className="font-medium text-primary hover:underline">
              {n.name} neighborhood hub
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
