import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Profitable Trader",
  description: "Trading business CRM, account tracking, renewals, and profit-share management."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
