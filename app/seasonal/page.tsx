import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SeasonalGuideBody from "@/components/SeasonalGuideBody";
import EmailCaptureSitewide from "@/components/EmailCaptureSitewide";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllSeasonalGuides, getSeasonalGuide } from "@/data/seasonal-guides";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getSeasonSchedule, TEXAS_SEASON_ORDER, type TexasSeason } from "@/lib/texas-seasons";
import PdfEmailDownload from "@/components/PdfEmailDownload";
import { pdfLeadKeyForSeason } from "@/lib/seasonal-downloads";

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: "Georgetown TX Seasonal Home Maintenance (2026) | Spring–Winter Checklists",
  description:
    "Automatic seasonal home maintenance for Georgetown, TX: spring, summer, fall, and winter checklists with next-season prep tips and downloadable PDF checklists for Central Texas homeowners.",
  pathname: "/seasonal",
  ogType: "website",
});

function SeasonCard({ season, active }: { season: TexasSeason; active: boolean }) {
  const guide = getSeasonalGuide(season);
  return (
    <article
      className={`rounded-xl border p-5 shadow-sm transition ${
        active ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-gray-200 bg-white hover:border-primary/30"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">{guide.monthsLabel}</p>
      <h2 className="mt-1 text-lg font-semibold text-gray-900">
        <Link href={`/seasonal/${season}`} className="hover:text-primary">
          {guide.label}
        </Link>
        {active ? (
          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">Now</span>
        ) : null}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-700">{guide.intro}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <Link href={`/seasonal/${season}`} className="text-primary hover:underline">
          View checklist
        </Link>
        <span className="text-gray-300" aria-hidden>
          ·
        </span>
        <PdfEmailDownload
          pdfKey={pdfLeadKeyForSeason(season)}
          source={`seasonal-hub:${season}`}
          variant="link"
        />
      </div>
    </article>
  );
}

export default function SeasonalHubPage() {
  const schedule = getSeasonSchedule();
  const currentGuide = getSeasonalGuide(schedule.current);

  return (
    <Container>
      <div className="py-10 md:py-12">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/seasonal", label: "Seasonal maintenance" },
          ]}
        />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Georgetown seasonal home maintenance
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
          Tips rotate automatically with Central Texas seasons—plus prep lists for the season ahead. Download a PDF for
          the current month block or browse all four checklists year-round.
        </p>

        <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8" aria-labelledby="current-season">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{schedule.nowLabel}</p>
          <h2 id="current-season" className="mt-2 text-2xl font-semibold text-gray-900">
            {currentGuide.headline}
          </h2>
          <div className="mt-6">
            <SeasonalGuideBody guide={currentGuide} />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="all-seasons">
          <h2 id="all-seasons" className="text-xl font-semibold text-gray-900">
            All four seasons
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Pages update by calendar; enter your email once to download any checklist PDF.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {TEXAS_SEASON_ORDER.map((season) => (
              <SeasonCard key={season} season={season} active={season === schedule.current} />
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-xl">
          <EmailCaptureSitewide
            source="seasonal-hub"
            compact
            offers={["seasonal_checklist", "monthly_reminder"]}
            defaultOffer="seasonal_checklist"
          />
          <p className="mt-2 text-xs text-gray-600">
            Prefer the full-year bundle? Sign up here for the complete seasonal guide plus monthly reminders.
          </p>
        </section>
      </div>
    </Container>
  );
}
