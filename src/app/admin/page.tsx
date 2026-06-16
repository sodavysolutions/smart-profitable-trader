import { AdminShell } from "@/components/AdminShell";
import { ExpenseBarChart, RevenueAreaChart } from "@/components/Charts";
import { Card, DataTable, ProgressBar, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, customers, dashboardMetrics, growth, leads, reminders } from "@/lib/data";

export default function AdminDashboard() {
  return (
    <AdminShell title="Business Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-navy-950">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold text-profit-600">{metric.change}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-md bg-slate-100 text-navy-950">
                  <Icon size={21} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Monthly revenue" text="Revenue trend across subscriptions, setup fees, management fees, and profit share." />
          <RevenueAreaChart />
        </Card>
        <Card>
          <SectionHeader title="Expenses and customer growth" text="Operating expense trend compared with active customer growth." />
          <ExpenseBarChart />
        </Card>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionHeader title="Recent lead activity" />
          <DataTable
            caption="Recent lead activity"
            columns={["Lead", "Service", "Status", "Priority", "Next follow-up"]}
            rows={leads.slice(0, 6).map((lead) => [lead.name, lead.service, <StatusBadge key={lead.id} value={lead.status} />, lead.priority, lead.followUp])}
          />
        </Card>
        <Card>
          <SectionHeader title="Accounts close to target" />
          <div className="space-y-4">
            {customers.slice(1, 6).map((customer) => {
              const pct = growth(customer.initialCapital, customer.currentBalance);
              return (
                <div key={customer.id} className="rounded-md border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy-950">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.type}</p>
                    </div>
                    <StatusBadge value={customer.status} />
                  </div>
                  <ProgressBar label={`${customer.name} target progress`} value={Math.max(8, Math.min(100, pct * 10))} danger={customer.status.includes("Drawdown")} />
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>{currency(customer.initialCapital)}</span>
                    <span>{currency(customer.currentBalance)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <SectionHeader title="Upcoming renewals and follow-ups" />
        <DataTable caption="Upcoming renewals and follow-ups" columns={["Name", "Type", "Related", "Amount", "Renewal", "Rule"]} rows={reminders.map((item) => [item.name, item.type, item.related, currency(Number(item.amount)), item.renewal, item.rule])} />
      </Card>
    </AdminShell>
  );
}
