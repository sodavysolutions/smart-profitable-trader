import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";

// ─────────────────────────────────────────────────────────────
//  POST /api/spt/chatbot/broadcast
//
//  Body: {
//    message:   string        (required — plain text)
//    platforms: ("WHATSAPP" | "TELEGRAM")[]  (required)
//  }
//
//  Reads WHATSAPP_API_TOKEN + WHATSAPP_PHONE_NUMBER_ID from env.
//  Reads TELEGRAM_BOT_TOKEN from env.
//  Neither is ever exposed to the client.
// ─────────────────────────────────────────────────────────────

export const runtime = "nodejs";
export const maxDuration = 60;

interface BroadcastBody {
  message: string;
  platforms: string[];
  /** If set, send as a WhatsApp template message instead of free-form text */
  templateName?: string;
  /** Body text of the selected template — used to detect whether {{1}} variable exists */
  templateBodyText?: string;
}

interface SendResult {
  contactId: string;
  name: string | null;
  identifier: string;
  platform: string;
  ok: boolean;
  error?: string;
}

async function sendWhatsApp(to: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "1234231113102298";
  if (!token) return { ok: false, error: "WHATSAPP_API_TOKEN not configured" };

  // Normalise: strip leading + and whitespace
  const phone = to.replace(/^\+/, "").replace(/\s/g, "");

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: text },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "unknown");
    return { ok: false, error: `WA API ${res.status}: ${err.slice(0, 200)}` };
  }
  return { ok: true };
}

/**
 * Send a WhatsApp message template — bypasses the 24-hour customer service window.
 * The template must already be APPROVED in Meta Business Manager.
 * firstName is injected as {{1}} only if the template body actually contains that variable.
 */
async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  firstName: string,
  templateBodyText: string
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "1234231113102298";
  if (!token) return { ok: false, error: "WHATSAPP_API_TOKEN not configured" };

  const phone = to.replace(/^\+/, "").replace(/\s/g, "");

  // Only include body parameters if the template body actually uses {{1}}
  const hasNameVar = templateBodyText.includes("{{1}}");
  const components = hasNameVar
    ? [{ type: "body", parameters: [{ type: "text", text: firstName }] }]
    : [];

  const template: Record<string, unknown> = {
    name: templateName,
    language: { code: "en_US" },
  };
  if (components.length) template.components = components;

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "unknown");
    return { ok: false, error: `WA API ${res.status}: ${err.slice(0, 200)}` };
  }
  return { ok: true };
}

async function sendTelegram(chatId: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false, error: "TELEGRAM_BOT_TOKEN not configured" };

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "unknown");
    return { ok: false, error: `Telegram API ${res.status}: ${err.slice(0, 200)}` };
  }
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: BroadcastBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, platforms, templateName, templateBodyText } = body;
  if (!message?.trim() && !templateName?.trim()) return NextResponse.json({ error: "Message or template is required" }, { status: 400 });
  if (!platforms?.length) return NextResponse.json({ error: "Select at least one platform" }, { status: 400 });

  const usingTemplate = !!templateName?.trim();

  const wantsWhatsApp = platforms.includes("WHATSAPP");
  const wantsTelegram = platforms.includes("TELEGRAM");

  // ── Fetch distinct contacts per platform ─────────────────
  //
  // Each contact may have multiple conversations (different channels).
  // We want: contacts who have at least one conversation on the requested channel.
  // Their phone/chatId is stored in ChatbotContact.phoneWhatsapp.
  //
  // For Telegram, phoneWhatsapp stores the Telegram chatId (numeric string).
  // For WhatsApp, phoneWhatsapp stores the WhatsApp phone number.

  const contactsToSend: {
    contactId: string;
    name: string | null;
    identifier: string;
    platform: "WHATSAPP" | "TELEGRAM";
  }[] = [];

  if (wantsWhatsApp) {
    const rows = await prisma.chatbotConversation.findMany({
      where: { channel: "WHATSAPP", contact: { phoneWhatsapp: { not: null } } },
      select: { contactId: true, contact: { select: { fullName: true, phoneWhatsapp: true } } },
      distinct: ["contactId"],
    });
    for (const r of rows) {
      if (r.contactId && r.contact?.phoneWhatsapp) {
        contactsToSend.push({
          contactId: r.contactId,
          name: r.contact.fullName ?? null,
          identifier: r.contact.phoneWhatsapp,
          platform: "WHATSAPP",
        });
      }
    }
  }

  if (wantsTelegram) {
    const rows = await prisma.chatbotConversation.findMany({
      where: { channel: "TELEGRAM", contact: { phoneWhatsapp: { not: null } } },
      select: { contactId: true, contact: { select: { fullName: true, phoneWhatsapp: true } } },
      distinct: ["contactId"],
    });
    for (const r of rows) {
      if (r.contactId && r.contact?.phoneWhatsapp) {
        contactsToSend.push({
          contactId: r.contactId,
          name: r.contact.fullName ?? null,
          identifier: r.contact.phoneWhatsapp,
          platform: "TELEGRAM",
        });
      }
    }
  }

  // De-duplicate by (contactId + platform) in case of multiple conversations
  const seen = new Set<string>();
  const unique = contactsToSend.filter((c) => {
    const key = `${c.platform}:${c.contactId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (!unique.length) {
    return NextResponse.json({ ok: true, sent: 0, failed: 0, total: 0, results: [] });
  }

  // ── Send messages (sequential, throttled ~200ms apart) ──
  const results: SendResult[] = [];
  for (const contact of unique) {
    // Extract first name from fullName for template personalisation
    const firstName = contact.name
      ? contact.name.split(/\s+/)[0].replace(/^=+/, "")
      : "Friend";

    let result: { ok: boolean; error?: string };
    if (contact.platform === "WHATSAPP" && usingTemplate) {
      result = await sendWhatsAppTemplate(contact.identifier, templateName!.trim(), firstName, templateBodyText ?? "");
    } else if (contact.platform === "WHATSAPP") {
      result = await sendWhatsApp(contact.identifier, message.trim());
    } else {
      // Telegram: always free-form (no 24h restriction)
      result = await sendTelegram(contact.identifier, (message ?? "").trim());
    }

    results.push({
      contactId: contact.contactId,
      name: contact.name,
      identifier: contact.identifier,
      platform: contact.platform,
      ok: result.ok,
      error: result.error ?? undefined,
    });

    // Small delay to avoid rate limit bursts
    await new Promise((r) => setTimeout(r, 200));
  }

  const sent = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  return NextResponse.json({ ok: true, sent, failed, total: unique.length, results });
}

// ── GET — return contact counts per platform ─────────────────

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [whatsappRows, telegramRows] = await Promise.all([
    prisma.chatbotConversation.findMany({
      where: { channel: "WHATSAPP", contact: { phoneWhatsapp: { not: null } } },
      select: { contactId: true },
      distinct: ["contactId"],
    }),
    prisma.chatbotConversation.findMany({
      where: { channel: "TELEGRAM", contact: { phoneWhatsapp: { not: null } } },
      select: { contactId: true },
      distinct: ["contactId"],
    }),
  ]);

  return NextResponse.json({
    whatsapp: whatsappRows.filter((r) => r.contactId).length,
    telegram: telegramRows.filter((r) => r.contactId).length,
  });
}
