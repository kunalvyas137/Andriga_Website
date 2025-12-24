"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight, TrendingUp, Building2, Sparkles } from "lucide-react";

const caseStudies = [
    {
        id: "healthcare-ai",
        industry: "Healthcare",
        title: "AI-Powered Patient Scheduling System",
        client: "Regional Medical Center",
        description: "Implemented an intelligent appointment scheduling system that reduced no-shows by 40% and improved patient satisfaction scores.",
        results: [
            { metric: "40%", label: "Reduction in No-Shows" },
            { metric: "60%", label: "Faster Scheduling" },
            { metric: "95%", label: "Patient Satisfaction" },
        ],
        color: "#3B82F6",
    },
    {
        id: "retail-automation",
        industry: "Retail",
        title: "Inventory Optimization with ML",
        client: "National Retail Chain",
        description: "Deployed machine learning models to predict demand and optimize inventory levels across 200+ locations.",
        results: [
            { metric: "30%", label: "Reduced Stockouts" },
            { metric: "$2M", label: "Annual Savings" },
            { metric: "25%", label: "Better Forecasting" },
        ],
        color: "#0EA5E9",
    },
    {
        id: "fintech-chatbot",
        industry: "Finance",
        title: "Conversational AI for Customer Service",
        client: "Digital Banking Startup",
        description: "Built and deployed an AI chatbot handling 80% of customer inquiries, reducing support costs while improving response times.",
        results: [
            { metric: "80%", label: "Queries Automated" },
            { metric: "24/7", label: "Availability" },
            { metric: "4.8/5", label: "Customer Rating" },
        ],
        color: "#38BDF8",
    },
    {
        id: "manufacturing-qa",
        industry: "Manufacturing",
        title: "Computer Vision Quality Assurance",
        client: "Electronics Manufacturer",
        description: "Implemented computer vision system for real-time defect detection, catching issues human inspectors often missed.",
        results: [
            { metric: "99.5%", label: "Detection Accuracy" },
            { metric: "50%", label: "Faster Inspection" },
            { metric: "70%", label: "Reduced Defects" },
        ],
        color: "#3B82F6",
    },
    {
        id: "logistics-optimization",
        industry: "Logistics",
        title: "Route Optimization Engine",
        client: "Delivery Services Company",
        description: "AI-powered route optimization reducing delivery times and fuel costs across a fleet of 500+ vehicles.",
        results: [
            { metric: "20%", label: "Faster Deliveries" },
            { metric: "15%", label: "Fuel Savings" },
            { metric: "35%", label: "More Deliveries/Day" },
        ],
        color: "#0EA5E9",
    },
    {
        id: "hr-analytics",
        industry: "Human Resources",
        title: "Predictive HR Analytics Platform",
        client: "Enterprise Corporation",
        description: "Built analytics platform predicting employee attrition and identifying factors affecting workplace satisfaction.",
        results: [
            { metric: "45%", label: "Reduced Turnover" },
            { metric: "85%", label: "Prediction Accuracy" },
            { metric: "3x", label: "Faster Hiring" },
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
                                        href={`/case-studies/${study.id}`}
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
                            Join the growing list of companies transforming their operations with ANDRIGA&apos;s AI solutions.
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
