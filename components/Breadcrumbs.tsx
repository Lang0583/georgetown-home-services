import Link from "next/link";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${it.href}-${idx}`} className="flex items-center gap-x-2">
              {idx > 0 ? <span className="text-gray-300" aria-hidden>›</span> : null}
              {isLast ? (
                <span className="font-medium text-gray-900">{it.label}</span>
              ) : (
                <Link href={it.href} className="font-medium text-primary hover:text-primary-hover hover:underline">
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

