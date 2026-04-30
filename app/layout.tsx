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
  icons: { icon: '/icon.svg' },
  title: 'SEOtalo',
  description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',

  openGraph: {
    title: 'SEOtalo',
    description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',
    url: BASE_URL,
    siteName: 'SEO',
    images: [
      {
        url: '/images/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'SEOtalo',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEOtalo',
    description: 'Best analytics app for agencies, consultants, affiliates, e-commerce, and more.',
    images: ['/images/opengraph.png'],
  },
}


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