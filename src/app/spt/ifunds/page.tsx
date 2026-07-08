import type { Metadata } from "next";
import { IFundsFunnelPage } from "@/components/spt/ifunds-funnel";

export const metadata: Metadata = {
  title: "iFunds Prop Trading | Smart Profits Trader",
  description:
    "Get an instantly funded prop trading account through iFunds — no evaluation, no challenge. $700 for a $10k account, $1,600 for a $25k account. Smart Profits Trader manages the trading for you."
};

export default function SPTiFundsPage() {
  return <IFundsFunnelPage />;
}
