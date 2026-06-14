import type { Metadata } from "next";
import { funnelPages, SPTFunnelPage } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Evaluation Account Management | Smart Profitable Trader",
  description: "Apply for Smart Profitable Trader evaluation account management for Phase 1, Phase 2, and funded prop firm account support."
};

export default function SPTEvaluationPage() {
  return <SPTFunnelPage page={funnelPages.evaluation} />;
}
