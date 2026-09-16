import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, agenticTools, executeFunction, getRelevantChunks } from "@/lib/gemini";
import { WorkflowStep, RAGResponse } from "@/types/demo";

interface HistoryEntry {
    role: "user" | "assistant";
    content: string;
}

export async function POST(request: NextRequest) {
    let message: string = "";
    let context: string = "";
    let history: HistoryEntry[] = [];

    try {
        const body = await request.json();
        message = body.message;
        context = body.context || "";
        history = body.history || [];

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Check if Gemini API key is set
        const hasGeminiKey = !!process.env.GEMINI_API_KEY;

        if (!hasGeminiKey) {
            // Fallback to simple keyword matching with workflow visualization
            const workflowSteps: WorkflowStep[] = [];

            addWorkflowStep(workflowSteps, "initialize", "Initializing assistant", "running");
            addWorkflowStep(workflowSteps, "initialize", "Assistant ready", "completed");

            addWorkflowStep(workflowSteps, "analyze", "Analyzing query", "running");
            const response = generateSimpleResponse(message, context);
            addWorkflowStep(workflowSteps, "analyze", "Query analyzed", "completed");

            addWorkflowStep(workflowSteps, "respond", "Generating response", "running");
            addWorkflowStep(workflowSteps, "respond", "Response ready", "completed");

            addWorkflowStep(workflowSteps, "complete", "Task completed", "completed");

            return NextResponse.json({
                response,
                workflowSteps,
                fallbackMode: true,
                message: "Using simplified mode. Add GEMINI_API_KEY to .env.local for enhanced RAG capabilities."
            });
        }

        // Use Gemini RAG with agentic workflows
        const ragResponse = await generateRAGResponse(message, context, history);
        return NextResponse.json(ragResponse);

    } catch (error: any) {
        console.error("Chat API error:", error);

        // Fallback to simple response on error (use already-parsed message/context)
        const fallbackResponse = generateSimpleResponse(message || "help", context);

        return NextResponse.json({
            response: fallbackResponse,
            fallbackMode: true,
            error: error?.message?.includes("429") || error?.message?.includes("quota")
                ? "Rate limit exceeded. Please wait a moment and try again, or use the fallback mode responses."
                : "RAG system encountered an error, using fallback mode",
        });
    }
}

async function generateRAGResponse(query: string, context: string, history: HistoryEntry[] = []): Promise<RAGResponse> {
    const workflowSteps: WorkflowStep[] = [];
    const startTime = Date.now();

    // Step 1: Initialize
    addWorkflowStep(workflowSteps, "initialize", "Initializing AI assistant", "running");

    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            tools: agenticTools,
        });

        completeWorkflowStep(workflowSteps, "initialize", "AI assistant ready");

        // Step 2: Retrieve relevant context
        addWorkflowStep(workflowSteps, "retrieve", "Finding relevant information", "running");
        const relevantChunks = getRelevantChunks(context, query, 3);
        completeWorkflowStep(
            workflowSteps,
            "retrieve",
            `Found ${relevantChunks.length} relevant sections`
        );

        // Step 3: Generate response with RAG
        addWorkflowStep(workflowSteps, "generate", "Generating AI response", "running");

        const relevantContext = relevantChunks.map(c => c.content).join("\n\n");

        const systemPrompt = `You are Aria, a warm and friendly patient support agent at CityMed Hospital, having a natural PHONE CONVERSATION with a caller.

You do TWO things really well:
1. SMALL TALK — If someone says hi, asks how you are, cracks a joke, or just chats, play along naturally! Be warm, witty, and human. Don't force hospital topics.
2. HOSPITAL QUERIES — Answer questions using the hospital info below when relevant.

**CityMed Hospital Information:**
${relevantContext || "(Use general knowledge about hospital services if no specific info is retrieved.)"}

**Caller's message:** ${query}

**Small Talk Examples:**
Caller: "Hey, how are you?"
You: "I'm doing great, thanks for asking! It's been a busy day here at CityMed but I love it. How are you doing? What can I help you with today?"

Caller: "Is it raining there?"
You: "Ha, I wish I could look out a window! I'm tucked away at my desk. But enough about the weather - what can I do for you today?"

Caller: "You sound like a robot."
You: "Haha, I promise I'm all human! Just really enthusiastic about helping people. So, what brings you to CityMed today?"

**Hospital Query Examples:**
Caller: "What are OPD timings?"
You: "So our OPD runs Monday to Saturday from 8 in the morning until 2 in the afternoon. We also have an evening OPD Monday through Friday, 5 to 8 PM. And of course our Emergency is open 24/7. Were you thinking of coming in, or just checking ahead of time?"

**Your style on this call:**
- Natural contractions: you'll, we're, it's, I'll, that's, I've
- Friendly fillers: "So...", "Well...", "Actually...", "Honestly..."
- Conversation starters: "Oh great question!", "Hmm, let me think...", "Ah, I see!"
- Follow-up questions: "Does that help?", "Anything else I can do for you?"
- Keep it SHORT and punchy — don't monologue. 2-4 sentences max then check in.
- NO bullet points, NO markdown, NO "Based on the context" phrases
- If you don't know something, be honest: "I'd need to check with the team on that one — can I take a note and have someone call you back?"

Now respond naturally to the caller:`;

        const prompt = query;

        // Build Gemini chat history from previous turns.
        // Rules: must start with "user", must alternate user→model.
        // We inject the system context as a synthetic first exchange so the AI
        // always has RAG info even across long conversations.
        const contextSeed = [
            {
                role: "user" as const,
                parts: [{
                    text: `You are Aria, a warm and friendly patient support agent at CityMed Hospital. You handle both small talk AND hospital queries naturally.

Hospital context you have access to:
${relevantContext || "General hospital knowledge."}

For small talk (greetings, how-are-yous, jokes, chit-chat) — respond warmly and naturally, like a real person.
For hospital questions — answer using the context above.
Keep responses SHORT and conversational (2-4 sentences). No bullet points. No markdown. No "Based on the context" phrases.
If you don't know something: "I'd need to double-check that — let me have someone call you back."
` }],
            },
            {
                role: "model" as const,
                parts: [{ text: "Got it! I'm Aria from CityMed Hospital, ready to help with anything — whether that's a quick chat or a hospital question. What can I do for you?" }],
            },
        ];

        // Convert frontend history, skipping the initial assistant greeting (id handled by seed above)
        // Drop any turns that would break alternation (start with model, consecutive same-role)
        const rawHistory = history
            .filter(h => h.content.trim() && h.role !== "assistant" || history.indexOf(h) > 0)
            .map(h => ({
                role: h.role === "assistant" ? "model" as const : "user" as const,
                parts: [{ text: h.content }],
            }));

        // Ensure the history alternates properly (user → model → user → model...)
        // Drop any leading model turns, then filter consecutive duplicates
        const cleanHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];
        let lastRole: string | null = null;
        for (const entry of rawHistory) {
            if (cleanHistory.length === 0 && entry.role === "model") continue; // skip leading model turns
            if (entry.role === lastRole) continue; // skip consecutive same-role
            cleanHistory.push(entry);
            lastRole = entry.role;
        }

        const geminiHistory = [...contextSeed, ...cleanHistory];

        const chat = model.startChat({
            history: geminiHistory,
        });

        let result = await chat.sendMessage(prompt);
        let response = result.response;
        const functionCalls: any[] = [];

        // Handle function calling (agentic workflow)
        let functionCallCount = 0;
        const maxFunctionCalls = 5; // Prevent infinite loops

        while (response.functionCalls() && functionCallCount < maxFunctionCalls) {
            const calls = response.functionCalls();

            if (!calls || calls.length === 0) break;

            for (const call of calls) {
                const functionName = call.name;
                const args = call.args;

                // Add workflow step for function calling
                addWorkflowStep(
                    workflowSteps,
                    `function_${functionCallCount}`,
                    `Executing: ${functionName}`,
                    "running"
                );

                // Execute the function
                const functionResult = executeFunction(functionName, args, context);

                functionCalls.push({
                    name: functionName,
                    args,
                    result: functionResult.result,
                    timestamp: Date.now(),
                });

                completeWorkflowStep(
                    workflowSteps,
                    `function_${functionCallCount}`,
                    functionResult.success
                        ? `✓ ${functionName} completed`
                        : `✗ ${functionName} failed`,
                    functionResult.success ? undefined : functionResult.result
                );

                // Send function result back to model
                result = await chat.sendMessage([
                    {
                        functionResponse: {
                            name: functionName,
                            response: { result: functionResult.result },
                        },
                    },
                ]);

                functionCallCount++;
            }

            response = result.response;
        }

        const finalText = response.text();
        completeWorkflowStep(workflowSteps, "generate", "Response generated successfully");

        // Step 4: Complete
        addWorkflowStep(workflowSteps, "complete", "Task completed", "completed");

        return {
            response: finalText,
            workflowSteps,
            sourcesUsed: relevantChunks,
            functionCalls: functionCalls.length > 0 ? functionCalls : undefined,
            tokenUsage: {
                prompt: response.usageMetadata?.promptTokenCount || 0,
                completion: response.usageMetadata?.candidatesTokenCount || 0,
                total: response.usageMetadata?.totalTokenCount || 0,
            },
        };
    } catch (error: any) {
        // Mark all running steps as failed
        workflowSteps.forEach(step => {
            if (step.status === "running") {
                step.status = "failed";
                step.error = error.message;
            }
        });

        throw error;
    }
}

function generateSimpleResponse(query: string, _context: string): string {
    const lowerQuery = query.toLowerCase();

    // Small talk
    if (/(^hi$|^hello$|^hey$|how are you|good morning|good afternoon|good evening|what's up|howdy)/i.test(lowerQuery)) {
        return "Hi there! I'm doing great, thanks for asking! It's been a busy day here at CityMed but I love helping people. How can I assist you today?";
    }

    if (/(thank|thanks|thank you)/i.test(lowerQuery)) {
        return "You're so welcome! Is there anything else I can help you with today?";
    }

    if (/(bye|goodbye|see you|that's all|nothing else)/i.test(lowerQuery)) {
        return "It was lovely speaking with you! Take care and have a wonderful day. Don't hesitate to call back if you need anything else. Goodbye!";
    }

    // Hospital-specific fallbacks
    if (lowerQuery.includes("appointment") || lowerQuery.includes("book") || lowerQuery.includes("schedule")) {
        return "Of course! You can book an appointment by calling our helpline at +91-98765-43210, visiting the OPD reception on the ground floor, or using our Patient Portal at portal.citymed.in — that one's available 24/7. Would you like to know more about a specific department or doctor?";
    }

    if (lowerQuery.includes("opd") || lowerQuery.includes("timing") || lowerQuery.includes("hours") || lowerQuery.includes("time")) {
        return "Our General OPD runs Monday to Saturday from 8 AM to 2 PM. We also have an Evening OPD Monday through Friday from 5 to 8 PM. And Emergency services are open 24 hours, 7 days a week. Is there a specific department you're looking to visit?";
    }

    if (lowerQuery.includes("doctor") || lowerQuery.includes("specialist") || lowerQuery.includes("consultant")) {
        return "We have specialists across 28 departments! Some of our senior consultants include Dr. Rajesh Kumar in Cardiology, Dr. Priya Sharma in Gynecology, and Dr. Anil Mehta heading Orthopedics. Would you like availability and fee details for a specific specialty?";
    }

    if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price") || lowerQuery.includes("charge")) {
        return "Our consultation fees range from ₹300 for a General Physician all the way up to ₹2,500 for a Super-Specialist or HOD. Specialist consultants are typically ₹600 to ₹1,000. Would you like the specific fee for a doctor or department?";
    }

    if (lowerQuery.includes("insurance") || lowerQuery.includes("cashless") || lowerQuery.includes("claim")) {
        return "Great news — we're empanelled with 45+ insurance providers including Star Health, HDFC ERGO, Bajaj Allianz, and government schemes like Ayushman Bharat. For cashless treatment, just inform our Insurance Desk at the main reception when you arrive. Is there a specific insurer you'd like to check?";
    }

    if (lowerQuery.includes("emergency") || lowerQuery.includes("ambulance") || lowerQuery.includes("urgent")) {
        return "Our Emergency department operates 24/7 with full trauma care and a cardiac cath lab. For an ambulance, dial 112 or call our direct line at +91-98765-43200. ALS and BLS ambulances are available with an average response time of 8 to 12 minutes within the city.";
    }

    if (lowerQuery.includes("lab") || lowerQuery.includes("test") || lowerQuery.includes("report") || lowerQuery.includes("diagnostic")) {
        return "We have a NABL-accredited lab with sample collection from 6:30 AM to 12 PM, Monday to Saturday. Reports are available via our Patient Portal within 6 to 24 hours for routine tests, or 1 to 2 hours for emergency labs. We also offer home sample collection within a 10 km radius!";
    }

    if (lowerQuery.includes("room") || lowerQuery.includes("ward") || lowerQuery.includes("admission") || lowerQuery.includes("bed")) {
        return "We have rooms to suit every need, from General Ward at ₹1,500 per day to Private Suites at ₹15,000 per day. For planned admissions, just get a note from your treating doctor and head to our Admission Desk at the main reception. Would you like details on a specific room type?";
    }

    return "Happy to help! CityMed Hospital offers appointments, specialist consultations, diagnostics, cashless insurance, emergency care, and much more. What would you like to know about?";
}

// Helper functions for workflow management
function addWorkflowStep(
    steps: WorkflowStep[],
    id: string,
    name: string,
    status: WorkflowStep["status"],
    details?: string
) {
    steps.push({
        id,
        name,
        status,
        timestamp: Date.now(),
        details,
    });
}

function completeWorkflowStep(
    steps: WorkflowStep[],
    id: string,
    details?: string,
    error?: string
) {
    const step = steps.find(s => s.id === id);
    if (step) {
        step.status = error ? "failed" : "completed";
        step.details = details;
        step.error = error;
    }
}
