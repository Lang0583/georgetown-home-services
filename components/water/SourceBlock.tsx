import { formatLastUpdatedDisplay } from "@/lib/last-updated";
import { formatArticleId, WATER_SOURCE } from "@/data/water";

export default function SourceBlock({ includeUsgsNote = false }: { includeUsgsNote?: boolean }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Sources</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        City of Georgetown Ask GTX knowledgebase article {formatArticleId()}, updated{" "}
        {formatLastUpdatedDisplay(WATER_SOURCE.updated)}:{" "}
        <a
          href={WATER_SOURCE.articleUrl}
          className="font-semibold text-brand hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {WATER_SOURCE.articleUrl}
        </a>
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        City of Georgetown water utility reports:{" "}
        <a
          href={WATER_SOURCE.reportsUrl}
          className="font-semibold text-brand hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {WATER_SOURCE.reportsUrl}
        </a>
      </p>
      {includeUsgsNote ? (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Hardness classification bands are the USGS scale, not ours.
        </p>
      ) : null}
    </section>
  );
}
