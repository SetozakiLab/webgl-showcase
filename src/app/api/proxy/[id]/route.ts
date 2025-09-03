import { NextRequest, NextResponse } from "next/server";
import { getContentById } from "@/lib/contents";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const content = getContentById(id);
  if (!content) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const base = String(content.externalUrl).replace(/\/$/, "");
  const target = `${base}/`;

  const upstream = await fetch(target, {
    headers: {
      // Hint for some hosts to serve HTML
      Accept: "text/html,application/xhtml+xml",
    },
    // Revalidate frequently during dev; caches can be tuned later
    cache: "no-store",
  });

  const contentType = upstream.headers.get("content-type") || "";
  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Upstream error", status: upstream.status },
      { status: 502 }
    );
  }

  // If not HTML, just stream through
  if (!contentType.includes("text/html")) {
    const passthrough = await upstream.arrayBuffer();
    return new NextResponse(passthrough, {
      status: 200,
      headers: { "content-type": contentType || "application/octet-stream" },
    });
  }

  let html = await upstream.text();
  // Inject <base> so relative URLs resolve under /contents/<id>/
  if (html.includes("<head")) {
    html = html.replace(
      /<head(\b[^>]*)>/i,
      (m) => `${m}\n<base href="/contents/${id}/" />`
    );
  }

  return new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
