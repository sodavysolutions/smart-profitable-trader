import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { sendWelcomeWorkflow } from "@/lib/message-workflows";
import { prisma } from "@/lib/prisma";
import { inferCustomerType } from "@/lib/spt-admin-helpers";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { applicationUpdateSchema } from "@/lib/validation";
import type { ApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statuses: ApplicationStatus[] = ["NEW", "REVIEWING", "APPROVED", "REJECTED", "CONVERTED"];

function valueOrDash(value?: string | null) {
  return value && value.trim() ? value : "-";
}

function detailRows(item: {
  phoneWhatsapp?: string | null;
  phone?: string | null;
  locationAddress?: string | null;
  tradingExperienceYesNo?: string | null;
  experienceRating?: string | null;
  automatedTradingExperience?: string | null;
  investmentAmount?: string | null;
  expectedMonthlyProfitGoal?: string | null;
  hasExistingTradingAccount?: string | null;
  riskStyle?: string | null;
  mainGoal?: string | null;
  preferredBroker?: string | null;
  broker?: string | null;
  goldTradingExperience?: string | null;
  signalAccountType?: string | null;
  mtPlatform?: string | null;
  evaluationPropFirm?: string | null;
  evaluationStage?: string | null;
  evaluationAccountSize?: string | null;
  propFirm?: string | null;
  instantFundedProvider?: string | null;
  instantFundedAccountSize?: string | null;
  readyToPaySetupFee?: string | null;
  personalManagementPreference?: string | null;
  message?: string | null;
}) {
  return [
    ["Phone / WhatsApp Number", item.phoneWhatsapp ?? item.phone],
    ["Location / Address", item.locationAddress],
    ["Trading Experience", item.tradingExperienceYesNo],
    ["Experience Rating", item.experienceRating],
    ["Automated Trading Experience", item.automatedTradingExperience],
    ["Investment Amount", item.investmentAmount],
    ["Expected Monthly Profit Goal", item.expectedMonthlyProfitGoal],
    ["Existing Trading Account", item.hasExistingTradingAccount],
    ["Risk Style", item.riskStyle],
    ["Main Goal", item.mainGoal],
    ["Preferred Broker", item.preferredBroker ?? item.broker],
    ["Gold Trading Experience", item.goldTradingExperience],
    ["Signal Account Type", item.signalAccountType],
    ["MT4 / MT5", item.mtPlatform],
    ["Evaluation Prop Firm", item.evaluationPropFirm],
    ["Evaluation Stage", item.evaluationStage],
    ["Evaluation Account Size", item.evaluationAccountSize],
    ["Instant Funded Provider", item.instantFundedProvider ?? item.propFirm],
    ["Instant Funded Account Size", item.instantFundedAccountSize],
    ["Ready To Pay Setup Fee", item.readyToPaySetupFee],
    ["Personal Management Preference", item.personalManagementPreference],
    ["Additional Message", item.message]
  ].filter(([, value]) => value && String(value).trim());
}

async function updateApplication(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = applicationUpdateSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid application update.");
  }

  await prisma.application.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      activityLogs: {
        create: {
          type: "APPLICATION_UPDATED",
          description: `Application status updated to ${parsed.data.status}.`,
          userId: session.userId
        }
      }
    }
  });
  revalidatePath("/spt/admin/applications");
}

async function convertApplicationToLead(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const app = await prisma.application.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      whatsapp: true,
      country: true,
      city: true,
      service: true,
      phoneWhatsapp: true,
      message: true
    }
  });

  await prisma.lead.upsert({
    where: { email: app.email },
    update: {
      fullName: app.fullName,
      phone: app.phoneWhatsapp ?? app.phone,
      whatsapp: app.phoneWhatsapp ?? app.whatsapp,
      country: app.country,
      city: app.city,
      serviceInterest: app.service,
      leadSource: "Website Application",
      status: "NEW",
      notes: app.message
    },
    create: {
      fullName: app.fullName,
      email: app.email,
      phone: app.phoneWhatsapp ?? app.phone,
      whatsapp: app.phoneWhatsapp ?? app.whatsapp,
      country: app.country,
      city: app.city,
      serviceInterest: app.service,
      leadSource: "Website Application",
      status: "NEW",
      notes: app.message,
      activityLogs: {
        create: {
          type: "CONVERTED_FROM_APPLICATION",
          description: `Created from application ${app.fullName}.`,
          userId: session.userId
        }
      }
    }
  });
  await prisma.application.update({
    where: { id },
    data: {
      status: "CONVERTED",
      activityLogs: {
        create: {
          type: "APPLICATION_CONVERTED",
          description: `Application converted into a lead.`,
          userId: session.userId
        }
      }
    }
  });
  revalidatePath("/spt/admin/applications");
  revalidatePath("/spt/admin/leads");
}

async function convertApplicationToCustomer(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const app = await prisma.application.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      whatsapp: true,
      country: true,
      city: true,
      service: true,
      accountSize: true,
      startingCapital: true,
      propFirm: true,
      broker: true,
      phoneWhatsapp: true,
      message: true,
      preferredBroker: true,
      evaluationPropFirm: true,
      instantFundedProvider: true
    }
  });
  const customerType = inferCustomerType(app.service);
  const initialCapital = Number(app.startingCapital ?? app.accountSize ?? 0) || 0;

  const customer = await prisma.customer.upsert({
    where: { email: app.email },
    update: {
      fullName: app.fullName,
      phone: app.phoneWhatsapp ?? app.phone,
      whatsapp: app.phoneWhatsapp ?? app.whatsapp,
      country: app.country,
      city: app.city,
      customerType,
      status: "PENDING_SETUP",
      brokerOrPropFirm: app.preferredBroker || app.broker || app.evaluationPropFirm || app.instantFundedProvider || app.propFirm,
      initialCapital,
      currentBalance: initialCapital,
      currentEquity: initialCapital,
      notes: app.message
    },
    create: {
      fullName: app.fullName,
      email: app.email,
      phone: app.phoneWhatsapp ?? app.phone,
      whatsapp: app.phoneWhatsapp ?? app.whatsapp,
      country: app.country,
      city: app.city,
      customerType,
      status: "PENDING_SETUP",
      brokerOrPropFirm: app.preferredBroker || app.broker || app.evaluationPropFirm || app.instantFundedProvider || app.propFirm,
      initialCapital,
      currentBalance: initialCapital,
      currentEquity: initialCapital,
      notes: app.message,
      activityLogs: {
        create: {
          type: "CONVERTED_FROM_APPLICATION",
          description: `Created customer from application ${app.fullName}.`,
          userId: session.userId
        }
      }
    }
  });

  await prisma.accountProgress.upsert({
    where: { id: `progress-${customer.id}` },
    update: {
      serviceType: customerType,
      accountSize: initialCapital,
      currentBalance: initialCapital,
      currentEquity: initialCapital,
      currentProfit: 0,
      growthPercentage: 0,
      status: "Pending Setup",
      phase: customerType === "EVALUATION" ? "Phase 1" : customerType === "INSTANT_FUNDED" ? "Funded" : null
    },
    create: {
      id: `progress-${customer.id}`,
      customerId: customer.id,
      serviceType: customerType,
      accountSize: initialCapital,
      currentBalance: initialCapital,
      currentEquity: initialCapital,
      profitTarget: customerType === "EVALUATION" ? initialCapital * 0.1 : initialCapital * 0.05,
      currentProfit: 0,
      growthPercentage: 0,
      drawdownLimit: initialCapital * 0.1,
      currentDrawdown: 0,
      dailyDrawdown: 0,
      maxDrawdown: 0,
      daysTraded: 0,
      minimumTradeDays: customerType === "EVALUATION" ? 5 : 0,
      status: "Pending Setup",
      notes: app.message
    }
  });

  await prisma.application.update({
    where: { id },
    data: {
      status: "CONVERTED",
      activityLogs: {
        create: {
          type: "APPLICATION_CONVERTED",
          description: `Application converted into a customer.`,
          userId: session.userId
        }
      }
    }
  });

  await sendWelcomeWorkflow(customer.id);

  revalidatePath("/spt/admin/applications");
  revalidatePath("/spt/admin/customers");
  revalidatePath("/spt/admin/account-progress");
}

export default async function SPTAdminApplicationsPage({ searchParams }: { searchParams: Promise<{ service?: string; status?: ApplicationStatus }> }) {
  const session = await requireAdmin();
  const { service, status } = await searchParams;
  let applications: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    phoneWhatsapp: string | null;
    service: string;
    investmentAmount: string | null;
    startingCapital: string | null;
    accountSize: string | null;
    riskStyle: string | null;
    status: ApplicationStatus;
    createdAt: Date;
    message: string | null;
  }> = [];
  let schemaNotice: string | null = null;

  try {
    applications = await prisma.application.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        phoneWhatsapp: true,
        service: true,
        investmentAmount: true,
        startingCapital: true,
        accountSize: true,
        riskStyle: true,
        status: true,
        createdAt: true,
        message: true
      },
      where: {
        ...(service ? { service: { contains: service, mode: "insensitive" } } : {}),
        ...(status ? { status } : {})
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Applications");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Applications" role={session.role}>
      <Card>
        <SectionHeader title="Application queue" text="Submissions from /spt/apply are stored here for review, approval, rejection, and conversion." />
        {schemaNotice && (
          <div className="mb-5">
            <InlineNotice title="Applications are still being prepared" text={schemaNotice} />
          </div>
        )}
        <form className="mb-4 grid gap-3 md:grid-cols-3">
          <input name="service" defaultValue={service} placeholder="Filter by service" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <select name="status" defaultValue={status ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {statuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
          </select>
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Filter</button>
        </form>
        {!schemaNotice ? (
          <DataTable
            columns={["Full Name", "Phone / WhatsApp", "Service Interested In", "Investment Amount", "Risk Style", "Status", "Created Date"]}
            rows={applications.map((item) => [
              item.fullName,
              valueOrDash(item.phoneWhatsapp ?? item.phone),
              item.service,
              valueOrDash(item.investmentAmount ?? item.startingCapital ?? item.accountSize),
              valueOrDash(item.riskStyle),
              <StatusBadge key={item.id} value={readableEnum(item.status)} />,
              item.createdAt.toLocaleDateString()
            ])}
            caption="Applications submitted from Smart Profits Trader"
          />
        ) : (
          <EmptyState title="Applications are still being prepared" text="This queue will turn back on as soon as the live application schema finishes syncing." />
        )}
      </Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {!schemaNotice && applications.length ? (
          applications.slice(0, 10).map((item) => (
            <Card key={item.id}>
              <SectionHeader title={item.fullName} text={`${item.service} · ${item.email}`} />
              <dl className="grid gap-2 text-sm text-slate-600">
                {detailRows(item).map(([label, value]) => (
                  <div key={label} className="grid gap-1 rounded-md bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                    <dd className="leading-6 text-slate-700">{valueOrDash(String(value))}</dd>
                  </div>
                ))}
              </dl>
              <form action={updateApplication} className="mt-4 flex flex-wrap gap-2">
                <input type="hidden" name="id" value={item.id} />
                <select name="status" defaultValue={item.status} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  {statuses.map((statusItem) => <option key={statusItem} value={statusItem}>{readableEnum(statusItem)}</option>)}
                </select>
                <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Update</button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={convertApplicationToLead}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy-950">Convert to Lead</button>
                </form>
                <form action={convertApplicationToCustomer}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Convert to Customer</button>
                </form>
              </div>
            </Card>
          ))
        ) : schemaNotice ? (
          <div className="lg:col-span-2">
            <EmptyState title="Applications are still being prepared" text="Detailed review cards will appear here as soon as the live application fields are fully available." />
          </div>
        ) : (
          <div className="lg:col-span-2">
            <EmptyState title="No applications yet" text="New website applications will appear here automatically once visitors start submitting the live forms." />
          </div>
        )}
      </div>
    </SPTAdminShell>
  );
}
