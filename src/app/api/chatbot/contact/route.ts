import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phoneWhatsapp, serviceInterest, sourcePage, channel } = body;

    // Try to find existing contact by phone then email
    let contact = null;
    if (phoneWhatsapp) {
      contact = await prisma.chatbotContact.findFirst({ where: { phoneWhatsapp } });
    }
    if (!contact && email) {
      contact = await prisma.chatbotContact.findFirst({ where: { email } });
    }

    if (contact) {
      contact = await prisma.chatbotContact.update({
        where: { id: contact.id },
        data: {
          ...(fullName ? { fullName } : {}),
          ...(email ? { email } : {}),
          ...(serviceInterest ? { serviceInterest } : {}),
          ...(sourcePage ? { sourcePage } : {}),
          lastInteractionAt: new Date(),
          // Escalate from NEW → ENGAGED if not already further along
          leadStatus:
            contact.leadStatus === "NEW" ? "ENGAGED" : contact.leadStatus,
        },
      });
    } else {
      contact = await prisma.chatbotContact.create({
        data: {
          fullName: fullName ?? null,
          email: email ?? null,
          phoneWhatsapp: phoneWhatsapp ?? null,
          serviceInterest: serviceInterest ?? null,
          sourcePage: sourcePage ?? null,
          lastInteractionAt: new Date(),
        },
      });
    }

    const conversation = await prisma.chatbotConversation.create({
      data: {
        contactId: contact.id,
        channel: channel ?? "WEBSITE_CHAT",
        sourcePage: sourcePage ?? null,
        serviceInterest: serviceInterest ?? null,
      },
    });

    return NextResponse.json({ contactId: contact.id, conversationId: conversation.id });
  } catch (error) {
    console.error("[chatbot/contact]", error);
    return NextResponse.json({ error: "Failed to create contact/conversation" }, { status: 500 });
  }
}
