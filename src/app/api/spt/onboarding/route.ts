import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildEmailHtml } from "@/lib/email-templates";
import {
  sendSendyTransactionalEmail,
  sendWhatsAppMessage,
} from "@/lib/integrations";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import type { CustomerType } from "@prisma/client";

const SERVICE_LABELS: Record<string, string> = {
  COPY_TRADING: "Copy Trading",
  VIP_SIGNALS: "VIP Signals",
  INSTANT_FUNDED: "Instant Funded Accounts",
  EVALUATION: "Evaluation Account",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, whatsapp, country, dateOfBirth, services } = body as {
      fullName: string;
      email: string;
      phone: string;
      whatsapp?: string;
      country: string;
      dateOfBirth: string;
      services: string[];
    };

    // --- Validation ---
    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !country?.trim() || !dateOfBirth || !services?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const primaryService = services[0] as CustomerType;

    // --- Save or update Customer ---
    const customer = await prisma.customer.upsert({
      where: { email: email.trim().toLowerCase() },
      create: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        whatsapp: (whatsapp?.trim() || phone.trim()),
        country: country.trim(),
        dateOfBirth: new Date(dateOfBirth),
        customerType: primaryService,
        status: "PENDING_SETUP",
      },
      update: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        whatsapp: (whatsapp?.trim() || phone.trim()),
        country: country.trim(),
        dateOfBirth: new Date(dateOfBirth),
        customerType: primaryService,
      },
    });

    // --- Create Subscription records (one per selected service, skip duplicates) ---
    const existingSubs = await prisma.subscription.findMany({
      where: { customerId: customer.id },
      select: { name: true },
    });
    const existingNames = new Set(existingSubs.map((s) => s.name));

    const subsToCreate = services
      .filter((svc) => !existingNames.has(SERVICE_LABELS[svc] ?? svc))
      .map((svc) => ({
        name: SERVICE_LABELS[svc] ?? svc,
        type: "CUSTOMER_SUBSCRIPTION" as const,
        customerId: customer.id,
        status: "ACTIVE" as const,
      }));

    if (subsToCreate.length > 0) {
      await prisma.subscription.createMany({ data: subsToCreate });
    }

    // Fetch full customer for Sheets sync
    const fullCustomer = await prisma.customer.findUnique({
      where: { id: customer.id },
      include: { subscriptions: true },
    });

    // --- Sync to Google Sheets (non-blocking) ---
    syncRecordToGoogleSheets(
      "Customer",
      fullCustomer as Record<string, unknown>,
      "UPSERT",
      { force: true }
    ).catch((err) => console.error("[Onboarding] Sheets sync error:", err));

    // --- Welcome email ---
    const serviceList = services
      .map((s) => `<li style="margin:4px 0;">${SERVICE_LABELS[s] ?? s}</li>`)
      .join("");

    const emailHtml = buildEmailHtml({
      badge: "Welcome Aboard",
      preheader: `Welcome to Smart Profits Trader, ${fullName.trim().split(" ")[0]}!`,
      title: `Welcome, ${fullName.trim().split(" ")[0]}! 🎉`,
      subtitle: "You're now officially in the Smart Profits Trader family.",
      bodyHtml: `
        <p style="margin:0 0 16px;">Hi <strong>${fullName.trim()}</strong>,</p>
        <p style="margin:0 0 16px;">
          Thank you for joining Smart Profits Trader. Your account has been set up and our team will reach out to you shortly to get you fully onboarded.
        </p>
        <p style="margin:0 0 8px;font-weight:600;">You're subscribed to:</p>
        <ul style="margin:0 0 16px;padding-left:20px;">
          ${serviceList}
        </ul>
        <p style="margin:0 0 16px;">
          In the meantime, feel free to reach out to us on WhatsApp or Telegram — our AI support agent is available 24/7 for any questions.
        </p>
        <p style="margin:0;">
          WhatsApp: <a href="https://wa.me/2349164753603" style="color:#16A34A;">+234 916 475 3603</a><br/>
          Telegram: <a href="https://t.me/SmartProfitsTraderBot" style="color:#16A34A;">@SmartProfitsTraderBot</a>
        </p>
      `,
      cta: {
        label: "Visit smartprofitstrader.com",
        href: "https://www.smartprofitstrader.com",
      },
    });

    sendSendyTransactionalEmail({
      recipient: fullName.trim(),
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      title: `Welcome to Smart Profits Trader, ${fullName.trim().split(" ")[0]}!`,
      body: emailHtml,
    }).catch((err) => console.error("[Onboarding] Email error:", err));

    // --- WhatsApp welcome message ---
    const waPhone = whatsapp?.trim() || phone.trim();
    const serviceNames = services.map((s) => SERVICE_LABELS[s] ?? s).join(", ");

    sendWhatsAppMessage({
      recipient: waPhone,
      title: `Welcome to Smart Profits Trader! 🎉`,
      body: `Hi ${fullName.trim().split(" ")[0]}, you're now set up on our system.\n\n*Services:* ${serviceNames}\n\nOur team will be in touch shortly. For instant support, just reply to this message or chat with our AI agent anytime.\n\nWelcome aboard! 🚀`,
    }).catch((err) => console.error("[Onboarding] WhatsApp error:", err));

    return NextResponse.json({ ok: true, customerId: customer.id });
  } catch (error) {
    console.error("[Onboarding API] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    // Handle unique constraint (email duplicate that upsert misses)
    if (message.includes("Unique constraint")) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
