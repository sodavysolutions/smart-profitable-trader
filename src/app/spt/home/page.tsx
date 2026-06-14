import type { Metadata } from "next";
import { SPTHomepage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem by Laptop Lifestyle Income",
  description:
    "Smart Profitable Trader is a professional trading ecosystem by Laptop Lifestyle Income offering VIP signals, copy trading, personal account trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo."
};

export default function SPTHomePage() {
  return <SPTHomepage />;
}
