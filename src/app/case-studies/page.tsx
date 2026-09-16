"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, TrendingUp, Building2, Sparkles } from "lucide-react";

const caseStudies = [
    {
        id: "creditcard-ai",
        industry: "Credit Card",
        title: "Building CRM Platforms at Fortune 100 Scale",
        client: "Fortune 100 Credit Card Company",
        description: `Experience in building and scaling multiple in-house CRM and customer servicing platforms for a Fortune 100 multinational enterprise. These platforms powered data and customer interactions for over 140 million customers, enabling 25,000+ service professionals to deliver seamless, high-quality support at global scale. The solutions were designed for high availability, security, and performance, supporting mission-critical operations across digital and assisted service channels.`,
        results: [
            { metric: "99.99%", label: "System Availability" },
            { metric: "100%", label: "Data Accuracy" },
            { metric: "95%", label: "User Satisfaction Score" },
        ],
        color: "#3B82F6",
    },
    {
        id: "travel-lifestyle",
        industry: "Travel & Lifestyle",
        title: "Omnichannel Customer Servicing Transformation",
        client: "Large Travel Business",
        description: "Migration of Voice and Digital Customer Servicing from a legacy provider to a modern, AI-focused cloud platform, successfully transitioning 25,000+ service professionals. The program included building IVR systems, intelligent routing flows, and a unified agent experience focused on true omnichannel servicing. Customer care professionals could seamlessly handle voice calls, chats, and emails simultaneously from a single interface. Customers retained the freedom to choose their preferred channel while consistently engaging with their Relationship Managers, delivering a seamless and efficient experience for both customers and service teams.",
        results: [
            { metric: "$14B", label: "Booking Revenue" },
            { metric: "$10M", label: "Annual Savings" },
            { metric: "400K", label: "Travel Bookings" },
        ],
        color: "#0EA5E9",
    },
    {
        id: "fintech-bot",
        industry: "Finance",
        title: "Conversational AI for Customer Service",
        client: "Digital Fintech",
        description: "Led the discovery, design, and delivery of an AI-powered servicing platform spanning Chat Bots, Voice Bots, and Email Response Intelligence. The solution enabled intelligent conversation flows that collect information, maintain full context, and execute customer requests across channels. AI-driven responses and agent-assist capabilities reduced manual effort while ensuring seamless handoffs to service professionals when needed. The platform was built for enterprise scale, continuous learning, and high reliability. The outcome was faster resolutions, improved customer experience, and measurable gains in agent productivity.",
        results: [
            { metric: "25%", label: "Queries Automated" },
            { metric: "24/7", label: "Availability" },
            { metric: "4.8/5", label: "Customer Rating" },
        ],
        color: "#38BDF8",
    },
    {
        id: "nbfc-qa",
        industry: "NBFC",
        title: "Agentic AI Flow for Operational Automation",
        client: "Non Banking Financial Services Company",
        description: "Implemented Agentic AI for automating complex, multi-step operational workflows. Intelligent AI agents were designed to understand intent, reason across systems, and autonomously execute tasks such as data validation, exception handling, and decision-based actions. The solution orchestrated workflows end to end with minimal human intervention. This significantly reduced manual touchpoints and process latency. The outcome was faster turnaround times, improved operational efficiency, and scalable automation while maintaining accuracy, compliance, and auditability",
        results: [
            { metric: "50%", label: "Manual Effort Reduction" },
            { metric: "50%", label: "Faster Process Turnaround Time" },
            { metric: "100%", label: "Accuracy" },
        ],
        color: "#3B82F6",
    },
    {
        id: "staff-augmentation",
        industry: "Engineering Staffing",
        title: "Staffing for Engineering & Product",
        client: "Banking And Financial Services Firm",
        description: "Experience in hiring and deploying top-tier engineering and product talent to help businesses scale without the need for permanent hires. Our teams consist of highly skilled engineers working on the latest technologies and seasoned product professionals who deliver immediate impact. We offer flexible engagement models, allowing companies to scale capacity quickly and efficiently while maintaining high quality and speed.",
        results: [
            { metric: "50%", label: "Reduced Time-to-Hire" },
            { metric: "High", label: "Delivering Value within weeks" },
            { metric: "100%", label: "Contract Renewals" },
        ],
        color: "#0EA5E9",
    },
    {
        id: "application-development",
        industry: "Retail",
        title: "E-Commerce Application Development",
        client: "Astrology, Numerology and Inovicing Platforms",
        description: "Our team designed and built two end-to-end digital platforms: an Astrology & Numerology platform and a Business Invoicing platform, delivered as scalable web applications and fully functional mobile apps on the app stores. We led the product discovery, UX design, and full-stack development for both solutions. The platforms were architected for reliability, performance, and ease of use across devices. From concept to deployment, we ensured seamless user experiences and ongoing maintenance. The result was production-ready platforms that enabled rapid user adoption and business growth.",
        results: [
            { metric: "10K", label: "Downloads on App Stores" },
            { metric: "90%", label: "Rating" },
            { metric: "3x", label: "Downloads in 24 hours" },
        ],
        color: "#38BDF8",
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CaseStudiesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial" />
                <div className="gradient-orb gradient-orb-2 animate-float opacity-30" />
                <div className="absolute inset-0 bg-grid opacity-30" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-sm text-[var(--accent-primary)] mb-6">
                            <TrendingUp className="w-4 h-4" />
                            Client Success Stories
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Real Results, Real{" "}
                            <GradientText>Impact</GradientText>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                            Discover how we&apos;ve helped businesses across industries transform their
                            operations and achieve measurable results with AI.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <Section>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {caseStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="h-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden hover:border-[var(--border-default)] transition-all duration-300 hover:shadow-lg">
                                {/* Header */}
                                <div
                                    className="p-6 border-b border-[var(--border-subtle)]"
                                    style={{ background: `linear-gradient(135deg, ${study.color}10, transparent)` }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="px-3 py-1 text-xs font-medium rounded-full"
                                            style={{ backgroundColor: `${study.color}20`, color: study.color }}
                                        >
                                            {study.industry}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                        {study.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                                        <Building2 className="w-4 h-4" />
                                        {study.client}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-[var(--text-secondary)] mb-6 text-sm">
                                        {study.description}
                                    </p>

                                    {/* Results */}
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {study.results.map((result, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-xl font-bold gradient-text">{result.metric}</div>
                                                <div className="text-xs text-[var(--text-tertiary)]">{result.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] hover:gap-2 transition-all"
                                    >
                                        Read Full Case Study
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Stats Banner */}
            <Section className="bg-[var(--bg-secondary)]">
                <SectionHeader
                    title="Proven Track Record"
                    subtitle="Numbers that speak to our commitment to client success."
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { value: "$50M+", label: "Client Savings" },
                        { value: "100+", label: "Projects Completed" },
                        { value: "98%", label: "Success Rate" },
                        { value: "15+", label: "Industries Served" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                            <div className="text-[var(--text-secondary)]">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </Section>

            {/* CTA */}
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] rounded-3xl border border-[var(--border-subtle)] p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] rounded-full blur-[100px] opacity-20" />
                    <div className="relative z-10">
                        <Sparkles className="w-12 h-12 text-[var(--accent-primary)] mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Be Our Next Success Story?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                            Join the growing list of companies transforming their operations with ANDRIGA&apos;s Digital Transformation and AI solutions.
                        </p>
                        <Link href="/contact">
                            <button className="btn btn-primary text-lg px-8 py-4">
                                Start Your Journey
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </Section>
        </>
    );
}
