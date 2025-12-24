import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANDRIGA | AI Solutions for Digital Transformation",
  description: "Transform your business with cutting-edge AI technology. ANDRIGA provides expert AI solutions for small to medium-sized businesses, helping employees and customers in day-to-day operations.",
  keywords: ["AI solutions", "digital transformation", "artificial intelligence", "business automation", "AI consulting"],
  authors: [{ name: "ANDRIGA" }],
  openGraph: {
    title: "ANDRIGA | AI Solutions for Digital Transformation",
    description: "Transform your business with cutting-edge AI technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
