import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CostGuideTemplate from "@/components/CostGuideTemplate";
import { getCostGuidePage, getCostGuideStaticParams } from "@/data/cost-guides";
import { pageSeoMetadata } from "@/lib/page-seo";
import { showExtendedHomeServices } from "@/lib/public-site-scope";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCostGuideStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getCostGuidePage(slug);
  if (!page) return {};
  if (!showExtendedHomeServices() && page.extended) return {};

  return pageSeoMetadata({
    absoluteTitle: page.absoluteTitle,
    description: page.metaDescription,
    pathname: `/costs/${slug}`,
    ogType: "website",
  });
}

export default async function CostGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getCostGuidePage(slug);
  if (!page) notFound();
  if (!showExtendedHomeServices() && page.extended) notFound();

  return <CostGuideTemplate page={page} />;
}
