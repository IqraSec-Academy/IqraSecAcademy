import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/lib/site-config";
import { SiteNavbar } from "@/components/site-navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [
    "Cybersecurity Internship",
    "Web Application Penetration Testing",
    "WAPT Internship",
    "Cybersecurity Scripting",
    "Certificate Verification",
    "IqraSec Academy",
  ],
  authors: [{ name: siteConfig.founder.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    description: siteConfig.defaultDescription,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    description: siteConfig.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-body">
        <SiteNavbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
    </html>
  );
}
