import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/public/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Toxin Free With Tina",
  description: "Eliminating pollutants and building a toxin-free future.",
  metadataBase: new URL("https://gotoxinfreewithtina.com"),
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Go Toxin Free With Tina",
    description: "Eliminating pollutants and building a toxin-free future.",
    url: "https://gotoxinfreewithtina.com",
    siteName: "Go Toxin Free With Tina",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Go Toxin Free With Tina logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Toxin Free With Tina",
    description: "Eliminating pollutants and building a toxin-free future.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
