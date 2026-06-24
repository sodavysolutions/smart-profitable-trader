"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [campaign, setCampaign] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const current = useMemo(() => services.find((item) => item.title === service), [service]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setCampaign(params.get("utm_campaign") ?? "");
    setSource(params.get("utm_source") ?? params.get("source") ?? "");
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/applications", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        router.push(thankYouPath);
        return;
      }

      setError(result?.error ?? "Please check your details and try submitting again.");
    } catch {
      setError("We could not submit your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} aria-busy={submitting} noValidate className="grid gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="fullName" label="Full name" autoComplete="name" required />
        <Field name="email" label="Email" type="email" autoComplete="email" required />
        <Field name="phone" label="Phone number" type="tel" autoComplete="tel" />
        <Field name="whatsapp" label="WhatsApp number" type="tel" autoComplete="tel" />
        <Field name="country" label="Country" autoComplete="country-name" />
        <Field name="city" label="State/city" autoComplete="address-level2" />
      </div>
      <label htmlFor="application-service" className="grid gap-1 text-sm font-medium text-slate-700">
        Service interested in
        <select id="application-service" name="service" value={service} onChange={(event) => setService(event.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
          {[...services.map((item) => item.title), "General Inquiry"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <input type="hidden" name="campaign" value={campaign} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="source" label="How did you hear about us?" defaultValue={source} />
        {service.includes("Copy") && (
          <>
            <Field name="broker" label="Broker" />
            <Field name="platform" label="MT4/MT5 account type" />
            <Field name="accountBalance" label="Account balance" inputMode="decimal" />
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
            <Field name="accountBalance" label="Account capital" inputMode="decimal" />
            <Field name="platform" label="MT4/MT5 login platform" />
            <Field name="riskPreference" label="Risk preference" />
          </>
        )}
      </div>
      <label htmlFor="application-message" className="grid gap-1 text-sm font-medium text-slate-700">
        Message/notes
        <textarea id="application-message" name="message" rows={4} className="rounded-md border border-slate-200 px-3 py-2" />
      </label>
      {current && <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">{current.requirements}</p>}
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  defaultValue
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  defaultValue?: string;
}) {
  const id = `application-${name}`;

  return (
    <label htmlFor={id} className="grid gap-1 text-sm font-medium text-slate-700">
      {label}
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} defaultValue={defaultValue} className="rounded-md border border-slate-200 px-3 py-2" />
    </label>
  );
}
