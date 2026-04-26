import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

const BASE_URL = 'https://seotalo-zf4y.vercel.app';

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
  images: [
    {
      url: '/opengraph.png',      // your existing 1200×630 (compress to under 300KB)
      width: 1200,
      height: 630,
      alt: 'SEOtalo – SEO analytics',
      type: 'image/png',
    },
    {
      url: '/opengraph-small.png', // NEW: 400×400, under 100KB
      width: 400,
      height: 400,
      alt: 'SEOtalo',
      type: 'image/png',
    },
  ],
},

twitter: {
  card: 'summary_large_image',
  images: ['/opengraph.png'],
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

// ─── Root Layout ──
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