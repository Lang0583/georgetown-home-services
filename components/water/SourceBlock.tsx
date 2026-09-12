import { formatLastUpdatedDisplay } from "@/lib/last-updated";
import { formatArticleId, WATER_SOURCE } from "@/data/water";

export default function SourceBlock() {
  return (
    <section aria-labelledby="water-source-heading" className="mt-10 border-t border-ink/10 pt-6">
      <h2 id="water-source-heading" className="text-base font-semibold text-ink">
        Source
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Hardness and mineral ranges on these pages come from Georgetown Utility Systems knowledge-base article{" "}
        {formatArticleId()}, last updated {formatLastUpdatedDisplay(WATER_SOURCE.updated)}.
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
        <li>
          <a
            href={WATER_SOURCE.articleUrl}
            className="font-semibold text-brand hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            AskGTX: Where can I get information about water hardness?
          </a>
        </li>
        <li>
          <a
            href={WATER_SOURCE.reportsUrl}
            className="font-semibold text-brand hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            City of Georgetown water utility reports
          </a>
        </li>
      </ul>
    </section>
  );
}
