"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Download } from "lucide-react";

const STORAGE_KEY = "spt_blueprint_dismissed";
const DELAY_MS = 15000; // show after 15 seconds

export function BlueprintPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300 sm:left-auto sm:right-6 sm:max-w-[360px]">
      <div className="overflow-hidden rounded-2xl bg-navy-950 shadow-[0_24px_70px_rgba(7,20,39,0.5)]">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-profit-500 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-navy-950">
            Free Download
          </span>
          <button
            onClick={dismiss}
            aria-label="Close"
            className="rounded-full p-0.5 text-navy-950/70 transition hover:text-navy-950"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-base font-bold leading-snug text-white">
            Get the Smart Money Blueprint — Free
          </p>
          <p className="mt-1.5 text-sm leading-6 text-slate-300">
            The step-by-step system to go from $200 to $10,000/month through algo-powered trading.
          </p>

          <Link
            href="/spt/smart-money-blueprint"
            onClick={dismiss}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-profit-400"
          >
            <Download size={15} />
            Download Free Blueprint
          </Link>

          <button
            onClick={dismiss}
            className="mt-2 w-full text-center text-xs text-slate-500 transition hover:text-slate-300"
          >
            No thanks, I'll pass
          </button>
        </div>
      </div>
    </div>
  );
}
