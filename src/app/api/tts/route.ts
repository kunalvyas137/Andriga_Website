import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies Deepgram Aura TTS requests server-side.
 * Streams audio back directly so playback can start as soon as first bytes arrive.
 */
export async function POST(request: NextRequest) {
    const apiKey = process.env.DEEPGRAM_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "DEEPGRAM_API_KEY is not configured" },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { text, voice = "aura-2-thalia-en" } = body;

        if (!text || typeof text !== "string") {
            return NextResponse.json({ error: "text is required" }, { status: 400 });
        }

        // Strip markdown and clean text for natural speech
        const cleanText = text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/#{1,6}\s/g, "")
            .replace(/•/g, "")
            .replace(/\n+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        // Keep TTS short for snappy voice responses (voice is conversational, not a monologue)
        const truncatedText = cleanText.length > 500
            ? cleanText.slice(0, 500) + "..."
            : cleanText;

        const ttsResponse = await fetch(
            `https://api.deepgram.com/v1/speak?model=${voice}&encoding=mp3`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: truncatedText }),
            }
        );

        if (!ttsResponse.ok) {
            const errorText = await ttsResponse.text();
            console.error("Deepgram TTS error:", errorText);
            return NextResponse.json(
                { error: "Deepgram TTS request failed" },
                { status: ttsResponse.status }
            );
        }

        // Stream the audio body directly — client receives bytes as they arrive
        return new NextResponse(ttsResponse.body, {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Cache-Control": "no-cache",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("TTS proxy error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
