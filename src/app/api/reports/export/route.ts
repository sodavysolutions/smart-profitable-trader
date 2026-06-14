import { NextResponse } from "next/server";
import { customers, expenses, leads, profitShares } from "@/lib/data";

export async function GET() {
  const rows = [
    ["Report", "Name", "Category", "Status", "Amount"],
    ...leads.map((lead) => ["Lead", lead.name, lead.service, lead.status, ""]),
    ...customers.map((customer) => ["Customer", customer.name, customer.type, customer.status, customer.currentBalance]),
    ...expenses.map((expense) => ["Expense", String(expense.name), String(expense.category), String(expense.status), String(expense.amount)]),
    ...profitShares.map((share) => ["Profit Share", share.customer, share.tier, share.status, share.companyShare])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=smart-profitable-trader-report.csv"
    }
  });
}
