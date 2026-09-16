"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import {
    Bot, User, Send, RefreshCw, FileText, Edit3, Sparkles, Mic, MicOff,
    Volume2, VolumeX, Radio, Brain, MessageSquare, GitBranch, Zap, Network,
    CheckCircle, XCircle, Clock, Loader2, TrendingUp
} from "lucide-react";
import { WorkflowStep, ContextChunk } from "@/types/demo";
import { useDeepgramVoice } from "@/hooks/useDeepgramVoice";

// Hospital Management context for AI demo
const defaultContext = `# CityMed Hospital - Patient & Admin Support

## Appointments

### How do I book an appointment?
Call our helpline at +91-98765-43210, visit the hospital reception (OPD Block, Ground Floor), or use the CityMed Patient Portal at portal.citymed.in. Online bookings are available 24/7. Walk-ins are accepted subject to doctor availability.

### What are the OPD timings?
- General OPD: Monday to Saturday, 8:00 AM – 2:00 PM
- Evening OPD: Monday to Friday, 5:00 PM – 8:00 PM
- Emergency: Open 24 hours, 7 days a week
- Sundays: Emergency and ICU services only

### Can I reschedule or cancel my appointment?
Yes. Call +91-98765-43210 or log in to the Patient Portal at least 2 hours before your scheduled time. Cancellations made less than 1 hour before the appointment may incur a ₹200 administrative fee.

### How do I book a specialist consultation?
Specialist consultations require a referral from a General Physician in most cases. However, direct appointments with Cardiologists, Orthopedic Surgeons, and Dermatologists can be booked directly via the portal or helpline.

### Is there a token system for OPD?
Yes. Tokens are issued from the OPD registration counter. Online bookings receive a pre-assigned token number via SMS one hour before the scheduled time, reducing waiting time significantly.

## Doctors & Departments

### Which specialties are available at CityMed?
CityMed has 28 specialty departments including:
- Cardiology & Cardiac Surgery
- Orthopedics & Joint Replacement
- Neurology & Neurosurgery
- Oncology & Cancer Care
- Obstetrics & Gynecology (OB-GYN)
- Pediatrics & Neonatology
- Gastroenterology
- Pulmonology & Chest Medicine
- Nephrology & Urology
- Dermatology & Plastic Surgery
- ENT (Ear, Nose, Throat)
- Ophthalmology
- General Medicine & Internal Medicine
- Psychiatry & Mental Health
- Endocrinology & Diabetes

### Who are the senior consultants available?
- **Dr. Rajesh Kumar** – Senior Cardiologist (MBBS, MD, DM Cardiology) | Mon, Wed, Fri: 10 AM–1 PM
- **Dr. Priya Sharma** – Chief Gynecologist (MBBS, MS OBG) | Tue, Thu, Sat: 9 AM–12 PM
- **Dr. Anil Mehta** – HOD Orthopedics (MBBS, MS Ortho, FRCS) | Mon–Fri: 11 AM–2 PM
- **Dr. Sunita Rao** – Senior Neurologist (MBBS, MD, DM Neurology) | Mon, Wed: 3 PM–6 PM
- **Dr. Vikram Patel** – Oncology Consultant (MBBS, MD, DNB Oncology) | Tue, Thu: 2 PM–5 PM
- **Dr. Meena Joshi** – Pediatrician & Neonatologist (MBBS, MD Pediatrics) | Daily: 9 AM–1 PM

### What is the consultation fee for doctors?
- General Physician: ₹300
- Specialist Consultant: ₹600 – ₹1,000
- Senior Consultant: ₹1,200 – ₹2,000
- Super-Specialist / HOD: ₹2,500
- Emergency Consultation: ₹500 (additional to regular fees)

### Are second opinions available?
Yes, CityMed offers second opinion consultations. You may bring previous reports, scans, and prescriptions. A dedicated second-opinion clinic runs every Saturday from 10 AM to 1 PM.

## Diagnostics & Lab

### What diagnostic services does CityMed offer?
- Pathology & Blood Tests (NABL Accredited Lab)
- Digital X-Ray & Fluoroscopy
- MRI (1.5T & 3T)
- CT Scan (128-slice)
- 2D Echo & Stress Echo
- Ultrasound & Color Doppler
- PET-CT Scan
- Mammography & DEXA Scan
- Pulmonary Function Test (PFT)
- Electroencephalography (EEG)

### What are lab timings and where are reports collected?
- Sample collection: Monday to Saturday, 6:30 AM – 12:00 PM (fasting samples preferred before 9 AM)
- Emergency lab: 24 hours
- Reports available via SMS link, Patient Portal, or Lab counter (Block B, Ground Floor)
- Routine reports: Within 6–24 hours
- STAT/Emergency reports: Within 1–2 hours

### Can I get home sample collection?
Yes, home sample collection is available within a 10 km radius of the hospital. Book via the Patient Portal or call +91-98765-43220. A technician visits between 6:30 AM and 10 AM. Additional charges: ₹150 within 5 km, ₹250 for 5–10 km.

## Billing & Insurance

### What payment modes are accepted?
CityMed accepts:
- Cash at all billing counters
- UPI (Google Pay, PhonePe, Paytm, BHIM)
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- Net Banking
- Corporate credit letters (for empanelled companies)

### Which insurance companies are empanelled with CityMed?
CityMed is empanelled with 45+ insurance providers including:
- Star Health Insurance
- HDFC ERGO Health
- Bajaj Allianz Health
- Niva Bupa (formerly Max Bupa)
- ICICI Lombard
- United India Insurance
- New India Assurance
- Government schemes: PMJAY (Ayushman Bharat), CGHS, ESIC, State Government schemes

### How does cashless insurance work at CityMed?
1. Inform the Insurance Desk (Main Reception, Ground Floor) at the time of admission
2. Submit your insurance card, government-issued ID, and doctor's referral letter
3. CityMed's TPA team initiates pre-authorization with your insurer
4. Approval typically takes 2–4 hours for planned admissions
5. Emergency cashless processing: 30–60 minutes

### What if my insurance claim is denied?
Our billing team will help you with reimbursement paperwork including itemized bills, discharge summary, and diagnostic reports. Contact the billing helpdesk at billing@citymed.in or +91-98765-43230.

### Do you have installment/EMI options?
Yes, CityMed offers No-Cost EMI through HDFC Bank, ICICI Bank, and Bajaj Finserv for bills above ₹10,000. Speak to the billing counter for eligibility.

## Admissions & Wards

### What types of rooms are available?
- **General Ward:** ₹1,500/day (6–8 beds per room)
- **Twin Sharing:** ₹3,000/day (2 beds per room, attached bathroom)
- **Single Private Room:** ₹5,500/day (AC, TV, sofa for attendant)
- **Deluxe Room:** ₹8,500/day (AC, smart TV, mini-fridge, attendant bed)
- **Suite:** ₹15,000/day (living area, kitchenette, meals included)
- **ICU:** Rates vary by acuity (₹8,000–₹18,000/day)

### What is the admission procedure?
1. Obtain an admission note from the treating doctor
2. Visit the Admission Desk (Main Reception)
3. Submit ID proof, insurance documents (if applicable), and doctor's note
4. Deposit advance payment (₹10,000 for general ward, ₹25,000+ for ICU/Surgery)
5. Room allocation is done based on availability and doctor preference

### Are attendants allowed to stay?
One attendant per patient is allowed. Attendant passes are issued from the nursing station. Attendants must follow hospital visiting hours and hygiene protocols.

### What are visiting hours?
- ICU & HDU: 12:00 PM – 1:00 PM and 6:00 PM – 7:00 PM only
- General Wards & Private Rooms: 9:00 AM – 12:00 PM and 4:00 PM – 8:00 PM
- COVID/Isolation Wards: No visitors (video calling facilitated by nursing staff)

## Emergency & Ambulance

### What emergency services are available?
CityMed's Emergency department operates 24/7 with:
- Trauma care (Level II Trauma Center)
- Cardiac catheterization lab (24/7 STEMI protocol)
- Emergency surgery OT
- Stroke management unit
- Pediatric emergency
- Poison control and toxicology

### How do I call an ambulance?
Dial **112** (National Emergency) or CityMed's direct ambulance line **+91-98765-43200**. ALS (Advanced Life Support) and BLS (Basic Life Support) ambulances are available. GPS tracking via the CityMed app.

### What is the response time for ambulances?
Average response time within city limits: 8–12 minutes. The ambulance team provides telephonic first-aid guidance while en route.

## Patient Services & Facilities

### What amenities does CityMed provide?
- 24-hour pharmacy (in-hospital)
- Cafeteria on Ground Floor and 4th Floor (8 AM – 10 PM)
- Free Wi-Fi throughout the campus
- Wheelchair and stretcher services (free of charge)
- Interpretation services for non-English/non-Hindi speakers
- Chapel/Prayer room (Basement Level)
- Patient counselling and social work services
- Parking (free for the first 30 minutes, ₹30/hour thereafter)

### How do I access my medical records?
- Request at the Medical Records Department (Block C, 1st Floor) with valid ID
- Records available within 3 working days
- Digital records downloadable via Patient Portal within 24 hours of discharge
- Medical records are retained for 7 years as per regulations

### Who do I contact for feedback or complaints?
Email: feedback@citymed.in
Patient Relations Desk: Main lobby, Ground Floor (9 AM – 6 PM)
Phone: +91-98765-43240
Complaints are acknowledged within 24 hours and resolved within 7 working days.
`;


interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    workflowSteps?: WorkflowStep[];
    sourcesUsed?: ContextChunk[];
}

const initialMessages: Message[] = [
    {
        id: "1",
        role: "assistant",
        content: "Hello! I'm CityMed's AI Patient Support Assistant, powered by **Gemini 2.0 with RAG**. I can help you with:\n\n• Booking & managing appointments\n• Doctor schedules and consultation fees\n• Diagnostics, lab tests & reports\n• Billing, insurance & cashless admissions\n• Room availability and ward information\n• Emergency services and ambulance\n\nHow can I assist you today?",
    },
];

// Deepgram-powered voice agent — no browser Web Speech API needed

export default function DemoPage() {
    const [context, setContext] = useState(defaultContext);
    const [isEditingContext, setIsEditingContext] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
    const [currentWorkflow, setCurrentWorkflow] = useState<WorkflowStep[]>([]);
    const [highlightedChunks, setHighlightedChunks] = useState<ContextChunk[]>([]);
    const [fallbackMode, setFallbackMode] = useState(false);

    // Voice Bot Mode states
    const [voiceBotMode, setVoiceBotMode] = useState(false);
    const [conversationState, setConversationState] = useState<'idle' | 'listening' | 'processing' | 'speaking' | 'greeting'>('idle');
    const [interimTranscript, setInterimTranscript] = useState("");

    // Start Conversation Overlay states
    const [showStartOverlay, setShowStartOverlay] = useState(true);
    const [conversationStarted, setConversationStarted] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const voiceBotModeRef = useRef(voiceBotMode);
    const conversationStateRef = useRef(conversationState);
    const isVoiceBotActiveRef = useRef(false); // passed to hook for auto-reconnect

    // Keep refs in sync for use inside closures
    useEffect(() => { voiceBotModeRef.current = voiceBotMode; isVoiceBotActiveRef.current = voiceBotMode; }, [voiceBotMode]);
    useEffect(() => { conversationStateRef.current = conversationState; }, [conversationState]);

    // Deepgram voice hook — handles STT WebSocket + TTS AudioContext
    const {
        isListening,
        deepgramReady,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
    } = useDeepgramVoice({
        onFinalTranscript: useCallback((text: string) => {
            if (text.trim()) handleSendRef.current(text);
        }, []),
        onInterimTranscript: useCallback((text: string) => {
            setInterimTranscript(text);
            setInput(text);
        }, []),
        onStateChange: useCallback((state) => {
            setConversationState(state);
        }, []),
        isVoiceBotActiveRef,
    });

    // Use a ref for handleSend to avoid stale closures in the hook callbacks
    const handleSendRef = useRef<(msg?: string) => void>(() => { });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Speak text using Deepgram Aura TTS (with speech enabled toggle)
    const speakText = useCallback((text: string, onComplete?: () => void) => {
        if (!isSpeechEnabled) {
            onComplete?.();
            return;
        }
        speak(text, onComplete);
    }, [isSpeechEnabled, speak]);

    // Toggle listening (for manual mic button in text mode)
    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    const handleSend = useCallback(async (messageOverride?: string) => {
        const messageToSend = messageOverride || input.trim();
        if (!messageToSend || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageToSend,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setInterimTranscript("");
        setIsLoading(true);
        setCurrentWorkflow([]);
        setHighlightedChunks([]);

        if (voiceBotModeRef.current) {
            setConversationState('processing');
            stopListening();
        }

        try {
            const history = messages
                .filter(m => m.id !== userMessage.id)
                .map(m => ({ role: m.role, content: m.content }));

            // ── Streaming SSE fetch ──────────────────────────────────────────
            const response = await fetch("/api/chat-stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageToSend, context, history }),
            });

            if (!response.ok || !response.body) throw new Error(`Server error: ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let fullText = "";
            let sentenceBuffer = "";
            let firstSentenceSpoken = false;
            const sentenceEnd = /[.!?][)\s"']*/;

            // ── Sequential TTS queue ─────────────────────────────────────────
            // Each item plays only AFTER the previous onended fires, preventing
            // concurrent TTS calls that would stop each other mid-playback.
            const ttsQueue: string[] = [];
            let ttsPlaying = false;
            let allEnqueued = false;

            const restartListening = () => {
                if (voiceBotModeRef.current) setTimeout(() => startListening(), 300);
            };

            const flushTTSQueue = () => {
                if (ttsPlaying || ttsQueue.length === 0) return;
                const text = ttsQueue.shift()!;
                ttsPlaying = true;
                speakText(text, () => {
                    ttsPlaying = false;
                    if (ttsQueue.length > 0) {
                        flushTTSQueue();           // chain to next item
                    } else if (allEnqueued) {
                        restartListening();        // all done, start mic
                    }
                    // else: more items still incoming from the stream
                });
            };

            const enqueueTTS = (text: string) => {
                const cleaned = text.trim();
                if (!cleaned || !isSpeechEnabled) return;
                ttsQueue.push(cleaned);
                flushTTSQueue();
            };

            // Add placeholder assistant message updated live
            const assistantId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "…" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter(l => l.startsWith("data: "));

                for (const line of lines) {
                    try {
                        const payload = JSON.parse(line.slice(6));

                        if (payload.done) {
                            fullText = payload.fullText || fullText;
                            // Enqueue any remaining buffer as the last TTS chunk
                            if (sentenceBuffer.trim()) {
                                enqueueTTS(sentenceBuffer);
                                sentenceBuffer = "";
                            } else if (!firstSentenceSpoken) {
                                // Response was so short it had no sentence boundary
                                enqueueTTS(fullText);
                            }
                            allEnqueued = true;
                            // If queue already drained before we set allEnqueued, kick restart now
                            if (!ttsPlaying && ttsQueue.length === 0) {
                                restartListening();
                            }
                        } else {
                            const token: string = payload.token || "";
                            fullText += token;
                            sentenceBuffer += token;

                            setMessages(prev => prev.map(m =>
                                m.id === assistantId ? { ...m, content: fullText } : m
                            ));

                            // Enqueue first sentence as soon as we hit a boundary
                            if (!firstSentenceSpoken && sentenceEnd.test(sentenceBuffer)) {
                                const match = sentenceBuffer.search(sentenceEnd);
                                const firstSentence = sentenceBuffer.slice(0, match + 1);
                                sentenceBuffer = sentenceBuffer.slice(match + 1).trimStart();
                                firstSentenceSpoken = true;
                                enqueueTTS(firstSentence);
                            }
                        }
                    } catch { /* skip malformed SSE lines */ }
                }
            }

            setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, content: fullText } : m
            ));

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I ran into an issue — please try again.",
            }]);
            if (voiceBotModeRef.current) setTimeout(() => startListening(), 1000);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, context, stopListening, startListening, speakText, isSpeechEnabled]);

    // Keep the ref always pointing to the latest handleSend
    useEffect(() => { handleSendRef.current = handleSend; }, [handleSend]);

    // Start Conversation from Overlay
    const startConversation = useCallback(() => {
        setShowStartOverlay(false);
        setConversationStarted(true);
        setVoiceBotMode(true);
        setConversationState('greeting');

        const greetingMessages = [
            "Hi there! Thanks for calling CityMed Hospital. I'm Aria, your patient support agent. How can I help you today?",
            "Hello! You've reached CityMed Hospital support. This is Aria speaking — what can I do for you today?",
            "Hi! Thanks for calling CityMed Hospital. What can I help you with?",
        ];
        const greeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];

        speakText(greeting, () => {
            setConversationState('idle');
            setTimeout(() => startListening(), 300);
        });
    }, [speakText, startListening]);

    // Toggle Voice Bot Mode
    const toggleVoiceBotMode = useCallback(() => {
        if (voiceBotMode) {
            setConversationState('speaking');
            speakText("Thanks for calling! Have a great day!", () => {
                setVoiceBotMode(false);
                stopListening();
                stopSpeaking();
                setConversationState('idle');
            });
        } else {
            startConversation();
        }
    }, [voiceBotMode, stopListening, stopSpeaking, speakText, startConversation]);

    const handleReset = () => {
        setMessages(initialMessages);
        setContext(defaultContext);
        setIsEditingContext(false);
        setCurrentWorkflow([]);
        setHighlightedChunks([]);
        setFallbackMode(false);
        setVoiceBotMode(false);
        setConversationState('idle');
        setInterimTranscript("");
        setShowStartOverlay(true);
        setConversationStarted(false);
        stopListening();
        stopSpeaking();
    };

    const toggleSpeech = () => {
        if (isSpeechEnabled) stopSpeaking();
        setIsSpeechEnabled(!isSpeechEnabled);
    };

    return (
        <>
            {/* Start Conversation Overlay */}
            <AnimatePresence>
                {showStartOverlay && deepgramReady && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
                        onClick={() => setShowStartOverlay(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setShowStartOverlay(false);
                            }
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="start-conversation-title"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="relative max-w-lg mx-4 p-8 md:p-12 bg-gradient-to-br from-[var(--bg-secondary)]/95 to-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-3xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient orbs */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-primary)]/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl" />

                            <div className="relative z-10 text-center">
                                {/* Animated Microphone Icon */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-lg"
                                >
                                    <Mic className="w-10 h-10 text-white" />
                                </motion.div>

                                {/* Title */}
                                <h2 id="start-conversation-title" className="text-2xl md:text-3xl font-bold mb-3">
                                    <GradientText>Start a Conversation</GradientText>
                                </h2>

                                {/* Description */}
                                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                                    Talk to our AI-powered support agent just like you would on a phone call.
                                    Ask questions, get help, and experience natural conversation.
                                </p>

                                {/* Start Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={startConversation}
                                    className="w-full md:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Radio className="w-5 h-5 mr-2" />
                                    Start Conversation
                                </Button>

                                {/* Skip Option */}
                                <button
                                    onClick={() => setShowStartOverlay(false)}
                                    className="mt-4 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                                >
                                    Skip and use text chat instead
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-32 pb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-20" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <Sparkles className="w-4 h-4" />
                            Real RAG + Agentic AI Workflows
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            <GradientText>Gemini 2.0 Powered Voice AI Agent</GradientText>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Experience real RAG (Retrieval Augmented Generation) with agentic workflows.
                            Watch the AI reason, plan, and execute multi-step tasks in real-time.
                        </p>
                        {deepgramReady && (
                            <p className="text-sm text-[var(--accent-primary)] mt-2">
                                🎤 Powered by Deepgram — speak naturally and I'll respond with a real human-like voice.
                            </p>
                        )}
                        {fallbackMode && (
                            <p className="text-sm text-yellow-500 mt-2">
                                ⚠️ Running in fallback mode. Add GEMINI_API_KEY to .env.local for full RAG capabilities.
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Demo Interface */}
            <Section className="py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Demo Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-sm font-medium">Real-Time AI Workflow Visualization</span>

                            {/* Conversation State Indicator */}
                            {voiceBotMode && (
                                <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                                    {conversationState === 'greeting' && '📞 Connecting...'}
                                    {conversationState === 'listening' && '🎤 Listening...'}
                                    {conversationState === 'processing' && '⚙️ Processing...'}
                                    {conversationState === 'speaking' && '🔊 Speaking...'}
                                    {conversationState === 'idle' && '⏸️ Ready'}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Voice Bot Mode Toggle */}
                            {deepgramReady && (
                                <Button
                                    variant={voiceBotMode ? "primary" : "secondary"}
                                    size="sm"
                                    onClick={toggleVoiceBotMode}
                                    title={voiceBotMode ? "Disable Voice Bot Mode" : "Enable Voice Bot Mode"}
                                    className={voiceBotMode ? "animate-pulse" : ""}
                                >
                                    <Radio className="w-4 h-4 mr-1" />
                                    Voice Bot {voiceBotMode ? "ON" : "OFF"}
                                </Button>
                            )}
                            {deepgramReady && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleSpeech}
                                    title={isSpeechEnabled ? "Disable voice responses" : "Enable voice responses"}
                                >
                                    {isSpeechEnabled ? (
                                        <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
                                    ) : (
                                        <VolumeX className="w-4 h-4" />
                                    )}
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={handleReset}>
                                <RefreshCw className="w-4 h-4" />
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* 3-Column Layout: Context | Chat | Workflow */}
                    <div className="grid lg:grid-cols-[320px_1fr_280px] h-[70vh] max-h-[800px] overflow-hidden">
                        {/* Context Panel */}
                        <div className="border-r border-[var(--border-subtle)] flex flex-col h-full min-h-0">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
                                    <span className="text-sm font-medium">Context Document</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditingContext(!isEditingContext)}
                                >
                                    <Edit3 className="w-4 h-4" />
                                    {isEditingContext ? "Done" : "Edit"}
                                </Button>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                {isEditingContext ? (
                                    <textarea
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                        className="w-full h-full min-h-[500px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-4 text-sm font-mono text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                                        placeholder="Enter your context here..."
                                    />
                                ) : (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] font-mono bg-transparent p-0">
                                            {highlightedChunks.length > 0 ? (
                                                <HighlightedContext context={context} chunks={highlightedChunks} />
                                            ) : (
                                                context
                                            )}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chat Panel */}
                        <div className="flex flex-col border-r border-[var(--border-subtle)] h-full min-h-0">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                                <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                                <span className="text-sm font-medium">AI Assistant</span>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                                                ? "bg-[var(--accent-primary)]"
                                                : "bg-[var(--accent-primary)]/20"
                                                }`}
                                        >
                                            {message.role === "user" ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div
                                                className={`max-w-[85%] p-3 rounded-2xl text-sm ${message.role === "user"
                                                    ? "bg-[var(--accent-primary)] text-white rounded-br-sm ml-auto"
                                                    : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded-bl-sm"
                                                    }`}
                                            >
                                                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                                            </div>
                                            {message.sourcesUsed && message.sourcesUsed.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {message.sourcesUsed.map((source, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full"
                                                        >
                                                            <TrendingUp className="w-3 h-3" />
                                                            {(source.relevanceScore || 0).toFixed(2)} relevance
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                                        </div>
                                        <div className="bg-[var(--bg-elevated)] p-3 rounded-2xl rounded-bl-sm">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-[var(--border-subtle)]">
                                {/* Voice Bot Mode Info */}
                                {voiceBotMode && (
                                    <div className="mb-2 text-xs text-center text-[var(--text-tertiary)]">
                                        <span className="inline-flex items-center gap-1">
                                            <Radio className="w-3 h-3 text-[var(--accent-primary)]" />
                                            Voice Bot Mode Active - Speak naturally, I'll respond automatically
                                        </span>
                                    </div>
                                )}

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={
                                            voiceBotMode
                                                ? (conversationState === 'greeting' ? "📞 Connecting..." :
                                                    conversationState === 'listening' ? "🎤 Listening..." :
                                                        conversationState === 'processing' ? "Processing..." :
                                                            conversationState === 'speaking' ? "Speaking..." : "Ready to listen...")
                                                : (isListening ? "Listening..." : "Type your message...")
                                        }
                                        className={`flex-1 px-4 py-3 rounded-full bg-[var(--bg-elevated)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all ${isListening
                                            ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20'
                                            : 'border-[var(--border-subtle)] focus:border-[var(--accent-primary)]'
                                            }`}
                                        disabled={isLoading || (voiceBotMode && conversationState !== 'idle' && conversationState !== 'listening')}
                                    />
                                    {deepgramReady && !voiceBotMode && (
                                        <Button
                                            type="button"
                                            variant={isListening ? "primary" : "secondary"}
                                            onClick={toggleListening}
                                            disabled={isLoading}
                                            title={isListening ? "Stop listening" : "Start voice input"}
                                        >
                                            {isListening ? (
                                                <MicOff className="w-4 h-4" />
                                            ) : (
                                                <Mic className="w-4 h-4" />
                                            )}
                                        </Button>
                                    )}
                                    <Button type="submit" disabled={isLoading || !input.trim()}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                                <p className="mt-2 text-xs text-[var(--text-tertiary)] text-center">
                                    {voiceBotMode
                                        ? "Voice Bot Mode: Just speak, no need to click anything!"
                                        : "Try: \"Book Dr. Sarah Smith on Friday at 2 PM\""
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Workflow Panel */}
                        <div className="flex flex-col bg-[var(--bg-primary)] h-full min-h-0">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
                                <GitBranch className="w-4 h-4 text-[var(--accent-primary)]" />
                                <span className="text-sm font-medium">Workflow</span>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                {currentWorkflow.length > 0 ? (
                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {currentWorkflow.map((step, idx) => (
                                                <WorkflowStepDisplay key={step.id} step={step} index={idx} />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-tertiary)]">
                                        <Zap className="w-8 h-8 mb-2 opacity-50" />
                                        <p className="text-sm">Workflow steps will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Features Section - keeping the existing ones from original */}
            <Section>
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Enhanced with <GradientText>RAG & Agentic AI</GradientText>
                    </h2>
                    <p className="text-[var(--text-secondary)]">
                        Powered by Gemini 2.0, this demo showcases production-ready AI capabilities
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Brain,
                            title: "Real RAG Technology",
                            description: "Genuine retrieval augmented generation with context grounding and source attribution",
                        },
                        {
                            icon: GitBranch,
                            title: "Agentic Workflows",
                            description: "Multi-step task execution with function calling and real-time visualization",
                        },
                        {
                            icon: TrendingUp,
                            title: "Relevance Scoring",
                            description: "Smart context chunking with semantic similarity for accurate retrieval",
                        },
                        {
                            icon: MessageSquare,
                            title: "Deepgram Voice",
                            description: "Human-like voice powered by Deepgram Nova-3 STT and Aura-2 TTS with barge-in support",
                        },
                        {
                            icon: Network,
                            title: "Function Calling",
                            description: "AI executes real actions like checking availability and booking appointments",
                        },
                        {
                            icon: Zap,
                            title: "Real-Time Updates",
                            description: "Watch the AI think, plan, and execute in real-time workflow panel",
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 hover:border-[var(--border-default)] transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </>
    );
}

// Workflow Step Component
function WorkflowStepDisplay({ step, index }: { step: WorkflowStep; index: number }) {
    const getStatusIcon = () => {
        switch (step.status) {
            case "completed":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "failed":
                return <XCircle className="w-4 h-4 text-red-500" />;
            case "running":
                return <Loader2 className="w-4 h-4 text-[var(--accent-primary)] animate-spin" />;
            default:
                return <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 items-start"
        >
            <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{step.name}</p>
                {step.details && (
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{step.details}</p>
                )}
                {step.error && (
                    <p className="text-xs text-red-500 mt-1">{step.error}</p>
                )}
            </div>
        </motion.div>
    );
}

// Highlighted Context Component
function HighlightedContext({ context, chunks }: { context: string; chunks: ContextChunk[] }) {
    // Simple highlighting by checking if text is in any chunk
    const lines = context.split("\n");

    return (
        <>
            {lines.map((line, idx) => {
                const isHighlighted = chunks.some(chunk => chunk.content.includes(line));
                return (
                    <div
                        key={idx}
                        className={isHighlighted ? "bg-[var(--accent-primary)]/20 px-1 rounded" : ""}
                    >
                        {line}
                        {"\n"}
                    </div>
                );
            })}
        </>
    );
}
