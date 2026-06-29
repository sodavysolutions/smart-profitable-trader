/**
 * SPT VIP Bot — Conversation Engine
 *
 * Handles the full subscription flow inside Telegram:
 *   /start → name → email → phone → payment method → payment → invite link
 *
 * Steps:
 *   idle          → waiting for /start
 *   ask_name      → bot asked for name
 *   ask_email     → bot asked for email
 *   ask_phone     → bot asked for phone
 *   ask_payment   → bot showed payment options
 *   ask_crypto_network → bot asked which crypto network
 *   ask_tx_hash   → bot waiting for TX hash after showing wallet address
 *   done          → flow complete
 */

import { prisma } from "@/lib/prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const SITE_URL = "https://www.smartprofitstrader.com";
const NGN_AMOUNT_KOBO = 8000000; // ₦80,000

const WALLETS = {
  TRC20: "TNZUoUMagqyktuHbjJLGfwG1mL2N7GiwVM",
  BEP20: "0x00b6cb559b7b581f49282595b872e47589c51e70",
};

// ── Telegram API helpers ──────────────────────────────────────────────────────

async function sendMessage(chatId: string, text: string, extra: object = {}) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...extra }),
  });
}

function inlineButtons(rows: { text: string; callback_data: string }[][]) {
  return { reply_markup: { inline_keyboard: rows } };
}

// ── Session helpers ───────────────────────────────────────────────────────────

type SessionData = {
  name?: string;
  email?: string;
  phone?: string;
  network?: string;
};

async function getSession(chatId: string) {
  const session = await prisma.botSession.upsert({
    where: { chatId },
    create: { chatId, step: "idle", data: {} },
    update: {},
  });
  return { step: session.step, data: session.data as SessionData };
}

async function setSession(chatId: string, step: string, data: SessionData) {
  await prisma.botSession.update({ where: { chatId }, data: { step, data } });
}

async function resetSession(chatId: string) {
  await prisma.botSession.upsert({
    where: { chatId },
    create: { chatId, step: "idle", data: {} },
    update: { step: "idle", data: {} },
  });
}

// ── Step handlers ─────────────────────────────────────────────────────────────

async function handleStart(chatId: string) {
  await resetSession(chatId);
  await setSession(chatId, "ask_name", {});
  await sendMessage(chatId,
    `👋 Welcome to <b>Smart Profits Trader VIP Signals</b>!\n\n` +
    `You're one step away from getting real-time algo-powered trading signals delivered directly here.\n\n` +
    `<b>💰 Price:</b> $50 / 30 days\n` +
    `<b>📊 What you get:</b> Gold & forex signals with entry, TP, and SL\n\n` +
    `Let's get you set up. What's your <b>full name</b>?`
  );
}

async function handleName(chatId: string, text: string, data: SessionData) {
  const name = text.trim();
  if (name.length < 2) {
    await sendMessage(chatId, "Please enter your full name (at least 2 characters).");
    return;
  }
  await setSession(chatId, "ask_email", { ...data, name });
  await sendMessage(chatId, `Nice to meet you, <b>${name}</b>! 👍\n\nWhat's your <b>email address</b>? (We'll send your access confirmation here.)`);
}

async function handleEmail(chatId: string, text: string, data: SessionData) {
  const email = text.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await sendMessage(chatId, "That doesn't look like a valid email. Please enter a valid email address.");
    return;
  }
  await setSession(chatId, "ask_phone", { ...data, email });
  await sendMessage(chatId, `Got it! ✅\n\nNow enter the <b>phone number linked to your Telegram account</b> (with country code, e.g. +234...)`);
}

async function handlePhone(chatId: string, text: string, data: SessionData) {
  const phone = text.trim();
  if (phone.length < 7) {
    await sendMessage(chatId, "Please enter a valid phone number including your country code.");
    return;
  }
  await setSession(chatId, "ask_payment", { ...data, phone });
  await sendMessage(chatId,
    `Almost there! 🎉\n\nChoose your <b>payment method</b>:`,
    inlineButtons([
      [{ text: "💳 Paystack (NGN — Nigeria)", callback_data: "pay_paystack" }],
      [{ text: "₿ Crypto — USDT/USDC", callback_data: "pay_crypto" }],
    ])
  );
}

async function handlePaystackChoice(chatId: string, data: SessionData) {
  if (!data.name || !data.email || !data.phone) {
    await sendMessage(chatId, "Session expired. Please type /start to begin again.");
    await resetSession(chatId);
    return;
  }

  // Create Paystack payment link
  const reference = `spt-vip-tg-${chatId}-${Date.now()}`;

  const psRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      amount: NGN_AMOUNT_KOBO,
      currency: "NGN",
      reference,
      callback_url: `${SITE_URL}/api/vip/paystack-callback`,
      metadata: { name: data.name, phone: data.phone, botChatId: chatId },
    }),
  });
  const psData = await psRes.json();

  if (!psData.status) {
    await sendMessage(chatId, "❌ Could not generate payment link. Please try again or contact support.");
    return;
  }

  // Save subscription record
  await prisma.vipSubscription.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      paymentMethod: "PAYSTACK",
      paystackRef: reference,
      botChatId: chatId,
      status: "PENDING",
    },
  });

  await setSession(chatId, "done", data);
  await sendMessage(chatId,
    `✅ <b>Your payment link is ready!</b>\n\n` +
    `Click the button below to pay ₦80,000 (~$50 USD) securely via Paystack.\n\n` +
    `Once payment is confirmed, I'll send your <b>VIP group invite link</b> here automatically. 🚀`,
    { reply_markup: { inline_keyboard: [[{ text: "💳 Pay Now via Paystack →", url: psData.data.authorization_url }]] } }
  );
}

async function handleCryptoChoice(chatId: string, data: SessionData) {
  await setSession(chatId, "ask_crypto_network", data);
  await sendMessage(chatId,
    `Which network will you send on?`,
    inlineButtons([
      [{ text: "🔴 TRC20 (Tron) — lowest fees", callback_data: "network_TRC20" }],
      [{ text: "🟡 BEP20 (BSC) — Binance Smart Chain", callback_data: "network_BEP20" }],
    ])
  );
}

async function handleNetworkChoice(chatId: string, network: string, data: SessionData) {
  const wallet = WALLETS[network as keyof typeof WALLETS];
  await setSession(chatId, "ask_tx_hash", { ...data, network });
  await sendMessage(chatId,
    `Send exactly <b>$50 USDT or USDC</b> on the <b>${network}</b> network to:\n\n` +
    `<code>${wallet}</code>\n\n` +
    `⚠️ <b>Only send on ${network}.</b> Wrong network = lost funds.\n\n` +
    `After sending, paste your <b>transaction hash (TX ID)</b> here.`
  );
}

async function handleTxHash(chatId: string, text: string, data: SessionData) {
  const txHash = text.trim();
  if (txHash.length < 10) {
    await sendMessage(chatId, "That doesn't look like a valid transaction hash. Please paste the full TX ID from your wallet.");
    return;
  }

  if (!data.name || !data.email || !data.phone) {
    await sendMessage(chatId, "Session expired. Please type /start to begin again.");
    await resetSession(chatId);
    return;
  }

  await prisma.vipSubscription.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      paymentMethod: "CRYPTO",
      cryptoTxHash: txHash,
      botChatId: chatId,
      status: "PENDING_CRYPTO",
    },
  });

  await setSession(chatId, "done", data);
  await sendMessage(chatId,
    `✅ <b>Transaction received!</b>\n\n` +
    `We'll verify your payment on-chain and send your <b>VIP group invite link here</b> within 1–2 hours.\n\n` +
    `Thank you, ${data.name}! 🎉`
  );
}

async function handleRegisterEmail(chatId: string, text: string) {
  const email = text.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await sendMessage(chatId, "That doesn't look like a valid email. Please enter the email you used when subscribing.");
    return;
  }

  // Find an active subscription with this email that isn't yet linked
  const sub = await prisma.vipSubscription.findFirst({
    where: { email, status: "ACTIVE" },
    orderBy: { startDate: "desc" },
  });

  if (!sub) {
    await sendMessage(chatId,
      `❌ No active subscription found for <b>${email}</b>.\n\n` +
      `• Check the email you subscribed with\n` +
      `• If you haven't subscribed yet, type /start\n` +
      `• For help, contact: wa.me/2347087970133`
    );
    await resetSession(chatId);
    return;
  }

  if (sub.telegramUserId && sub.telegramUserId !== chatId) {
    await sendMessage(chatId, `This subscription is already linked to another Telegram account. Contact support if this is a mistake.`);
    await resetSession(chatId);
    return;
  }

  // Link their Telegram user ID
  await prisma.vipSubscription.update({
    where: { id: sub.id },
    data: { telegramUserId: chatId, botChatId: chatId },
  });

  await resetSession(chatId);

  const daysLeft = sub.endDate
    ? Math.ceil((sub.endDate.getTime() - Date.now()) / (24 * 3600 * 1000))
    : null;

  await sendMessage(chatId,
    `✅ <b>Successfully linked!</b>\n\n` +
    `Your Telegram is now connected to your SPT VIP subscription.\n` +
    (daysLeft !== null ? `📅 Your access expires in <b>${daysLeft} days</b> (${sub.endDate?.toDateString()}).\n` : "") +
    `\nYou'll receive renewal reminders here automatically. Type /status anytime to check your subscription.`
  );
}

// ── Main router ───────────────────────────────────────────────────────────────

export async function handleBotUpdate(update: Record<string, unknown>) {
  // Callback query (button press)
  if (update.callback_query) {
    const cq = update.callback_query as { id: string; data: string; message: { chat: { id: number } } };
    const chatId = String(cq.message.chat.id);
    const callbackData = cq.data;

    // Acknowledge the button press
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: cq.id }),
    });

    const { step, data } = await getSession(chatId);

    if (callbackData === "pay_paystack" && step === "ask_payment") {
      await handlePaystackChoice(chatId, data);
    } else if (callbackData === "pay_crypto" && step === "ask_payment") {
      await handleCryptoChoice(chatId, data);
    } else if (callbackData.startsWith("network_") && step === "ask_crypto_network") {
      const network = callbackData.replace("network_", "");
      await handleNetworkChoice(chatId, network, data);
    }
    return;
  }

  // Regular message
  const message = update.message as { chat: { id: number }; text?: string } | undefined;
  if (!message?.text) return;

  const chatId = String(message.chat.id);
  const text = message.text.trim();

  // Commands
  if (text === "/start" || text.startsWith("/start ")) {
    await handleStart(chatId);
    return;
  }

  if (text === "/status") {
    const sub = await prisma.vipSubscription.findFirst({
      where: { botChatId: chatId, status: { in: ["ACTIVE", "PENDING", "PENDING_CRYPTO"] } },
      orderBy: { createdAt: "desc" },
    });
    if (!sub) {
      await sendMessage(chatId, "You don't have an active subscription. Type /start to subscribe.");
    } else if (sub.status === "ACTIVE" && sub.endDate) {
      const daysLeft = Math.ceil((sub.endDate.getTime() - Date.now()) / (24 * 3600 * 1000));
      await sendMessage(chatId, `✅ <b>Active subscription</b>\nExpires: ${sub.endDate.toDateString()}\nDays remaining: <b>${daysLeft}</b>\n\nTo renew, type /start after expiry.`);
    } else {
      await sendMessage(chatId, `⏳ Your payment is being verified. You'll receive your invite link here once confirmed.`);
    }
    return;
  }

  if (text === "/help") {
    await sendMessage(chatId,
      `<b>SPT VIP Bot Commands</b>\n\n` +
      `/start — Subscribe to VIP Signals ($50/month)\n` +
      `/status — Check your subscription status\n` +
      `/register — Link your Telegram to an existing subscription\n` +
      `/help — Show this message\n\n` +
      `For support, contact us on WhatsApp: wa.me/2347087970133`
    );
    return;
  }

  if (text === "/register") {
    await sendMessage(chatId,
      `To link your Telegram to your existing subscription, reply with the <b>email address</b> you used when subscribing.`
    );
    await setSession(chatId, "register_email", {});
    return;
  }

  // Conversation steps
  const { step, data } = await getSession(chatId);

  if (step === "ask_name") {
    await handleName(chatId, text, data);
  } else if (step === "ask_email") {
    await handleEmail(chatId, text, data);
  } else if (step === "ask_phone") {
    await handlePhone(chatId, text, data);
  } else if (step === "ask_tx_hash") {
    await handleTxHash(chatId, text, data);
  } else if (step === "register_email") {
    await handleRegisterEmail(chatId, text);
  } else {
    // Unknown state
    await sendMessage(chatId,
      `Type /start to subscribe to VIP Signals or /help for available commands.`
    );
  }
}

/**
 * Send invite link (or a message) directly to a subscriber's Telegram chat.
 * Called by vip-engine after payment is confirmed.
 */
export async function sendBotInviteLink(botChatId: string, inviteLink: string | null, name: string) {
  const firstName = name.split(" ")[0];
  if (inviteLink) {
    await sendMessage(
      botChatId,
      `🎉 <b>Payment confirmed, ${firstName}!</b>\n\nHere's your one-time VIP group invite link:\n\n` +
      `👉 <a href="${inviteLink}">Join SPT VIP Signals Group</a>\n\n` +
      `This link is valid for <b>48 hours</b> and works only once. Use it now!`,
      { reply_markup: { inline_keyboard: [[{ text: "🚀 Join VIP Group →", url: inviteLink }]] } }
    );
  } else {
    await sendMessage(
      botChatId,
      `✅ <b>Payment confirmed, ${firstName}!</b>\n\nOur team will add you to the VIP group within 1 hour. Stay tuned!`
    );
  }
}
