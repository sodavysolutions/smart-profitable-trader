import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { leads } from "@/lib/data";

export default function CrmPage() {
  return (
    <AdminShell title="CRM and Lead Management">
      <Card>
        <SectionHeader
          title="Prospects and leads"
          text="Search, filter, assign, follow up, and convert leads into customers. Each profile is designed to hold notes, calls, WhatsApp, email, SMS, files, and activity history."
          action={<button type="button" className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Add Lead</button>}
        />
        <div className="mb-4 grid gap-3 md:grid-cols-5">
          {["Service interest", "Status", "Source", "Campaign", "Assigned staff"].map((filter) => (
            <select key={filter} aria-label={filter} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <option>{filter}</option>
            </select>
          ))}
        </div>
        <DataTable
          caption="CRM leads"
          columns={["Lead", "Email", "Phone", "Service", "Status", "Source", "Staff", "Follow-up"]}
          rows={leads.map((lead) => [
            <span key={lead.id} className="font-semibold text-navy-950">{lead.name}</span>,
            lead.email,
            lead.phone,
            lead.service,
            <StatusBadge key={lead.id} value={lead.status} />,
            lead.source,
            lead.staff,
            lead.followUp
          ])}
        />
      </Card>
      <Card className="mt-6">
        <SectionHeader title="Lead profile workspace" text="A selected lead profile includes timeline, notes, call log, WhatsApp log, email log, SMS log, follow-up reminders, file uploads, and a convert-to-customer action." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Timeline", "Communication Log", "Notes and Files"].map((title) => (
            <div key={title} className="rounded-md border border-slate-200 p-4">
              <h3 className="font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Ready for lead-specific records and activity entries.</p>
            </div>
          ))}
        </div>
      </Card>
    </AdminShell>
  );
}
