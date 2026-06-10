import Link from "next/link";
import type { SeasonalGuide } from "@/data/seasonal-guides";
import { pdfLeadKeyForSeason } from "@/lib/seasonal-downloads";
import PdfEmailDownload from "./PdfEmailDownload";

type Props = {
  guide: SeasonalGuide;
  showPrep?: boolean;
};

export default function SeasonalGuideBody({ guide, showPrep = true }: Props) {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-gray-700">{guide.intro}</p>

      <div className="not-prose">
        <PdfEmailDownload
          pdfKey={pdfLeadKeyForSeason(guide.season)}
          source={`seasonal:${guide.season}`}
          label={`Download ${guide.label} checklist (PDF)`}
          variant="primary"
        />
      </div>

      {guide.tasks.map((group) => (
        <section key={group.trade} aria-labelledby={`season-${guide.season}-${group.trade}`}>
          <h2 id={`season-${guide.season}-${group.trade}`} className="text-xl font-semibold text-gray-900">
            {group.trade}
            {group.href ? (
              <>
                {" "}
                <Link href={group.href} className="text-base font-medium text-primary hover:underline">
                  (service guide)
                </Link>
              </>
            ) : null}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      {showPrep ? (
        <section
          className="rounded-xl border border-amber-200 bg-amber-50/80 p-6"
          aria-labelledby={`prep-${guide.season}`}
        >
          <h2 id={`prep-${guide.season}`} className="text-lg font-semibold text-gray-900">
            {guide.prepForNext.heading}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
            {guide.prepForNext.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {guide.relatedLinks.length > 0 ? (
        <section aria-labelledby={`related-${guide.season}`}>
          <h2 id={`related-${guide.season}`} className="text-lg font-semibold text-gray-900">
            Related guides
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {guide.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-medium text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
