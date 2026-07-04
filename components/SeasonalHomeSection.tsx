import Link from "next/link";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import { getSeasonSchedule } from "@/lib/texas-seasons";
import { pdfLeadKeyForSeason } from "@/lib/seasonal-downloads";
import ChecklistLeadMagnetIcon from "./ChecklistLeadMagnetIcon";
import PdfEmailDownload from "./PdfEmailDownload";

/** Homepage block — auto-highlights current Central Texas season + next-season prep. */
export default function SeasonalHomeSection() {
  const schedule = getSeasonSchedule();
  const current = getSeasonalGuide(schedule.current);
  const nextGuide = getSeasonalGuide(schedule.next);
  const previewTasks = current.tasks.flatMap((g) => g.items).slice(0, 4);

  return (
    <section
      className="mt-10 rounded-xl border border-ink/10 bg-surface p-6 shadow-md sm:p-8"
      aria-labelledby="seasonal-home-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {schedule.prepWindow ? "Prep window" : "This season"} · {current.monthsLabel}
          </p>
          <h2 id="seasonal-home-heading" className="mt-1 text-xl font-semibold tracking-tight text-ink">
            {schedule.nowLabel}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{current.intro}</p>
        </div>
        <ChecklistLeadMagnetIcon className="hidden h-12 w-12 text-brand sm:block" />
      </div>

      <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink">
        {previewTasks.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {schedule.prepWindow ? (
        <div className="mt-5 rounded-lg border border-rating/25 bg-rating/10 px-4 py-3 text-sm text-ink">
          <span className="font-semibold text-ink">Ahead of {nextGuide.label}: </span>
          {current.prepForNext.items[0]}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/seasonal/${schedule.current}`}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover-dark"
        >
          {current.label} checklist & tips
        </Link>
        <PdfEmailDownload
          pdfKey={pdfLeadKeyForSeason(schedule.current)}
          source="homepage-seasonal"
          label="Download PDF"
          variant="secondary"
        />
        <Link href="/seasonal" className="inline-flex items-center text-sm font-semibold text-brand hover:underline">
          All four seasons →
        </Link>
      </div>
    </section>
  );
}
