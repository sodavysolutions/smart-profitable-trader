/**
 * VIP Subscription Engine
 * Handles activation, reminder emails, and expiry removal.
 */

import { prisma } from "@/lib/prisma";
import { buildEmailHtml } from "@/lib/email-templates";
import { createVipInviteLink, removeVipMember } from "@/lib/telegram-bot";
import { sendBotInviteLink } from "@/lib/bot-conversation";
import nodemailer from "nodemailer";

const SITE_URL = "https://www.smartprofitstrader.com";
const FROM_NAME = "Solomon Dee | Smart Profits Trader";
const FROM_EMAIL = process.env.SENDY_FROM_EMAIL ?? "info@smartprofitstrader.com";

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SES_SMTP_HOST!,
    port: parseInt(process.env.SES_SMTP_PORT ?? "587", 10),
    secure: false,
    auth: { user: process.env.SES_SMTP_USER!, pass: process.env.SES_SMTP_PASS! },
  });
}

async function sendVipEmail(to: string, name: string, subject: string, badge: string, title: string, bodyHtml: string, cta?: { label: string; href: string }) {
  const html = buildEmailHtml({ badge, title, bodyHtml, cta });
  const transport = getTransport();
  await transport.sendMail({ from: `"${FROM_NAME}" <${FROM_EMAIL}>`, to, subject, html });
}

/**
 * Activate a VIP subscription after payment confirmed.
 * Generates a Telegram invite link and emails it to the subscriber.
 */
export async function activateVipSubscription(subscriptionId: string) {
  const sub = await prisma.vipSubscription.findUnique({ where: { id: subscriptionId } });
  if (!sub || sub.status === "ACTIVE") return;

  const now = new Date();
  const endDate = new Date(now.getTime() + 30 * 24 * 3600 * 1000); // 30 days

  // Generate one-time Telegram invite link
  const inviteLink = await createVipInviteLink();

  await prisma.vipSubscription.update({
    where: { id: subscriptionId },
    data: {
      status: "ACTIVE",
      startDate: now,
      endDate,
      inviteLink: inviteLink ?? undefined,
    },
  });

  const firstName = sub.name.split(" ")[0];

  // Send invite link via Telegram bot DM (if they subscribed through the bot)
  if (sub.botChatId) {
    try {
      await sendBotInviteLink(sub.botChatId, inviteLink, sub.name);
    } catch (err) {
      console.error("[VIP] Bot DM failed:", err);
    }
  }

  // Send welcome email with invite link
  const linkSection = inviteLink
    ? `<div style="margin:20px 0;padding:20px;background:#f0fdf6;border-radius:8px;text-align:center;">
        <p style="margin:0 0 12px;font-weight:bold;">Your VIP Group Access Link</p>
        <a href="${inviteLink}" style="display:inline-block;background:#16A34A;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:7px;">Join VIP Signals Group →</a>
        <p style="margin:10px 0 0;font-size:12px;color:#64748b;">This link is one-time use and expires in 48 hours.</p>
      </div>`
    : `<p>Our team will add you to the group manually within 1 hour.</p>`;

  await sendVipEmail(
    sub.email,
    sub.name,
    "🎉 Welcome to SPT VIP Signals — Your Access Link Inside",
    "VIP Access Granted",
    `Welcome to the VIP, ${firstName}!`,
    `<p>Your payment has been confirmed. You now have 30-day access to the <strong>SPT VIP Signals Group</strong>.</p>
     ${linkSection}
     <p>Your subscription runs from <strong>${now.toDateString()}</strong> to <strong>${endDate.toDateString()}</strong>.</p>
     <p>Inside the group you'll receive real-time algo-powered signals, trade setups, and market analysis directly from Solomon.</p>
     <p>If you have any issues joining, reply to this email or reach us on WhatsApp.</p>`,
    { label: "Join VIP Group →", href: inviteLink ?? "https://wa.me/2347087970133" }
  );
}

/**
 * Process all active subscriptions: send reminders and remove expired members.
 * Run daily via cron.
 */
export async function processVipSubscriptions() {
  const now = new Date();
  let reminders = 0;
  let removed = 0;

  const active = await prisma.vipSubscription.findMany({
    where: { status: "ACTIVE", endDate: { not: null } },
  });

  for (const sub of active) {
    if (!sub.endDate) continue;
    const daysLeft = Math.ceil((sub.endDate.getTime() - now.getTime()) / (24 * 3600 * 1000));
    const firstName = sub.name.split(" ")[0];

    // --- Expiry: remove ---
    if (daysLeft <= 0) {
      // Remove from Telegram group
      if (sub.telegramUserId) {
        await removeVipMember(sub.telegramUserId);
      }

      await prisma.vipSubscription.update({
        where: { id: sub.id },
        data: { status: "EXPIRED", removalNotified: true },
      });

      await sendVipEmail(
        sub.email, sub.name,
        "Your SPT VIP Subscription Has Expired",
        "Subscription Expired",
        "Your VIP Access Has Ended",
        `<p>Hi ${firstName}, your 30-day SPT VIP Signals subscription has expired and you have been removed from the group.</p>
         <p>You can renew at any time to regain instant access to our real-time signals.</p>`,
        { label: "Renew Subscription →", href: `${SITE_URL}/spt/vip` }
      );
      removed++;
      continue;
    }

    // --- 7-day reminder ---
    if (daysLeft <= 7 && !sub.reminder7Sent) {
      await prisma.vipSubscription.update({ where: { id: sub.id }, data: { reminder7Sent: true } });
      await sendVipEmail(
        sub.email, sub.name,
        "⏰ 7 Days Left on Your SPT VIP Subscription",
        "Renewal Reminder",
        `7 Days Left, ${firstName}`,
        `<p>Your SPT VIP Signals access expires on <strong>${sub.endDate.toDateString()}</strong> — just 7 days away.</p>
         <p>Renew now to stay in the group without interruption and keep receiving our daily algo-powered signals.</p>`,
        { label: "Renew for $50 →", href: `${SITE_URL}/spt/vip` }
      );
      reminders++;
    }

    // --- 3-day reminder ---
    if (daysLeft <= 3 && !sub.reminder3Sent) {
      await prisma.vipSubscription.update({ where: { id: sub.id }, data: { reminder3Sent: true } });
      await sendVipEmail(
        sub.email, sub.name,
        "⚠️ 3 Days Left — Renew Your SPT VIP Access",
        "Renewal Reminder",
        `Only 3 Days Left, ${firstName}`,
        `<p>Your VIP subscription expires in <strong>3 days</strong> on ${sub.endDate.toDateString()}.</p>
         <p>Don't lose access — renew now and stay connected to the signals that keep you ahead of the market.</p>`,
        { label: "Renew Now →", href: `${SITE_URL}/spt/vip` }
      );
      reminders++;
    }

    // --- 1-day reminder ---
    if (daysLeft <= 1 && !sub.reminder1Sent) {
      await prisma.vipSubscription.update({ where: { id: sub.id }, data: { reminder1Sent: true } });
      await sendVipEmail(
        sub.email, sub.name,
        "🚨 Last Day — Your VIP Access Expires Tomorrow",
        "Final Reminder",
        `Last Chance, ${firstName}`,
        `<p>Your SPT VIP Signals subscription expires <strong>tomorrow</strong>. After that you will be removed from the group.</p>
         <p>Renew now to keep receiving real-time signals without any gap.</p>`,
        { label: "Renew Immediately →", href: `${SITE_URL}/spt/vip` }
      );
      reminders++;
    }
  }

  return { reminders, removed };
}
