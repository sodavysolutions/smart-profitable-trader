import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/brand/spt-logo.png"
        alt="Smart Profitable Trader"
        width={220}
        height={90}
        className={compact ? "h-10 w-10 rounded-md object-contain" : "h-12 w-auto max-w-[190px] rounded-md bg-white object-contain px-2 py-1"}
      />
      {!compact && (
        <div className="hidden leading-tight sm:block">
          <div className="font-semibold text-white">Smart Profits</div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-profit-500">Trader</div>
        </div>
      )}
    </div>
  );
}
