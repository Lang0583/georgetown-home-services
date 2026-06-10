import Link from "next/link";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import { getSeasonSchedule } from "@/lib/texas-seasons";
import { seasonalPdfPath } from "@/lib/seasonal-downloads";
import ChecklistLeadMagnetIcon from "./ChecklistLeadMagnetIcon";

/** Homepage block — auto-highlights current Central Texas season + next-season prep. */
export default function SeasonalHomeSection() {
  const schedule = getSeasonSchedule();
  const current = getSeasonalGuide(schedule.current);
  const nextGuide = getSeasonalGuide(schedule.next);
  const previewTasks = current.tasks.flatMap((g) => g.items).slice(0, 4);

  return (
    <section
      className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8"
      aria-labelledby="seasonal-home-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {schedule.prepWindow ? "Prep window" : "This season"} · {current.monthsLabel}
          </p>
          <h2 id="seasonal-home-heading" className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
            {schedule.nowLabel}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">{current.intro}</p>
        </div>
        <ChecklistLeadMagnetIcon className="hidden h-12 w-12 text-primary sm:block" />
      </div>

      <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
        {previewTasks.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {schedule.prepWindow ? (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-gray-800">
          <span className="font-semibold text-gray-900">Ahead of {nextGuide.label}: </span>
          {current.prepForNext.items[0]}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/seasonal/${schedule.current}`}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {current.label} checklist & tips
        </Link>
        <a
          href={seasonalPdfPath(schedule.current)}
          download
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Download PDF
        </a>
        <Link href="/seasonal" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
          All four seasons →
        </Link>
      </div>
    </section>
  );
}
