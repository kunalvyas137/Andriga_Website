"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Bot, User, Send, RefreshCw, FileText, Edit3, Sparkles, Mic, MicOff, Volume2, VolumeX, Settings, X, Check, AlertCircle } from "lucide-react";

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

// Suggested quick actions
const suggestedActions = [
    "Find a cardiologist",
    "Check availability",
    "Book an appointment",
    "Show all doctors"
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
    const [isStreaming, setIsStreaming] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState("");
    const [elevenlabsKeyInput, setElevenlabsKeyInput] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("rachel");
    const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
    const [apiKeyStatus, setApiKeyStatus] = useState<"unconfigured" | "configured" | "error">("unconfigured");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const streamingMessageRef = useRef<string>("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load API keys and voice preference from localStorage on mount
    useEffect(() => {
        const savedKey = localStorage.getItem("gemini_api_key");
        if (savedKey) {
            setApiKeyInput(savedKey);
            setApiKeyStatus("configured");
        }
        const savedElevenlabsKey = localStorage.getItem("elevenlabs_api_key");
        if (savedElevenlabsKey) {
            setElevenlabsKeyInput(savedElevenlabsKey);
        }
        const savedVoice = localStorage.getItem("selected_voice");
        if (savedVoice) {
            setSelectedVoice(savedVoice);
        }
    }, []);

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
    }, [messages, isStreaming]);

    // Save API keys
    const handleSaveApiKey = () => {
        if (apiKeyInput.trim()) {
            localStorage.setItem("gemini_api_key", apiKeyInput.trim());
            setApiKeyStatus("configured");
        }
        if (elevenlabsKeyInput.trim()) {
            localStorage.setItem("elevenlabs_api_key", elevenlabsKeyInput.trim());
        }
        setShowSettings(false);
    };

    // Save voice preference
    const handleVoiceChange = (voice: string) => {
        setSelectedVoice(voice);
        localStorage.setItem("selected_voice", voice);
    };

    // Text-to-Speech function with ElevenLabs
    const speakText = useCallback(async (text: string) => {
        if (!isSpeechEnabled) return;

        // Clean markdown formatting for better speech
        const cleanText = text
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/•/g, "")
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        setIsGeneratingVoice(true);

        try {
            // Try ElevenLabs first
            const response = await fetch("/api/voice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: cleanText,
                    voice: selectedVoice,
                }),
            });

            const contentType = response.headers.get("content-type");

            if (contentType?.includes("audio/mpeg")) {
                // Successfully got audio from ElevenLabs
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                if (audioRef.current) {
                    audioRef.current.pause();
                }

                const audio = new Audio(audioUrl);
                audioRef.current = audio;

                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    setIsGeneratingVoice(false);
                };

                audio.onerror = () => {
                    setIsGeneratingVoice(false);
                };

                await audio.play();
            } else {
                // Fallback to browser TTS
                const data = await response.json();
                if (data.fallback && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(cleanText);
                    utterance.rate = 1;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    utterance.onend = () => setIsGeneratingVoice(false);
                    window.speechSynthesis.speak(utterance);
                } else {
                    setIsGeneratingVoice(false);
                }
            }
        } catch (error) {
            console.error("Voice synthesis error:", error);
            // Fallback to browser TTS on error
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.volume = 1;
                utterance.onend = () => setIsGeneratingVoice(false);
                window.speechSynthesis.speak(utterance);
            } else {
                setIsGeneratingVoice(false);
            }
        }
    }, [isSpeechEnabled, selectedVoice]);

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

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: textToSend,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setErrorMessage(null);
        streamingMessageRef.current = "";

        // Create placeholder for streaming message
        const assistantMessageId = (Date.now() + 1).toString();
        setMessages((prev) => [
            ...prev,
            {
                id: assistantMessageId,
                role: "assistant",
                content: "",
            },
        ]);
        setIsStreaming(true);

        try {
            // Get conversation history (exclude the current streaming message)
            const history = messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            console.log("📤 Sending to API:");
            console.log("  Message:", textToSend);
            console.log("  History:", history.length, "messages");
            history.forEach((msg, idx) => {
                console.log(`    ${idx + 1}. [${msg.role}]: "${msg.content.substring(0, 50)}..."`);
            });

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: textToSend,
                    context: context,
                    history: history,
                }),
            });

            // Check if response is a stream
            const contentType = response.headers.get("content-type");

            if (contentType?.includes("text/event-stream")) {
                // Handle streaming response
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                if (!reader) throw new Error("No reader available");

                let fullResponse = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") {
                                break;
                            }
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.text) {
                                    fullResponse += parsed.text;
                                    streamingMessageRef.current = fullResponse;

                                    // Update the streaming message
                                    setMessages((prev) =>
                                        prev.map((msg) =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: fullResponse }
                                                : msg
                                        )
                                    );
                                }
                            } catch (e) {
                                // Ignore parse errors
                            }
                        }
                    }
                }

                // Speak the complete response
                speakText(fullResponse);
            } else {
                // Handle JSON response (fallback or error)
                let data;
                try {
                    const text = await response.text();
                    if (!text || text.trim() === '') {
                        throw new Error('Empty response from server');
                    }
                    data = JSON.parse(text);
                } catch (parseError) {
                    console.error('JSON parsing error:', parseError);
                    setErrorMessage('Failed to parse server response');
                    setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
                    return;
                }

                if (data.error) {
                    setErrorMessage(data.error);
                    // If there's a fallback response, use it
                    if (data.fallback && typeof data.fallback === 'string') {
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === assistantMessageId
                                    ? { ...msg, content: data.fallback }
                                    : msg
                            )
                        );
                        speakText(data.fallback);
                    } else {
                        // Remove the placeholder message if no fallback
                        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
                    }
                } else {
                    // Regular response
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantMessageId
                                ? { ...msg, content: data.response }
                                : msg
                        )
                    );
                    speakText(data.response);
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setErrorMessage("Network error. Please check your connection and try again.");

            // Remove the placeholder message
            setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    const handleReset = () => {
        setMessages(initialMessages);
        setContext(defaultContext);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsEditingContext(false);
        setErrorMessage(null);
        window.speechSynthesis?.cancel();
    };

    const toggleSpeech = () => {
        if (isSpeechEnabled) {
            window.speechSynthesis?.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
            }
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
                            Interactive AI Demo - Powered by Gemini
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
                    className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Demo Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-sm font-medium">RAG Demo - Hospital Appointment System</span>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    <AnimatePresence>
                        {showSettings && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden"
                            >
                                <div className="p-4 space-y-4">
                                    {/* Gemini API Configuration */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold">Gemini AI Configuration</h3>
                                            <div className="flex items-center gap-2">
                                                {apiKeyStatus === "configured" && (
                                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Connected
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="password"
                                                value={apiKeyInput}
                                                onChange={(e) => setApiKeyInput(e.target.value)}
                                                placeholder="Enter your Gemini API key..."
                                                className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                                            />
                                        </div>
                                        <p className="text-xs text-[var(--text-tertiary)]">
                                            Get your API key from{" "}
                                            <a
                                                href="https://aistudio.google.com/app/apikey"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--accent-primary)] hover:underline"
                                            >
                                                Google AI Studio
                                            </a>
                                        </p>
                                    </div>

                                    {/* ElevenLabs Voice Configuration */}
                                    <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
                                        <h3 className="text-sm font-semibold">ElevenLabs Voice (Optional)</h3>
                                        <div className="flex gap-2">
                                            <input
                                                type="password"
                                                value={elevenlabsKeyInput}
                                                onChange={(e) => setElevenlabsKeyInput(e.target.value)}
                                                placeholder="Enter your ElevenLabs API key..."
                                                className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                                            />
                                        </div>

                                        {/* Voice Selection */}
                                        <div>
                                            <label className="text-xs text-[var(--text-tertiary)] mb-2 block">Voice Persona</label>
                                            <select
                                                value={selectedVoice}
                                                onChange={(e) => handleVoiceChange(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                                            >
                                                <option value="rachel">🎯 Rachel - Calm, Professional (Default)</option>
                                                <option value="adam">💼 Adam - Clear, Authoritative</option>
                                                <option value="bella">😊 Bella - Warm, Friendly</option>
                                                <option value="antoni">🔊 Antoni - Deep, Confident</option>
                                            </select>
                                        </div>

                                        <p className="text-xs text-[var(--text-tertiary)]">
                                            Get your API key from{" "}
                                            <a
                                                href="https://elevenlabs.io/app/settings/api-keys"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--accent-primary)] hover:underline"
                                            >
                                                ElevenLabs
                                            </a>
                                            . Natural AI voices (Free: 10k chars/month, Fallback: browser TTS)
                                        </p>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end pt-2">
                                        <Button size="sm" onClick={handleSaveApiKey}>
                                            Save Configuration
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Banner */}
                    <AnimatePresence>
                        {errorMessage && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-b border-[var(--border-subtle)] bg-yellow-500/10 overflow-hidden"
                            >
                                <div className="p-3 flex items-center gap-2 text-sm text-yellow-500">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span className="flex-1">{errorMessage}</span>
                                    <button
                                        onClick={() => setErrorMessage(null)}
                                        className="p-1 hover:bg-yellow-500/20 rounded"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Split View */}
                    <div className="grid lg:grid-cols-2 h-[600px]">
                        {/* Context Panel */}
                        <div className="border-r border-[var(--border-default)] flex flex-col h-full min-h-0">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
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
                                        className="w-full h-full min-h-[500px] bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-lg p-4 text-sm font-mono text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
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
                        <div className="flex flex-col h-full min-h-0">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                                    <span className="text-sm font-medium">AI Assistant</span>
                                </div>
                                <div className="flex items-center gap-1">
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
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowSettings(!showSettings)}
                                        title="API Settings"
                                    >
                                        <Settings className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={handleReset}>
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
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
                                            {message.role === "assistant" && message.content === "" && isStreaming && (
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <span className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && !isStreaming && (
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

                            {/* Suggested Actions */}
                            {messages.length <= 1 && !isLoading && (
                                <div className="px-4 pb-2">
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedActions.map((action) => (
                                            <button
                                                key={action}
                                                onClick={() => handleSend(action)}
                                                className="px-3 py-1.5 text-xs rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="p-4 border-t border-[var(--border-default)]">
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
                                        className="flex-1 px-4 py-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
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
                                    {isGeneratingVoice ? (
                                        <span className="flex items-center justify-center gap-2 text-[var(--accent-primary)]">
                                            <span className="inline-block w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse" />
                                            Generating natural voice...
                                        </span>
                                    ) : apiKeyStatus === "configured" ? (
                                        "✨ Powered by Gemini AI with RAG | 🎤 Natural voice by ElevenLabs"
                                    ) : (
                                        "Configure your Gemini API key in settings for AI-powered responses"
                                    )}
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
