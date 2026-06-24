import { BillingCycle, ExpensePaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { expenseSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function createExpense(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = expenseSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid expense details.");
  }

  await prisma.expense.create({
    data: {
      name: parsed.data.name,
      category: parsed.data.category,
      amount: parsed.data.amount,
      currency: parsed.data.currency.toUpperCase(),
      billingCycle: parsed.data.billingCycle,
      dueDate: normalizeDate(parsed.data.dueDate),
      renewalDate: normalizeDate(parsed.data.renewalDate),
      paymentStatus: parsed.data.paymentStatus,
      paymentMethod: normalizeText(parsed.data.paymentMethod),
      vendor: normalizeText(parsed.data.vendor),
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "EXPENSE_CREATED",
          description: `Expense created for ${parsed.data.name}.`,
          userId: session.userId
        }
      }
    }
  });

  revalidatePath("/spt/admin/expenses");
}

export default async function SPTAdminExpensesPage() {
  const session = await requireAdmin();
  const expenses = await prisma.expense.findMany({ orderBy: [{ renewalDate: "asc" }, { createdAt: "desc" }] });

  return (
    <SPTAdminShell title="Expenses" role={session.role}>
      <Card>
        <SectionHeader title="Business expenses" text="Store recurring and one-off operational costs so cash flow, renewals, and vendor payments stay visible." />
        <form action={createExpense} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Expense name
            <input name="name" required className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Category
            <input name="category" required placeholder="VPS / Copier / Internet / Software" className="rounded-md border border-slate-200 px-3 py-2" />
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
            Billing cycle
            <select name="billingCycle" defaultValue={BillingCycle.MONTHLY} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(BillingCycle).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Due date
            <input name="dueDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Renewal date
            <input name="renewalDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Payment status
            <select name="paymentStatus" defaultValue={ExpensePaymentStatus.UPCOMING} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(ExpensePaymentStatus).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Payment method
            <input name="paymentMethod" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Vendor/provider
            <input name="vendor" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Notes
            <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Expense</button>
          </div>
        </form>
      </Card>

      <Card className="mt-6">
        <SectionHeader title="Expense history" text="Use this view to monitor upcoming renewals, overdue bills, and the operating costs that affect profitability." />
        {expenses.length ? (
          <DataTable
            columns={["Expense", "Category", "Amount", "Cycle", "Status", "Due", "Renewal", "Vendor"]}
            rows={expenses.map((expense) => [
              expense.name,
              expense.category,
              money(expense.amount),
              readableEnum(expense.billingCycle),
              <StatusBadge key={expense.id} value={readableEnum(expense.paymentStatus)} />,
              expense.dueDate ? expense.dueDate.toLocaleDateString() : "Not set",
              expense.renewalDate ? expense.renewalDate.toLocaleDateString() : "Not set",
              expense.vendor ?? "-"
            ])}
          />
        ) : (
          <EmptyState title="No expenses yet" text="Record your first business expense here to start tracking recurring software, VPS, data, and operational costs." />
        )}
      </Card>
    </SPTAdminShell>
  );
}
