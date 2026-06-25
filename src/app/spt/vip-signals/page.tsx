import type { Metadata } from "next";
import { VipSignalsFunnelPage } from "@/components/spt/vip-signals-funnel";

export const metadata: Metadata = {
  title: "Smart Profits Trader VIP Signals | XAUUSD Trading Signals",
  description:
    "Join Smart Profits Trader VIP for premium XAUUSD trading signals powered by the Smart Profit Algo, weekly optimization, risk guidance, and structured trade direction. Trading involves risk and results are not guaranteed."
};

export default function SPTVipSignalsPage() {
  return <VipSignalsFunnelPage />;
}
