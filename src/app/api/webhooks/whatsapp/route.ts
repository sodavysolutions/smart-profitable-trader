import { NextRequest, NextResponse, after } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "sptwhatsapp2024";
const N8N_WEBHOOK_URL = process.env.N8N_WHATSAPP_WEBHOOK_URL ?? "";

// ─── Meta webhook verification (GET) ────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  console.log("[WA Webhook] GET verify:", { mode, tokenMatch: token === VERIFY_TOKEN, hasChallenge: !!challenge });

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ─── Receive messages from Meta → forward to n8n in background (POST) ────────
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[WA Webhook] Failed to parse body");
    return new NextResponse("OK", { status: 200 });
  }

  console.log("[WA Webhook] POST received, entry count:",
    (body as { entry?: unknown[] })?.entry?.length ?? 0);

  if (!N8N_WEBHOOK_URL) {
    console.warn("[WA Webhook] N8N_WHATSAPP_WEBHOOK_URL is not set — skipping forward");
    return new NextResponse("OK", { status: 200 });
  }

  // Respond to Meta immediately, forward to n8n in the background
  after(async () => {
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("[WA Webhook] n8n forward:", res.status, res.ok ? "OK" : "FAILED");
    } catch (err) {
      console.error("[WA Webhook] n8n forward error:", err);
    }
  });

  return new NextResponse("OK", { status: 200 });
}
