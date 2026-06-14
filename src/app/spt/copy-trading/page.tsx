import type { Metadata } from "next";
import { funnelPages, SPTFunnelPage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Copy Trading and Personal Account Trading | Smart Profitable Trader",
  description: "Explore Smart Profitable Trader copy trading and personal account trading powered by structured, risk-managed trading operations."
};

export default function SPTCopyTradingPage() {
  return <SPTFunnelPage page={funnelPages["copy-trading"]} />;
}
