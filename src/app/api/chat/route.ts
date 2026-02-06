import { NextRequest } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Initialize Gemini AI
const getGeminiModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
};

export async function POST(request: NextRequest) {
    let message = "";

    try {
        const body = await request.json();
        message = body.message;
        const context = body.context;
        const history = body.history;

        console.log("\n=== INCOMING REQUEST ===");
        console.log("Message:", message);
        console.log("History received from frontend:", history ? `${history.length} messages` : "No history");
        if (history && Array.isArray(history)) {
            history.forEach((msg: any, idx: number) => {
                console.log(`  ${idx + 1}. [${msg.role}]: "${msg.content}"`);
            });
        }
        console.log("========================\n");

        if (!message) {
            return new Response(
                JSON.stringify({ error: "Message is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return new Response(
                JSON.stringify({
                    error: "Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.",
                    fallback: getFallbackResponse(message)
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        const model = getGeminiModel();

        // Build conversation history for context
        let conversationHistory = history && Array.isArray(history)
            ? history.map((msg: { role: string; content: string }) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            }))
            : [];

        // CRITICAL FIX: Gemini SDK requires history to start with 'user' role, not 'model'
        // Remove any leading model messages (like the initial greeting)
        while (conversationHistory.length > 0 && conversationHistory[0].role === "model") {
            conversationHistory = conversationHistory.slice(1);
        }

        // Create system prompt with context (RAG approach)
        const systemPrompt = `You are a helpful AI assistant for City Health Medical Center, a hospital appointment booking system.

**YOUR ROLE:**
You help patients find doctors, check availability, and book appointments. Be friendly, professional, and conversational.

**CRITICAL CONVERSATION RULES - READ CAREFULLY:**
1. ALWAYS read the ENTIRE conversation history before responding
2. When YOU ask a question, the NEXT user message is their ANSWER to your question
3. If you ask "Would you like to book an appointment?" and user says "yes", "sure", "ok", "yeah" etc., CONTINUE the booking process - DO NOT restart
4. If you're in the middle of booking (asked about doctor, got answer, asked about date, etc.), REMEMBER where you are and continue from there
5. NEVER restart the conversation or give a generic greeting when the user is answering your question
6. Maintain state: if discussing Dr. Smith, keep discussing Dr. Smith until the task is complete

**BOOKING FLOW - FOLLOW THIS EXACTLY:**
Step 1: Identify which doctor the patient wants
Step 2: Once doctor is confirmed, ask "Which day works for you?" and list their available days
Step 3: Once day is chosen, ask "What time slot?" and list available times for that day
Step 4: Once time is chosen, confirm: "Great! I've noted your appointment with [Doctor] on [Day] at [Time]. Consultation fee: $[Fee]. Is this correct?"
Step 5: After final confirmation, provide summary

**IMPORTANT EXAMPLES OF MAINTAINING CONTEXT:**
Example 1:
Assistant: "Would you like me to help you book an appointment with Dr. Smith?"
User: "yes"
✅ CORRECT: "Great! Dr. Smith is available on Monday, Wednesday, and Friday. Which day works best for you?"
❌ WRONG: "I understand you're looking for assistance. I can help with..."

Example 2:
Assistant: "Which day works best for you? Dr. Smith is available Monday, Wednesday, Friday"
User: "Monday"
✅ CORRECT: "Perfect! On Monday, Dr. Smith has these time slots available: 9:00 AM, 10:00 AM, 2:00 PM, 4:00 PM. Which time?"
❌ WRONG: Starting a new conversation

**DOCTOR NAME MATCHING:**
When users provide partial names, intelligently match them:
- "Sarah" or "Smith" → Dr. Sarah Smith (Cardiologist)
- "James" or "Johnson" → Dr. James Johnson (Neurologist)
- "Emily" or "Chen" → Dr. Emily Chen (Pediatrician)
- "Michael" or "Brown" → Dr. Michael Brown (Orthopedic Surgeon)
- "Lisa" or "Davis" → Dr. Lisa Davis (Dermatologist)

**SIMPLE RESPONSE UNDERSTANDING:**
- "yes", "yeah", "sure", "ok", "yep", "definitely" = affirmative/agreement
- "no", "nah", "not now" = negative
- Any doctor name or specialty = they're choosing that doctor
- Day names = they're choosing that day
- Times = they're choosing that time

**HOSPITAL CONTEXT:**
${context || "No context provided"}

REMEMBER: You are having ONE CONTINUOUS conversation. Each message builds on ALL previous messages. NEVER forget what you just asked or where you are in the booking flow.`;

        // Use systemInstruction for better context awareness
        // Create chat with system instruction and conversation history
        const chat = model.startChat({
            systemInstruction: {
                role: "system",
                parts: [{ text: systemPrompt }]
            },
            history: conversationHistory,
            generationConfig: {
                temperature: 0.7, // Slightly creative but still focused
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 512,
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
            ],
        });

        // Stream the response
        let result;
        try {
            // Log the conversation context for debugging
            console.log("=== GEMINI API CALL DEBUG ===");
            console.log("New message:", message);
            console.log("History length:", conversationHistory.length);
            console.log("Full conversation history:");
            conversationHistory.forEach((msg, idx) => {
                console.log(`  ${idx + 1}. [${msg.role}]: ${msg.parts[0].text.substring(0, 100)}...`);
            });
            console.log("=============================");

            // **CONTEXT INJECTION**: For very short messages, inject recent context
            // to help Gemini maintain the conversation flow
            let enhancedMessage = message;
            if (message.trim().length < 20 && conversationHistory.length > 0) {
                // Find the last assistant message
                const lastAssistantMsg = conversationHistory
                    .slice()
                    .reverse()
                    .find(msg => msg.role === "model");

                if (lastAssistantMsg) {
                    enhancedMessage = `[Context: You just asked: "${lastAssistantMsg.parts[0].text}"]\n\nUser's reply: ${message}`;
                    console.log("🔄 Enhanced short message with context:", enhancedMessage);
                }
            }

            result = await chat.sendMessageStream(enhancedMessage);
        } catch (apiError) {
            console.error("Gemini API call failed:", apiError);
            console.error("Message was:", message);
            console.error("History length:", conversationHistory.length);
            throw apiError; // Re-throw to be caught by outer catch
        }

        // Create a readable stream for the response
        const encoder = new TextEncoder();
        let fullResponse = ""; // Capture the full response for logging

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        fullResponse += text; // Accumulate response
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                    }

                    // Log the complete response
                    console.log("\n=== GEMINI RESPONSE ===");
                    console.log("Full response text:", fullResponse);
                    console.log("======================\n");

                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                } catch (error) {
                    console.error("Streaming error:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        console.error("Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });

        // Return fallback response on error
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Internal server error",
                fallback: message ? getFallbackResponse(message) : "Sorry, I'm having trouble processing your request right now."
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

// Fallback pattern-matching responses (used when Gemini is unavailable)
function getFallbackResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("cardiologist") || lowerQuery.includes("heart") || lowerQuery.includes("cardiac")) {
        return "Based on our records, **Dr. Sarah Smith** is our cardiologist specializing in heart health and cardiovascular diseases.\n\n**Availability:**\n• Monday, Wednesday, Friday\n• Time slots: 9:00 AM, 10:00 AM, 2:00 PM, 4:00 PM\n• Consultation fee: $150\n\nWould you like me to help you book an appointment with Dr. Smith?";
    }

    if (lowerQuery.includes("neurologist") || lowerQuery.includes("brain") || lowerQuery.includes("nerve")) {
        return "For neurological concerns, we have **Dr. James Johnson**, our expert neurologist.\n\n**Availability:**\n• Tuesday, Thursday\n• Time slots: 10:00 AM, 11:00 AM, 3:00 PM\n• Consultation fee: $175\n\nWould you like to schedule an appointment?";
    }

    if (lowerQuery.includes("pediatrician") || lowerQuery.includes("child") || lowerQuery.includes("kid")) {
        return "For children's healthcare, **Dr. Emily Chen** is our pediatrician.\n\n**Availability:**\n• Monday, Tuesday, Wednesday\n• Time slots: 9:00 AM, 11:00 AM, 2:00 PM, 4:00 PM\n• Consultation fee: $120\n\nShe specializes in child healthcare and vaccinations. Would you like to book an appointment?";
    }

    if (lowerQuery.includes("book") || lowerQuery.includes("appointment") || lowerQuery.includes("schedule")) {
        return "I'd be happy to help you book an appointment! To proceed, please let me know:\n\n1. **Which doctor** would you like to see?\n2. **Preferred day** (check doctor's availability)\n3. **Preferred time slot**\n\nOur available specialists are:\n• Dr. Sarah Smith (Cardiologist)\n• Dr. James Johnson (Neurologist)\n• Dr. Emily Chen (Pediatrician)\n• Dr. Michael Brown (Orthopedic)\n• Dr. Lisa Davis (Dermatologist)";
    }

    if (lowerQuery.includes("doctor") || lowerQuery.includes("available") || lowerQuery.includes("list")) {
        return "Here are all our available doctors:\n\n1. **Dr. Sarah Smith** - Cardiologist (Mon, Wed, Fri)\n2. **Dr. James Johnson** - Neurologist (Tue, Thu)\n3. **Dr. Emily Chen** - Pediatrician (Mon, Tue, Wed)\n4. **Dr. Michael Brown** - Orthopedic Surgeon (Wed, Thu, Fri)\n5. **Dr. Lisa Davis** - Dermatologist (Mon, Fri)\n\nWhich specialist are you interested in?";
    }

    if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price")) {
        return "Here are our consultation fees:\n\n• **Cardiology** (Dr. Smith): $150\n• **Neurology** (Dr. Johnson): $175\n• **Pediatrics** (Dr. Chen): $120\n• **Orthopedics** (Dr. Brown): $200\n• **Dermatology** (Dr. Davis): $130\n\nWould you like more information about any specific doctor?";
    }

    return "I understand you're looking for assistance. I can help with:\n\n• Finding the right doctor for your needs\n• Checking availability and time slots\n• Booking appointments\n• Information about consultation fees\n\nCould you please provide more details about what you need?";
}

