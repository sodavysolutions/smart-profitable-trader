import { clsx } from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-md border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
}

export function EmptyState({
  title,
  text,
  action
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <h3 className="text-lg font-semibold text-navy-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function InlineNotice({
  title,
  text,
  tone = "warning"
}: {
  title: string;
  text: string;
  tone?: "warning" | "danger" | "info";
}) {
  const styles =
    tone === "danger"
      ? "border-red-200 bg-red-50 text-red-900"
      : tone === "info"
        ? "border-blue-200 bg-blue-50 text-blue-900"
        : "border-amber-200 bg-amber-50 text-amber-900";

  return (
    <div className={clsx("rounded-md border px-4 py-3", styles)}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 opacity-90">{text}</p>
    </div>
  );
}

export function SectionHeader({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-navy-950">{title}</h2>
        {text && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const tone =
    /overdue|failed|lost|drawdown|cancelled/i.test(value)
      ? "bg-red-50 text-red-700 ring-red-200"
      : /pending|follow|soon|phase|upcoming|partial/i.test(value)
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : /paid|active|profit|converted|sent|funded/i.test(value)
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-slate-50 text-slate-700 ring-slate-200";
  return <span className={clsx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tone)}>{value}</span>;
}

export function ProgressBar({ value, danger = false, label = "Progress" }: { value: number; danger?: boolean; label?: string }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(width)} className="h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div className={clsx("h-full rounded-full", danger ? "bg-red-500" : "bg-profit-500")} style={{ width: `${width}%` }} />
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  caption = "Data table"
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-top text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500">
                No records to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
