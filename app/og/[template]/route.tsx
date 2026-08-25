import { ImageResponse } from "next/og";

const WIDTH = 1200;
const HEIGHT = 630;

const TEMPLATES: Record<string, { eyebrow: string; title: string; blurb: string; bg: string }> = {
  best: {
    eyebrow: "BEST OF DIRECTORY",
    title: "Top-rated Georgetown home service pros",
    blurb: "Google ratings · license checks · direct contact",
    bg: "#1e3a5f",
  },
  costs: {
    eyebrow: "LOCAL COST GUIDES",
    title: "What home services cost in Georgetown, TX",
    blurb: "Williamson County price bands homeowners can plan around",
    bg: "#1e3a5f",
  },
  seasonal: {
    eyebrow: "SEASONAL MAINTENANCE",
    title: "Georgetown seasonal home checklists",
    blurb: "Central Texas weather, local timing, practical next steps",
    bg: "#1e3a5f",
  },
  storm: {
    eyebrow: "HAIL & STORM",
    title: "Hail damage guides for Georgetown neighborhoods",
    blurb: "Inspection tips, insurance notes, local roofing context",
    bg: "#7a2e12",
  },
};

export async function GET(
  _req: Request,
  context: { params: Promise<{ template: string }> },
) {
  const { template } = await context.params;
  const t = TEMPLATES[template] ?? {
    eyebrow: "GEORGETOWN HOME SERVICES",
    title: "Local home services directory",
    blurb: "Georgetown, TX",
    bg: "#1e3a5f",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 64,
          background: t.bg,
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>{t.eyebrow}</div>
        <div style={{ marginTop: 22, fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {t.title}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.92 }}>{t.blurb}</div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
