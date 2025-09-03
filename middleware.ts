import { NextRequest, NextResponse } from "next/server";
import contentsData from "./src/data/contents.json";

type Content = {
  id: string;
  externalUrl: string;
};

const COOKIE_NAME = "wgl_base";

function findExternalBaseById(id: string): string | undefined {
  const list = contentsData as Content[];
  const item = list.find((c) => c.id === id);
  if (!item) return undefined;
  return String(item.externalUrl).replace(/\/$/, "");
}

function withCookie(resp: NextResponse, base?: string) {
  if (!base) return resp;
  resp.cookies.set(COOKIE_NAME, base, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  return resp;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const referer = req.headers.get("referer");
  const getIdFromReferer = () => {
    try {
      if (!referer) return undefined;
      const u = new URL(referer);
      const segs = u.pathname.split("/").filter(Boolean); // e.g., ["contents","<id>"]
      if (segs[0] === "contents" && segs[1]) return segs[1];
    } catch {}
    return undefined;
  };

  // 1) Root-level Unity asset paths requested with absolute URLs from external index.
  //    If cookie is present, proxy them to the recorded external base.
  const rootUnityPrefixes = ["/TemplateData/", "/Build/", "/StreamingAssets/"];
  const matched = rootUnityPrefixes.some((p) => pathname.startsWith(p));
  if (matched) {
    const idFromRef = getIdFromReferer();
    const baseFromRef = idFromRef ? findExternalBaseById(idFromRef) : undefined;
    const base = baseFromRef || req.cookies.get(COOKIE_NAME)?.value;
    if (base) {
      const target = `${base}${pathname}`;
      return NextResponse.rewrite(new URL(target));
    }
  }

  // 2) Some builds may request under "/contents/<folder>/..." due to base href or path handling.
  //    If so, and we have the external base cookie, drop the "/contents" prefix and proxy.
  const contentsPrefixMatch = pathname.match(
    /^\/contents\/(TemplateData|Build|StreamingAssets)\/(.*)$/
  );
  if (contentsPrefixMatch) {
    const idFromRef = getIdFromReferer();
    const baseFromRef = idFromRef ? findExternalBaseById(idFromRef) : undefined;
    const base = baseFromRef || req.cookies.get(COOKIE_NAME)?.value;
    if (base) {
      const folder = contentsPrefixMatch[1];
      const rest = contentsPrefixMatch[2] ?? "";
      const target = `${base}/${folder}/${rest}`;
      return NextResponse.rewrite(new URL(target));
    }
  }

  // 3) /contents/<id>[/...]: ensure trailing slash for correct relative URL resolution.
  //    Assets (/TemplateData|/Build...) will be handled by the earlier rules.
  if (pathname.startsWith("/contents/")) {
    const segments = pathname.split("/").filter(Boolean); // ["contents", "<id>", ...]
    const id = segments[1];
    const rest = segments.slice(2).join("/");
    if (id && !rest) {
      // redirect to trailing slash to make relative paths resolve under /contents/<id>/
      if (!pathname.endsWith("/")) {
        const url = req.nextUrl.clone();
        url.pathname = `${pathname}/`;
        return NextResponse.redirect(url, 308);
      }
      const resp = NextResponse.rewrite(
        new URL(`/api/proxy/${id}`, req.nextUrl)
      );
      const base = findExternalBaseById(id);
      return withCookie(resp, base);
    }
    // For nested requests under /contents/<id>/..., forward to external base directly.
    const base = id ? findExternalBaseById(id) : undefined;
    if (base) return NextResponse.rewrite(new URL(`${base}/${rest}`));
    // unknown id -> let the app route handle 404 fallback
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // match all; early return for most paths keeps it cheap
  matcher: ["/:path*"],
};
