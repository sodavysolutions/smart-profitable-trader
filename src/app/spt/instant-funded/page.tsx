import type { Metadata } from "next";
import { funnelPages, SPTFunnelPage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Instant Funded Prop Trading | Smart Profitable Trader",
  description: "Apply for Smart Profitable Trader instant funded prop trading support with account setup, progress tracking, and risk-managed operations."
};

export default function SPTInstantFundedPage() {
  return <SPTFunnelPage page={funnelPages["instant-funded"]} />;
}
