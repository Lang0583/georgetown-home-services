import type { ReactNode } from "react";
import { Fragment } from "react";
import type { ContentBlock } from "../lib/site-content";
import { adsenseInlineSlot, ADSENSE_UNITS_ENABLED } from "../lib/adsense-config";
import { COST_POST_SUPPLEMENTS } from "../lib/pricing-data";
import { splitHtmlAtParagraphBoundaries } from "../lib/split-article-content";
import AdSenseDisplay from "./AdSenseDisplay";
import BlogCostSupplement from "./BlogCostSupplement";
import BlogMidContentEmailCard from "./BlogMidContentEmailCard";
import BlogThumbtackInlineCta from "./BlogThumbtackInlineCta";
import { ArticleContentShell, ProseArticle, sanitizeArticleHtml } from "./GeneratedArticleBody";
import { SingleRichBlock } from "./RichText";

type Props = {
  slug: string;
  generated: { html: string } | null;
  blocks: ContentBlock[];
  /** Lowercase/category label for Thumbtack inline CTAs, e.g. "plumbing", "HVAC". */
  affiliateServiceLabel: string;
};

function midArticleStack(source: string, slug: string): ReactNode {
  const hasCostSupplement = Boolean(COST_POST_SUPPLEMENTS[slug]);
  return (
    <>
      {ADSENSE_UNITS_ENABLED && adsenseInlineSlot ? (
        <div className="my-8">
          <AdSenseDisplay slot={adsenseInlineSlot} />
        </div>
      ) : null}
      {hasCostSupplement ? <BlogCostSupplement slug={slug} /> : null}
      <div className="my-8">
        <BlogMidContentEmailCard source={source} />
      </div>
    </>
  );
}

/**
 * Renders article HTML or block content with display ad + email after the 3rd paragraph,
 * inline Thumbtack CTAs after every 3rd paragraph, and optional cost supplement.
 */
export default function BlogArticleBodyWithMidEmail({
  slug,
  generated,
  blocks,
  affiliateServiceLabel,
}: Props) {
  const source = `blog-mid:${slug}`;

  if (generated) {
    const chunks = splitHtmlAtParagraphBoundaries(generated.html);
    let paragraphIndex = 0;

    return (
      <ArticleContentShell>
        {chunks.map((chunk, i) => {
          const isParagraphChunk = /<\/p>/i.test(chunk);
          const safe = sanitizeArticleHtml(chunk);
          const nodes: ReactNode[] = [
            <ProseArticle key={`html-seg-${i}`} dangerouslySetInnerHTML={{ __html: safe }} />,
          ];
          if (isParagraphChunk) {
            paragraphIndex += 1;
            if (paragraphIndex % 3 === 0) {
              nodes.push(
                <BlogThumbtackInlineCta key={`tb-html-${paragraphIndex}`} serviceLabel={affiliateServiceLabel} />,
              );
            }
            if (paragraphIndex === 3) {
              nodes.push(<Fragment key={`mid-${paragraphIndex}`}>{midArticleStack(source, slug)}</Fragment>);
            }
          }
          return (
            <Fragment key={`wrap-${i}`}>
              {nodes}
            </Fragment>
          );
        })}
      </ArticleContentShell>
    );
  }

  if (!blocks.length) return null;

  const out: ReactNode[] = [];
  let buf: ContentBlock[] = [];
  let pCount = 0;
  let flushKey = 0;

  const flush = () => {
    if (!buf.length) return;
    out.push(
      <ProseArticle key={`blk-${flushKey++}`}>
        {buf.map((b, j) => (
          <SingleRichBlock key={j} block={b} />
        ))}
      </ProseArticle>,
    );
    buf = [];
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    buf.push(block);
    if (block.kind === "p") {
      pCount += 1;
      if (pCount % 3 === 0) {
        flush();
        out.push(<BlogThumbtackInlineCta key={`tb-blk-${pCount}`} serviceLabel={affiliateServiceLabel} />);
        if (pCount === 3) {
          out.push(<Fragment key="mid-stack-blk">{midArticleStack(source, slug)}</Fragment>);
        }
      }
    }
  }
  flush();

  return <ArticleContentShell>{out}</ArticleContentShell>;
}
