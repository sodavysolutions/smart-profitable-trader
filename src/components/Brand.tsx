import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/smart-profits-trader-logo.png"
        alt="Smart Profits Trader"
        width={160}
        height={160}
        className={
          compact
            ? "h-10 w-10 rounded-md object-contain"
            : "h-14 w-14 rounded-xl bg-white object-contain p-1.5 shadow-sm"
        }
      />
      {!compact && (
        <div className="hidden leading-tight sm:block">
          <div className="font-semibold text-white">Smart Profits Trader</div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-profit-500">Algo-Powered Trading Ecosystem</div>
        </div>
      )}
    </div>
  );
}
