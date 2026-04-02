import SlugResolutionDebug from "../../../components/SlugResolutionDebug";
import { resolveServicePage } from "../../../lib/pageContentRegistry";

export default async function ServiceSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = resolveServicePage(slug);

  return (
    <>
      <SlugResolutionDebug pageKind="service" slug={slug} found={!!resolved} title={resolved?.title ?? null} />
      {children}
    </>
  );
}
