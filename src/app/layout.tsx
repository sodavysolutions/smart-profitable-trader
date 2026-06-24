import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
    template: "%s"
  },
  description:
    "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed.",
  openGraph: {
    title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed.",
    siteName: "Smart Profitable Trader",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Smart Profitable Trader | Algo-Powered Trading Ecosystem",
    description:
      "Smart Profitable Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed."
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Smart Profitable Trader"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
