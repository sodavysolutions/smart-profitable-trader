import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Smart Profits Trader | Algo-Powered Trading Ecosystem";
const siteDescription =
  "Smart Profits Trader is a professional trading ecosystem offering VIP signals, copy trading, instant funded prop trading, and evaluation account management powered by the Smart Profit Algo. Trading involves risk and results are not guaranteed.";
const primaryLogo = "/images/smart-profits-trader-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smartprofitstrader.com"),
  title: {
    default: siteTitle,
    template: "%s"
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Smart Profits Trader",
    type: "website",
    images: [
      {
        url: primaryLogo,
        width: 420,
        height: 420,
        alt: "Smart Profits Trader logo"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [primaryLogo]
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Smart Profits Trader"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
