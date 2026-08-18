"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CustomerStatus, CustomerType } from "@prisma/client";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export type CustomerActionState = { ok: boolean; message: string } | null;

const COPY_BROKERS = ["Valetax", "Vantage Markets", "XM"] as const;
const INSTANT_FIRMS = ["iFunds"] as const;
const PLATFORMS = ["MT4", "MT5", "TRADELOCKER", "OTHER"] as const;

const CUSTOMER_TYPES: { value: CustomerType; label: string }[] = [
  { value: "VIP_SIGNALS",       label: "VIP Signals" },
  { value: "COPY_TRADING",      label: "Copy Trading" },
  { value: "INSTANT_FUNDED",    label: "Instant Funded (Prop)" },
  { value: "PERSONAL_ACCOUNT",  label: "Personal Account" },
];

const STATUSES: { value: CustomerStatus; label: string }[] = [
  { value: "PENDING_SETUP",  label: "Pending Setup" },
  { value: "ACTIVE",         label: "Active" },
  { value: "FUNDED",         label: "Funded" },
  { value: "PAUSED",         label: "Paused" },
  { value: "SUSPENDED",      label: "Suspended" },
  { value: "COMPLETED",      label: "Completed" },
  { value: "CANCELLED",      label: "Cancelled" },
  { value: "LOST",           label: "Lost" },
];

const inputCls = "rounded-md border border-slate-200 px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0A1A3C]/20";
const labelCls = "grid gap-1 text-sm font-medium text-slate-700";

export function CustomerForm({
  action,
}: {
  action: (prev: CustomerActionState, fd: FormData) => Promise<CustomerActionState>;
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [type, setType] = useState<CustomerType>("VIP_SIGNALS");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
      setType("VIP_SIGNALS");
    }
  }, [state]);

  const isCopy    = type === "COPY_TRADING";
  const isInstant = type === "INSTANT_FUNDED";
  const isPersonal = type === "PERSONAL_ACCOUNT";
  const isVIP    = type === "VIP_SIGNALS";
  const hasMT5   = isCopy || isInstant || isPersonal;
  const hasBroker = isCopy || isInstant || isPersonal;
  const hasProfitShare = isCopy || isInstant || isPersonal;
  const hasRenewal = isVIP || isPersonal;
  const hasCapital = !isVIP;

  return (
    <form ref={formRef} action={formAction} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {state?.ok && (
        <div className="md:col-span-2 xl:col-span-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle size={15} className="shrink-0" /> {state.message}
        </div>
      )}
      {state && !state.ok && (
        <div className="md:col-span-2 xl:col-span-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={15} className="shrink-0" /> {state.message}
        </div>
      )}

      {/* Always-visible fields */}
      <label className={labelCls}>Full name <input name="fullName" required className={inputCls} /></label>
      <label className={labelCls}>Email address <input name="email" type="email" required className={inputCls} /></label>
      <label className={labelCls}>Phone <input name="phone" className={inputCls} /></label>
      <label className={labelCls}>WhatsApp <input name="whatsapp" className={inputCls} /></label>
      <label className={labelCls}>Country <input name="country" className={inputCls} /></label>
      <label className={labelCls}>City <input name="city" className={inputCls} /></label>

      <label className={labelCls}>
        Service type
        <select
          name="customerType"
          value={type}
          onChange={(e) => setType(e.target.value as CustomerType)}
          className={inputCls}
        >
          {CUSTOMER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>

      <label className={labelCls}>
        Status
        <select name="status" defaultValue="PENDING_SETUP" className={inputCls}>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </label>

      {/* VIP-only: monthly fee */}
      {isVIP && (
        <label className={labelCls}>
          Monthly VIP Fee
          <input name="setupFeeStatus" placeholder="e.g. $50/month — Paid" className={inputCls} />
        </label>
      )}

      {/* Copy Trading: broker dropdown */}
      {isCopy && (
        <label className={labelCls}>
          Broker
          <select name="brokerOrPropFirm" className={inputCls}>
            <option value="">Select broker</option>
            {COPY_BROKERS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      )}

      {/* Instant Funded: prop firm dropdown */}
      {isInstant && (
        <label className={labelCls}>
          Prop Firm
          <select name="brokerOrPropFirm" className={inputCls}>
            <option value="">Select prop firm</option>
            {INSTANT_FIRMS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </label>
      )}

      {/* Personal Account: free-text broker */}
      {isPersonal && (
        <label className={labelCls}>
          Broker
          <input name="brokerOrPropFirm" placeholder="e.g. Valatex, XM, ICMarkets" className={inputCls} />
        </label>
      )}

      {/* MT5 fields for Copy / Instant / Personal */}
      {hasMT5 && (
        <>
          <label className={labelCls}>
            Account Platform
            <select name="accountPlatform" className={inputCls}>
              <option value="">Select platform</option>
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label className={labelCls}>
            MT5 Login ID
            <input name="accountLogin" placeholder="MT5 login number" className={inputCls} />
          </label>
        </>
      )}

      {/* Profit share for Copy / Instant / Personal */}
      {hasProfitShare && (
        <label className={labelCls}>
          Profit Share %
          <input
            name="profitShareTier"
            placeholder={isCopy ? "e.g. 70/30" : isInstant ? "e.g. 65/35 or 50/50" : "e.g. 50/50"}
            className={inputCls}
          />
        </label>
      )}

      {/* Capital / Balance — not for VIP */}
      {hasCapital && (
        <>
          <label className={labelCls}>
            Initial Capital ($)
            <input name="initialCapital" type="number" step="0.01" min="0" defaultValue="0" className={inputCls} />
          </label>
          <label className={labelCls}>
            Current Balance ($)
            <input name="currentBalance" type="number" step="0.01" min="0" defaultValue="0" className={inputCls} />
          </label>
        </>
      )}

      {/* Hidden defaults for unused numeric fields so validation doesn't fail */}
      {isVIP && (
        <>
          <input type="hidden" name="initialCapital" value="0" />
          <input type="hidden" name="currentBalance" value="0" />
        </>
      )}
      <input type="hidden" name="currentEquity" value="0" />

      {/* Start date */}
      <label className={labelCls}>
        Start date
        <input name="startDate" type="date" className={inputCls} />
      </label>

      {/* Renewal date — VIP and Personal only */}
      {hasRenewal && (
        <label className={labelCls}>
          {isVIP ? "Subscription Renewal" : "Renewal Date"}
          <input name="renewalDate" type="date" className={inputCls} />
        </label>
      )}

      <label className={labelCls}>
        Birthday
        <input name="dateOfBirth" type="date" className={inputCls} />
      </label>

      <label className="md:col-span-2 xl:col-span-3 grid gap-1 text-sm font-medium text-slate-700">
        Internal notes
        <textarea name="notes" rows={2} className={inputCls} />
      </label>

      <div className="md:col-span-2 xl:col-span-3">
        <button
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-profit-500 px-5 py-2.5 text-sm font-bold text-navy-950 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? "Saving…" : "Create Customer"}
        </button>
      </div>
    </form>
  );
}
