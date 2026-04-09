import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono'; 
import "./globals.css";
import { title } from 'process';
import { url } from 'inspector';

const geistSans = GeistSans; 
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "SEOtalo",
  description: "Best analytics app for agencies, consultants, affiliates, e-commerce, and more.",
  // The openGraph block MUST be inside these curly braces
  openGraph: {
    title: "SEOtalo",
    description: "Best analytics app for agencies, consultants, affiliates, e-commerce, and more.",
    url: 'https://seotalo-zf4y.vercel.app/',
    siteName: 'SEOtalo',
    images: [
      {
        url: '/opengraph-image.png', // Ensure this file is in your 'public' folder
        width: 1200,
        height: 630,
        alt: 'SEOtalo Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
   children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
      </head>
      
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}