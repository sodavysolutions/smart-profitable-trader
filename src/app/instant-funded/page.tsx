import type { Metadata } from "next";
import { InstantFundedFunnelPage } from "@/components/spt/instant-funded-funnel";

export const metadata: Metadata = {
  title: "Instant Funded Prop Trading | Smart Profitable Trader",
  description:
    "Get access to instant funded prop trading support through Smart Profitable Trader, including account setup guidance, algo-supported trading management, progress tracking, and profit-share handling."
};

export default function InstantFundedPage() {
  return <InstantFundedFunnelPage />;
}
