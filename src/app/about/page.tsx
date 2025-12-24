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
        title: "Innovation First",
        description: "We constantly push boundaries to deliver cutting-edge AI solutions that give our clients a competitive edge.",
    },
    {
        icon: Users,
        title: "Client Partnership",
        description: "We work alongside our clients as true partners, understanding their unique needs and challenges.",
    },
    {
        icon: Heart,
        title: "Integrity",
        description: "We believe in transparent communication, ethical AI practices, and building trust through every interaction.",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "We strive for excellence in everything we do, from code quality to customer service.",
    },
];

const team = [
    {
        name: "Kunal Vyas",
        role: "Co-Founder",
        bio: "Passionate about leveraging AI to transform how businesses operate and serve their customers.",
    },
    {
        name: "Shivenderjeet Singh",
        role: "Co-Founder",
        bio: "Dedicated to building scalable AI solutions that deliver real business value.",
    },
    {
        name: "Rodolfo Luciani",
        role: "Co-Founder",
        bio: "Focused on bridging the gap between cutting-edge AI technology and practical business applications.",
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
                            To democratize AI technology by providing small and medium-sized businesses
                            with enterprise-grade AI solutions that drive real business value. We bridge
                            the gap between cutting-edge technology and practical implementation.
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
                            A world where every business, regardless of size, can harness the power of
                            AI to enhance customer experiences, streamline operations, and unlock new
                            opportunities for growth and innovation.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* Values */}
            <Section withGrid>
                <SectionHeader
                    badge="Our Values"
                    title="What Drives Us"
                    subtitle="The principles that guide our work and define our culture."
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
                    badge="Our Team"
                    title="Meet the Founders"
                    subtitle="A passionate team committed to bringing AI solutions to businesses worldwide."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center group hover:border-[var(--border-default)] transition-all"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                                {member.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                            <p className="text-sm text-[var(--accent-primary)] mb-3">{member.role}</p>
                            <p className="text-sm text-[var(--text-secondary)]">{member.bio}</p>
                        </motion.div>
                    ))}
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
                        We&apos;re Actively Looking for Our First Clients!
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] mb-8">
                        As a newly founded company in 2025, we&apos;re eager to partner with forward-thinking
                        businesses ready to embrace AI transformation. Be among our first clients and
                        benefit from our dedicated attention and competitive introductory rates.
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
