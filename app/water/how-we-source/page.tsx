import Link from "next/link";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import WaterPlumberCta from "@/components/water/WaterPlumberCta";
import { formatArticleId, WATER_SOURCE } from "@/data/water";
import { formatLastUpdatedDisplay } from "@/lib/last-updated";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/how-we-source";

export const metadata = pageSeoMetadata({
  titleSegment: "How We Source Georgetown Water Hardness Figures",
  description:
    "How Georgetown Home Services cites Georgetown Utility Systems water hardness: AskGTX article, update date, and city water utility reports. No door-to-door tests.",
  pathname: PATH,
  ogType: "website",
});

export default function HowWeSourceWaterPage() {
  return (
    <WaterPageFrame
      title="How we source Georgetown water hardness"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "How we source" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Every hardness and mineral figure on the water pages is copied from one public city source and stored in a
        single data file. Pages interpolate those values. We do not average plants, invent a citywide grain setting, or
        substitute a salesperson’s test kit.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Primary article</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Georgetown’s AskGTX knowledge base article {formatArticleId()} (“Where can I get information about water
          hardness?”) is the source for plant-level hardness, USGS class bands, and the mineral ranges. The article
          timestamp we record is {formatLastUpdatedDisplay(WATER_SOURCE.updated)}.
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          <a
            href={WATER_SOURCE.articleUrl}
            className="font-semibold text-brand hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open AskGTX article {formatArticleId()}
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Utility reports</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Annual and related water utility reports live on the city’s utilities site. Use those documents for
          contaminant compliance, not as a replacement for the hardness table in article {formatArticleId()}.
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          <a
            href={WATER_SOURCE.reportsUrl}
            className="font-semibold text-brand hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            City of Georgetown water utility reports
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">What we do not do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>We do not perform door to door tests.</li>
          <li>We do not treat a single faucet sample as the official plant value.</li>
          <li>We do not change directory placement based on water-treatment equipment sales.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed">
          <Link href="/water" className="font-semibold text-brand hover:underline">
            Back to water hardness
          </Link>
        </p>
      </section>

      <WaterPlumberCta />
    </WaterPageFrame>
  );
}
