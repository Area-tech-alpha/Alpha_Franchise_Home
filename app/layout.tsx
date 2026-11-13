import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { OrganizationJsonLd } from "@/components/json-ld";
import { content } from "@/lib/content";
import { IS_PRODUCTION_SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Mesmas famílias do WP (Fontshare + Google), auto-hospedadas em public/fonts.
const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/Inter-latin.woff2",
  weight: "300 700",
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
};

const { meta } = content;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  robots: IS_PRODUCTION_SITE ? undefined : { index: false, follow: false },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    locale: "pt_BR",
    type: "website",
    url: "/",
    siteName: meta.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${clashDisplay.variable} ${generalSans.variable} ${inter.variable}`}
    >
      <head>
        <OrganizationJsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
