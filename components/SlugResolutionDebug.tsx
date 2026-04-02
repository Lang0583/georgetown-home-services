/**
 * Temporary slug-resolution diagnostics. Shown in development or when NEXT_PUBLIC_DEBUG_SLUGS=1.
 */
export default function SlugResolutionDebug({
  pageKind,
  slug,
  found,
  title,
}: {
  pageKind: "service" | "best";
  slug: string;
  found: boolean;
  title: string | null;
}) {
  const show =
    process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEBUG_SLUGS === "1";
  if (!show) return null;

  return (
    <aside
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 font-mono text-xs text-amber-950"
      aria-label="Slug resolution debug"
    >
      <div>
        <span className="font-semibold">[{pageKind}]</span> slug: <span className="break-all">{slug || "(empty)"}</span>
      </div>
      <div>
        site-content match: <span className="font-semibold">{found ? "yes" : "no"}</span>
        {found && title ? (
          <>
            {" "}
            · title: <span className="break-words">{title}</span>
          </>
        ) : null}
      </div>
    </aside>
  );
}
