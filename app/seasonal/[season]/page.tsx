import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SeasonalGuideBody from "@/components/SeasonalGuideBody";
import EmailCaptureSitewide from "@/components/EmailCaptureSitewide";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import { pageSeoMetadata } from "@/lib/page-seo";
import { buildHowTo } from "@/lib/schema";
import { getSeasonSchedule, isTexasSeasonSlug, TEXAS_SEASON_ORDER } from "@/lib/texas-seasons";

export function generateStaticParams() {
  return TEXAS_SEASON_ORDER.map((season) => ({ season }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ season: string }>;
}): Promise<Metadata> {
  const { season: raw } = await params;
  if (!isTexasSeasonSlug(raw)) {
    return pageSeoMetadata({
      absoluteTitle: "Seasonal maintenance",
      description: "Georgetown TX seasonal home maintenance checklists.",
      pathname: "/seasonal",
      ogType: "website",
    });
  }
  const guide = getSeasonalGuide(raw);
  const schedule = getSeasonSchedule();
  const isCurrent = schedule.current === raw;
  const intro =
    guide.intro.length > 152 ? `${guide.intro.slice(0, 152)}…` : guide.intro;
  return pageSeoMetadata({
    absoluteTitle: `${guide.label} Home Checklist Georgetown TX (${guide.monthsLabel})`,
    description: `${intro} Email for the PDF checklist.${isCurrent ? " Updated for the current season." : ""}`,
    pathname: `/seasonal/${raw}`,
    ogType: "website",
  });
}

export default async function SeasonalSeasonPage({ params }: { params: Promise<{ season: string }> }) {
  const { season: raw } = await params;
  if (!isTexasSeasonSlug(raw)) notFound();

  const guide = getSeasonalGuide(raw);
  const schedule = getSeasonSchedule();
  const isCurrent = schedule.current === raw;

  const howToSteps = guide.tasks.flatMap((group) =>
    group.items.map((text) => ({
      name: `${group.trade}: ${text.slice(0, 80)}`,
      text,
    })),
  );
  const howToJsonLd = buildHowTo({
    name: guide.headline,
    description: guide.intro,
    steps: howToSteps,
  });

  return (
    <Container>
      <div className="py-10 md:py-12">
        {howToJsonLd ? <JsonLd data={howToJsonLd} /> : null}
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/seasonal", label: "Seasonal maintenance" },
            { href: `/seasonal/${raw}`, label: guide.label },
          ]}
        />
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand">
          {guide.monthsLabel}
          {isCurrent ? " · Current season" : null}
          {isCurrent && schedule.prepWindow ? " · Prep window" : null}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl">{guide.headline}</h1>
        <SeasonalGuideBody guide={guide} />

        <div className="mt-12 max-w-xl">
          <EmailCaptureSitewide
            source={`seasonal:${raw}`}
            compact
            offers={["seasonal_checklist", "monthly_reminder"]}
          />
        </div>
      </div>
    </Container>
  );
}
