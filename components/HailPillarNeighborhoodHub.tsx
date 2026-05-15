import Link from "next/link";

/**
 * Canonical hail cluster navigation on the county pillar post — reduces thin orphan signals
 * by wiring neighborhood blogs + neighborhood hail landing pages from one editorial hub.
 */
export default function HailPillarNeighborhoodHub() {
  return (
    <section
      className="not-prose mt-8 rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm"
      aria-labelledby="hail-neighborhood-hub-heading"
    >
      <h2 id="hail-neighborhood-hub-heading" className="text-lg font-semibold text-gray-900 md:text-xl">
        Neighborhood guides: May 2026 hail in Georgetown &amp; Williamson County
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">
        This article is the <strong>county-wide hail reference</strong> for May 9–10, 2026. For hyper-local checklists
        written around Sun City, Teravista, Wolf Ranch, and Georgetown Village—plus different roof access and HOA
        realities—use the matching page below. Each link includes both a <strong>long-form blog</strong> and a{" "}
        <strong>neighborhood hail hub</strong> with FAQs.
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
        <li>
          <span className="font-semibold text-gray-900">Sun City</span> —{" "}
          <Link href="/blog/hail-damage-sun-city-georgetown-tx" className="font-medium text-primary hover:underline">
            Blog: hail repair &amp; inspections
          </Link>{" "}
          ·{" "}
          <Link href="/neighborhoods/sun-city/hail-damage" className="font-medium text-primary hover:underline">
            Neighborhood hail hub
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Teravista</span> —{" "}
          <Link href="/blog/hail-damage-teravista-georgetown-tx" className="font-medium text-primary hover:underline">
            Blog: hail repair &amp; inspections
          </Link>{" "}
          ·{" "}
          <Link href="/neighborhoods/teravista/hail-damage" className="font-medium text-primary hover:underline">
            Neighborhood hail hub
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Wolf Ranch</span> —{" "}
          <Link href="/blog/hail-damage-wolf-ranch-georgetown-tx" className="font-medium text-primary hover:underline">
            Blog: hail repair &amp; inspections
          </Link>{" "}
          ·{" "}
          <Link href="/neighborhoods/wolf-ranch/hail-damage" className="font-medium text-primary hover:underline">
            Neighborhood hail hub
          </Link>
        </li>
        <li>
          <span className="font-semibold text-gray-900">Georgetown Village</span> —{" "}
          <Link href="/blog/hail-damage-georgetown-village-tx" className="font-medium text-primary hover:underline">
            Blog: hail repair &amp; inspections
          </Link>{" "}
          ·{" "}
          <Link href="/neighborhoods/georgetown-village/hail-damage" className="font-medium text-primary hover:underline">
            Neighborhood hail hub
          </Link>
        </li>
      </ul>
      <p className="mt-4 text-xs leading-snug text-gray-600">
        Marketing URL{" "}
        <Link href="/blog/hail-damage-georgetown-tx-may-2026" className="font-medium text-primary hover:underline">
          /blog/hail-damage-georgetown-tx-may-2026
        </Link>{" "}
        redirects to this pillar; use this page for bookmarks and internal links when you want the full Williamson
        County write-up.
      </p>
    </section>
  );
}
