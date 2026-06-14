"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";

const serviceMap: Record<string, string> = {
  "vip-signals": "Smart Profitable Trader VIP Signal Service",
  "instant-funded": "Funded Account Trading",
  "copy-trading": "Copy Trading Subscription",
  evaluation: "Evaluation Account Management",
  "funded-account": "Funded Account Trading",
  "personal-account": "Personal Trading Account Management",
  general: "General Inquiry"
};

export function ApplicationForm({ initialService = "general", thankYouPath = "/thank-you" }: { initialService?: string; thankYouPath?: string }) {
  const router = useRouter();
  const [service, setService] = useState(serviceMap[initialService] ?? "General Inquiry");
  const [submitting, setSubmitting] = useState(false);

  const current = useMemo(() => services.find((item) => item.title === service), [service]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" }
    });
    setSubmitting(false);
    if (response.ok) router.push(thankYouPath);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="fullName" label="Full name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Phone number" />
        <Field name="whatsapp" label="WhatsApp number" />
        <Field name="country" label="Country" />
        <Field name="city" label="State/city" />
      </div>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Service interested in
        <select name="service" value={service} onChange={(event) => setService(event.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
          {[...services.map((item) => item.title), "General Inquiry"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="source" label="How did you hear about us?" />
        {service.includes("Copy") && (
          <>
            <Field name="broker" label="Broker" />
            <Field name="platform" label="MT4/MT5 account type" />
            <Field name="accountBalance" label="Account balance" />
            <Field name="existingAccount" label="Already have a trading account?" />
          </>
        )}
        {service.includes("Evaluation") && (
          <>
            <Field name="propFirm" label="Prop firm name" />
            <Field name="accountSize" label="Account size" />
            <Field name="currentPhase" label="Current phase" />
            <Field name="startDate" label="Start date" type="date" />
          </>
        )}
        {service.includes("Funded") && (
          <>
            <Field name="propFirm" label="Prop firm name" />
            <Field name="accountSize" label="Account size" />
            <Field name="fundedStatus" label="Funded status" />
            <Field name="withdrawalTarget" label="Withdrawal target" />
          </>
        )}
        {service.includes("Personal") && (
          <>
            <Field name="broker" label="Broker" />
            <Field name="accountBalance" label="Account capital" />
            <Field name="platform" label="MT4/MT5 login platform" />
            <Field name="riskPreference" label="Risk preference" />
          </>
        )}
      </div>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Message/notes
        <textarea name="message" rows={4} className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      {current && <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">{current.requirements}</p>}
      <button disabled={submitting} className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-medium text-slate-700">
      {label}
      <input name={name} type={type} required={required} className="rounded-md border border-slate-200 px-3 py-2" />
    </label>
  );
}
