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

/** CMS-expanded posts that should not be overridden by legacy generated HTML. */
const CMS_BODY_SLUGS = new Set([
  "hail-damage-georgetown-williamson-may-2026",
  "hail-damage-sun-city-georgetown-tx",
  "hail-damage-teravista-georgetown-tx",
  "hail-damage-wolf-ranch-georgetown-tx",
  "hail-damage-georgetown-village-tx",
]);

function useGeneratedHtml(slug: string, generated: { html: string } | null, blocks: ContentBlock[]) {
  if (!generated) return null;
  if (CMS_BODY_SLUGS.has(slug) && blocks.length > 0) return null;
  return generated;
}

/**
 * Renders article HTML or block content with:
 * - Mid-content email card after the 3rd paragraph (1st paragraph of remainder after the 2nd-paragraph break)
 * - Optional cost-guide pricing supplement before the email card when registered.
 */
export default function BlogArticleBodyWithMidEmail({ slug, generated, blocks }: Props) {
  const source = `blog-mid:${slug}`;
  const hasCostSupplement = Boolean(COST_POST_SUPPLEMENTS[slug]);
  const generatedBody = useGeneratedHtml(slug, generated, blocks);

  if (generatedBody) {
    const { before: open2, after: tailAfter2 } = splitHtmlAfterNthParagraph(generatedBody.html, 2);
    const safeOpen2 = sanitizeArticleHtml(open2);
    const { before: para3, after: rest } = tailAfter2
      ? splitHtmlAfterNthParagraph(tailAfter2, 1)
      : { before: "", after: "" };
    const safePara3 = para3 ? sanitizeArticleHtml(para3) : "";
    const safeRest = rest ? sanitizeArticleHtml(rest) : "";

    return (
      <ArticleContentShell>
        <ProseArticle dangerouslySetInnerHTML={{ __html: safeOpen2 }} />
        {safePara3 ? <ProseArticle dangerouslySetInnerHTML={{ __html: safePara3 }} /> : null}
        {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
        <div className="my-8">
          <BlogMidContentEmailCard source={source} />
        </div>
        {safeRest ? <ProseArticle dangerouslySetInnerHTML={{ __html: safeRest }} /> : null}
      </ArticleContentShell>
    );
  }

  if (!blocks.length) return null;

  const { first: first2, second: tail2 } = splitBlocksAfterNthParagraph(blocks, 2);
  const { first: thirdPara, second: restBlocks } = splitBlocksAfterNthParagraph(tail2, 1);

  return (
    <ArticleContentShell>
      <ProseArticle>
        <RichTextBlocks blocks={first2} />
      </ProseArticle>
      {thirdPara.length ? (
        <ProseArticle>
          <RichTextBlocks blocks={thirdPara} />
        </ProseArticle>
      ) : null}
      {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
      <div className="my-8">
        <BlogMidContentEmailCard source={source} />
      </div>
      {restBlocks.length ? (
        <ProseArticle>
          <RichTextBlocks blocks={restBlocks} />
        </ProseArticle>
      ) : null}
    </ArticleContentShell>
  );
}
