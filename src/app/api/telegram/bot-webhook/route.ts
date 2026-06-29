/**
 * POST /api/telegram/bot-webhook
 * Handles all Telegram bot updates:
 *   - Conversation flow (subscribe via bot)
 *   - New member joined VIP group (capture user_id for removal tracking)
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleBotUpdate } from "@/lib/bot-conversation";

const VIP_CHAT_ID = process.env.TELEGRAM_VIP_CHAT_ID ?? "-1002722586879";

export async function POST(req: NextRequest) {
  const update = await req.json();

  // New member joined the VIP group — capture their user_id
  const newMembers =
    update?.message?.new_chat_members ??
    (update?.chat_member?.new_chat_member ? [update.chat_member.new_chat_member.user] : []);

  const chatId = String(
    update?.message?.chat?.id ?? update?.chat_member?.chat?.id ?? ""
  );

  if (newMembers.length > 0 && chatId === VIP_CHAT_ID) {
    for (const member of newMembers) {
      if (member?.is_bot) continue;
      const telegramUserId = String(member.id);

      // Match to subscription: first try botChatId (most reliable), then fallback to most recent active
      const sub = await prisma.vipSubscription.findFirst({
        where: {
          status: "ACTIVE",
          telegramUserId: null,
          OR: [{ botChatId: telegramUserId }, { botChatId: null }],
        },
        orderBy: { startDate: "desc" },
      });

      if (sub) {
        await prisma.vipSubscription.update({
          where: { id: sub.id },
          data: { telegramUserId },
        });
      }
    }
    return NextResponse.json({ ok: true });
  }

  // All other updates: handle via conversation engine
  // (DMs to the bot, button presses, /start, /status, /help etc.)
  await handleBotUpdate(update);

  return NextResponse.json({ ok: true });
}
