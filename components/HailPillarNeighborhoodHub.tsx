import Link from "next/link";

/**
 * Canonical hail cluster navigation on the county pillar post — wires neighborhood
 * hail landing pages from one editorial hub (thin per-neighborhood blog stubs redirect here).
 */
export default function HailPillarNeighborhoodHub() {
  return (
    <section
      className="not-prose mt-8 rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm"
      aria-labelledby="hail-neighborhood-hub-heading"
    >
      <h2 id="hail-neighborhood-hub-heading" className="text-lg font-semibold text-gray-900 md:text-xl">
        Neighborhood hail guides: May 2026 in Georgetown &amp; Williamson County
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">
        This article is the <strong>county-wide hail reference</strong> for May 9–10, 2026. For checklists written around
        Sun City, Teravista, Wolf Ranch, and Georgetown Village—roof access, HOA rules, and inspection timing—open the
        neighborhood page for your area.
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
        <li>
          <span className="font-semibold text-gray-900">Sun City</span> —{" "}
          <Link href="/neighborhoods/sun-city/hail-damage" className="font-medium text-primary hover:underline">
            Sun City hail damage guide
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Teravista</span> —{" "}
          <Link href="/neighborhoods/teravista/hail-damage" className="font-medium text-primary hover:underline">
            Teravista hail damage guide
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Wolf Ranch</span> —{" "}
          <Link href="/neighborhoods/wolf-ranch/hail-damage" className="font-medium text-primary hover:underline">
            Wolf Ranch hail damage guide
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Georgetown Village</span> —{" "}
          <Link href="/neighborhoods/georgetown-village/hail-damage" className="font-medium text-primary hover:underline">
            Georgetown Village hail damage guide
          </Link>
        </li>
      </ul>
      <p className="mt-4 text-xs leading-snug text-gray-600">
        Older marketing URL{" "}
        <code className="rounded bg-amber-100/80 px-1">/blog/hail-damage-georgetown-tx-may-2026</code> redirects to this
        county pillar—bookmark this page for the full Williamson County write-up.
      </p>
    </section>
  );
}
