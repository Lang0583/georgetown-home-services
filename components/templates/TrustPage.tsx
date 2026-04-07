import type { ReactNode } from "react";
import PageShell from "./PageShell";
import PageHeader from "./PageHeader";

export default function TrustPage({
  eyebrow = "Trust",
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <section className="py-10 md:py-12">
        <div className="max-w-3xl">
          <PageHeader eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">{children}</div>
        </div>
      </section>
    </PageShell>
  );
}

