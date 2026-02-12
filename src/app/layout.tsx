"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDemoPage = pathname === "/demo";

  return (
    <html lang="en">
      <head>
        <title>ANDRIGA | AI Solutions for Digital Transformation</title>
        <meta name="description" content="Transform your business with cutting-edge AI technology. ANDRIGA provides expert AI solutions for small to medium-sized businesses, helping employees and customers in day-to-day operations." />
        <meta name="keywords" content="AI solutions, digital transformation, artificial intelligence, business automation, AI consulting" />
        <link rel="icon" href="/icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {!isDemoPage && <Header />}
        <main>{children}</main>
        {!isDemoPage && <Footer />}
      </body>
    </html>
  );
}
