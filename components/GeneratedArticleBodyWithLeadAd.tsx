import AdSenseDisplay from "./AdSenseDisplay";
import { ArticleContentShell, ProseArticle, sanitizeArticleHtml } from "./GeneratedArticleBody";
import { ADSENSE_UNITS_ENABLED, adsenseServiceMainSlot } from "../lib/adsense-config";
import { splitHtmlBeforeFirstPricingSection } from "../lib/split-article-content";

/**
 * Intro and overview first, then in-content ad (when `NEXT_PUBLIC_ADSENSE_ID` is set), then
 * the rest of the article — split before the first pricing/cost-style `<h2>` when possible.
 */
export default function GeneratedArticleBodyWithLeadAd({ html }: { html: string }) {
  const { before, after } = splitHtmlBeforeFirstPricingSection(html);
  const safeBefore = sanitizeArticleHtml(before);
  const safeAfter = after ? sanitizeArticleHtml(after) : "";

  if (!after) {
    return (
      <ArticleContentShell>
        <ProseArticle dangerouslySetInnerHTML={{ __html: safeBefore }} />
      </ArticleContentShell>
    );
  }

  return (
    <ArticleContentShell>
      <ProseArticle dangerouslySetInnerHTML={{ __html: safeBefore }} />
      {ADSENSE_UNITS_ENABLED && adsenseServiceMainSlot ? (
        <div className="not-prose my-8">
          <AdSenseDisplay slot={adsenseServiceMainSlot} className="mx-auto max-w-2xl" />
        </div>
      ) : null}
      <ProseArticle dangerouslySetInnerHTML={{ __html: safeAfter }} />
    </ArticleContentShell>
  );
}
