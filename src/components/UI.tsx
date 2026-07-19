import { clsx } from "clsx";

// ── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-200/80 bg-white p-5",
        "shadow-[0_2px_8px_rgba(7,20,39,0.05)]",
        "admin-card-lift",
        className
      )}
    >
      {children}
    </section>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={clsx(
      "rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center",
      "transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
    )}>
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-400">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-base font-bold text-navy-950">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-500">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ── Inline notice ─────────────────────────────────────────────────────────────

export function InlineNotice({
  title,
  text,
  tone = "warning",
}: {
  title: string;
  text: string;
  tone?: "warning" | "danger" | "info";
}) {
  const styles =
    tone === "danger"
      ? "border-red-200 bg-red-50/80 text-red-900"
      : tone === "info"
        ? "border-blue-200 bg-blue-50/80 text-blue-900"
        : "border-amber-200 bg-amber-50/80 text-amber-900";

  const accent =
    tone === "danger" ? "bg-red-500" : tone === "info" ? "bg-blue-500" : "bg-amber-500";

  return (
    <div className={clsx("flex gap-3 rounded-xl border px-4 py-3", styles)}>
      <span className={clsx("mt-[3px] h-4 w-[3px] shrink-0 rounded-full", accent)} />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-sm leading-6 opacity-85">{text}</p>
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-5 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-profit-500 to-profit-600 shadow-[0_0_8px_rgba(32,199,111,0.35)]" />
        <div>
          <h2 className="text-xl font-bold tracking-tight text-navy-950">{title}</h2>
          {text && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{text}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

export function StatusBadge({ value }: { value: string }) {
  const tone =
    /overdue|failed|lost|drawdown|cancelled/i.test(value)
      ? "bg-red-50 text-red-700 ring-red-200"
      : /pending|follow|soon|phase|upcoming|partial/i.test(value)
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : /paid|active|profit|converted|sent|funded/i.test(value)
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-slate-50 text-slate-700 ring-slate-200";
  return (
    <span className={clsx(
      "inline-flex rounded-full px-2.5 py-[3px] text-xs font-semibold ring-1",
      tone
    )}>
      {value}
    </span>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────

export function ProgressBar({
  value,
  danger = false,
  label = "Progress",
}: {
  value: number;
  danger?: boolean;
  label?: string;
}) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      className="h-2 overflow-hidden rounded-full bg-slate-100"
    >
      <div
        className={clsx(
          "h-full rounded-full progress-bar-fill",
          danger
            ? "bg-gradient-to-r from-red-500 to-red-400"
            : "bg-gradient-to-r from-profit-600 to-profit-400"
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ── Data table ────────────────────────────────────────────────────────────────

export function DataTable({
  columns,
  rows,
  caption = "Data table",
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-slate-50/80">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={index} className="admin-table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-top text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-400">
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
