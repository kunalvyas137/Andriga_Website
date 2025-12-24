"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/hero-banner.png"
                    alt="AI Technology Background"
                    className="w-full h-full object-cover opacity-90"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/70 via-[var(--bg-primary)]/50 to-[var(--bg-primary)]" />
            </div>

            {/* Content */}
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>Powered by Advanced AI Technology</span>
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        Transform Your Business with{" "}
                        <GradientText animate>Intelligent AI</GradientText>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto"
                    >
                        ANDRIGA delivers cutting-edge AI solutions for small to medium-sized businesses.
                        Empower your employees and customers with intelligent automation that drives real results.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto">
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                <Play className="w-4 h-4" />
                                Try AI Demo
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-16 pt-10 border-t border-[var(--border-subtle)]"
                    >
                        <p className="text-sm text-[var(--text-tertiary)] mb-6">
                            Trusted by innovative companies worldwide
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
                            {["TechCorp", "InnovateCo", "FutureLabs", "DataFlow", "SmartSys"].map((company) => (
                                <span key={company} className="text-lg font-semibold text-[var(--text-tertiary)]">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-[5]" />
        </section>
    );
}
