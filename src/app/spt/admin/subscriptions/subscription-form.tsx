"use client";

import { useActionState, useEffect, useRef } from "react";
import { BillingCycle, SubscriptionStatus, SubscriptionType } from "@prisma/client";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Customer = { id: string; fullName: string };
type Expense = { id: string; name: string };
type ActionState = { ok: boolean; message: string } | null;

function readableEnum(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const billingCycles = Object.values(BillingCycle);
const subscriptionStatuses = Object.values(SubscriptionStatus);
const subscriptionTypes = Object.values(SubscriptionType);

export function SubscriptionForm({
  action,
  customers,
  expenses,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  customers: Customer[];
  expenses: Expense[];
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset the form after a successful save
  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {/* Feedback banner */}
      {state?.ok && (
        <div className="xl:col-span-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle size={16} className="shrink-0" />
          {state.message}
        </div>
      )}
      {state && !state.ok && (
        <div className="xl:col-span-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          {state.message}
        </div>
      )}

      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Subscription name
        <input name="name" required className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Type
        <select name="type" defaultValue={SubscriptionType.CUSTOMER_SUBSCRIPTION} className="rounded-md border border-slate-200 px-3 py-2">
          {subscriptionTypes.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Related customer
        <select name="customerId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
          <option value="">Not linked</option>
          {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Related expense
        <select name="expenseId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
          <option value="">Not linked</option>
          {expenses.map((expense) => <option key={expense.id} value={expense.id}>{expense.name}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Related name
        <input name="relatedName" className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Amount
        <input name="amount" type="number" step="0.01" min="0" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Currency
        <input name="currency" defaultValue="USD" className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Billing cycle
        <select name="billingCycle" defaultValue={BillingCycle.MONTHLY} className="rounded-md border border-slate-200 px-3 py-2">
          {billingCycles.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Start date
        <input name="startDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Renewal date
        <input name="renewalDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Status
        <select name="status" defaultValue={SubscriptionStatus.ACTIVE} className="rounded-md border border-slate-200 px-3 py-2">
          {subscriptionStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="reminderEnabled" defaultChecked className="h-4 w-4" />
        Reminder enabled
      </label>
      <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
        Notes
        <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      <div className="xl:col-span-4">
        <button
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? "Saving…" : "Save Subscription"}
        </button>
      </div>
    </form>
  );
}
