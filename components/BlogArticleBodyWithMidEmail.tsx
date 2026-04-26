import type { ContentBlock } from "../lib/site-content";
import { COST_POST_SUPPLEMENTS } from "../lib/pricing-data";
import { splitBlocksAfterNthParagraph, splitHtmlAfterNthParagraph } from "../lib/split-article-content";
import BlogCostSupplement from "./BlogCostSupplement";
import BlogMidContentEmailCard from "./BlogMidContentEmailCard";
import { ArticleContentShell, ProseArticle, sanitizeArticleHtml } from "./GeneratedArticleBody";
import { RichTextBlocks } from "./RichText";

type Props = {
  slug: string;
  generated: { html: string } | null;
  blocks: ContentBlock[];
};

/**
 * Renders article HTML or block content with a mid-content email card after the third paragraph.
 *
 * For cost-guide slugs registered in `COST_POST_SUPPLEMENTS`, also injects a
 * `BlogCostSupplement` block (Georgetown pricing ranges + pricing drivers)
 * between the opening content and the mid-content email card. This addresses
 * a pattern where cost-titled posts had no dollar figures in the body — now
 * every such post renders a real pricing table before the fold.
 */
export default function BlogArticleBodyWithMidEmail({ slug, generated, blocks }: Props) {
  const source = `blog-mid:${slug}`;
  const hasCostSupplement = Boolean(COST_POST_SUPPLEMENTS[slug]);

  if (generated) {
    const { before, after } = splitHtmlAfterNthParagraph(generated.html, 3);
    const safeBefore = sanitizeArticleHtml(before);
    const safeAfter = after ? sanitizeArticleHtml(after) : "";

    return (
      <ArticleContentShell>
        <ProseArticle dangerouslySetInnerHTML={{ __html: safeBefore }} />
        {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
        <div className="my-8">
          <BlogMidContentEmailCard source={source} />
        </div>
        {safeAfter ? <ProseArticle dangerouslySetInnerHTML={{ __html: safeAfter }} /> : null}
      </ArticleContentShell>
    );
  }

  if (!blocks.length) return null;

  const { first, second } = splitBlocksAfterNthParagraph(blocks, 3);

  return (
    <ArticleContentShell>
      <ProseArticle>
        <RichTextBlocks blocks={first} />
      </ProseArticle>
      {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
      <div className="my-8">
        <BlogMidContentEmailCard source={source} />
      </div>
      {second.length ? (
        <ProseArticle>
          <RichTextBlocks blocks={second} />
        </ProseArticle>
      ) : null}
    </ArticleContentShell>
  );
}
