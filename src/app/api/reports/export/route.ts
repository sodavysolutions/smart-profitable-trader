import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { getAdminSession } from "@/lib/spt-admin-auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [leads, customers, expenses, profitShares, subscriptions, payments, applications] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.expense.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.profitShare.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" } }),
    prisma.subscription.findMany({ include: { customer: true, expense: true }, orderBy: { createdAt: "desc" } }),
    prisma.payment.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" } }),
    prisma.application.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  const rows = [
    ["Report", "Name", "Category", "Status", "Amount", "Date"],
    ...applications.map((application) => [
      "Application",
      application.fullName,
      application.service,
      readableEnum(application.status),
      "",
      application.createdAt.toISOString()
    ]),
    ...leads.map((lead) => [
      "Lead",
      lead.fullName,
      lead.serviceInterest,
      readableEnum(lead.status),
      "",
      lead.createdAt.toISOString()
    ]),
    ...customers.map((customer) => [
      "Customer",
      customer.fullName,
      readableEnum(customer.customerType),
      readableEnum(customer.status),
      customer.currentBalance.toString(),
      customer.createdAt.toISOString()
    ]),
    ...subscriptions.map((subscription) => [
      "Subscription",
      subscription.name,
      readableEnum(subscription.type),
      readableEnum(subscription.status),
      subscription.amount.toString(),
      subscription.renewalDate?.toISOString() ?? ""
    ]),
    ...payments.map((payment) => [
      "Payment",
      payment.customer?.fullName ?? payment.serviceType,
      payment.serviceType,
      readableEnum(payment.status),
      payment.amount.toString(),
      payment.paymentDate?.toISOString() ?? payment.createdAt.toISOString()
    ]),
    ...expenses.map((expense) => [
      "Expense",
      expense.name,
      expense.category,
      readableEnum(expense.paymentStatus),
      expense.amount.toString(),
      expense.renewalDate?.toISOString() ?? expense.createdAt.toISOString()
    ]),
    ...profitShares.map((share) => [
      "Profit Share",
      share.customer.fullName,
      "Company share",
      readableEnum(share.status),
      share.companyShare.toString(),
      share.paymentDate?.toISOString() ?? share.createdAt.toISOString()
    ])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=smart-profitable-trader-report.csv"
    }
  });
}
