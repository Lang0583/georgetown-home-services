import { ImageResponse } from "next/og";

/** Node runtime — `@vercel/og` on Edge exceeds Hobby’s 1 MB Edge Function limit (~1.06 MB). */
export const runtime = "nodejs";
export const alt = "Georgetown Home Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#1e3a5f",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>
          GEORGETOWN, TX
        </div>
        <div style={{ marginTop: 20, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
          Georgetown Home Services
        </div>
        <div style={{ marginTop: 18, fontSize: 30, opacity: 0.92, maxWidth: 900 }}>
          Compare local plumbers, HVAC, roofers & more — ratings, licenses, cost guides
        </div>
      </div>
    ),
    { ...size },
  );
}
