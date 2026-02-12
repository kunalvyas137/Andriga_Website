import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Demo | ANDRIGA",
    description: "Experience RAG-Powered AI Assistant - Interactive demo of our intelligent AI technology.",
};

export default function DemoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
