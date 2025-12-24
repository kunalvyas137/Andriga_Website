"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, MessageCircle, FileText, Bot } from "lucide-react";

export default function DemoTeaserSection() {
    return (
        <Section className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/5 to-transparent" />

            <div className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <Bot className="w-4 h-4" />
                            Interactive Demo
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Experience AI in Action with Our{" "}
                            <GradientText>Live Demo</GradientText>
                        </h2>

                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            See how our RAG-powered AI assistant can transform customer service.
                            Try our hospital appointment booking simulation and witness intelligent
                            context-aware conversations in real-time.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center mt-0.5">
                                    <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Context-Aware Responses</h4>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        The AI reads and understands your business context to provide accurate, relevant answers.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center mt-0.5">
                                    <MessageCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Natural Conversations</h4>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Engage in human-like dialogues that understand intent and maintain context.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link href="/demo">
                            <Button size="lg">
                                Try the Demo
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Right: Demo Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl">
                            {/* Demo Window Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="ml-3 text-xs text-[var(--text-tertiary)]">AI Assistant Demo</span>
                            </div>

                            {/* Demo Content */}
                            <div className="grid grid-cols-2 min-h-[300px]">
                                {/* Context Panel */}
                                <div className="p-4 border-r border-[var(--border-subtle)]">
                                    <div className="text-xs font-medium text-[var(--text-tertiary)] mb-3">CONTEXT</div>
                                    <div className="space-y-2">
                                        <div className="p-2 rounded-lg bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent-primary)]">Dr. Sarah Smith</span>
                                            <br />Cardiologist - Mon, Wed, Fri
                                        </div>
                                        <div className="p-2 rounded-lg bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent-primary)]">Dr. James Johnson</span>
                                            <br />Neurologist - Tue, Thu
                                        </div>
                                        <div className="p-2 rounded-lg bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent-primary)]">Dr. Emily Chen</span>
                                            <br />Pediatrics - Mon, Tue, Wed
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Panel */}
                                <div className="p-4 flex flex-col">
                                    <div className="text-xs font-medium text-[var(--text-tertiary)] mb-3">CONVERSATION</div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-3 h-3 text-[var(--accent-primary)]" />
                                            </div>
                                            <div className="p-2 rounded-lg bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
                                                Hello! How can I help you schedule an appointment today?
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <div className="p-2 rounded-lg bg-[var(--accent-primary)] text-xs text-white">
                                                I need to see a heart specialist
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-3 h-3 text-[var(--accent-primary)]" />
                                            </div>
                                            <div className="p-2 rounded-lg bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)]">
                                                Dr. Sarah Smith is our cardiologist. She&apos;s available Mon, Wed, and Fri...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-3xl blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
