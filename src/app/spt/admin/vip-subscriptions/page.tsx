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

  function formatDate(d: Date | null) {
    if (!d) return "—";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  function daysLeft(endDate: Date | null) {
    if (!endDate) return null;
    const diff = Math.ceil((endDate.getTime() - Date.now()) / (24 * 3600 * 1000));
    return diff;
  }

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
                          <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-green-700"
                          >
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
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
                          <span className="text-green-600 font-semibold">✓ {s.telegramUserId}</span>
                        ) : (
                          <span className="text-slate-400">Pending join</span>
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

        {/* All other records */}
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
