import SlugResolutionDebug from "../../../components/SlugResolutionDebug";
import { resolveBestPage } from "../../../lib/pageContentRegistry";

export default async function BestSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = resolveBestPage(slug);

  return (
    <>
      <SlugResolutionDebug pageKind="best" slug={slug} found={!!resolved} title={resolved?.title ?? null} />
      {children}
    </>
  );
}
