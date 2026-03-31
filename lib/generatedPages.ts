import generated from "./generatedPages.json";

export type GeneratedPage = {
  title: string;
  html: string;
};

const data = generated as Record<string, GeneratedPage>;

export function getGeneratedPage(slug: string): GeneratedPage | null {
  return data[slug] ?? null;
}

