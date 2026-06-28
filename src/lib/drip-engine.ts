/**
 * Smart Profits Trader — Drip Email Engine
 * Sends the next scheduled email for each due DripSubscriber.
 * Called by the hourly cron endpoint at /api/cron/drip.
 */

import { prisma } from "@/lib/prisma";
import { buildEmailHtml } from "@/lib/email-templates";
import { DRIP_SEQUENCES, DRIP_SCHEDULE_HOURS } from "@/lib/drip-sequences";
import { DripCategory } from "@prisma/client";
import { addSendySubscriber } from "@/lib/integrations";
import nodemailer from "nodemailer";

const SITE_URL = "https://www.smartprofitstrader.com";
const FROM_NAME = "Solomon Dee | Smart Profits Trader";
const FROM_EMAIL = process.env.SENDY_FROM_EMAIL ?? process.env.SES_FROM_EMAIL ?? "info@smartprofitstrader.com";

function getSmtpTransport() {
  const smtpHost = process.env.SES_SMTP_HOST;
  const smtpPort = parseInt(process.env.SES_SMTP_PORT ?? "587", 10);
  const smtpUser = process.env.SES_SMTP_USER;
  const smtpPass = process.env.SES_SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("SES SMTP credentials not configured.");
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });
}

function personalise(text: string, firstName: string): string {
  return text.replace(/\{firstName\}/g, firstName);
}

function unsubscribeUrl(token: string): string {
  return `${SITE_URL}/api/drip/unsubscribe?token=${token}`;
}

/** Maps drip category to the right Sendy list ID + tags */
function resolveSendyList(category: DripCategory): { listId: string | undefined; tags: string[] } {
  switch (category) {
    case "SIGNALS":
      return { listId: process.env.SENDY_LIST_ID_VIP_SIGNALS, tags: ["vip-signals", "blueprint-lead"] };
    case "COPY_TRADING":
      return { listId: process.env.SENDY_LIST_ID_COPY_TRADING ?? process.env.SENDY_LIST_ID, tags: ["copy-trading", "blueprint-lead"] };
    case "PROP_FIRM":
      return { listId: process.env.SENDY_LIST_ID_EVALUATION ?? process.env.SENDY_LIST_ID, tags: ["prop-firm", "blueprint-lead"] };
    case "GENERAL":
    default:
      return { listId: process.env.SENDY_LIST_ID, tags: ["general", "blueprint-lead"] };
  }
}

type SubscriberRow = {
  id: string;
  email: string;
  fullName: string;
  category: DripCategory;
  emailsSent: number;
  subscribedAt: Date;
  unsubscribeToken: string;
};

async function sendDripEmail(
  subscriber: SubscriberRow,
  transport: ReturnType<typeof nodemailer.createTransport>
): Promise<"sent" | "failed" | "skipped"> {
  const sequence = DRIP_SEQUENCES[subscriber.category];
  const emailIndex = subscriber.emailsSent;

  if (!sequence || emailIndex >= sequence.length) return "skipped";

  const template = sequence[emailIndex];
  const firstName = subscriber.fullName.split(" ")[0] ?? subscriber.fullName;
  const bodyHtml = personalise(template.body, firstName);

  const html = buildEmailHtml({
    preheader: template.preheader,
    badge: template.badge,
    title: personalise(template.title, firstName),
    bodyHtml:
      bodyHtml +
      `<p style="margin:24px 0 0;font-size:13px;color:#94a3b8;">` +
      `You're receiving this because you downloaded the Smart Money Blueprint. ` +
      `<a href="${unsubscribeUrl(subscriber.unsubscribeToken)}" style="color:#16A34A;">Unsubscribe</a>` +
      `</p>`,
    cta: template.ctaLabel && template.ctaUrl
      ? { label: template.ctaLabel, href: template.ctaUrl }
      : undefined,
  });

  try {
    await transport.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: subscriber.email,
      subject: personalise(template.subject, firstName),
      html,
    });

    const newEmailsSent = subscriber.emailsSent + 1;
    const nextScheduleHours =
      newEmailsSent < DRIP_SCHEDULE_HOURS.length ? DRIP_SCHEDULE_HOURS[newEmailsSent] : null;
    const nextEmailAt =
      nextScheduleHours !== null
        ? new Date(subscriber.subscribedAt.getTime() + nextScheduleHours * 3600 * 1000)
        : new Date(Date.now() + 999 * 24 * 3600 * 1000); // far future — sequence done

    await prisma.dripSubscriber.update({
      where: { id: subscriber.id },
      data: { emailsSent: newEmailsSent, nextEmailAt },
    });

    return "sent";
  } catch (err) {
    console.error("[Drip] Send failed for", subscriber.email, err);
    return "failed";
  }
}

export async function processDripQueue(): Promise<{ sent: number; failed: number; skipped: number }> {
  const now = new Date();

  const due = await prisma.dripSubscriber.findMany({
    where: {
      unsubscribed: false,
      emailsSent: { lt: 30 },
      nextEmailAt: { lte: now },
    },
    take: 50,
  });

  if (due.length === 0) return { sent: 0, failed: 0, skipped: 0 };

  let transport: ReturnType<typeof nodemailer.createTransport>;
  try {
    transport = getSmtpTransport();
  } catch {
    return { sent: 0, failed: due.length, skipped: 0 };
  }

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const subscriber of due) {
    const result = await sendDripEmail(subscriber, transport);
    if (result === "sent") sent++;
    else if (result === "failed") failed++;
    else skipped++;
  }

  return { sent, failed, skipped };
}

export async function enrollDripSubscriber({
  email,
  fullName,
  phone,
  category,
}: {
  email: string;
  fullName: string;
  phone?: string;
  category: DripCategory;
}) {
  const now = new Date();

  // Upsert — if they re-subscribe, restart from email 1
  const subscriber = await prisma.dripSubscriber.upsert({
    where: { email },
    create: { email, fullName, phone, category, emailsSent: 0, nextEmailAt: now, subscribedAt: now },
    update: { fullName, phone, category, emailsSent: 0, nextEmailAt: now, subscribedAt: now, unsubscribed: false },
  });

  // Send email 1 immediately — don't wait for cron
  try {
    const transport = getSmtpTransport();
    await sendDripEmail(subscriber, transport);
  } catch (err) {
    console.error("[Drip enroll] Failed to send welcome email:", err);
  }

  // Add to the right Sendy prospect list with category tag
  const { listId, tags } = resolveSendyList(category);
  if (listId) {
    addSendySubscriber({
      recipient: fullName,
      email,
      name: fullName,
      title: "Blueprint opt-in",
      body: "",
      listId,
      tags,
    }).catch((err) => console.error("[Drip enroll] Sendy sync failed:", err));
  }

  return subscriber;
}
