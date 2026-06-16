import { revalidatePath } from "next/cache";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import type { ApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statuses: ApplicationStatus[] = ["NEW", "REVIEWING", "APPROVED", "REJECTED", "CONVERTED"];

async function updateApplication(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ApplicationStatus;

  await prisma.application.update({
    where: { id },
    data: {
      status,
      activityLogs: {
        create: {
          type: "APPLICATION_UPDATED",
          description: `Application status updated to ${status}.`,
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

  await prisma.lead.create({
    data: {
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
  await prisma.application.update({ where: { id }, data: { status: "CONVERTED" } });
  revalidatePath("/spt/admin/applications");
  revalidatePath("/spt/admin/leads");
}

async function convertApplicationToCustomer(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const app = await prisma.application.findUniqueOrThrow({ where: { id } });
  const service = app.service.toLowerCase();
  const customerType = service.includes("vip")
    ? "VIP_SIGNALS"
    : service.includes("copy")
      ? "COPY_TRADING"
      : service.includes("funded")
        ? "INSTANT_FUNDED"
        : service.includes("evaluation")
          ? "EVALUATION"
          : "PERSONAL_ACCOUNT";

  await prisma.customer.create({
    data: {
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      whatsapp: app.whatsapp,
      country: app.country,
      city: app.city,
      customerType,
      status: "PENDING_SETUP",
      brokerOrPropFirm: app.broker || app.propFirm,
      initialCapital: Number(app.startingCapital ?? app.accountSize ?? 0) || 0,
      currentBalance: Number(app.startingCapital ?? app.accountSize ?? 0) || 0,
      currentEquity: Number(app.startingCapital ?? app.accountSize ?? 0) || 0,
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
  await prisma.application.update({ where: { id }, data: { status: "CONVERTED" } });
  revalidatePath("/spt/admin/applications");
  revalidatePath("/spt/admin/customers");
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
        {applications.slice(0, 10).map((item) => (
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
        ))}
      </div>
    </SPTAdminShell>
  );
}
