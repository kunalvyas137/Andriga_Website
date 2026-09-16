"use client";

import { useCallback, useRef, useState } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

type ConversationState = "idle" | "listening" | "processing" | "speaking" | "greeting";

interface UseDeepgramVoiceOptions {
    onFinalTranscript: (text: string) => void;
    onInterimTranscript: (text: string) => void;
    onStateChange: (state: ConversationState) => void;
    voiceName?: string;
    /** Ref to know whether voice-bot mode is active (to auto-reconnect) */
    isVoiceBotActiveRef?: React.RefObject<boolean>;
}

interface UseDeepgramVoiceReturn {
    isListening: boolean;
    deepgramReady: boolean;
    startListening: () => Promise<void>;
    stopListening: () => void;
    speak: (text: string, onComplete?: () => void) => Promise<void>;
    stopSpeaking: () => void;
}

export function useDeepgramVoice({
    onFinalTranscript,
    onInterimTranscript,
    onStateChange,
    voiceName = "aura-2-thalia-en",
    isVoiceBotActiveRef,
}: UseDeepgramVoiceOptions): UseDeepgramVoiceReturn {
    const [isListening, setIsListening] = useState(false);
    const [deepgramReady] = useState(true);

    const liveRef = useRef<ReturnType<ReturnType<typeof createClient>["listen"]["live"]> | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioSourceRef = useRef<HTMLAudioElement | null>(null);
    const isSpeakingRef = useRef(false);
    const isConnectingRef = useRef(false);   // guard against double-connect races
    const isListeningRef = useRef(false);    // shadow of isListening for closure use

    // ─── Get API key from server ─────────────────────────────────────────────
    const getApiKey = useCallback(async (): Promise<string | null> => {
        try {
            const res = await fetch("/api/deepgram-token");
            const data = await res.json();
            return data.key ?? null;
        } catch {
            return null;
        }
    }, []);

    // ─── Cleanup helpers ─────────────────────────────────────────────────────
    const cleanupStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
    }, []);

    const stopSpeakingInternal = useCallback(() => {
        isSpeakingRef.current = false;
        // audioSourceRef now holds an HTMLAudioElement
        if (audioSourceRef.current) {
            try {
                const audio = audioSourceRef.current as HTMLAudioElement;
                audio.pause();
                audio.src = "";
            } catch { /* ignore */ }
            audioSourceRef.current = null;
        }
    }, []);

    const stopListeningInternal = useCallback(() => {
        isListeningRef.current = false;
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
            mediaRecorderRef.current = null;
        }
        if (liveRef.current) {
            liveRef.current.removeAllListeners();
            try { liveRef.current.disconnect(); } catch { /* ignore */ }
            liveRef.current = null;
        }
        setIsListening(false);
    }, []);

    // ─── STT: Start listening (Deepgram SDK) ─────────────────────────────────
    const startListening = useCallback(async () => {
        // Guard against concurrent connect attempts or already-listening state
        if (isConnectingRef.current || isListeningRef.current || liveRef.current) return;
        isConnectingRef.current = true;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const apiKey = await getApiKey();
            if (!apiKey) {
                console.error("Could not obtain Deepgram API key from server");
                cleanupStream();
                isConnectingRef.current = false;
                return;
            }

            const deepgram = createClient(apiKey);
            const live = deepgram.listen.live({
                model: "nova-3",
                language: "en-US",
                endpointing: 400,
                interim_results: true,
                utterance_end_ms: 1200,
                smart_format: true,
                punctuate: true,
            });

            liveRef.current = live;

            // Accumulates is_final pieces between UtteranceEnd events
            let lastFinalTranscript = "";

            const submitTranscript = () => {
                const text = lastFinalTranscript.trim();
                lastFinalTranscript = "";
                if (!text) return;
                onInterimTranscript("");
                stopListeningInternal();
                cleanupStream();
                onFinalTranscript(text);
            };

            live.on(LiveTranscriptionEvents.Open, () => {
                isConnectingRef.current = false;
                isListeningRef.current = true;
                setIsListening(true);
                onStateChange("listening");

                const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                    ? "audio/webm;codecs=opus"
                    : "audio/webm";
                const mediaRecorder = new MediaRecorder(stream, { mimeType });

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && live.getReadyState() === WebSocket.OPEN) {
                        live.send(event.data);
                    }
                };

                mediaRecorder.start(100);
                mediaRecorderRef.current = mediaRecorder;
            });

            live.on(LiveTranscriptionEvents.Transcript, (data) => {
                const transcript = data.channel?.alternatives?.[0]?.transcript;
                if (!transcript) return;

                if (data.is_final) {
                    // Accumulate final pieces (multiple is_final events can come before UtteranceEnd)
                    lastFinalTranscript = transcript;
                    onInterimTranscript(transcript);

                    // speech_final = fast path: VAD is confident the utterance is done
                    if (data.speech_final) {
                        submitTranscript();
                    }
                } else {
                    // Interim result — show in input for live feedback
                    onInterimTranscript(transcript);
                    // Barge-in: stop TTS if user starts speaking with real words
                    if (isSpeakingRef.current && transcript.trim().split(" ").length >= 2) {
                        stopSpeakingInternal();
                        onStateChange("listening");
                    }
                }
            });

            // UtteranceEnd = primary submission path (1200ms silence triggers this reliably)
            live.on(LiveTranscriptionEvents.UtteranceEnd, () => {
                if (lastFinalTranscript.trim()) {
                    submitTranscript();
                } else {
                    onInterimTranscript("");
                }
            });

            live.on(LiveTranscriptionEvents.Error, (err) => {
                console.error("Deepgram error:", err);
                isConnectingRef.current = false;
                stopListeningInternal();
                cleanupStream();
                onStateChange("idle");
            });

            live.on(LiveTranscriptionEvents.Close, () => {
                isConnectingRef.current = false;
                // Only update UI if we were actually listening (not already torn down manually)
                if (isListeningRef.current) {
                    isListeningRef.current = false;
                    setIsListening(false);
                    cleanupStream();
                    // Auto-reconnect after unexpected close if still in voice-bot mode
                    if (isVoiceBotActiveRef?.current) {
                        setTimeout(() => startListening(), 600);
                    }
                }
            });

        } catch (err) {
            console.error("Failed to start Deepgram STT:", err);
            isConnectingRef.current = false;
            isListeningRef.current = false;
            setIsListening(false);
            onStateChange("idle");
            cleanupStream();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getApiKey, onFinalTranscript, onInterimTranscript, onStateChange, cleanupStream, stopListeningInternal, stopSpeakingInternal, isVoiceBotActiveRef]);

    const stopListening = useCallback(() => {
        stopListeningInternal();
        cleanupStream();
        onInterimTranscript("");
        onStateChange("idle");
        isConnectingRef.current = false;
    }, [stopListeningInternal, cleanupStream, onInterimTranscript, onStateChange]);

    const stopSpeaking = useCallback(() => {
        stopSpeakingInternal();
        onStateChange("idle");
    }, [stopSpeakingInternal, onStateChange]);

    // ─── TTS: Speak via Deepgram Aura ────────────────────────────────────────
    // Uses HTMLAudioElement + blob URL so the browser can start playing as soon
    // as enough data is buffered, instead of waiting for the full download.
    const speak = useCallback(
        async (text: string, onComplete?: () => void) => {
            stopSpeakingInternal();
            onStateChange("speaking");
            isSpeakingRef.current = true;

            try {
                const res = await fetch("/api/tts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, voice: voiceName }),
                });

                if (!res.ok) throw new Error(`TTS request failed: ${res.status}`);

                if (!isSpeakingRef.current) {
                    onComplete?.();
                    return;
                }

                // Get blob so we can create a revocable object URL
                const blob = await res.blob();

                if (!isSpeakingRef.current) {
                    onComplete?.();
                    return;
                }

                const objectUrl = URL.createObjectURL(blob);
                const audio = new Audio(objectUrl);
                audioSourceRef.current = audio;

                audio.onended = () => {
                    URL.revokeObjectURL(objectUrl);
                    if (!isSpeakingRef.current) return;
                    isSpeakingRef.current = false;
                    audioSourceRef.current = null;
                    onStateChange("idle");
                    setTimeout(() => onComplete?.(), 200);
                };

                audio.onerror = () => {
                    URL.revokeObjectURL(objectUrl);
                    isSpeakingRef.current = false;
                    onStateChange("idle");
                    onComplete?.();
                };

                await audio.play();
            } catch (err) {
                console.error("TTS error:", err);
                isSpeakingRef.current = false;
                onStateChange("idle");
                onComplete?.();
            }
        },
        [voiceName, onStateChange, stopSpeakingInternal]
    );

    return {
        isListening,
        deepgramReady,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
    };
}
