"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { value: "SIGNALS", label: "Automated Trading Signals", description: "Receive algo-powered Gold signals I can trade on my account" },
  { value: "PROP_FIRM", label: "Prop Firm Trading", description: "Access $10K–$200K in funded capital through evaluation or instant funded accounts" },
  { value: "COPY_TRADING", label: "Copy Trading / Account Management", description: "Have my account professionally managed — fully passive income" },
  { value: "GENERAL", label: "Not Sure Yet", description: "I want to explore the options and find the right path for me" },
];

export function LeadMagnetForm() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) { setError("Please select an area of interest."); return; }
    setError("");
    setSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        category,
      };

      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        router.push("/spt/smart-money-blueprint/thank-you");
        return;
      }

      setError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Could not submit. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {/* Name */}
      <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
        Full Name *
        <input
          name="fullName"
          required
          placeholder="Your full name"
          autoComplete="name"
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
        />
      </label>

      {/* Email */}
      <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
        Email Address *
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          autoComplete="email"
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
        />
      </label>

      {/* WhatsApp */}
      <label className="grid gap-1.5 text-sm font-semibold text-slate-800">
        WhatsApp Number
        <input
          name="phone"
          type="tel"
          placeholder="+1 234 567 8900 (optional)"
          autoComplete="tel"
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
        />
        <span className="text-xs font-normal text-slate-500">Include country code. We may send you the blueprint here too.</span>
      </label>

      {/* Interest area */}
      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-slate-800">
          What are you most interested in? *
        </legend>
        {categories.map((cat) => (
          <label
            key={cat.value}
            className={`flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition ${
              category === cat.value
                ? "border-profit-500 bg-profit-50"
                : "border-slate-200 bg-white hover:border-profit-300 hover:bg-profit-50/40"
            }`}
          >
            <input
              type="radio"
              name="category"
              value={cat.value}
              checked={category === cat.value}
              onChange={() => setCategory(cat.value)}
              className="mt-0.5 h-4 w-4 shrink-0 border-slate-300 text-profit-500 focus:ring-profit-500"
            />
            <span className="grid gap-0.5">
              <span className="text-sm font-semibold text-slate-900">{cat.label}</span>
              <span className="text-xs leading-5 text-slate-500">{cat.description}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-profit-500 px-6 py-4 text-base font-bold text-navy-950 shadow-lg transition hover:bg-profit-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending your blueprint..." : "Download Free Blueprint →"}
      </button>

      <p className="text-center text-xs leading-5 text-slate-500">
        No spam. Unsubscribe at any time. Your details are never shared.
      </p>
    </form>
  );
}
