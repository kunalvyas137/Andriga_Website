"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Bot, User, Send, RefreshCw, FileText, Edit3, Sparkles, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

// Hospital context data
const defaultContext = `# City Health Medical Center

## Available Doctors

### Dr. Sarah Smith - Cardiologist
- **Specialization:** Heart health, cardiovascular diseases
- **Available Days:** Monday, Wednesday, Friday
- **Available Slots:** 9:00 AM, 10:00 AM, 2:00 PM, 4:00 PM
- **Consultation Fee:** $150

### Dr. James Johnson - Neurologist
- **Specialization:** Brain and nervous system disorders
- **Available Days:** Tuesday, Thursday
- **Available Slots:** 10:00 AM, 11:00 AM, 3:00 PM
- **Consultation Fee:** $175

### Dr. Emily Chen - Pediatrician
- **Specialization:** Child healthcare, vaccinations
- **Available Days:** Monday, Tuesday, Wednesday
- **Available Slots:** 9:00 AM, 11:00 AM, 2:00 PM, 4:00 PM
- **Consultation Fee:** $120

### Dr. Michael Brown - Orthopedic Surgeon
- **Specialization:** Bone and joint issues, sports injuries
- **Available Days:** Wednesday, Thursday, Friday
- **Available Slots:** 10:00 AM, 1:00 PM, 4:00 PM
- **Consultation Fee:** $200

### Dr. Lisa Davis - Dermatologist
- **Specialization:** Skin conditions, cosmetic dermatology
- **Available Days:** Monday, Friday
- **Available Slots:** 9:00 AM, 12:00 PM, 3:00 PM
- **Consultation Fee:** $130

## Hospital Services
- Emergency Care (24/7)
- Consultation Booking
- Follow-up Appointments
- Lab Tests & Diagnostics
- Pharmacy Services

## Booking Policy
- Appointments can be booked up to 2 weeks in advance
- Cancellations must be made 24 hours before the appointment
- New patients need to arrive 15 minutes early for registration
`;

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const initialMessages: Message[] = [
    {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant for City Health Medical Center. I can help you with:\n\n• Finding a doctor based on your needs\n• Checking doctor availability\n• Booking appointments\n• Information about our services\n\nHow can I assist you today?",
    },
];

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

export default function DemoPage() {
    const [context, setContext] = useState(defaultContext);
    const [isEditingContext, setIsEditingContext] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
    const [speechSupported, setSpeechSupported] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Check for speech support on mount
    useEffect(() => {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        setSpeechSupported(!!SpeechRecognitionAPI && !!window.speechSynthesis);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Text-to-Speech function
    const speakText = useCallback((text: string) => {
        if (!isSpeechEnabled || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Clean markdown formatting for better speech
        const cleanText = text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/•/g, "")
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
    }, [isSpeechEnabled]);

    // Speech-to-Text function
    const toggleListening = useCallback(() => {
        if (!speechSupported) return;

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionAPI) return;

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setInput(transcript);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    }, [isListening, speechSupported]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input.trim(),
                    context: context,
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response,
            };
            setMessages((prev) => [...prev, assistantMessage]);

            // Speak the response
            speakText(data.response);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I apologize, but I encountered an error processing your request. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setMessages(initialMessages);
        setContext(defaultContext);
        setIsEditingContext(false);
        window.speechSynthesis?.cancel();
    };

    const toggleSpeech = () => {
        if (isSpeechEnabled) {
            window.speechSynthesis?.cancel();
        }
        setIsSpeechEnabled(!isSpeechEnabled);
    };

    return (
        <>
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
                            Interactive AI Demo
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Experience <GradientText>RAG-Powered AI</GradientText>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            See how our AI assistant reads context and provides intelligent,
                            relevant responses. Try the hospital appointment booking simulation below.
                        </p>
                        {speechSupported && (
                            <p className="text-sm text-[var(--accent-primary)] mt-2">
                                🎤 Voice enabled! Click the microphone to speak, or toggle the speaker for audio responses.
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
                            <span className="text-sm font-medium">RAG Demo - Hospital Appointment System</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {speechSupported && (
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

                    {/* Split View */}
                    <div className="grid lg:grid-cols-2 min-h-[600px]">
                        {/* Context Panel */}
                        <div className="border-r border-[var(--border-subtle)] flex flex-col">
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
                                            {context}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chat Panel */}
                        <div className="flex flex-col">
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
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${message.role === "user"
                                                ? "bg-[var(--accent-primary)] text-white rounded-br-sm"
                                                : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded-bl-sm"
                                                }`}
                                        >
                                            <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
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
                                        placeholder={isListening ? "Listening..." : "Type your message..."}
                                        className="flex-1 px-4 py-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                        disabled={isLoading}
                                    />
                                    {speechSupported && (
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
                                    {speechSupported
                                        ? "Voice enabled! Click the mic to speak or type your message."
                                        : "This demo uses our API backend. Connect your Gemini API key for real AI responses."}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* How it Works */}
            <Section>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">How RAG Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "1",
                                title: "Context Loading",
                                description: "The AI reads and indexes the context document (left panel) to understand available information.",
                            },
                            {
                                step: "2",
                                title: "Query Understanding",
                                description: "When you ask a question, the AI analyzes your intent and retrieves relevant context.",
                            },
                            {
                                step: "3",
                                title: "Intelligent Response",
                                description: "The AI generates accurate, contextual responses based on the retrieved information.",
                            },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white font-bold flex items-center justify-center mx-auto mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}
