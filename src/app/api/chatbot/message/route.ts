import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversationId, senderType, message, summary } = body;

    if (!conversationId || !senderType || !message) {
      return NextResponse.json(
        { error: "Missing required fields: conversationId, senderType, message" },
        { status: 400 }
      );
    }

    // Save the message
    const saved = await prisma.chatbotMessage.create({
      data: { conversationId, senderType, message },
    });

    // Update conversation status and optional summary
    await prisma.chatbotConversation.update({
      where: { id: conversationId },
      data: {
        updatedAt: new Date(),
        ...(summary ? { summary } : {}),
        status:
          senderType === "USER" ? "WAITING_FOR_ADMIN" : "WAITING_FOR_USER",
      },
    });

    // Bump lastInteractionAt on the linked contact
    const conv = await prisma.chatbotConversation.findUnique({
      where: { id: conversationId },
      select: { contactId: true },
    });
    if (conv?.contactId) {
      await prisma.chatbotContact.update({
        where: { id: conv.contactId },
        data: { lastInteractionAt: new Date() },
      });
    }

    return NextResponse.json({ id: saved.id });
  } catch (error) {
    console.error("[chatbot/message]", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
