import { NextResponse } from "next/server";
import { sendApplicationAcknowledgement } from "@/lib/message-workflows";
import { applicationSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { normalizeText } from "@/lib/spt-admin-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid application details", issues: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const application = await prisma.application.create({
      data: {
        fullName: data.fullName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: normalizeText(data.phone),
        whatsapp: normalizeText(data.whatsapp),
        country: normalizeText(data.country),
        city: normalizeText(data.city),
        service: data.service.trim(),
        accountSize: normalizeText(data.accountSize),
        startingCapital: normalizeText(data.accountBalance || data.withdrawalTarget),
        propFirm: normalizeText(data.propFirm),
        broker: normalizeText(data.broker),
        tradingExperience: normalizeText(data.tradingExperience || data.riskPreference),
        message: normalizeText(data.message),
        activityLogs: {
          create: {
            type: "APPLICATION_SUBMITTED",
            description: `New application submitted for ${data.service}.${data.campaign ? ` Campaign: ${data.campaign}.` : ""}`
          }
        }
      }
    });

    await sendApplicationAcknowledgement(application.id);

    return NextResponse.json({
      ok: true,
      message: "Application saved",
      applicationId: application.id
    });
  } catch (error) {
    console.error("Application submission failed:", error);
    return NextResponse.json(
      { error: "We could not save your application right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return NextResponse.json({ applications });
}
