import type { Metadata } from "next";
import { SPTHomepage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
  description:
    "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed.",
  openGraph: {
    title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
  },
  twitter: {
    title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
  }
};

export default function SPTHomePage() {
  return <SPTHomepage />;
}
