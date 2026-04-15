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

const BASE_URL = "https://visionrun.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vision Run — AR Running Glasses",
    template: "%s | Vision Run",
  },
  description:
    "Premium AR running glasses with live telemetry, adaptive coaching and route overlays. Train smarter. Run beyond reality.",
  keywords: [
    "AR running glasses", "smart running", "HUD glasses", "biometric training",
    "pace tracker", "Vision Run", "AR очки для бега",
  ],
  authors: [{ name: "Vision Run", url: BASE_URL }],
  creator: "Vision Run",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Vision Run",
    title: "Vision Run — AR Running Glasses",
    description:
      "Premium AR running glasses with live telemetry, adaptive coaching and route overlays.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vision Run AR Running Glasses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Run — AR Running Glasses",
    description:
      "Premium AR running glasses with live telemetry, adaptive coaching and route overlays.",
    images: ["/og-image.png"],
    creator: "@visionrun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      id="html-root"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
