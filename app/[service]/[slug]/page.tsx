import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServicePageTemplate from "@/components/SubServicePageTemplate";
import { getSubServicePage, getSubServiceStaticParams, isExtendedSubServiceCategory } from "@/data/sub-services";
import { pageSeoMetadata } from "@/lib/page-seo";
import { showExtendedHomeServices } from "@/lib/public-site-scope";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSubServiceStaticParams().map(({ service, slug }) => ({ service, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}): Promise<Metadata> {
  const { service, slug } = await params;
  const page = getSubServicePage(service, slug);
  if (!page) return {};
  if (!showExtendedHomeServices() && page.extended) return {};

  return pageSeoMetadata({
    titleSegment: page.metaTitle,
    description: page.metaDescription,
    pathname: `/${service}/${slug}`,
    ogType: "website",
  });
}

export default async function SubServiceRoutePage({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  const page = getSubServicePage(service, slug);
  if (!page) notFound();
  if (!showExtendedHomeServices() && isExtendedSubServiceCategory(service)) notFound();

  return <SubServicePageTemplate page={page} />;
}
