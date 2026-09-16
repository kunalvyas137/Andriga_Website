"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";
import { Target, Eye, Heart, Users, Award, Lightbulb, ArrowRight, Rocket } from "lucide-react";

const values = [
    {
        icon: Lightbulb,
        title: "Customer",
        description: "We prioritize customer needs above everything - designing conversations, solutions, and systems that elevate every interaction and deliver exceptional experiences.",
    },
    {
        icon: Users,
        title: "Integrity And Trust",
        description: "We operate with absolute transparency, data responsibility, and ethical AI practices to build trust with clients, employees and partners.",
    },
    {
        icon: Heart,
        title: "Collaboration And Empowerment",
        description: "Best solutions come from empowered teams working together. We encourage curiosity, creativity, and shared ownership.",
    },
    {
        icon: Award,
        title: "Continuous Learning And Innovation",
        description: "In an AI-Driven world, learning is the key advantage. We embrace growth, adapt quickly, and stay ahead by evolving our skills, strategies and mindset.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-1 animate-float opacity-30" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Pioneering the Future of{" "}
                            <GradientText>AI Solutions</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                            Founded in 2025, ANDRIGA is on a mission to make AI accessible and impactful
                            for businesses of all sizes. We believe that intelligent technology should
                            empower, not complicate.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <Section>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-[var(--accent-primary)]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-[var(--text-secondary)]">
                            Our mission is to partner with organizations to design and implement scalable,
                            intelligent solutions that drive efficiency, engagement, and growth.
                            We help our clients harness the power of AI and technology to achieve
                            measurable transformation.
                            Through smart automation, data-driven insights, and AI-powered experiences,
                            we enable businesses to deliver seamless interactions and stay ahead in a
                            rapidly evolving digital landscape.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center mb-4">
                            <Eye className="w-6 h-6 text-[var(--accent-secondary)]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-[var(--text-secondary)]">
                            Our vision is to become the most trusted and ethical AI-powered technology partner,
                            transforming how businesses operate, innovate, and engage with the world.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* Values */}
            <Section withGrid>
                <SectionHeader
                    badge="Our Values"
                    title="What Drives Us"
                    subtitle="We believe Technology should amplify human potential. Our philosophy is to build AI systems that empower people, enrich interactions, and create meaningful impact."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="text-center p-6"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                                <value.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                            <p className="text-sm text-[var(--text-secondary)]">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Team */}
            <Section>
                <SectionHeader
                    badge="Our Focus"
                    title="We Don't Build Customers. We Build Relationships."
                    subtitle="A passionate team committed to bringing Digital Transformation & AI solutions to businesses worldwide."
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="rounded-3xl border-2 border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] px-8 py-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md md:px-12 md:py-14">
                        <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed text-lg md:text-xl">
                            <p className="text-[var(--text-primary)] font-medium text-xl md:text-2xl">
                                At Andriga, we build production-ready AI systems that deliver measurable business outcomes—no hype, just results.
                            </p>
                            <p>
                                We bring industry-proven playbooks and reference architectures that dramatically reduce time-to-value and execution risk.
                            </p>
                            <p>
                                Our AI transformation approach combines reusable frameworks, intelligent automation, and governance models designed to scale responsibly in enterprise environments.
                            </p>
                            <p>
                                Every engagement is outcome-driven with measurable ROI, embedded controls, and solutions that are secure, compliant, and resilient from day one.
                            </p>
                            <p className="text-[var(--text-primary)] font-semibold text-xl border-l-4 border-[var(--accent-primary)] pl-6">
                                Founded by operators who've scaled systems in Fortune companies, we bring practical experience and a hands-on partnership model that goes beyond traditional consulting.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Looking for Clients CTA */}
            <Section className="bg-[var(--bg-secondary)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-8 h-8 text-[var(--accent-primary)]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        We partner with Forward-Thinking Businesses
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] mb-8">
                        Founded in 2025, we collaborate with organizations ready to embrace AI-driven transformation. We focus on building long-term partnerships where we work closely together to drive impact, innovation & growth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg">
                                Let&apos;s Talk
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button variant="secondary" size="lg">
                                Try Our AI Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </Section>
        </>
    );
}
