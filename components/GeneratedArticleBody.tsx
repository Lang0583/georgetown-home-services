import type { ReactNode } from "react";

/**
 * Tailwind Typography base + slate palette + extra spacing so generated HTML
 * (headings, FAQ h3s, lists) does not read as a single block.
 */
export const proseArticleClassName = [
  "prose prose-slate prose-lg",
  "max-w-3xl mx-auto space-y-6",
  "text-base leading-relaxed",
  "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-900",
  "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:tracking-tight",
  "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-bold prose-h3:tracking-tight",
  "prose-p:mb-5 prose-p:mt-0 prose-p:text-slate-700 prose-p:leading-relaxed",
  "prose-strong:font-semibold prose-strong:text-slate-900",
  "prose-ul:my-6 prose-ul:space-y-2.5",
  "prose-ol:my-6 prose-ol:space-y-2.5",
  "prose-li:leading-relaxed prose-li:my-0",
  "prose-a:font-medium prose-a:text-blue-700 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-blue-800",
].join(" ");

export const articleContentShellClassName =
  "max-w-4xl rounded-xl border border-gray-200 bg-white p-5 shadow-md sm:p-6 md:p-8";

export function ArticleContentShell({ children, className }: { children: ReactNode; className?: string }) {
  const shell = className ? `${articleContentShellClassName} ${className}` : articleContentShellClassName;
  return <div className={shell}>{children}</div>;
}

export function ProseArticle({ children, ...rest }: React.ComponentPropsWithoutRef<"article">) {
  return (
    <article className={proseArticleClassName} {...rest}>
      {children}
    </article>
  );
}

type Props = {
  html: string;
  className?: string;
};

/**
 * Wraps CMS / generated HTML in a readable article with Tailwind Typography (`prose`).
 * Outer shell is `max-w-4xl`; inner `prose max-w-none` fills the card without the default prose max-width cap.
 */
export default function GeneratedArticleBody({ html, className }: Props) {
  return (
    <ArticleContentShell className={className}>
      <ProseArticle dangerouslySetInnerHTML={{ __html: html }} />
    </ArticleContentShell>
  );
}
