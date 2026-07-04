import type { ReactNode } from "react";
import { canonicalServicePathForLinks } from "../lib/public-site-scope";

/**
 * Tailwind Typography base + semantic tokens + readable line length.
 */
export const proseArticleClassName = [
  "prose prose-lg max-w-[70ch]",
  "text-[17px] leading-[1.65]",
  "prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-ink",
  "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:tracking-tight",
  "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-bold prose-h3:tracking-tight",
  "prose-p:mb-5 prose-p:mt-0 prose-p:text-ink prose-p:leading-[1.65]",
  "prose-strong:font-semibold prose-strong:text-ink",
  "prose-ul:my-6 prose-ul:space-y-2.5",
  "prose-ol:my-6 prose-ol:space-y-2.5",
  "prose-li:leading-[1.65] prose-li:my-0 prose-li:text-ink",
  "prose-a:font-medium prose-a:text-brand prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-brand",
].join(" ");

export const articleContentShellClassName =
  "max-w-4xl rounded-xl border border-ink/10 bg-surface p-5 shadow-md sm:p-6 md:p-8";

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
  stripPricingAndFaq?: boolean;
};

/** Sanitize CMS / generated HTML before rendering (directory model: no lead-intake blocks). */
export function sanitizeArticleHtml(html: string, opts?: { stripPricingAndFaq?: boolean }) {
  let out = html;

  // Point internal links at trade hubs instead of URLs that only exist to 308.
  out = out.replace(/href="(\/services\/[^"?#]+)"/g, (_, href: string) => {
    return `href="${canonicalServicePathForLinks(href)}"`;
  });

  // Remove obvious lead-intake remnants from older generated content.
  out = out.replace(/<p><strong>CTA:<\/strong>[\s\S]*?<\/p>/gi, "");
  out = out.replace(/<h2>[^<]*form[^<]*<\/h2>[\s\S]*?(?=<h2>|$)/gi, "");
  out = out.replace(/<h3>[^<]*form[^<]*<\/h3>[\s\S]*?(?=<h2>|<h3>|$)/gi, "");
  out = out.replace(/<p>[^<]*(submit the form|request service options|free quotes)[^<]*<\/p>/gi, "");

  if (opts?.stripPricingAndFaq) {
    out = out.replace(/<h2[^>]*>\s*Realistic 2026 pricing in Georgetown[\s\S]*?(?=<h2>|$)/gi, "");
    out = out.replace(/<h2[^>]*>\s*FAQ[\s\S]*$/gi, "");
  }

  // Normalize accidental extra whitespace.
  out = out.replace(/\n{3,}/g, "\n\n").trim();
  return out;
}

/**
 * Wraps CMS / generated HTML in a readable article with Tailwind Typography (`prose`).
 * Outer shell is `max-w-4xl`; inner `prose max-w-none` fills the card without the default prose max-width cap.
 */
export default function GeneratedArticleBody({ html, className, stripPricingAndFaq }: Props) {
  return (
    <ArticleContentShell className={className}>
      <ProseArticle dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html, { stripPricingAndFaq }) }} />
    </ArticleContentShell>
  );
}
