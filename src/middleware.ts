import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "spt_admin_session";
const LOGIN_PATH = "/spt/admin/login";

/**
 * Lightweight token verification for Edge middleware.
 * Checks cookie presence and expiry only — full HMAC verification
 * happens server-side in requireAdmin() / getAdminSession().
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    // Token format: base64url(payload).base64url(hmac)
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const bodyB64 = token.slice(0, dotIndex);

    // Decode base64url payload using TextDecoder — no atob needed
    const base64 = bodyB64.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

    // Use fetch-compatible base64 decode via Uint8Array
    const binaryStr = globalThis.atob(padded);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const decoded = new TextDecoder("utf-8").decode(bytes);
    const payload = JSON.parse(decoded) as { exp?: number };

    // Check expiry only — HMAC verified server-side
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through unconditionally
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  const authed = await isAuthenticated(request);
  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/spt/admin/:path*",
    "/api/reports/:path*",
    "/api/spt/admin/logout",
  ]
};
