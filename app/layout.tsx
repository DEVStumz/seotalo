import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono'; 
import "./globals.css";

const geistSans = GeistSans; 
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "SEOtalo",
  description: "Best analytics app for agencies, consultants, affiliates, e-commerce, and more.",
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