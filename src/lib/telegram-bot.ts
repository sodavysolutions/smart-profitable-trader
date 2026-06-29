/**
 * Telegram Bot API helpers for VIP subscription management.
 * The bot must be an admin of the VIP group with "Invite Users" and "Ban Members" permissions.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN   — bot token from @BotFather
 *   TELEGRAM_VIP_CHAT_ID — VIP group/channel ID (e.g. -1002722586879)
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const VIP_CHAT_ID = process.env.TELEGRAM_VIP_CHAT_ID ?? "-1002722586879";

function botUrl(method: string) {
  return `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
}

/**
 * Generate a one-time invite link that expires in 48 hours.
 * The subscriber uses this link to join the VIP group.
 */
export async function createVipInviteLink(): Promise<string | null> {
  const expireDate = Math.floor(Date.now() / 1000) + 48 * 3600; // 48 hours from now

  const res = await fetch(botUrl("createChatInviteLink"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: VIP_CHAT_ID,
      member_limit: 1,        // one-time use
      expire_date: expireDate,
      name: "VIP Subscription",
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    console.error("[TelegramBot] createChatInviteLink failed:", data);
    return null;
  }

  return data.result.invite_link as string;
}

/**
 * Remove a member from the VIP group using their Telegram user_id.
 * Bans then immediately unbans so they can re-join later if they resubscribe.
 */
export async function removeVipMember(telegramUserId: string): Promise<boolean> {
  // Ban (kick)
  const banRes = await fetch(botUrl("banChatMember"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: VIP_CHAT_ID,
      user_id: parseInt(telegramUserId, 10),
    }),
  });
  const banData = await banRes.json();
  if (!banData.ok) {
    console.error("[TelegramBot] banChatMember failed:", banData);
    return false;
  }

  // Immediately unban so they can rejoin in future
  await fetch(botUrl("unbanChatMember"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: VIP_CHAT_ID,
      user_id: parseInt(telegramUserId, 10),
      only_if_banned: true,
    }),
  });

  return true;
}

/**
 * Register the bot webhook with Telegram.
 * Call once: GET /api/telegram/register-webhook
 */
export async function registerBotWebhook(webhookUrl: string): Promise<boolean> {
  const res = await fetch(botUrl("setWebhook"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const data = await res.json();
  return data.ok === true;
}
