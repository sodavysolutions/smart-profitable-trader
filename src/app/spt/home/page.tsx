import type { Metadata } from "next";
import { SPTHomepage } from "@/components/spt/sections";
import { BlueprintPopup } from "@/components/spt/BlueprintPopup";

export const metadata: Metadata = {
  title: "Smart Profits Trader | Copy Trading & Instant Funded Accounts",
  description:
    "Smart Profits Trader gives you two clear paths to trading income: Copy Trading (70/30 profit split) and Instant Funded via iFunds ($700 for a $10k account). Powered by the Smart Profit Algo. Trading involves risk.",
  openGraph: {
    title: "Smart Profits Trader | Copy Trading & Instant Funded Accounts",
    description:
      "Copy Trading and Instant Funded accounts via iFunds — powered by the Smart Profit Algo. We trade, you earn. Trading involves risk and results are not guaranteed."
  },
  twitter: {
    title: "Smart Profits Trader | Copy Trading & Instant Funded Accounts",
    description:
      "Copy Trading and Instant Funded accounts via iFunds — powered by the Smart Profit Algo. We trade, you earn. Trading involves risk and results are not guaranteed."
  }
};

export default function SPTHomePage() {
  return (
    <>
      <SPTHomepage />
      <BlueprintPopup />
    </>
  );
}
