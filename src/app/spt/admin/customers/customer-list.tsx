"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CustomerStatus, CustomerType, AccountPlatform } from "@prisma/client";
import { Pencil, X, CheckCircle, AlertCircle, Loader2, Trash2 } from "lucide-react";
import type { CustomerActionState } from "./customer-form";

type Subscription = { name: string; status: string };
type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  customerType: CustomerType;
  accountPlatform: AccountPlatform | null;
  brokerOrPropFirm: string | null;
  accountLogin: string | null;
  profitShareTier: string | null;
  setupFeeStatus: string | null;
  initialCapital: { toString(): string };
  currentBalance: { toString(): string };
  status: CustomerStatus;
  renewalDate: Date | null;
  dateOfBirth: Date | null;
  notes: string | null;
  subscriptions: Subscription[];
};

const COPY_BROKERS = ["Valatex", "XM"] as const;
const INSTANT_FIRMS = ["iFunds", "TenTrade"] as const;
const PLATFORMS = ["MT4", "MT5", "TRADELOCKER", "OTHER"] as const;
const STATUSES: CustomerStatus[] = ["ACTIVE","PENDING_SETUP","FUNDED","PAUSED","SUSPENDED","COMPLETED","CANCELLED","LOST"];

const inputCls = "rounded-md border border-slate-200 px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0A1A3C]/20";
const labelCls = "grid gap-1 text-xs font-semibold text-slate-600 uppercase tracking-wide";

function readableEnum(v: string) {
  return v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function money(v: { toString(): string } | null) {
  const n = parseFloat(v?.toString() ?? "0");
  if (isNaN(n)) return "$0.00";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function StatusPill({ status }: { status: CustomerStatus }) {
  const colors: Record<CustomerStatus, string> = {
    ACTIVE:        "bg-green-100 text-green-700",
    FUNDED:        "bg-emerald-100 text-emerald-700",
    PENDING_SETUP: "bg-yellow-100 text-yellow-700",
    PAUSED:        "bg-orange-100 text-orange-700",
    SUSPENDED:     "bg-red-100 text-red-700",
    COMPLETED:     "bg-blue-100 text-blue-700",
    CANCELLED:     "bg-slate-100 text-slate-500",
    LOST:          "bg-slate-100 text-slate-400",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${colors[status] ?? "bg-slate-100 text-slate-600"}`}>
      {readableEnum(status)}
    </span>
  );
}

function EditPanel({
  customer,
  action,
  onClose,
  onDeleted,
  deleteAction,
}: {
  customer: Customer;
  action: (prev: CustomerActionState, fd: FormData) => Promise<CustomerActionState>;
  onClose: () => void;
  onDeleted: (id: string) => void;
  deleteAction: (id: string) => Promise<void>;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) onClose();
  }, [state]);

  const type = customer.customerType;
  const isCopy    = type === "COPY_TRADING";
  const isInstant = type === "INSTANT_FUNDED";
  const isPersonal = type === "PERSONAL_ACCOUNT";
  const isVIP    = type === "VIP_SIGNALS";
  const hasMT5   = isCopy || isInstant || isPersonal;
  const hasProfitShare = isCopy || isInstant || isPersonal;
  const hasRenewal = isVIP || isPersonal;
  const hasCapital = !isVIP;

  async function handleDelete() {
    setDeleting(true);
    try { await deleteAction(customer.id); onDeleted(customer.id); }
    finally { setDeleting(false); }
  }

  return (
    <div className="mt-4 rounded-xl border border-[#0A1A3C]/10 bg-slate-50/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#0A1A3C]">{customer.fullName}</p>
          <p className="text-xs text-slate-500">{customer.email} · {readableEnum(type)}</p>
        </div>
        <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
          <X size={16} />
        </button>
      </div>

      {state?.ok && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          <CheckCircle size={14} /> {state.message}
        </div>
      )}
      {state && !state.ok && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          <AlertCircle size={14} /> {state.message}
        </div>
      )}

      <form ref={formRef} action={formAction} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <input type="hidden" name="id" value={customer.id} />
        <input type="hidden" name="currentEquity" value={customer.currentBalance?.toString() ?? "0"} />

        <label className={labelCls}>
          Status
          <select name="status" defaultValue={customer.status} className={inputCls}>
            {STATUSES.map((s) => <option key={s} value={s}>{readableEnum(s)}</option>)}
          </select>
        </label>

        <label className={labelCls}>
          Phone
          <input name="phone" defaultValue={customer.phone ?? ""} className={inputCls} />
        </label>

        <label className={labelCls}>
          WhatsApp
          <input name="whatsapp" defaultValue={customer.whatsapp ?? ""} className={inputCls} />
        </label>

        {/* VIP only */}
        {isVIP && (
          <label className={labelCls}>
            Monthly VIP Fee
            <input name="setupFeeStatus" defaultValue={customer.setupFeeStatus ?? ""} placeholder="e.g. $50/month — Paid" className={inputCls} />
          </label>
        )}

        {/* Broker / Prop firm */}
        {isCopy && (
          <label className={labelCls}>
            Broker
            <select name="brokerOrPropFirm" defaultValue={customer.brokerOrPropFirm ?? ""} className={inputCls}>
              <option value="">Select broker</option>
              {COPY_BROKERS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
        )}
        {isInstant && (
          <label className={labelCls}>
            Prop Firm
            <select name="brokerOrPropFirm" defaultValue={customer.brokerOrPropFirm ?? ""} className={inputCls}>
              <option value="">Select prop firm</option>
              {INSTANT_FIRMS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
        )}
        {isPersonal && (
          <label className={labelCls}>
            Broker
            <input name="brokerOrPropFirm" defaultValue={customer.brokerOrPropFirm ?? ""} className={inputCls} />
          </label>
        )}

        {/* MT5 fields */}
        {hasMT5 && (
          <>
            <label className={labelCls}>
              Platform
              <select name="accountPlatform" defaultValue={customer.accountPlatform ?? ""} className={inputCls}>
                <option value="">Select platform</option>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className={labelCls}>
              MT5 Login ID
              <input name="accountLogin" defaultValue={customer.accountLogin ?? ""} className={inputCls} />
            </label>
          </>
        )}

        {/* Profit share */}
        {hasProfitShare && (
          <label className={labelCls}>
            Profit Share %
            <input
              name="profitShareTier"
              defaultValue={customer.profitShareTier ?? ""}
              placeholder={isCopy ? "e.g. 70/30" : isInstant ? "e.g. 65/35 or 50/50" : "e.g. 50/50"}
              className={inputCls}
            />
          </label>
        )}

        {/* Capital / Balance */}
        {hasCapital && (
          <>
            <label className={labelCls}>
              Initial Capital ($)
              <input name="initialCapital" type="number" step="0.01" min="0" defaultValue={customer.initialCapital?.toString() ?? "0"} className={inputCls} />
            </label>
            <label className={labelCls}>
              Current Balance ($)
              <input name="currentBalance" type="number" step="0.01" min="0" defaultValue={customer.currentBalance?.toString() ?? "0"} className={inputCls} />
            </label>
          </>
        )}
        {isVIP && (
          <>
            <input type="hidden" name="initialCapital" value="0" />
            <input type="hidden" name="currentBalance" value="0" />
          </>
        )}

        {/* Renewal */}
        {hasRenewal && (
          <label className={labelCls}>
            {isVIP ? "Subscription Renewal" : "Renewal Date"}
            <input
              name="renewalDate"
              type="date"
              defaultValue={customer.renewalDate ? customer.renewalDate.toISOString().slice(0, 10) : ""}
              className={inputCls}
            />
          </label>
        )}

        <label className={labelCls}>
          Birthday
          <input
            name="dateOfBirth"
            type="date"
            defaultValue={customer.dateOfBirth ? customer.dateOfBirth.toISOString().slice(0, 10) : ""}
            className={inputCls}
          />
        </label>

        <label className="md:col-span-2 xl:col-span-3 grid gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Notes
          <textarea name="notes" defaultValue={customer.notes ?? ""} rows={2} className={inputCls} />
        </label>

        <div className="md:col-span-2 xl:col-span-3 flex items-center justify-between">
          <button
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md bg-[#0A1A3C] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            {isPending ? "Saving…" : "Save Changes"}
          </button>

          {/* Delete */}
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-red-600">Delete this customer?</span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? <Loader2 size={12} className="animate-spin" /> : "Yes, delete"}
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 size={13} /> Delete customer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export function CustomerList({
  initialCustomers,
  updateAction,
  deleteAction,
}: {
  initialCustomers: Customer[];
  updateAction: (prev: CustomerActionState, fd: FormData) => Promise<CustomerActionState>;
  deleteAction: (id: string) => Promise<void>;
}) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleDeleted(id: string) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setEditingId(null);
  }

  if (!customers.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
        No customers yet. Add your first client above.
      </p>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              {["Customer", "Type", "Broker / Prop Firm", "Profit Share", "Balance", "Status", ""].map((h) => (
                <th key={h} className="py-3 pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const isOpen = editingId === c.id;
              return (
                <tr key={c.id} className={`border-b border-slate-100 transition-colors ${isOpen ? "bg-slate-50" : "hover:bg-slate-50/60"}`}>
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-[#0A1A3C]">{c.fullName}</p>
                    <p className="text-[11px] text-slate-400">{c.email}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{readableEnum(c.customerType)}</td>
                  <td className="py-3 pr-4 text-slate-600">{c.brokerOrPropFirm ?? "-"}</td>
                  <td className="py-3 pr-4 text-slate-600">{c.profitShareTier ?? (c.customerType === "VIP_SIGNALS" ? c.setupFeeStatus ?? "-" : "-")}</td>
                  <td className="py-3 pr-4 font-medium text-[#0A1A3C]">{c.customerType === "VIP_SIGNALS" ? "-" : money(c.currentBalance)}</td>
                  <td className="py-3 pr-4"><StatusPill status={c.status} /></td>
                  <td className="py-3">
                    <button
                      onClick={() => setEditingId(isOpen ? null : c.id)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-slate-200 text-slate-700"
                          : "bg-[#0A1A3C] text-white hover:bg-[#16A34A]"
                      }`}
                    >
                      {isOpen ? <><X size={12} /> Close</> : <><Pencil size={12} /> Edit</>}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit panel */}
      {editingId && (() => {
        const c = customers.find((x) => x.id === editingId);
        if (!c) return null;
        return (
          <EditPanel
            key={editingId}
            customer={c}
            action={updateAction}
            onClose={() => setEditingId(null)}
            onDeleted={handleDeleted}
            deleteAction={deleteAction}
          />
        );
      })()}
    </div>
  );
}
