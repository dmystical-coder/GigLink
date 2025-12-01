import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://giglink.vercel.app"),
  title: {
    default: "GigLink - Decentralized Bounty Platform",
    template: "%s | GigLink",
  },
  description: "Connect with talent and get work done on the Base network. GigLink is the premier decentralized bounty platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giglink.vercel.app",
    siteName: "GigLink",
    title: "GigLink - Decentralized Bounty Platform",
    description: "Connect with talent and get work done on the Base network.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GigLink Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GigLink - Decentralized Bounty Platform",
    description: "Connect with talent and get work done on the Base network.",
    images: ["/og-image.png"],
    creator: "@giglink",
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://giglink.vercel.app/og-image.png",
    "fc:frame:button:1": "View Bounties",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://giglink.vercel.app",
  },
};

import { headers } from "next/headers";
import { AppKitProvider } from "@/context/AppKitProvider";

import { Toaster } from "@/components/ui/sonner";
import { NetworkBanner } from "@/components/NetworkBanner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppKitProvider cookies={cookies}>
          <NetworkBanner />
          {children}
          <Toaster />
        </AppKitProvider>
      </body>
    </html>
  );
}
