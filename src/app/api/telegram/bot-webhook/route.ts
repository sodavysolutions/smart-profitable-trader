/**
 * POST /api/telegram/bot-webhook
 * Telegram sends updates here when events happen in the VIP group.
 * We use this to capture user_ids when subscribers join via the invite link.
 *
 * Register once by visiting:
 *   GET /api/telegram/register-webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VIP_CHAT_ID = process.env.TELEGRAM_VIP_CHAT_ID ?? "-1002722586879";

export async function POST(req: NextRequest) {
  const update = await req.json();

  // New member joined the VIP group
  const newMembers = update?.message?.new_chat_members ?? update?.chat_member?.new_chat_member ? [update.chat_member.new_chat_member] : [];

  for (const member of newMembers) {
    if (member.is_bot) continue;

    const telegramUserId = String(member.id);
    const telegramUsername = member.username ?? null;

    // Try to match to an active subscription by username or recent invite
    // Since we don't have the username on file (we use phone), we match the most recent
    // ACTIVE subscription that doesn't yet have a telegramUserId set
    const chatId = String(update?.message?.chat?.id ?? update?.chat_member?.chat?.id ?? "");
    if (chatId !== VIP_CHAT_ID) continue;

    // Find the most recently activated subscription without a telegramUserId
    const sub = await prisma.vipSubscription.findFirst({
      where: { status: "ACTIVE", telegramUserId: null },
      orderBy: { startDate: "desc" },
    });

    if (sub) {
      await prisma.vipSubscription.update({
        where: { id: sub.id },
        data: { telegramUserId },
      });
      console.log(`[TGBot] Linked Telegram user ${telegramUserId} (@${telegramUsername}) to subscription ${sub.id}`);
    }
  }

  return NextResponse.json({ ok: true });
}
