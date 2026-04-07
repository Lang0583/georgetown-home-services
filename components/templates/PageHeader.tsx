import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  afterDescription,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  afterDescription?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">{eyebrow}</div> : null}
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{title}</h1>
      {description ? <div className="mt-4 text-lg leading-relaxed text-gray-700">{description}</div> : null}
      {afterDescription ? <div className="mt-4">{afterDescription}</div> : null}
    </header>
  );
}

