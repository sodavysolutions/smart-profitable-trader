"use client";

import { useState, useTransition } from "react";
import { X, Loader2, UserPlus } from "lucide-react";

const SERVICES = [
  "Copy Trading",
  "VIP Signals",
  "Instant Funded Accounts",
  "Evaluation Account",
  "Personal Account Management",
  "Not Sure Yet",
];

const COUNTRIES = [
  "Nigeria","Ghana","Kenya","South Africa","Uganda","Tanzania","Rwanda","Ethiopia","Cameroon",
  "Senegal","Ivory Coast","Zimbabwe","Zambia","Botswana","Namibia","Egypt","Morocco","Algeria",
  "United Kingdom","United States","Canada","Australia","Germany","France","UAE","Other"
];

type Props = {
  onAdd: (data: FormData) => Promise<void>;
};

export function AddLeadButton({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await onAdd(fd);
        setOpen(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950 hover:bg-profit-400"
      >
        + Add Lead
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-950">
                  <UserPlus size={16} className="text-white" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-navy-950">Add Lead Manually</h2>
                  <p className="text-xs text-slate-500">Enter the prospect's details below</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Full Name *</label>
                  <input
                    name="fullName" required placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Email *</label>
                  <input
                    name="email" type="email" required placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Phone / WhatsApp</label>
                  <input
                    name="phone" type="tel" placeholder="+234 800 000 0000"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Country</label>
                  <select
                    name="country"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-950">Service Interest *</label>
                <select
                  name="serviceInterest" required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                >
                  <option value="">Select service</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Source</label>
                  <select
                    name="source" defaultValue="MANUAL"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  >
                    <option value="MANUAL">Manual Entry</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="TELEGRAM">Telegram</option>
                    <option value="FORM">Website Form</option>
                    <option value="REFERRAL">Referral</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-navy-950">Status</label>
                  <select
                    name="status" defaultValue="NEW"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-950"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="FOLLOW_UP">Follow Up</option>
                    <option value="PAYMENT_PENDING">Payment Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-950">Notes</label>
                <textarea
                  name="notes" rows={3} placeholder="Any additional notes about this prospect…"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-navy-950 resize-none"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy-950 py-2.5 text-sm font-bold text-white hover:bg-navy-800 disabled:opacity-60"
                >
                  {isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
