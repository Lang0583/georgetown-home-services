import fs from "node:fs";
import { NextResponse } from "next/server";
import { PDF_LEAD_ASSETS } from "@/lib/pdf-lead-assets";
import { leadMagnetPdfFilePath } from "@/lib/lead-magnet-pdf-path";
import { verifyPdfDownloadToken } from "@/lib/pdf-download-token";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token")?.trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing download token" }, { status: 400 });
  }

  const verified = verifyPdfDownloadToken(token);
  if (!verified) {
    return NextResponse.json({ ok: false, error: "Invalid or expired download link" }, { status: 403 });
  }

  const asset = PDF_LEAD_ASSETS[verified.pdfKey];
  const filePath = leadMagnetPdfFilePath(asset.filename);
  if (!fs.existsSync(filePath)) {
    console.warn("[pdf-download] Missing file:", filePath);
    return NextResponse.json({ ok: false, error: "PDF not available" }, { status: 503 });
  }

  const bytes = fs.readFileSync(filePath);
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${asset.filename}"`,
      "cache-control": "private, no-store",
    },
  });
}
