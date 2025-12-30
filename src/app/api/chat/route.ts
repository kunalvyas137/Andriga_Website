import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message, context } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const response = generateResponse(message, context || "");

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

function generateResponse(query: string, context: string): string {
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

    return "I understand you're looking for assistance. Based on the hospital information available to me, I can help with:\n\n• Finding the right doctor for your needs\n• Checking availability and time slots\n• Booking appointments\n• Information about consultation fees\n\nCould you please provide more details about what you need? For example, are you looking to see a specific type of specialist?";
}
