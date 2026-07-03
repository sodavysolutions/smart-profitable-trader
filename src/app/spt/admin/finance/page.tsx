import Link from "next/link";
import { CreditCard, Receipt, BadgeDollarSign, TrendingUp } from "lucide-react";
import { SPTAdminShell, AdminCard, AdminCardHeader, AdminCardBody } from "@/components/spt/admin-shell";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SPTAdminFinancePage() {
  const session = await requireAdmin();

  const [paymentCount, pendingPayments, expenseCount, profitShareCount, overdueExpenses] =
    await Promise.all([
      prisma.payment.count(),
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.expense.count(),
      prisma.profitShare.count(),
      prisma.expense.count({ where: { paymentStatus: "OVERDUE" } }),
    ]);

  const sections = [
    {
      href: "/spt/admin/payments",
      label: "Payments",
      description: "Track client payments, invoices, and outstanding balances.",
      icon: CreditCard,
      stats: [
        { label: "Total payments", value: paymentCount },
        { label: "Pending", value: pendingPayments, alert: pendingPayments > 0 },
      ],
      color: "bg-blue-50 text-blue-700",
    },
    {
      href: "/spt/admin/profit-share",
      label: "Profit Share",
      description: "Manage profit distribution records for copy trading and funded accounts.",
      icon: BadgeDollarSign,
      stats: [
        { label: "Records", value: profitShareCount },
      ],
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      href: "/spt/admin/expenses",
      label: "Business Expenses",
      description: "Track tools, subscriptions, and operational costs.",
      icon: Receipt,
      stats: [
        { label: "Total expenses", value: expenseCount },
        { label: "Overdue", value: overdueExpenses, alert: overdueExpenses > 0 },
      ],
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <SPTAdminShell title="Finance" role={session.role}>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Payments", value: paymentCount, icon: CreditCard },
          { label: "Profit Share Records", value: profitShareCount, icon: TrendingUp },
          { label: "Business Expenses", value: expenseCount, icon: Receipt },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-navy-950">{value}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950">
                <Icon size={18} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <AdminCard key={section.href}>
              <AdminCardHeader
                title={section.label}
                action={
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${section.color}`}>
                    <Icon size={15} />
                  </span>
                }
              />
              <AdminCardBody>
                <p className="text-sm text-slate-500">{section.description}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {section.stats.map((stat) => (
                    <div key={stat.label} className={`rounded-xl px-3 py-2 ${stat.alert ? "bg-red-50 text-red-700" : "bg-slate-50 text-slate-700"}`}>
                      <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={section.href}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-950 py-2.5 text-sm font-bold text-white hover:bg-navy-900"
                >
                  Open {section.label}
                </Link>
              </AdminCardBody>
            </AdminCard>
          );
        })}
      </div>
    </SPTAdminShell>
  );
}
