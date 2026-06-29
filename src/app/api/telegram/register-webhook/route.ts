/**
 * GET /api/telegram/register-webhook
 * Visit this URL once to register the bot webhook with Telegram.
 * Protect with a simple secret query param to avoid abuse.
 */

import { NextRequest, NextResponse } from "next/server";
import { registerBotWebhook } from "@/lib/telegram-bot";

const SITE_URL = "https://www.smartprofitstrader.com";
const REGISTER_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET ?? "spt-setup";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== REGISTER_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = `${SITE_URL}/api/telegram/bot-webhook`;
  const ok = await registerBotWebhook(webhookUrl);

  return NextResponse.json({ ok, webhookUrl });
}
