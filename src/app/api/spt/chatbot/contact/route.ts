/**
 * POST /api/spt/chatbot/contact
 *
 * Called by n8n (WhatsApp + Telegram workflows) whenever a new message arrives.
 * Creates or updates a ChatbotContact so the lead appears in the admin Leads dashboard.
 *
 * Body: { platform, phoneNumber, displayName, messageText }
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_PLATFORMS = ["WHATSAPP", "TELEGRAM", "WEBSITE_CHAT"] as const;
type Platform = (typeof VALID_PLATFORMS)[number];

/**
 * Strip artefacts from n8n field values:
 * - Leading "=" when the field was in Fixed mode with ={{ }} template syntax
 * - Unevaluated n8n expressions like $('NodeName').item.json.field
 */
function cleanField(value: string | undefined): string | undefined {
  if (!value) return value;
  const trimmed = value.trim();
  // Reject unevaluated n8n expressions (they start with $( or ={{ )
  if (trimmed.startsWith("$(") || trimmed.startsWith("={{")) return undefined;
  // Strip a single leading "=" left by Fixed-mode template evaluation
  return trimmed.startsWith("=") ? trimmed.slice(1).trim() : trimmed;
}

/**
 * Strip internal AI agent tags from the bot reply before saving.
 * The AI uses these tags for internal signalling (alerts, lead logging)
 * that should never be shown to users or stored in the conversation log.
 *
 * Handles block tags:  [ALERT_SOLOMON]...[/ALERT_SOLOMON]
 *                      [LOG_LEAD]...[/LOG_LEAD]
 * And inline variants: [ALERT_SOLOMON:...] [LOG_LEAD:...]
 */
function stripBotTags(text: string): string {
  return text
    // Block tag pairs (including multiline content)
    .replace(/\[ALERT_SOLOMON\][\s\S]*?\[\/ALERT_SOLOMON\]/gi, "")
    .replace(/\[LOG_LEAD\][\s\S]*?\[\/LOG_LEAD\]/gi, "")
    // Inline colon variants
    .replace(/\[ALERT_SOLOMON:[^\]]*\]/gi, "")
    .replace(/\[LOG_LEAD:[^\]]*\]/gi, "")
    // Any remaining bare tags just in case
    .replace(/\[ALERT_SOLOMON\]/gi, "")
    .replace(/\[LOG_LEAD\]/gi, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const raw = body as {
      platform?: string;
      phoneNumber?: string;
      displayName?: string;
      messageText?: string;
      botReply?: string;
    };

    const platform = raw.platform ?? "WHATSAPP";
    const phoneNumber = cleanField(raw.phoneNumber);
    const displayName = cleanField(raw.displayName);
    const messageText = cleanField(raw.messageText);
    const botReply    = raw.botReply ? stripBotTags(cleanField(raw.botReply) ?? "") || undefined : undefined;

    const channel = (VALID_PLATFORMS.includes(platform as Platform)
      ? platform
      : "WHATSAPP") as Platform;

    const phone = phoneNumber?.trim() || null;
    const name = displayName?.trim() || phone || "Unknown";

    if (!phone && !displayName) {
      return NextResponse.json({ error: "phoneNumber or displayName required" }, { status: 400 });
    }

    // Upsert the ChatbotContact — keyed on phoneWhatsapp
    let contact;
    if (phone) {
      const existing = await prisma.chatbotContact.findFirst({
        where: { phoneWhatsapp: phone },
      });

      if (existing) {
        contact = await prisma.chatbotContact.update({
          where: { id: existing.id },
          data: {
            fullName: name !== phone ? name : existing.fullName ?? name,
            lastInteractionAt: new Date(),
          },
        });
      } else {
        contact = await prisma.chatbotContact.create({
          data: {
            fullName: name,
            phoneWhatsapp: phone,
            lastInteractionAt: new Date(),
          },
        });
      }
    } else {
      contact = await prisma.chatbotContact.create({
        data: {
          fullName: name,
          lastInteractionAt: new Date(),
        },
      });
    }

    // Upsert a conversation for this session
    let conversation = await prisma.chatbotConversation.findFirst({
      where: {
        contactId: contact.id,
        channel,
        status: "OPEN",
      },
      orderBy: { createdAt: "desc" },
    });

    if (!conversation) {
      conversation = await prisma.chatbotConversation.create({
        data: {
          contactId: contact.id,
          channel,
          status: "OPEN",
        },
      });
    }

    // Save the incoming user message
    if (messageText?.trim()) {
      await prisma.chatbotMessage.create({
        data: {
          conversationId: conversation.id,
          senderType: "USER",
          message: messageText.trim(),
        },
      });
    }

    // Save the bot's reply
    if (botReply?.trim()) {
      await prisma.chatbotMessage.create({
        data: {
          conversationId: conversation.id,
          senderType: "AI_AGENT",
          message: botReply.trim(),
        },
      });
    }

    return NextResponse.json({ ok: true, contactId: contact.id, conversationId: conversation.id });
  } catch (error) {
    console.error("[Chatbot Contact API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
