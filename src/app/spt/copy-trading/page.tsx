import type { Metadata } from "next";
import { CopyTradingFunnelPage } from "@/components/spt/copy-trading-funnel";

export const metadata: Metadata = {
  title: "Smart Profits Trader Copy Trading | Algo-Supported Personal Account Trading",
  description:
    "Join Smart Profits Trader Copy Trading and allow your personal trading account to follow an algo-supported, risk-managed trading system powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
};

export default function SPTCopyTradingPage() {
  return <CopyTradingFunnelPage />;
}
