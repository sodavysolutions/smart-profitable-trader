import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { sendWelcomeWorkflow } from "@/lib/message-workflows";
import { prisma } from "@/lib/prisma";
import { inferCustomerType } from "@/lib/spt-admin-helpers";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { applicationUpdateSchema } from "@/lib/validation";
import type { ApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statuses: ApplicationStatus[] = ["NEW", "REVIEWING", "APPROVED", "REJECTED", "CONVERTED"];

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
  const app = await prisma.application.findUniqueOrThrow({ where: { id } });

  await prisma.lead.upsert({
    where: { email: app.email },
    update: {
      fullName: app.fullName,
      phone: app.phone,
      whatsapp: app.whatsapp,
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
      phone: app.phone,
      whatsapp: app.whatsapp,
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
  const app = await prisma.application.findUniqueOrThrow({ where: { id } });
  const customerType = inferCustomerType(app.service);
  const initialCapital = Number(app.startingCapital ?? app.accountSize ?? 0) || 0;

  const customer = await prisma.customer.upsert({
    where: { email: app.email },
    update: {
      fullName: app.fullName,
      phone: app.phone,
      whatsapp: app.whatsapp,
      country: app.country,
      city: app.city,
      customerType,
      status: "PENDING_SETUP",
      brokerOrPropFirm: app.broker || app.propFirm,
      initialCapital,
      currentBalance: initialCapital,
      currentEquity: initialCapital,
      notes: app.message
    },
    create: {
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      whatsapp: app.whatsapp,
      country: app.country,
      city: app.city,
      customerType,
      status: "PENDING_SETUP",
      brokerOrPropFirm: app.broker || app.propFirm,
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
  const applications = await prisma.application.findMany({
    where: {
      ...(service ? { service: { contains: service, mode: "insensitive" } } : {}),
      ...(status ? { status } : {})
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <SPTAdminShell title="Applications" role={session.role}>
      <Card>
        <SectionHeader title="Application submissions" text="Submissions from /spt/apply are saved here for review, approval, rejection, and conversion." />
        <form className="mb-4 grid gap-3 md:grid-cols-3">
          <input name="service" defaultValue={service} placeholder="Filter by service" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <select name="status" defaultValue={status ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {statuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
          </select>
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Filter</button>
        </form>
        <DataTable
          columns={["Applicant", "Email", "Service", "Capital/Size", "Status", "Submitted"]}
          rows={applications.map((item) => [item.fullName, item.email, item.service, item.startingCapital ?? item.accountSize ?? "-", <StatusBadge key={item.id} value={readableEnum(item.status)} />, item.createdAt.toLocaleDateString()])}
        />
      </Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {applications.length ? (
          applications.slice(0, 10).map((item) => (
            <Card key={item.id}>
              <SectionHeader title={item.fullName} text={`${item.service} · ${item.email}`} />
              <div className="grid gap-2 text-sm text-slate-600">
                <p>Phone: {item.phone ?? "-"}</p>
                <p>WhatsApp: {item.whatsapp ?? "-"}</p>
                <p>Broker: {item.broker ?? "-"}</p>
                <p>Prop firm: {item.propFirm ?? "-"}</p>
                <p>Message: {item.message ?? "-"}</p>
              </div>
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
        ) : (
          <div className="lg:col-span-2">
            <EmptyState title="No applications yet" text="New website applications will land here automatically once visitors start submitting the live forms." />
          </div>
        )}
      </div>
    </SPTAdminShell>
  );
}
