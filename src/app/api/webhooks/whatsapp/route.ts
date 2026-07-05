import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "sptwhatsapp2024";
const N8N_WEBHOOK_URL = process.env.N8N_WHATSAPP_WEBHOOK_URL ?? "";

// ─── Meta webhook verification (GET) ───────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ─── Receive messages from Meta → forward to n8n (POST) ────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (N8N_WEBHOOK_URL) {
      // Forward with a 8s timeout — respond to Meta quickly
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 8000);
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
      } catch {
        // timeout or n8n error — still return 200 to Meta
      } finally {
        clearTimeout(t);
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch {
    // Always return 200 so Meta doesn't disable the webhook
    return new NextResponse("OK", { status: 200 });
  }
}
