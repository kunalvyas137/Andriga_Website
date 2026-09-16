import { NextRequest } from "next/server";
import { getGeminiClient } from "@/lib/gemini";

interface HistoryEntry {
    role: "user" | "assistant";
    content: string;
}

/**
 * Streaming chat endpoint.
 * Sends Gemini tokens as SSE so the client can start TTS on the first sentence
 * before the full response is generated, dramatically reducing perceived latency.
 *
 * SSE event format:
 *   data: {"token":"...","done":false}
 *   data: {"token":"","done":true,"fullText":"..."}
 */
export async function POST(request: NextRequest) {
    const encoder = new TextEncoder();
    const apiKey = process.env.GEMINI_API_KEY;

    const body = await request.json();
    const message: string = body.message || "";
    const context: string = body.context || "";
    const history: HistoryEntry[] = body.history || [];

    // Helper to write an SSE event into the stream
    function sseEvent(data: object): Uint8Array {
        return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
    }

    // --- No API key: use fallback immediately ---
    if (!apiKey) {
        const fallback = generateFallback(message);
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(sseEvent({ token: fallback, done: false }));
                controller.enqueue(sseEvent({ token: "", done: true, fullText: fallback }));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
    }

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const genAI = getGeminiClient();
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                // Pass the FULL context — the hospital doc is ~4KB, well within Gemini's
                // context window. Chunking was causing facts (like doctor names) to be missed.
                const contextSeed = [
                    {
                        role: "user" as const,
                        parts: [{ text: `You are Aria, a warm and friendly patient support agent at CityMed Hospital.\n\nFull hospital information (use this to answer all questions):\n${context || "No specific context provided."}\n\nHandle small talk naturally. For hospital questions use the information above — you have ALL of it.\nKeep responses SHORT (2-3 sentences max). Speak conversationally. No bullet points. No markdown.` }],
                    },
                    {
                        role: "model" as const,
                        parts: [{ text: "Got it! I'm Aria from CityMed — happy to help!" }],
                    },
                ];

                const rawHistory = history
                    .filter(h => h.content.trim())
                    .map(h => ({
                        role: h.role === "assistant" ? "model" as const : "user" as const,
                        parts: [{ text: h.content }],
                    }));

                const cleanHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];
                let lastRole: string | null = null;
                for (const entry of rawHistory) {
                    if (cleanHistory.length === 0 && entry.role === "model") continue;
                    if (entry.role === lastRole) continue;
                    cleanHistory.push(entry);
                    lastRole = entry.role;
                }

                const chat = model.startChat({
                    history: [...contextSeed, ...cleanHistory],
                });

                const result = await chat.sendMessageStream(message);

                let fullText = "";
                for await (const chunk of result.stream) {
                    const token = chunk.text();
                    if (token) {
                        fullText += token;
                        controller.enqueue(sseEvent({ token, done: false }));
                    }
                }

                controller.enqueue(sseEvent({ token: "", done: true, fullText }));
            } catch (err: any) {
                console.error("Streaming chat error:", err);
                const fallback = generateFallback(message);
                controller.enqueue(sseEvent({ token: fallback, done: false }));
                controller.enqueue(sseEvent({ token: "", done: true, fullText: fallback }));
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}

function generateFallback(query: string): string {
    const q = query.toLowerCase();
    if (/(hi|hello|hey|how are you)/i.test(q)) return "Hi there! I'm doing great, thanks for asking! How can I help you at CityMed today?";
    if (/(thank|thanks)/i.test(q)) return "You're so welcome! Anything else I can help with?";
    if (/(bye|goodbye)/i.test(q)) return "Take care! Don't hesitate to call back. Goodbye!";
    if (q.includes("appointment") || q.includes("book")) return "You can book an appointment by calling +91-98765-43210 or via our Patient Portal at portal.citymed.in — available 24/7!";
    if (q.includes("opd") || q.includes("timing")) return "Our General OPD runs Monday to Saturday, 8 AM to 2 PM. Evening OPD is Monday to Friday, 5 to 8 PM. Emergency is open 24/7.";
    if (q.includes("doctor") || q.includes("specialist")) return "We have specialists across 28 departments. Would you like availability and fee details for a specific specialty?";
    if (q.includes("fee") || q.includes("cost") || q.includes("price")) return "Consultation fees range from ₹300 for a General Physician up to ₹2,500 for a Super-Specialist.";
    if (q.includes("insurance") || q.includes("cashless")) return "We're empanelled with 45+ insurers including Ayushman Bharat. Just inform our Insurance Desk at reception on arrival.";
    if (q.includes("emergency") || q.includes("ambulance")) return "Emergency is open 24/7. For an ambulance dial 112 or call +91-98765-43200. Average response time is 8-12 minutes.";
    return "Happy to help! I can assist with appointments, doctors, billing, insurance, diagnostics, and more. What do you need?";
}
