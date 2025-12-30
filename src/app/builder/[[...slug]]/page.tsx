import { builder } from "@/lib/builder";
import BuilderContent from "@/components/BuilderContent";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}

// Enable ISR with revalidation
export const revalidate = 60;

// Generate static params for common pages
export async function generateStaticParams() {
    // Get all pages from Builder
    const pages = await builder.getAll("page", {
        fields: "data.url",
        options: { noTargeting: true },
    });

    return pages
        .map((page) => ({
            slug: page.data?.url?.split("/").filter(Boolean) || [],
        }))
        .filter((params) => params.slug.length > 0);
}

export default async function BuilderPage({ params }: PageProps) {
    const resolvedParams = await params;
    const urlPath = "/" + (resolvedParams.slug?.join("/") || "");

    // Don't handle the homepage - let the existing page.tsx handle it
    if (urlPath === "/") {
        notFound();
    }

    // Fetch the Builder content for this URL
    const content = await builder
        .get("page", {
            userAttributes: {
                urlPath: urlPath,
            },
            options: {
                noTargeting: true,
            },
        })
        .promise();

    // If no content found in Builder, show 404
    if (!content) {
        notFound();
    }

    return (
        <main>
            <BuilderContent content={content} />
        </main>
    );
}
