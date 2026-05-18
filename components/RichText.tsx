import type { ContentBlock } from "../lib/site-content";
import { canonicalServicePathForLinks } from "../lib/public-site-scope";
import { ArticleContentShell, ProseArticle } from "./GeneratedArticleBody";
import { TrackableProseLink } from "./TrackableProseLink";

export function SingleRichBlock({ block }: { block: ContentBlock }) {
  if (block.kind === "affiliateDisclosure") {
    return (
      <p className="mb-4 text-xs leading-relaxed text-slate-600">
        {block.text}
      </p>
    );
  }
  if (block.kind === "p") {
    if ("parts" in block && block.parts?.length) {
      return (
        <p className="mb-4">
          {block.parts.map((part, pidx) =>
            part.type === "text" ? (
              <span key={pidx}>{part.text}</span>
            ) : (
              <TrackableProseLink
                key={pidx}
                href={
                  part.href.startsWith("/services/")
                    ? canonicalServicePathForLinks(part.href)
                    : part.href
                }
                rel={part.rel ?? "nofollow sponsored"}
                className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
              >
                {part.label}
              </TrackableProseLink>
            )
          )}
        </p>
      );
    }
    return (
      <p className="mb-4">
        {"text" in block ? block.text : null}
      </p>
    );
  }
  if (block.kind === "h2") {
    return (
      <h2 className="mt-8 mb-4 text-xl font-semibold">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "h3") {
    return (
      <h3 className="mt-6 mb-3 text-lg font-semibold">
        {block.text}
      </h3>
    );
  }
  if (block.kind === "ul") {
    return (
      <ul className="mb-4 ml-5 list-disc">
        {block.items.map((item, itemIdx) => (
          <li key={itemIdx}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export function RichTextBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block, idx) => (
        <SingleRichBlock key={idx} block={block} />
      ))}
    </>
  );
}

export default function RichText({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <ArticleContentShell>
      <ProseArticle>
        <RichTextBlocks blocks={blocks} />
      </ProseArticle>
    </ArticleContentShell>
  );
}
