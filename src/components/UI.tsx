import { clsx } from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-md border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
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

export function ProgressBar({ value, danger = false }: { value: number; danger?: boolean }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div className={clsx("h-full rounded-full", danger ? "bg-red-500" : "bg-profit-500")} style={{ width: `${width}%` }} />
    </div>
  );
}

export function DataTable({
  columns,
  rows
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-4 py-3 text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
