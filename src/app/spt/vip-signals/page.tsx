import type { Metadata } from "next";
import { funnelPages, SPTFunnelPage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "VIP Signal Service | Smart Profitable Trader",
  description: "Join the Smart Profitable Trader VIP Signal Service for structured trading alerts supported by the Smart Profit Algo and weekly optimization reviews."
};

export default function SPTVipSignalsPage() {
  return <SPTFunnelPage page={funnelPages["vip-signals"]} />;
}
