"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/PublicShell";

const WHATSAPP_NUMBER = "2347087970133";
const COUNTDOWN_SECONDS = 4;

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "your chosen service";
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const [redirected, setRedirected] = useState(false);

  const waMessage = encodeURIComponent(
    `Hello Solomon, I just submitted my application for *${service}* on Smart Profits Trader. Please review it and guide me on the next steps. Thank you!`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  useEffect(() => {
    if (seconds <= 0) {
      setRedirected(true);
      window.location.href = waUrl;
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, waUrl]);

  return (
    <PublicShell>
      <section className="page-shell py-24 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-profit-100">
          <svg className="h-10 w-10 text-profit-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-navy-950">Application Received!</h1>

        <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-slate-600">
          Thank you for applying for <strong className="text-navy-950">{service}</strong>. Our team will review your details and follow up shortly.
        </p>

        {!redirected ? (
          <div className="mt-10">
            <p className="text-sm font-medium text-slate-500">
              Connecting you to WhatsApp in <span className="font-bold text-profit-600">{seconds}</span> second{seconds !== 1 ? "s" : ""}…
            </p>
            <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-profit-200 bg-white">
              <span className="text-2xl font-bold text-profit-600">{seconds}</span>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Not redirected?{" "}
              <a href={waUrl} className="font-semibold text-profit-600 underline underline-offset-2">
                Open WhatsApp now
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-sm text-slate-500">Opening WhatsApp…</p>
            <a href={waUrl} className="mt-4 inline-block rounded-md bg-profit-500 px-6 py-3 text-sm font-bold text-navy-950">
              Open WhatsApp manually
            </a>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
