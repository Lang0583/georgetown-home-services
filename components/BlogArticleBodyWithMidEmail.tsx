import type { ContentBlock } from "../lib/site-content";
import { blogPostAdSlot, ADSENSE_ENABLED } from "../lib/adConfig";
import { COST_POST_SUPPLEMENTS } from "../lib/pricing-data";
import {
  splitBlocksAfterNthParagraph,
  splitHtmlAfterNthParagraph,
  splitHtmlBeforeFaq,
} from "../lib/split-article-content";
import { blogAffiliateConfigForSlug } from "../lib/blog-affiliate-config";
import AdUnit from "./AdUnit";
import AffiliateCTA from "./AffiliateCTA";
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
const CMS_BODY_SLUGS = new Set(["hail-damage-georgetown-williamson-may-2026"]);

function useGeneratedHtml(slug: string, generated: { html: string } | null, blocks: ContentBlock[]) {
  if (!generated) return null;
  if (CMS_BODY_SLUGS.has(slug) && blocks.length > 0) return null;
  return generated;
}

function BlogInlineAd() {
  if (!ADSENSE_ENABLED || !blogPostAdSlot) return null;
  return (
    <div className="my-8" role="complementary" aria-label="Advertisement">
      <AdUnit slotId={blogPostAdSlot} className="mx-auto max-w-2xl" />
    </div>
  );
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
    const affiliate = blogAffiliateConfigForSlug(slug);
    const { body: articleBody, faq: faqBlock } = affiliate
      ? splitHtmlBeforeFaq(generatedBody.html)
      : { body: generatedBody.html, faq: "" };

    const { before: open2, after: tailAfter2 } = splitHtmlAfterNthParagraph(articleBody, 2);
    const safeOpen2 = sanitizeArticleHtml(open2);
    const { before: para3, after: rest } = tailAfter2
      ? splitHtmlAfterNthParagraph(tailAfter2, 1)
      : { before: "", after: "" };
    const safePara3 = para3 ? sanitizeArticleHtml(para3) : "";
    const safeRest = rest ? sanitizeArticleHtml(rest) : "";
    const safeFaq = faqBlock ? sanitizeArticleHtml(faqBlock) : "";

    return (
      <ArticleContentShell>
        <ProseArticle dangerouslySetInnerHTML={{ __html: safeOpen2 }} />
        <BlogInlineAd />
        {safePara3 ? <ProseArticle dangerouslySetInnerHTML={{ __html: safePara3 }} /> : null}
        {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
        <div className="my-8">
          <BlogMidContentEmailCard source={source} />
        </div>
        {safeRest ? <ProseArticle dangerouslySetInnerHTML={{ __html: safeRest }} /> : null}
        {affiliate ? (
          <AffiliateCTA
            angiCategorySlug={affiliate.angiCategorySlug}
            thumbtackCategory={affiliate.thumbtackCategory}
            serviceLabel={affiliate.serviceLabel}
          />
        ) : null}
        {safeFaq ? <ProseArticle dangerouslySetInnerHTML={{ __html: safeFaq }} /> : null}
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
      <BlogInlineAd />
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
