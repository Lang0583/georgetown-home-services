import { ImageResponse } from "next/og";
import { getProviderBySlug } from "@/data/providers";
import { PROVIDER_CATEGORY_LABELS } from "@/data/providers";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  const title = provider?.name ?? "Georgetown Home Services";
  const subtitle = provider
    ? `${PROVIDER_CATEGORY_LABELS[provider.category]} · Georgetown, TX`
    : "Local home services directory";

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
          GEORGETOWN HOME SERVICES
        </div>
        <div style={{ marginTop: 24, fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.92 }}>{subtitle}</div>
      </div>
    ),
    { ...size },
  );
}
