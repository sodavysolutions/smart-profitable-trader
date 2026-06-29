import { revalidatePath } from "next/cache";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { activateVipSubscription } from "@/lib/vip-engine";
import type { VipSubStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statusColors: Record<VipSubStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PENDING_CRYPTO: "bg-orange-100 text-orange-800",
  ACTIVE: "bg-green-100 text-green-800",
  EXPIRED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function VipSubscriptionsPage() {
  await requireAdmin();

  const subs = await prisma.vipSubscription.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const pendingCrypto = subs.filter((s) => s.status === "PENDING_CRYPTO");
  const active = subs.filter((s) => s.status === "ACTIVE");
  const others = subs.filter((s) => !["PENDING_CRYPTO", "ACTIVE"].includes(s.status));

  async function approveCrypto(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await activateVipSubscription(id);
    revalidatePath("/spt/admin/vip-subscriptions");
  }

  async function cancelSub(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.vipSubscription.update({ where: { id }, data: { status: "CANCELLED" } });
    revalidatePath("/spt/admin/vip-subscriptions");
  }

  async function addManual(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const telegramUserId = (formData.get("telegramUserId") as string) || null;
    const startDateStr = formData.get("startDate") as string;
    const days = parseInt((formData.get("days") as string) || "30", 10);

    const startDate = startDateStr ? new Date(startDateStr) : new Date();
    const endDate = new Date(startDate.getTime() + days * 24 * 3600 * 1000);

    await prisma.vipSubscription.create({
      data: {
        name,
        email,
        phone,
        telegramUserId: telegramUserId || null,
        paymentMethod: "PAYSTACK",
        status: "ACTIVE",
        startDate,
        endDate,
        amountUSD: 50,
      },
    });
    revalidatePath("/spt/admin/vip-subscriptions");
  }

  function formatDate(d: Date | null) {
    if (!d) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  function daysLeft(endDate: Date | null) {
    if (!endDate) return null;
    return Math.ceil((endDate.getTime() - Date.now()) / (24 * 3600 * 1000));
  }

  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <SPTAdminShell title="VIP Subscriptions" role="SUPER_ADMIN">
      <div className="space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Active", value: active.length, color: "text-green-600" },
            { label: "Pending Crypto", value: pendingCrypto.length, color: "text-orange-500" },
            { label: "Total All Time", value: subs.length, color: "text-navy-950" },
            { label: "Expired", value: subs.filter((s) => s.status === "EXPIRED").length, color: "text-slate-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
              <p className={`mt-1 text-2xl font-extrabold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Add existing member ─────────────────────────────────── */}
        <section>
          <h2 className="mb-3 text-base font-bold text-navy-950">➕ Add Existing Member</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-slate-500">
              Use this to manually add someone who already paid (cash, WhatsApp, etc.) so the bot tracks their days and sends reminders automatically.
              If you have their Telegram user ID, enter it so they can be auto-removed on expiry. Otherwise leave it blank — they can link it later with <code className="rounded bg-slate-100 px-1">/register</code> in the bot.
            </p>
            <form action={addManual} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Full Name *</label>
                <input name="name" required placeholder="John Doe" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Email *</label>
                <input name="email" type="email" required placeholder="john@email.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Phone *</label>
                <input name="phone" required placeholder="+234..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Telegram User ID <span className="text-slate-400">(optional)</span></label>
                <input name="telegramUserId" placeholder="e.g. 123456789" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
                <p className="mt-0.5 text-xs text-slate-400">They can find it by messaging @userinfobot on Telegram</p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Start Date *</label>
                <input name="startDate" type="date" required defaultValue={todayISO} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Duration (days) *</label>
                <input name="days" type="number" required defaultValue="30" min="1" max="365" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none" />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <button type="submit" className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-green-700">
                  ➕ Add Member & Start Tracking
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Pending crypto approvals */}
        {pendingCrypto.length > 0 && (
          <section>
            <h2 className="mb-3 text-base font-bold text-navy-950">⏳ Pending Crypto Approval ({pendingCrypto.length})</h2>
            <div className="overflow-hidden rounded-xl border border-orange-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-orange-50 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Subscriber</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">TX Hash</th>
                    <th className="px-4 py-3 text-left">Submitted</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingCrypto.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-navy-950">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{s.phone}</td>
                      <td className="px-4 py-3">
                        <code className="break-all text-xs text-slate-700">{s.cryptoTxHash ?? "—"}</code>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.createdAt)}</td>
                      <td className="px-4 py-3">
                        <form action={approveCrypto}>
                          <input type="hidden" name="id" value={s.id} />
                          <button type="submit" className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-green-700">
                            ✓ Approve
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Active subscriptions */}
        <section>
          <h2 className="mb-3 text-base font-bold text-navy-950">✅ Active Subscriptions ({active.length})</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Subscriber</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Method</th>
                  <th className="px-4 py-3 text-left">Start</th>
                  <th className="px-4 py-3 text-left">Expires</th>
                  <th className="px-4 py-3 text-left">Days Left</th>
                  <th className="px-4 py-3 text-left">TG Linked</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {active.map((s) => {
                  const dl = daysLeft(s.endDate);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-navy-950">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{s.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.paymentMethod === "PAYSTACK" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                          {s.paymentMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.startDate)}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.endDate)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${dl !== null && dl <= 3 ? "text-red-600" : dl !== null && dl <= 7 ? "text-orange-500" : "text-green-600"}`}>
                          {dl !== null ? `${dl}d` : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {s.telegramUserId ? (
                          <span className="font-semibold text-green-600">✓ Linked</span>
                        ) : (
                          <span className="text-slate-400">Not linked</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <form action={cancelSub}>
                          <input type="hidden" name="id" value={s.id} />
                          <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100">
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
                {active.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">No active subscriptions yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* History */}
        {others.length > 0 && (
          <section>
            <h2 className="mb-3 text-base font-bold text-navy-950">History ({others.length})</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Subscriber</th>
                    <th className="px-4 py-3 text-left">Method</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {others.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-navy-950">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{s.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusColors[s.status]}`}>
                          {s.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </SPTAdminShell>
  );
}
