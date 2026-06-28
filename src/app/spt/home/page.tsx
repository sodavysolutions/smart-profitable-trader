import type { Metadata } from "next";
import { SPTHomepage } from "@/components/spt/sections";
import { BlueprintPopup } from "@/components/spt/BlueprintPopup";

export const metadata: Metadata = {
  title: "Smart Profits Trader | Algo-Powered Trading Ecosystem",
  description:
    "Smart Profits Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed.",
  openGraph: {
    title: "Smart Profits Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profits Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
  },
  twitter: {
    title: "Smart Profits Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profits Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
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
