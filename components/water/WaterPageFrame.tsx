import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { LAST_UPDATED_LINE_CLASS, formatLastUpdatedDisplay } from "@/lib/last-updated";
import WaterDisclaimer from "./WaterDisclaimer";

type Crumb = { href: string; label: string };

export default function WaterPageFrame({
  title,
  lastReviewed,
  crumbs,
  children,
}: {
  title: string;
  lastReviewed: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <Container>
      <article className="py-10 md:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
        <p className={LAST_UPDATED_LINE_CLASS}>Last reviewed: {formatLastUpdatedDisplay(lastReviewed)}</p>
        {children}
        <div className="mt-12 border-t border-ink/10 pt-6">
          <WaterDisclaimer />
        </div>
      </article>
    </Container>
  );
}
