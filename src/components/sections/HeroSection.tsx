"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, Bot, Globe2, Handshake, PiggyBank, Play, Smile, Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/hero-banner.png"
                    alt="AI Technology Background"
                    className="w-full h-full object-cover opacity-80"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/60 to-[var(--bg-primary)]" />
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
                            <span>This website is powered by AI</span>
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Transform Your Business with{" "}
                        <GradientText animate>Intelligent AI</GradientText>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Empower your organization with cutting-edge AI solutions that drive efficiency, innovation, and measurable growth.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
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
                        <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] text-center font-light">
                            Partner with us to design, develop, deploy, and maintain end-to-end custom software
                            solutions tailored to your business needs. We also serve as a trusted partner for your
                            ongoing technology and service requirements.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
                            {[
                                { label: "Global Expertise", Icon: Globe2 },
                                { label: "Cost Advantage", Icon: PiggyBank },
                                { label: "Intelligent Apps", Icon: Bot },
                                { label: "Happy Clients", Icon: Smile },
                                { label: "One Stop Tech Partner", Icon: Handshake },
                            ].map(({ label, Icon }) => (
                                <span
                                    key={label}
                                    className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--text-tertiary)]"
                                >
                                    <Icon className="h-5 w-5 text-[var(--accent-primary)]" aria-hidden />
                                    <span>{label}</span>
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
