import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application details", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const application = await prisma.application.create({
    data: {
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      country: data.country || null,
      city: data.city || null,
      service: data.service,
      accountSize: data.accountSize || null,
      startingCapital: data.accountBalance || data.withdrawalTarget || null,
      propFirm: data.propFirm || null,
      broker: data.broker || null,
      tradingExperience: data.tradingExperience || data.riskPreference || null,
      message: data.message || null,
      activityLogs: {
        create: {
          type: "APPLICATION_SUBMITTED",
          description: `New application submitted for ${data.service}.`
        }
      }
    }
  });

  return NextResponse.json({
    ok: true,
    message: "Application saved",
    application
  });
}

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return NextResponse.json({ applications });
}
