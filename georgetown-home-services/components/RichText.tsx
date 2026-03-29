import type { ContentBlock } from "../lib/site-content";
import { ArticleContentShell, ProseArticle } from "./GeneratedArticleBody";

export default function RichText({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <ArticleContentShell>
      <ProseArticle>
        {blocks.map((block, idx) => {
          if (block.kind === "p") {
            return <p key={idx}>{block.text}</p>;
          }
          if (block.kind === "h2") {
            return <h2 key={idx}>{block.text}</h2>;
          }
          if (block.kind === "ul") {
            return (
              <ul key={idx}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </ProseArticle>
    </ArticleContentShell>
  );
}
