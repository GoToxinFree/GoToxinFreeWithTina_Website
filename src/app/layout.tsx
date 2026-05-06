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
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
