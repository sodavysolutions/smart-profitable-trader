import { revalidatePath } from "next/cache";
import { Card, DataTable, SectionHeader } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

const settingKeys = [
  "whatsapp_number",
  "sendy_api_url",
  "sendy_api_key",
  "sms_provider",
  "default_admin_email",
  "company_name",
  "logo_url"
];

async function saveSettings(formData: FormData) {
  "use server";
  await requireAdmin();
  for (const key of settingKeys) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(formData.get(key) ?? "") },
      create: { key, value: String(formData.get(key) ?? "") }
    });
  }
  revalidatePath("/spt/admin/settings");
}

export default async function SPTAdminSettingsPage() {
  const session = await requireAdmin();
  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const values = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));

  return (
    <SPTAdminShell title="Settings" role={session.role}>
      <Card>
        <SectionHeader title="Company and integration settings" text="Placeholders for WhatsApp, Sendy, SMS, company identity, and default admin routing. Keep real API secrets in Vercel environment variables where possible." />
        <form action={saveSettings} className="grid gap-4 md:grid-cols-2">
          {settingKeys.map((key) => (
            <label key={key} className="grid gap-1 text-sm font-medium text-slate-700">
              {key.replaceAll("_", " ")}
              <input name={key} defaultValue={values[key] ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
            </label>
          ))}
          <div className="md:col-span-2">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Settings</button>
          </div>
        </form>
      </Card>
      <Card className="mt-6">
        <SectionHeader title="Current settings" />
        <DataTable columns={["Key", "Value"]} rows={settings.map((setting) => [setting.key, setting.key.includes("key") ? "Stored value hidden in UI" : setting.value])} />
      </Card>
    </SPTAdminShell>
  );
}
