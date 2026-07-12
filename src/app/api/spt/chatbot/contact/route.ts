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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      platform = "WHATSAPP",
      phoneNumber,
      displayName,
      messageText,
      botReply,
    } = body as {
      platform?: string;
      phoneNumber?: string;
      displayName?: string;
      messageText?: string;
      botReply?: string;
    };

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
