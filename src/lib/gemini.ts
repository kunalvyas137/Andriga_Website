import { GoogleGenerativeAI, FunctionDeclaration, Tool, SchemaType } from "@google/generative-ai";
import { ContextChunk, WorkflowStep } from "@/types/demo";

// Initialize Gemini API client
export function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    return new GoogleGenerativeAI(apiKey);
}

// Function declarations for agentic workflows
const checkAvailabilityFunction: FunctionDeclaration = {
    name: "check_doctor_availability",
    description: "Check if a doctor is available on a specific day and time",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            doctorName: {
                type: SchemaType.STRING,
                description: "The full name of the doctor",
            },
            day: {
                type: SchemaType.STRING,
                description: "The day of the week (e.g., Monday, Tuesday)",
            },
            timeSlot: {
                type: SchemaType.STRING,
                description: "The time slot (e.g., 9:00 AM, 2:00 PM)",
            },
        },
        required: ["doctorName", "day", "timeSlot"],
    },
};

const bookAppointmentFunction: FunctionDeclaration = {
    name: "book_appointment",
    description: "Book an appointment with a doctor",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            doctorName: {
                type: SchemaType.STRING,
                description: "The full name of the doctor",
            },
            day: {
                type: SchemaType.STRING,
                description: "The day of the week",
            },
            timeSlot: {
                type: SchemaType.STRING,
                description: "The time slot",
            },
            patientName: {
                type: SchemaType.STRING,
                description: "The patient's name (optional, can use 'Guest' if not provided)",
            },
        },
        required: ["doctorName", "day", "timeSlot"],
    },
};

const getDoctorInfoFunction: FunctionDeclaration = {
    name: "get_doctor_info",
    description: "Get detailed information about a specific doctor by name or specialization",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            query: {
                type: SchemaType.STRING,
                description: "Doctor name or specialization to search for",
            },
        },
        required: ["query"],
    },
};

export const agenticTools: Tool[] = [
    {
        functionDeclarations: [
            checkAvailabilityFunction,
            bookAppointmentFunction,
            getDoctorInfoFunction,
        ],
    },
];

// Simulate function execution (in production, this would call real APIs)
export function executeFunction(
    functionName: string,
    args: Record<string, any>,
    context: string
): { result: string; success: boolean } {
    switch (functionName) {
        case "check_doctor_availability":
            return checkDoctorAvailability(args, context);
        case "book_appointment":
            return bookAppointment(args, context);
        case "get_doctor_info":
            return getDoctorInfo(args, context);
        default:
            return { result: "Unknown function", success: false };
    }
}

function checkDoctorAvailability(
    args: Record<string, any>,
    context: string
): { result: string; success: boolean } {
    const { doctorName, day, timeSlot } = args;

    // Parse context to check availability
    const doctorSection = findDoctorSection(doctorName, context);
    if (!doctorSection) {
        return {
            result: `Doctor ${doctorName} not found in the system`,
            success: false
        };
    }

    // Check if day matches
    const availableDays = extractAvailableDays(doctorSection);
    const dayMatch = availableDays.some(d =>
        d.toLowerCase().includes(day.toLowerCase()) ||
        day.toLowerCase().includes(d.toLowerCase())
    );

    if (!dayMatch) {
        return {
            result: `Dr. ${doctorName} is not available on ${day}. Available days: ${availableDays.join(", ")}`,
            success: false,
        };
    }

    // Check if time slot matches
    const availableSlots = extractTimeSlots(doctorSection);
    const slotMatch = availableSlots.some(slot =>
        slot.includes(timeSlot) || timeSlot.includes(slot)
    );

    if (!slotMatch) {
        return {
            result: `The time slot ${timeSlot} is not available for Dr. ${doctorName} on ${day}. Available slots: ${availableSlots.join(", ")}`,
            success: false,
        };
    }

    return {
        result: `✓ Dr. ${doctorName} is available on ${day} at ${timeSlot}`,
        success: true,
    };
}

function bookAppointment(
    args: Record<string, any>,
    context: string
): { result: string; success: boolean } {
    const { doctorName, day, timeSlot, patientName = "Guest" } = args;

    // First check availability
    const availabilityCheck = checkDoctorAvailability({ doctorName, day, timeSlot }, context);
    if (!availabilityCheck.success) {
        return availabilityCheck;
    }

    // Simulate booking
    const confirmationNumber = Math.floor(100000 + Math.random() * 900000);

    return {
        result: `✓ Appointment booked successfully!
        
**Confirmation Details:**
- Patient: ${patientName}
- Doctor: ${doctorName}
- Date: ${day}
- Time: ${timeSlot}
- Confirmation #: APT${confirmationNumber}

You will receive a confirmation email shortly.`,
        success: true,
    };
}

function getDoctorInfo(
    args: Record<string, any>,
    context: string
): { result: string; success: boolean } {
    const { query } = args;

    const doctorSection = findDoctorSection(query, context);
    if (!doctorSection) {
        return {
            result: `No doctor found matching "${query}"`,
            success: false,
        };
    }

    return {
        result: doctorSection,
        success: true,
    };
}

// Helper functions
function findDoctorSection(query: string, context: string): string | null {
    const lines = context.split("\n");
    let currentSection = "";
    let relevant = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Start of a doctor section
        if (line.startsWith("###") && line.toLowerCase().includes(query.toLowerCase())) {
            relevant = true;
            currentSection = line + "\n";
            continue;
        }

        // Next section
        if (line.startsWith("###") && relevant) {
            return currentSection.trim();
        }

        if (relevant) {
            currentSection += line + "\n";
        }

        // End of doctors section
        if (line.startsWith("##") && !line.includes("Available Doctors") && relevant) {
            return currentSection.trim();
        }
    }

    return relevant ? currentSection.trim() : null;
}

function extractAvailableDays(doctorSection: string): string[] {
    const match = doctorSection.match(/Available Days:\*\* (.+)/);
    if (match) {
        return match[1].split(",").map(d => d.trim());
    }
    return [];
}

function extractTimeSlots(doctorSection: string): string[] {
    const match = doctorSection.match(/Available Slots:\*\* (.+)/);
    if (match) {
        return match[1].split(",").map(s => s.trim());
    }
    return [];
}

// Smart context chunking — section-aware, larger chunks so full Q&A blocks stay together
export function chunkContext(context: string, chunkSize: number = 1200, overlap: number = 150): ContextChunk[] {
    const chunks: ContextChunk[] = [];
    const lines = context.split("\n");
    let currentChunk = "";
    let startIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Start new chunk at ## headers (major sections) to keep sections intact
        if (line.startsWith("## ") && currentChunk.length > 0) {
            chunks.push({
                content: currentChunk.trim(),
                startIndex,
                endIndex: startIndex + currentChunk.length,
            });
            const overlapLines = lines.slice(Math.max(0, i - 2), i);
            currentChunk = overlapLines.join("\n") + "\n" + line + "\n";
            startIndex = startIndex + currentChunk.length - overlap;
        } else {
            currentChunk += line + "\n";
        }

        // Only split if significantly over limit (avoids cutting mid-answer)
        if (currentChunk.length >= chunkSize * 1.5) {
            chunks.push({
                content: currentChunk.trim(),
                startIndex,
                endIndex: startIndex + currentChunk.length,
            });
            startIndex += currentChunk.length - overlap;
            currentChunk = "";
        }
    }

    if (currentChunk.trim()) {
        chunks.push({
            content: currentChunk.trim(),
            startIndex,
            endIndex: startIndex + currentChunk.length,
        });
    }

    return chunks;
}

// Simple relevance scoring using keyword matching
export function scoreChunkRelevance(chunk: string, query: string): number {
    const queryWords = query.toLowerCase().split(/\s+/);
    const chunkWords = chunk.toLowerCase().split(/\s+/);

    let matches = 0;
    for (const qWord of queryWords) {
        if (qWord.length < 3) continue; // Skip short words
        for (const cWord of chunkWords) {
            if (cWord.includes(qWord) || qWord.includes(cWord)) {
                matches++;
                break;
            }
        }
    }

    return matches / queryWords.length;
}

// Get most relevant chunks — returns more chunks and uses a full-context fallback for broad queries
export function getRelevantChunks(
    context: string,
    query: string,
    topK: number = 6
): ContextChunk[] {
    const chunks = chunkContext(context);

    const scoredChunks = chunks.map(chunk => ({
        ...chunk,
        relevanceScore: scoreChunkRelevance(chunk.content, query),
    }));

    const sorted = scoredChunks.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    const topChunks = sorted.slice(0, topK);

    // If top relevance is very low (broad/greeting/small-talk), return all chunks
    // so the AI has the full picture rather than random fragments
    const topScore = topChunks[0]?.relevanceScore ?? 0;
    if (topScore < 0.15) {
        return scoredChunks; // full context
    }

    return topChunks;
}
