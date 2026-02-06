import { NextRequest } from "next/server";

// ElevenLabs voice presets
const VOICES = {
    rachel: "21m00Tcm4TlvDq8ikWAM", // Professional, calm female voice
    adam: "pNInz6obpgDQGcFmaJgB",   // Clear, authoritative male voice
    bella: "EXAVITQu4vr4xnSDxMaL",  // Warm, friendly female voice
    antoni: "ErXwobaYiN019PkySvjV", // Deep, confident male voice
};

export async function POST(request: NextRequest) {
    try {
        const { text, voice = "rachel" } = await request.json();

        if (!text) {
            return new Response(
                JSON.stringify({ error: "Text is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if API key is configured
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            return new Response(
                JSON.stringify({
                    error: "ElevenLabs API key not configured",
                    fallback: true // Signal to use browser TTS
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // Get voice ID
        const voiceId = VOICES[voice as keyof typeof VOICES] || VOICES.rachel;

        // Call ElevenLabs API
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: "POST",
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error("ElevenLabs API error:", error);
            return new Response(
                JSON.stringify({
                    error: "Voice synthesis failed",
                    fallback: true
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // Return audio stream
        const audioBuffer = await response.arrayBuffer();
        return new Response(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Cache-Control": "public, max-age=31536000",
            },
        });
    } catch (error) {
        console.error("Voice API error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Internal server error",
                fallback: true
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
}
