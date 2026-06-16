"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/spt/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    setSubmitting(false);
    if (response.ok) {
      router.push("/spt/admin/dashboard");
      router.refresh();
      return;
    }

    setError("Invalid admin email or password.");
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-md bg-white p-6 shadow-soft">
      <h1 className="text-2xl font-semibold text-navy-950">Admin login</h1>
      <p className="mt-2 text-sm text-slate-600">Secure access for Smart Profitable Trader CRM.</p>
      <label className="mt-6 grid gap-1 text-sm font-medium text-slate-700">
        Email
        <input name="email" className="rounded-md border border-slate-200 px-3 py-2" type="email" required />
      </label>
      <label className="mt-4 grid gap-1 text-sm font-medium text-slate-700">
        Password
        <input name="password" className="rounded-md border border-slate-200 px-3 py-2" type="password" required />
      </label>
      {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={submitting} className="mt-6 w-full rounded-md bg-profit-500 px-4 py-3 text-sm font-bold text-navy-950 disabled:opacity-60">
        {submitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
