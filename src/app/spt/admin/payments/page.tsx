import { PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { sendPaymentAcknowledgement } from "@/lib/message-workflows";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { paymentSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function createPayment(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = paymentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid payment details.");
  }

  const payment = await prisma.payment.create({
    data: {
      customerId: normalizeText(parsed.data.customerId) ?? undefined,
      serviceType: parsed.data.serviceType,
      amount: parsed.data.amount,
      currency: parsed.data.currency.toUpperCase(),
      paymentDate: normalizeDate(parsed.data.paymentDate),
      paymentMethod: normalizeText(parsed.data.paymentMethod),
      status: parsed.data.status,
      invoiceReference: normalizeText(parsed.data.invoiceReference),
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "PAYMENT_RECORDED",
          description: `Payment recorded for ${parsed.data.serviceType}.`,
          userId: session.userId
        }
      }
    }
  });

  if (payment.customerId && payment.status === PaymentStatus.PAID) {
    await sendPaymentAcknowledgement(payment.id);
  }

  revalidatePath("/spt/admin/payments");
}

export default async function SPTAdminPaymentsPage() {
  const session = await requireAdmin();
  const [payments, customers] = await Promise.all([
    prisma.payment.findMany({
      include: { customer: true },
      orderBy: [{ paymentDate: "desc" }, { createdAt: "desc" }]
    }),
    prisma.customer.findMany({ orderBy: { fullName: "asc" } })
  ]);

  return (
    <SPTAdminShell title="Payments" role={session.role}>
      <Card>
        <SectionHeader title="Revenue records" text="Record setup fees, subscriptions, management fees, funded payouts, and any manual adjustments in one place." />
        <form action={createPayment} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Customer
            <select name="customerId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Service type
            <input name="serviceType" required placeholder="Copy Trading / VIP Signals / Setup Fee" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Amount
            <input name="amount" type="number" step="0.01" min="0" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Currency
            <input name="currency" defaultValue="USD" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Payment date
            <input name="paymentDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Payment method
            <input name="paymentMethod" placeholder="Bank Transfer / Card / Crypto" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <select name="status" defaultValue={PaymentStatus.PAID} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(PaymentStatus).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Invoice/reference
            <input name="invoiceReference" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Notes
            <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Payment</button>
          </div>
        </form>
      </Card>

      <Card className="mt-6">
        <SectionHeader title="Payment history" text="This table becomes your first source of truth for customer charges, payment acknowledgements, and revenue checks." />
        {payments.length ? (
          <DataTable
            columns={["Customer", "Service", "Amount", "Method", "Status", "Reference", "Date"]}
            rows={payments.map((payment) => [
              payment.customer?.fullName ?? "Unlinked",
              payment.serviceType,
              money(payment.amount),
              payment.paymentMethod ?? "-",
              <StatusBadge key={payment.id} value={readableEnum(payment.status)} />,
              payment.invoiceReference ?? "-",
              payment.paymentDate ? payment.paymentDate.toLocaleDateString() : "Not set"
            ])}
          />
        ) : (
          <EmptyState title="No payments yet" text="Once you begin recording subscription fees, setup fees, and client payments, they will appear here." />
        )}
      </Card>
    </SPTAdminShell>
  );
}
