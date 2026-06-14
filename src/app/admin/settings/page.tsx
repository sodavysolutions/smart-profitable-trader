import { AdminShell } from "@/components/AdminShell";
import { Card, SectionHeader } from "@/components/UI";

export default function SettingsPage() {
  const sections = [
    ["Company Settings", "Company name, logo upload, brand colors, contact email, WhatsApp number, address, and social links."],
    ["API Settings", "Sendy, WhatsApp, and SMS keys are stored only as environment variables or encrypted server-side settings."],
    ["Profit Share Settings", "Default setup-fee tier 65/35, no-setup-fee tier 50/50, and custom overrides."],
    ["Reminder Settings", "Enable reminders, timing, channels, admin WhatsApp, and admin email."],
    ["User Management", "Add users, assign roles, disable users, and reset passwords."]
  ];
  return (
    <AdminShell title="Admin Settings">
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map(([title, text]) => (
          <Card key={title}>
            <SectionHeader title={title} text={text} />
            <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Configure</button>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
