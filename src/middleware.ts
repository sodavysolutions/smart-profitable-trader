import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "spt_admin_session";
const LOGIN_PATH = "/spt/admin/login";

/**
 * Lightweight token verification for Edge middleware.
 * Mirrors the HMAC-SHA256 logic in spt-admin-auth.ts without Node.js-only APIs.
 */
async function isValidToken(token: string, secret: string): Promise<boolean> {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;

  const body = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign the raw body string (base64url text) — matches Node.js HMAC in spt-admin-auth.ts
  const bodyBytes = new TextEncoder().encode(body);
  // Re-add base64 padding that Node.js base64url strips before calling atob
  const b64 = signature.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const rawSig = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));

  const computed = new Uint8Array(await crypto.subtle.sign("HMAC", key, bodyBytes));

  if (rawSig.byteLength !== computed.byteLength) return false;
  return crypto.subtle.verify("HMAC", key, rawSig, bodyBytes);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return false;

  try {
    const valid = await isValidToken(token, secret);
    if (!valid) return false;

    // Also verify expiry from the payload
    const body = token.split(".")[0];
    const decoded = atob(body.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(decoded);
    return payload.exp && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  const authed = await isAuthenticated(request);
  if (!authed) {
    // For API routes return 401 JSON; for pages redirect to login
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
