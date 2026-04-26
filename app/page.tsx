import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

const BASE_URL = 'https://seotalo-zf4y.vercel.app';

// ─── Metadata ────────────────────────────────────────────────────────────────
// KEY RULE: When metadataBase is set, all image `url` values must be RELATIVE
// paths (e.g. '/opengraph.png'). Next.js prepends metadataBase automatically.
// Using an absolute URL alongside metadataBase causes double-prefixing like:
// https://seotalo-zf4y.vercel.app/https://seotalo-zf4y.vercel.app/opengraph.png
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'SEOtalo',
    template: '%s | SEOtalo',
  },
  description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'SEOtalo',
    description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',
    url: BASE_URL,
    siteName: 'SEOtalo',
    images: [
      {
        url: '/opengraph.png',  // ← RELATIVE — metadataBase prefixes this correctly
        width: 1200,
        height: 630,
        alt: 'SEOtalo – SEO analytics for agencies, consultants & e-commerce',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEOtalo',
    description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',
    images: ['/opengraph.png'],  // ← RELATIVE
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}