import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

type MessagePayload = {
  recipient: string;
  title: string;
  body: string;
  tags?: string[];
};

type IntegrationResult = {
  ok: boolean;
  provider: "sendy" | "whatsapp" | "sms";
  configured: boolean;
  action: string;
  status: number;
  response: string;
};

type SendySubscriberPayload = MessagePayload & {
  email: string;
  name?: string;
  listId?: string;
};

async function readSettings(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });

  return Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
}

function chooseValue(...values: Array<string | undefined | null>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function normalizeUrl(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d+]/g, "");
}

async function getIntegrationConfig() {
  const settings = await readSettings([
    "sendy_api_url",
    "sendy_api_key",
    "sendy_list_id",
    "sendy_transactional_endpoint",
    "whatsapp_api_token",
    "whatsapp_phone_number_id",
    "sms_provider",
    "sms_api_url",
    "sms_api_key",
    "sms_sender_id"
  ]);

  return {
    sendyBaseUrl: normalizeUrl(chooseValue(process.env.SENDY_BASE_URL, settings.sendy_api_url)),
    sendyApiKey: chooseValue(process.env.SENDY_API_KEY, settings.sendy_api_key),
    sendyListId: chooseValue(process.env.SENDY_LIST_ID, settings.sendy_list_id),
    sendyTransactionalEndpoint: normalizeUrl(
      chooseValue(process.env.SENDY_TRANSACTIONAL_ENDPOINT, settings.sendy_transactional_endpoint)
    ),
    whatsappToken: chooseValue(process.env.WHATSAPP_API_TOKEN, settings.whatsapp_api_token),
    whatsappPhoneNumberId: chooseValue(process.env.WHATSAPP_PHONE_NUMBER_ID, settings.whatsapp_phone_number_id),
    smsApiKey: chooseValue(process.env.SMS_API_KEY, settings.sms_api_key),
    smsApiUrl: normalizeUrl(chooseValue(process.env.SMS_API_URL, settings.sms_api_url)),
    smsSenderId: chooseValue(process.env.SMS_SENDER_ID, settings.sms_sender_id),
    smsProvider: chooseValue(process.env.SMS_PROVIDER, settings.sms_provider)
  };
}

export async function addSendySubscriber(payload: SendySubscriberPayload): Promise<IntegrationResult> {
  const config = await getIntegrationConfig();
  const configured = Boolean(config.sendyBaseUrl && config.sendyApiKey && (payload.listId || config.sendyListId));

  if (!configured) {
    return {
      ok: false,
      provider: "sendy",
      configured: false,
      action: "add_subscriber",
      status: 0,
      response: "Sendy is not fully configured. Add SENDY_BASE_URL, SENDY_API_KEY, and SENDY_LIST_ID."
    };
  }

  const response = await fetch(`${config.sendyBaseUrl}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      api_key: config.sendyApiKey ?? "",
      list: payload.listId ?? config.sendyListId ?? "",
      email: payload.email.trim().toLowerCase(),
      name: payload.name?.trim() || payload.recipient.trim(),
      boolean: "true",
      tags: payload.tags?.join(",") ?? ""
    }).toString(),
    cache: "no-store"
  });

  const text = (await response.text()).trim();
  const normalized = text.toLowerCase();
  const ok =
    response.ok &&
    (normalized === "1" ||
      normalized.includes("already subscribed") ||
      normalized.includes("already an active subscriber"));

  return {
    ok,
    provider: "sendy",
    configured: true,
    action: "add_subscriber",
    status: response.status,
    response: text
  };
}

export async function sendSendyTransactionalEmail(
  payload: MessagePayload & {
    email: string;
    name?: string;
  }
): Promise<IntegrationResult> {
  const smtpHost = process.env.SES_SMTP_HOST;
  const smtpUser = process.env.SES_SMTP_USER;
  const smtpPass = process.env.SES_SMTP_PASS;
  const smtpPort = parseInt(process.env.SES_SMTP_PORT ?? "587", 10);
  const fromEmail = process.env.SENDY_FROM_EMAIL ?? process.env.ADMIN_EMAIL ?? "";
  const fromName = process.env.SENDY_FROM_NAME ?? "Smart Profits Trader";

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
    return {
      ok: false,
      provider: "sendy",
      configured: false,
      action: "transactional_email",
      status: 0,
      response: "SES SMTP credentials are not configured (SES_SMTP_HOST, SES_SMTP_USER, SES_SMTP_PASS)."
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: `"${payload.name ?? payload.recipient}" <${payload.email.trim().toLowerCase()}>`,
      replyTo: fromEmail,
      subject: payload.title,
      html: payload.body,
      text: payload.body.replace(/<[^>]+>/g, " ")
    });

    return {
      ok: true,
      provider: "sendy",
      configured: true,
      action: "transactional_email",
      status: 200,
      response: "Email sent via SES SMTP."
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SMTP error.";
    return {
      ok: false,
      provider: "sendy",
      configured: true,
      action: "transactional_email",
      status: 500,
      response: message
    };
  }
}

export async function sendWhatsAppMessage(payload: MessagePayload): Promise<IntegrationResult> {
  const config = await getIntegrationConfig();

  if (!config.whatsappToken || !config.whatsappPhoneNumberId) {
    return {
      ok: false,
      provider: "whatsapp",
      configured: false,
      action: "send_text_message",
      status: 0,
      response: "WhatsApp Cloud API is not configured. Add WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID."
    };
  }

  const response = await fetch(`https://graph.facebook.com/v21.0/${config.whatsappPhoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.whatsappToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: normalizePhoneNumber(payload.recipient),
      type: "text",
      text: {
        preview_url: false,
        body: `${payload.title}\n\n${payload.body}`.trim()
      }
    }),
    cache: "no-store"
  });

  const text = await response.text();

  return {
    ok: response.ok,
    provider: "whatsapp",
    configured: true,
    action: "send_text_message",
    status: response.status,
    response: text || response.statusText
  };
}

export async function sendSmsMessage(payload: MessagePayload): Promise<IntegrationResult> {
  const config = await getIntegrationConfig();

  if (!config.smsApiKey || !config.smsApiUrl || !config.smsSenderId) {
    return {
      ok: false,
      provider: "sms",
      configured: false,
      action: "send_sms",
      status: 0,
      response: "SMS provider is not fully configured. Add SMS_API_URL, SMS_API_KEY, and SMS_SENDER_ID."
    };
  }

  const response = await fetch(config.smsApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.smsApiKey}`,
      "Content-Type": "application/json",
      "X-SMS-Provider": config.smsProvider ?? "custom"
    },
    body: JSON.stringify({
      to: normalizePhoneNumber(payload.recipient),
      from: config.smsSenderId,
      subject: payload.title,
      message: payload.body
    }),
    cache: "no-store"
  });

  const text = await response.text();

  return {
    ok: response.ok,
    provider: "sms",
    configured: true,
    action: "send_sms",
    status: response.status,
    response: text || response.statusText
  };
}

export async function getMessagingProviderSnapshot() {
  const config = await getIntegrationConfig();
  return {
    sendyConfigured: Boolean(config.sendyBaseUrl && config.sendyApiKey && config.sendyListId),
    sendyTransactionalConfigured: Boolean(config.sendyTransactionalEndpoint && config.sendyApiKey),
    whatsappConfigured: Boolean(config.whatsappToken && config.whatsappPhoneNumberId),
    smsConfigured: Boolean(config.smsApiKey && config.smsApiUrl && config.smsSenderId)
  };
}
