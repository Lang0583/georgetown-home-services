import type { ContentBlock } from "../lib/site-content";
import { ArticleContentShell, ProseArticle } from "./GeneratedArticleBody";

export function RichTextBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block, idx) => {
        if (block.kind === "affiliateDisclosure") {
          return (
            <p key={idx} className="mb-4 text-xs leading-relaxed text-slate-600">
              {block.text}
            </p>
          );
        }
        if (block.kind === "p") {
          if ("parts" in block && block.parts?.length) {
            return (
              <p key={idx} className="mb-4">
                {block.parts.map((part, pidx) =>
                  part.type === "text" ? (
                    <span key={pidx}>{part.text}</span>
                  ) : (
                    <a
                      key={pidx}
                      href={part.href}
                      rel={part.rel ?? "nofollow sponsored"}
                      className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
                    >
                      {part.label}
                    </a>
                  )
                )}
              </p>
            );
          }
          return (
            <p key={idx} className="mb-4">
              {"text" in block ? block.text : null}
            </p>
          );
        }
        if (block.kind === "h2") {
          return (
            <h2 key={idx} className="mt-8 mb-4 text-xl font-semibold">
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3 key={idx} className="mt-6 mb-3 text-lg font-semibold">
              {block.text}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={idx} className="mb-4 ml-5 list-disc">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
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
