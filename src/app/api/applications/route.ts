import { NextResponse } from "next/server";
import { sendApplicationAcknowledgement } from "@/lib/message-workflows";
import { applicationSchema } from "@/lib/validation";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { prisma } from "@/lib/prisma";
import { normalizeText } from "@/lib/spt-admin-helpers";
import { getAdminSession } from "@/lib/spt-admin-auth";

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
        phone: normalizeText(data.phoneWhatsapp),
        whatsapp: normalizeText(data.phoneWhatsapp),
        country: normalizeText(data.country),
        city: normalizeText(data.city),
        service: data.service.trim(),
        accountSize: normalizeText(data.evaluationAccountSize || data.instantFundedAccountSize || data.accountSize),
        startingCapital: normalizeText(data.investmentAmount || data.accountBalance || data.withdrawalTarget),
        propFirm: normalizeText(data.evaluationPropFirm || data.instantFundedProvider || data.propFirm),
        broker: normalizeText(data.preferredBroker || data.broker),
        tradingExperience: normalizeText(data.experienceRating || data.tradingExperience || data.riskPreference),
        phoneWhatsapp: normalizeText(data.phoneWhatsapp),
        locationAddress: normalizeText(data.locationAddress),
        tradingExperienceYesNo: normalizeText(data.tradingExperienceYesNo),
        experienceRating: normalizeText(data.experienceRating),
        automatedTradingExperience: normalizeText(data.automatedTradingExperience),
        investmentAmount: normalizeText(data.investmentAmount),
        expectedMonthlyProfitGoal: normalizeText(data.expectedMonthlyProfitGoal),
        hasExistingTradingAccount: normalizeText(data.hasExistingTradingAccount),
        riskStyle: normalizeText(data.riskStyle),
        mainGoal: normalizeText(data.mainGoal),
        riskAcknowledged: true,
        preferredBroker: normalizeText(data.preferredBroker),
        goldTradingExperience: normalizeText(data.goldTradingExperience),
        signalAccountType: normalizeText(data.signalAccountType),
        mtPlatform: normalizeText(data.mtPlatform),
        evaluationPropFirm: normalizeText(data.evaluationPropFirm),
        evaluationStage: normalizeText(data.evaluationStage),
        evaluationAccountSize: normalizeText(data.evaluationAccountSize),
        instantFundedProvider: normalizeText(data.instantFundedProvider),
        instantFundedAccountSize: normalizeText(data.instantFundedAccountSize),
        readyToPaySetupFee: normalizeText(data.readyToPaySetupFee),
        personalManagementPreference: normalizeText(data.personalManagementPreference),
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
    await syncRecordToGoogleSheets("Application", application, "CREATE");

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
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return NextResponse.json({ applications });
}
