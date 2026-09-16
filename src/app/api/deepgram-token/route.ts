import { NextResponse } from "next/server";

/**
 * Returns the Deepgram API key from the server so it never appears in the client bundle.
 * The key is used client-side only for the STT WebSocket connection.
 * For extra security in production, consider using Deepgram's /v1/auth/grant temp token API
 * (requires Growth plan or above).
 */
export async function GET() {
    const apiKey = process.env.DEEPGRAM_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "DEEPGRAM_API_KEY is not configured" },
            { status: 500 }
        );
    }

    return NextResponse.json({ key: apiKey.trim() });
}
