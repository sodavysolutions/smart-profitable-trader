"use client";

import { useState } from "react";
import { SPTPageShell } from "@/components/spt/sections";
import { CheckCircle2, Loader2, User, Mail, Phone, Globe, Calendar, Layers } from "lucide-react";

const SERVICES = [
  { value: "COPY_TRADING",    label: "Copy Trading",            desc: "We trade on your behalf, 20% profit share" },
  { value: "VIP_SIGNALS",     label: "VIP Signals",             desc: "Daily signals with entry, SL & TP" },
  { value: "INSTANT_FUNDED",  label: "Instant Funded Accounts", desc: "Prop firm challenge coaching" },
  { value: "EVALUATION",      label: "Evaluation Account",      desc: "Funded account evaluation support" },
];

const COUNTRIES = [
  "Nigeria","Ghana","Kenya","South Africa","Uganda","Tanzania","Rwanda","Ethiopia","Cameroon",
  "Senegal","Ivory Coast","Zimbabwe","Zambia","Botswana","Namibia","Egypt","Morocco","Algeria",
  "Tunisia","Libya","Sudan","United Kingdom","United States","Canada","Australia","Germany",
  "France","Netherlands","UAE","Saudi Arabia","Qatar","Other"
];

export default function OnboardingPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", whatsapp: "",
    country: "", dateOfBirth: "", services: [] as string[],
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const toggleService = (val: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(val)
        ? f.services.filter(s => s !== val)
        : [...f.services, val],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.services.length === 0) { setError("Please select at least one service."); return; }
    setStatus("loading"); setError("");
    try {
      const res = await fetch("/api/spt/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <SPTPageShell>
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-[#0A1A3C]">Welcome to Smart Profits Trader!</h1>
          <p className="mt-3 max-w-md text-slate-500 text-lg">
            You're officially in the system. Check your email for your welcome message, and expect a WhatsApp message from us shortly.
          </p>
          <p className="mt-6 text-sm text-slate-400">Need help? Chat with us on WhatsApp or Telegram anytime.</p>
        </section>
      </SPTPageShell>
    );
  }

  return (
    <SPTPageShell>
      <section className="mx-auto max-w-2xl px-4 py-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-green-700">
            Client Onboarding
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#0A1A3C]">Get Set Up in Minutes</h1>
          <p className="mt-3 text-slate-500">
            Fill in your details below so we can set up your account and get you started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">Full Name *</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text" required placeholder="John Doe"
                value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">Email Address *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email" required placeholder="john@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
              />
            </div>
          </div>

          {/* Phone + WhatsApp */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">Phone Number *</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel" required placeholder="+234 800 000 0000"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">
                WhatsApp Number <span className="text-slate-400 font-normal">(if different)</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel" placeholder="Same as phone"
                  value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                />
              </div>
            </div>
          </div>

          {/* Country + DOB */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">Country *</label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0A1A3C]">Date of Birth *</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date" required
                  value={form.dateOfBirth} onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0A1A3C]">
              <Layers size={15} /> Services You Are Subscribed To * <span className="text-slate-400 font-normal">(select all that apply)</span>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map(svc => {
                const checked = form.services.includes(svc.value);
                return (
                  <button
                    key={svc.value} type="button"
                    onClick={() => toggleService(svc.value)}
                    className={[
                      "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                      checked
                        ? "border-[#16A34A] bg-green-50"
                        : "border-slate-200 bg-white hover:border-slate-300",
                    ].join(" ")}
                  >
                    <span className={[
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      checked ? "border-[#16A34A] bg-[#16A34A]" : "border-slate-300",
                    ].join(" ")}>
                      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <div>
                      <p className={`text-sm font-bold ${checked ? "text-[#15803d]" : "text-[#0A1A3C]"}`}>{svc.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{svc.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit" disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A1A3C] py-4 text-sm font-bold text-white transition-all hover:bg-[#16A34A] disabled:opacity-60"
          >
            {status === "loading" ? (
              <><Loader2 size={18} className="animate-spin" /> Setting up your account...</>
            ) : (
              "Complete Onboarding →"
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Your data is safe with us. Read our{" "}
            <a href="/privacy-policy" className="underline hover:text-[#16A34A]">Privacy Policy</a>.
          </p>
        </form>
      </section>
    </SPTPageShell>
  );
}
