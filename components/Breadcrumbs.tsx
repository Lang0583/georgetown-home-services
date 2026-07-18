import Link from "next/link";
import JsonLd from "./JsonLd";
import { absolutePageUrl } from "@/lib/page-seo";
import { buildBreadcrumbList } from "@/lib/schema";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * Prefer this over separate page-level breadcrumb schema to avoid duplicates.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;

  const trail = items.map((it) => ({
    name: it.label,
    url: absolutePageUrl(it.href),
  }));

  return (
    <>
      <JsonLd data={buildBreadcrumbList(trail)} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((it, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${it.href}-${idx}`} className="flex items-center gap-x-2">
                {idx > 0 ? (
                  <span className="text-muted" aria-hidden>
                    ›
                  </span>
                ) : null}
                {isLast ? (
                  <span className="font-medium text-ink">{it.label}</span>
                ) : (
                  <Link href={it.href} className="font-medium text-brand hover:text-brand hover:underline">
                    {it.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
