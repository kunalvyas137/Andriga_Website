"use client";

import { Content } from "@builder.io/sdk-react";
import { builder } from "@/lib/builder";

interface BuilderPageProps {
    content: any;
    model?: string;
}

export default function BuilderContent({ content, model = "page" }: BuilderPageProps) {
    if (!content) {
        return null;
    }

    return (
        <Content
            content={content}
            model={model}
            apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY || ""}
        />
    );
}
