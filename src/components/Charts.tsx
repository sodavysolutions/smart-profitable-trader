import { chartData } from "@/lib/data";

export function RevenueAreaChart() {
  const max = Math.max(...chartData.map((item) => item.revenue));
  return (
    <div className="flex h-72 items-end gap-3 border-b border-l border-slate-200 px-3 pt-6">
      {chartData.map((item) => (
        <div key={item.month} className="flex flex-1 flex-col items-center justify-end gap-2">
          <div className="w-full rounded-t-md bg-profit-500" style={{ height: `${(item.revenue / max) * 220}px` }} title={`Revenue ${item.revenue}`} />
          <span className="text-xs font-medium text-slate-500">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

export function ExpenseBarChart() {
  const max = Math.max(...chartData.map((item) => item.expenses + item.customers * 80));
  return (
    <div className="flex h-72 items-end gap-3 border-b border-l border-slate-200 px-3 pt-6">
      {chartData.map((item) => (
        <div key={item.month} className="flex flex-1 flex-col items-center justify-end gap-2">
          <div className="flex w-full items-end gap-1">
            <div className="flex-1 rounded-t-md bg-navy-950" style={{ height: `${(item.expenses / max) * 220}px` }} title={`Expenses ${item.expenses}`} />
            <div className="flex-1 rounded-t-md bg-profit-500" style={{ height: `${((item.customers * 80) / max) * 220}px` }} title={`Customers ${item.customers}`} />
          </div>
          <span className="text-xs font-medium text-slate-500">{item.month}</span>
        </div>
      ))}
    </div>
  );
}
