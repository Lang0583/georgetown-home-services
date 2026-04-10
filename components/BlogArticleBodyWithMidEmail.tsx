import type { ContentBlock } from "../lib/site-content";
import { splitBlocksAfterNthParagraph, splitHtmlAfterNthParagraph } from "../lib/split-article-content";
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
 */
export default function BlogArticleBodyWithMidEmail({ slug, generated, blocks }: Props) {
  const source = `blog-mid:${slug}`;

  if (generated) {
    const { before, after } = splitHtmlAfterNthParagraph(generated.html, 3);
    const safeBefore = sanitizeArticleHtml(before);
    const safeAfter = after ? sanitizeArticleHtml(after) : "";

    return (
      <ArticleContentShell>
        <ProseArticle dangerouslySetInnerHTML={{ __html: safeBefore }} />
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
