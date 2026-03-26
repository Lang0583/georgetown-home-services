import type { ContentBlock } from "../lib/site-content";

export default function RichText({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <div className="max-w-none">
      {blocks.map((block, idx) => {
        if (block.kind === "p") {
          return (
            <p key={idx} className="mt-4 text-zinc-700">
              {block.text}
            </p>
          );
        }
        if (block.kind === "h2") {
          return (
            <h2 key={idx} className="mt-8 text-xl font-semibold text-zinc-900">
              {block.text}
            </h2>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={idx} className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

