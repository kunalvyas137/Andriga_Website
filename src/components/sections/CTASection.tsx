"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
    return (
        <Section className="relative">
            <div className="relative">
                {/* Background card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] rounded-3xl border border-[var(--border-subtle)] p-8 md:p-12 lg:p-16 overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)] rounded-full blur-[150px] opacity-20" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--accent-secondary)] rounded-full blur-[100px] opacity-20" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Ready to <GradientText>Transform</GradientText> Your Business?
                        </h2>

                        <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
                            Let&apos;s discuss how ANDRIGA can help you leverage AI to streamline operations,
                            enhance customer experiences, and drive sustainable growth.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg">
                                    Schedule a Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="mailto:contact@andriga.com">
                                <Button variant="secondary" size="lg">
                                    <Mail className="w-4 h-4" />
                                    contact@andriga.com
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-[var(--text-tertiary)]">
                            Free consultation • No commitment • Response within 24 hours
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
