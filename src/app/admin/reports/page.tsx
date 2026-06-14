import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { ExpenseBarChart, RevenueAreaChart } from "@/components/Charts";
import { Card, SectionHeader } from "@/components/UI";

export default function ReportsPage() {
  const reports = ["Monthly revenue", "Monthly expenses", "Profit/loss", "Active customers", "Expired subscriptions", "Leads by campaign", "Conversion rate", "Profit-share summary", "Evaluation account progress", "Funded account withdrawals", "Business subscription renewals"];
  return (
    <AdminShell title="Reports">
      <Card>
        <SectionHeader title="Report filters" text="Filter by date range, service type, customer, staff, and status. Export the current report to CSV." action={<Link href="/api/reports/export" className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Export CSV</Link>} />
        <div className="grid gap-3 md:grid-cols-5">
          {["Date range", "Service type", "Customer", "Staff", "Status"].map((filter) => (
            <select key={filter} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <option>{filter}</option>
            </select>
          ))}
        </div>
      </Card>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card><SectionHeader title="Revenue report" /><RevenueAreaChart /></Card>
        <Card><SectionHeader title="Expense and growth report" /><ExpenseBarChart /></Card>
      </div>
      <Card className="mt-6">
        <SectionHeader title="Available reports" />
        <div className="grid gap-3 md:grid-cols-3">
          {reports.map((report) => <div key={report} className="rounded-md border border-slate-200 p-4 text-sm font-semibold text-navy-950">{report}</div>)}
        </div>
      </Card>
    </AdminShell>
  );
}
