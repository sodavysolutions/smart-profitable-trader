"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

type Props = {
  onDelete: (id: string) => Promise<void>;
  id: string;
  label?: string; // what we're deleting e.g. "lead", "customer"
};

export function DeleteButton({ onDelete, id, label = "record" }: Props) {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await onDelete(id);
      setConfirm(false);
    });
  };

  if (confirm) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
          <AlertTriangle size={12} /> Delete {label}?
        </span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {isPending ? <Loader2 size={11} className="animate-spin" /> : "Yes"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      title={`Delete ${label}`}
      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      <Trash2 size={14} />
    </button>
  );
}
